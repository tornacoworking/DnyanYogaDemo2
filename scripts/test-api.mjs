/**
 * test-api.mjs  →  `npm run test:api`
 * End-to-end test of the Express + MongoDB backend. It starts the real app on a random
 * port and checks that forms CREATE records, the admin API can READ / UPDATE / DELETE them,
 * and that bad input and missing/wrong keys are rejected.
 *
 * Needs a running MongoDB: it uses MONGODB_TEST_URI, or MONGODB_URI from .env. It only ever
 * touches a separate database called "dnyanyoga_test" and drops it when finished, so real
 * data is never changed.
 */
import "dotenv/config";
import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../server/config/db.js";
import { createApp } from "../server/app.js";
import Enquiry from "../server/models/Enquiry.js";
import JobApplication from "../server/models/JobApplication.js";
import NewsletterSubscriber from "../server/models/NewsletterSubscriber.js";

const uri = process.env.MONGODB_TEST_URI || process.env.MONGODB_URI;
const KEY = "test-admin-key-" + Math.random().toString(36).slice(2);
process.env.ADMIN_API_KEY = KEY;
process.env.TRUST_PROXY = "true"; // lets each test use its own fake visitor IP (rate limit is per IP)

let server;
let base;
let ipCounter = 0;

/** Sends a request; every call uses a fresh IP unless one is given. */
async function api(method, path, { body, key, ip } = {}) {
  const response = await fetch(base + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": ip || `10.0.0.${++ipCounter}`,
      ...(key ? { "x-api-key": key } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: response.status, json: await response.json().catch(() => null) };
}

const enquiry = (overrides = {}) => ({
  formType: "contact",
  fullName: "Asha Patil",
  phone: "+91 98765-43210",
  email: "Asha@Example.com",
  service: "SEO",
  budget: "",
  message: "Hello",
  consent: true,
  website: "",
  ...overrides,
});

before(async () => {
  assert.ok(uri, "Set MONGODB_TEST_URI (or MONGODB_URI) to a running MongoDB.");
  await connectDB(uri, { dbName: "dnyanyoga_test" });
  await mongoose.connection.dropDatabase();
  server = createApp().listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await new Promise((resolve) => server.close(resolve));
  await disconnectDB();
});

describe("health", () => {
  it("reports the database as connected", async () => {
    const { status, json } = await api("GET", "/api/health");
    assert.equal(status, 200);
    assert.deepEqual(json, { ok: true, database: "connected" });
  });
});

describe("CREATE: POST /api/enquiry", () => {
  it("saves a contact enquiry (phone and email normalised)", async () => {
    const { status, json } = await api("POST", "/api/enquiry", { body: enquiry() });
    assert.equal(status, 200);
    assert.equal(json.ok, true);
    const saved = await Enquiry.findOne({ email: "asha@example.com" }).lean();
    assert.equal(saved.phone, "9876543210");
    assert.equal(saved.status, "new");
    assert.equal(saved.formType, "contact");
  });

  it("saves a careers application", async () => {
    const { status } = await api("POST", "/api/enquiry", {
      body: { formType: "careers", fullName: "Ravi Kumar", phone: "9123456789", email: "ravi@example.com", role: "SEO Executive", resumeLink: "https://example.com/cv", consent: true },
    });
    assert.equal(status, 200);
    assert.equal(await JobApplication.countDocuments({ email: "ravi@example.com" }), 1);
  });

  it("saves a newsletter signup once, even if sent twice", async () => {
    for (let i = 0; i < 2; i++) {
      const { status } = await api("POST", "/api/enquiry", { body: { formType: "newsletter", email: "News@Example.com" } });
      assert.equal(status, 200);
    }
    assert.equal(await NewsletterSubscriber.countDocuments({ email: "news@example.com" }), 1);
  });

  it("rejects invalid data with per-field errors and saves nothing", async () => {
    const before = await Enquiry.countDocuments();
    const { status, json } = await api("POST", "/api/enquiry", { body: enquiry({ fullName: "A", phone: "123", email: "nope", consent: false }) });
    assert.equal(status, 400);
    assert.equal(json.ok, false);
    assert.ok(json.errors.fullName && json.errors.phone && json.errors.email && json.errors.consent);
    assert.equal(await Enquiry.countDocuments(), before);
  });

  it("silently ignores honeypot (bot) submissions", async () => {
    const before = await Enquiry.countDocuments();
    const { status, json } = await api("POST", "/api/enquiry", { body: enquiry({ website: "http://spam.example" }) });
    assert.equal(status, 200);
    assert.equal(json.ok, true);
    assert.equal(await Enquiry.countDocuments(), before);
  });

  it("rejects unknown forms, bad JSON and wrong methods", async () => {
    assert.equal((await api("POST", "/api/enquiry", { body: { formType: "hack" } })).status, 400);
    const bad = await fetch(base + "/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{not json" });
    assert.equal(bad.status, 400);
    assert.equal((await api("GET", "/api/enquiry")).status, 405);
    assert.equal((await api("GET", "/api/nothing-here")).status, 404);
  });

  it("rate limits one IP after 5 submissions", async () => {
    const ip = "203.0.113.50";
    const statuses = [];
    for (let i = 0; i < 6; i++) statuses.push((await api("POST", "/api/enquiry", { body: enquiry(), ip })).status);
    assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429]);
  });
});

describe("READ / UPDATE / DELETE: admin API", () => {
  let id;

  it("is closed without the key, or with a wrong key", async () => {
    assert.equal((await api("GET", "/api/enquiries")).status, 401);
    assert.equal((await api("GET", "/api/enquiries", { key: "wrong" })).status, 401);
  });

  it("lists, filters and paginates enquiries", async () => {
    const { status, json } = await api("GET", "/api/enquiries?limit=2&q=asha", { key: KEY });
    assert.equal(status, 200);
    assert.ok(json.total >= 1 && json.items.length <= 2);
    id = json.items[0]._id;
  });

  it("reads one enquiry; rejects bad or unknown ids", async () => {
    const found = await api("GET", `/api/enquiries/${id}`, { key: KEY });
    assert.equal(found.status, 200);
    assert.equal(found.json.item.fullName, "Asha Patil");
    assert.equal((await api("GET", "/api/enquiries/not-an-id", { key: KEY })).status, 400);
    assert.equal((await api("GET", "/api/enquiries/64b7f0f0f0f0f0f0f0f0f0f0", { key: KEY })).status, 404);
  });

  it("updates status and notes; rejects an invalid status", async () => {
    const updated = await api("PATCH", `/api/enquiries/${id}`, { key: KEY, body: { status: "contacted", notes: "Called back" } });
    assert.equal(updated.status, 200);
    assert.equal(updated.json.item.status, "contacted");
    assert.equal((await Enquiry.findById(id).lean()).notes, "Called back");
    assert.equal((await api("PATCH", `/api/enquiries/${id}`, { key: KEY, body: { status: "bogus" } })).status, 400);
    assert.equal((await api("PATCH", `/api/enquiries/${id}`, { key: KEY, body: {} })).status, 400);
  });

  it("does not let callers change other fields", async () => {
    await api("PATCH", `/api/enquiries/${id}`, { key: KEY, body: { status: "closed", fullName: "Hacked" } });
    assert.equal((await Enquiry.findById(id).lean()).fullName, "Asha Patil");
  });

  it("lists applications and subscribers", async () => {
    assert.ok((await api("GET", "/api/applications", { key: KEY })).json.total >= 1);
    assert.ok((await api("GET", "/api/subscribers", { key: KEY })).json.total >= 1);
  });

  it("deletes an enquiry, then reports it as gone", async () => {
    assert.equal((await api("DELETE", `/api/enquiries/${id}`, { key: KEY })).status, 200);
    assert.equal(await Enquiry.findById(id), null);
    assert.equal((await api("DELETE", `/api/enquiries/${id}`, { key: KEY })).status, 404);
  });
});
