/**
 * Code.gs — Google Apps Script for Dhyan Yog Digital Marketing
 * ------------------------------------------------------------
 * Receives enquiries from the website (sent by server/handleEnquiry.js) and:
 *   a) adds each enquiry as a new row in the Google Sheet "Dhyan Yog Enquiries"
 *      (one tab per form type, header row created automatically),
 *   b) adds a formatted entry to the Google Doc "Dhyan Yog Enquiry Log",
 *   c) emails the details to the business owner.
 *
 * WHICH GOOGLE ACCOUNT: everything is saved in the Google Drive of the account that installs
 * and deploys this script. Install it while signed in as kalakutagiyuvraj001@gmail.com.
 *
 * FOLDER: the Sheet and Doc are kept inside a Drive folder called "Dhyan Yog".
 *   - If a folder with that name already exists (any capitalisation, e.g. "dhyan yog"),
 *     it is used. No new folder is created.
 *   - If the Doc / Sheet already exist inside that folder (same names as below), they are
 *     reused. New ones are only created when they are missing.
 *
 * HOW TO INSTALL: see README.md → "Saving enquiries to Google". In short:
 *   1. Go to https://script.google.com → New project → paste this whole file.
 *   2. Change the SETTINGS below (email + secret).
 *   3. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone.
 *   4. Copy the web app URL into GOOGLE_SCRIPT_URL in the website's .env.local.
 *
 * After the first run, the IDs of the folder, Sheet and Doc are remembered (Script
 * Properties), so you can rename or move them in Drive later without breaking anything.
 */

/* ===================== SETTINGS: CHANGE THESE ===================== */

/** Where enquiry notification emails are sent. */
var NOTIFY_EMAIL = "kalakutagiyuvraj001@gmail.com";

/**
 * Must be exactly the same text as GOOGLE_SCRIPT_SECRET in the website's .env.local.
 * Requests without the right secret are refused, so strangers cannot add fake rows.
 */
var SHARED_SECRET = "change-me-to-a-long-random-text";

/** Names used to find (or, if missing, create) the Sheet and Doc inside the folder. */
var SHEET_NAME = "Dhyan Yog Enquiries";
var DOC_NAME = "Dhyan Yog Enquiry Log";

/** The Drive folder that holds both files. An existing folder with this name is reused. */
var FOLDER_NAME = "Dhyan Yog";

/**
 * OPTIONAL: to force a specific folder (for example if you have two folders with the same
 * name), paste its ID here. The ID is the last part of the folder's address:
 * https://drive.google.com/drive/folders/THIS_PART_IS_THE_ID
 */
var FOLDER_ID = "";

/* ================================================================== */

/**
 * Column order for every tab. Fields that a form does not have are left blank.
 * The first item of each pair is the field name sent by the website, the second
 * is the column title shown in the Sheet.
 */
var COLUMNS = [
  ["timestamp", "Date & Time (IST)"],
  ["formType", "Form"],
  ["fullName", "Full Name"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["company", "Company"],
  ["city", "City"],
  ["service", "Service"],
  ["budget", "Budget"],
  ["role", "Role Applied For"],
  ["resumeLink", "CV / Portfolio Link"],
  ["message", "Message"],
  ["pageUrl", "Page URL"],
  ["utmSource", "UTM Source"],
  ["utmMedium", "UTM Medium"],
  ["utmCampaign", "UTM Campaign"],
];

/** Readable tab names for each form type. */
var TAB_NAMES = {
  "lets-talk": "Let's Talk Pop-up",
  contact: "Contact Page",
  "home-cta": "Homepage Form",
  service: "Service Pages",
  careers: "Careers",
  internship: "Internship",
  newsletter: "Newsletter",
};

/**
 * Runs when the website POSTs an enquiry to this web app.
 * @param {GoogleAppsScript.Events.DoPost} e The request; e.postData.contents holds the JSON text.
 * @returns {GoogleAppsScript.Content.TextOutput} JSON { ok: true } or { ok: false, error: "..." }
 */
function doPost(e) {
  // A lock stops two enquiries arriving at the same moment from writing over each other.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // wait up to 20 seconds for other requests to finish

    // ----- 1. Read and check the request -----
    var payload = JSON.parse(e.postData.contents);
    if (payload.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "unauthorised" });
    }
    var data = payload.data || {};

    // ----- 2. Save to the Google Sheet -----
    appendToSheet(data);

    // ----- 3. Save to the Google Doc -----
    appendToDoc(data);

    // ----- 4. Email the owner (skipped for newsletter sign-ups to avoid noise) -----
    if (data.formType !== "newsletter") {
      sendNotificationEmail(data);
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    // Errors appear in Apps Script → Executions, which helps with debugging.
    console.error(error);
    return jsonResponse({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Lets you open the web app URL in a browser to check it is deployed.
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function doGet() {
  return jsonResponse({ ok: true, message: "Dhyan Yog enquiry endpoint is running." });
}

/**
 * Adds one row to the tab for this form type, creating the tab and header row if needed.
 * @param {Object} data The validated enquiry fields
 */
function appendToSheet(data) {
  var spreadsheet = getOrCreateSpreadsheet();
  var tabName = TAB_NAMES[data.formType] || "Other";
  var sheet = spreadsheet.getSheetByName(tabName);

  // First enquiry of this type: create the tab with a bold, frozen header row.
  if (!sheet) {
    sheet = spreadsheet.insertSheet(tabName);
    var headers = COLUMNS.map(function (column) { return column[1]; });
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#23206B").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);

    // A new spreadsheet starts with an empty "Sheet1" tab; remove it once we have our own tab.
    var defaultTab = spreadsheet.getSheetByName("Sheet1");
    if (defaultTab && defaultTab.getLastRow() === 0 && spreadsheet.getSheets().length > 1) {
      spreadsheet.deleteSheet(defaultTab);
    }
  }

  var row = COLUMNS.map(function (column) {
    var value = data[column[0]];
    // A leading apostrophe stops Sheets from treating values like "=..." as formulas
    // (protects against "formula injection") and keeps phone numbers as text.
    return value === undefined || value === null ? "" : "'" + String(value);
  });
  sheet.appendRow(row);
}

/**
 * Adds a formatted entry to the enquiry log Doc:
 * a heading with the date and name, then each filled-in field on its own line.
 * @param {Object} data
 */
function appendToDoc(data) {
  var doc = getOrCreateDoc();
  var body = doc.getBody();

  var title = (data.timestamp || "") + " — " + (data.fullName || data.email || "New enquiry");
  body.appendParagraph(title).setHeading(DocumentApp.ParagraphHeading.HEADING2);

  COLUMNS.forEach(function (column) {
    var value = data[column[0]];
    if (value === undefined || value === null || value === "" || column[0] === "timestamp") return;
    var paragraph = body.appendParagraph(column[1] + ": " + value);
    // Make the label bold, the value normal.
    paragraph.editAsText().setBold(0, column[1].length, true);
  });

  body.appendHorizontalRule();
  doc.saveAndClose();
}

/**
 * Emails the enquiry details to NOTIFY_EMAIL. Reply-To is set to the visitor's email,
 * so pressing "Reply" answers them directly.
 * @param {Object} data
 */
function sendNotificationEmail(data) {
  if (!NOTIFY_EMAIL || NOTIFY_EMAIL.indexOf("example.com") !== -1) return; // not configured yet

  var subject = "New website enquiry: " + (data.fullName || "Unknown") + (data.service ? " – " + data.service : "");
  var lines = COLUMNS.map(function (column) {
    var value = data[column[0]];
    return value ? column[1] + ": " + value : null;
  }).filter(Boolean);

  var options = { name: "Dhyan Yog Website" };
  if (data.email) options.replyTo = data.email;

  MailApp.sendEmail(NOTIFY_EMAIL, subject, lines.join("\n"), options);
}

/**
 * Finds the "Dhyan Yog" folder, or creates it if it does not exist yet.
 * Order: FOLDER_ID setting → remembered ID → existing folder by name → new folder.
 * @returns {GoogleAppsScript.Drive.Folder}
 */
function getOrCreateFolder() {
  var properties = PropertiesService.getScriptProperties();
  var id = FOLDER_ID || properties.getProperty("FOLDER_ID");
  if (id) {
    try {
      var saved = DriveApp.getFolderById(id);
      if (!saved.isTrashed()) return saved;
    } catch (error) {
      // Folder deleted or no access: look for it by name below.
    }
  }

  // Look for an existing folder, trying common ways of writing the name.
  var nameVariants = [FOLDER_NAME, FOLDER_NAME.toLowerCase(), FOLDER_NAME.toUpperCase(), "Dhyan yog", "DhyanYog", "Dhyan-Yog"];
  for (var i = 0; i < nameVariants.length; i++) {
    var folders = DriveApp.getFoldersByName(nameVariants[i]);
    while (folders.hasNext()) {
      var folder = folders.next();
      if (!folder.isTrashed()) {
        properties.setProperty("FOLDER_ID", folder.getId());
        return folder;
      }
    }
  }

  // None found: create it.
  var created = DriveApp.createFolder(FOLDER_NAME);
  properties.setProperty("FOLDER_ID", created.getId());
  return created;
}

/**
 * Looks inside the folder for a file with this exact name and type.
 * @param {GoogleAppsScript.Drive.Folder} folder
 * @param {string} name
 * @param {string} mimeType e.g. MimeType.GOOGLE_SHEETS
 * @returns {GoogleAppsScript.Drive.File|null}
 */
function findFileInFolder(folder, name, mimeType) {
  var files = folder.getFilesByName(name);
  while (files.hasNext()) {
    var file = files.next();
    if (!file.isTrashed() && file.getMimeType() === mimeType) return file;
  }
  return null;
}

/**
 * Finds the enquiries spreadsheet: remembered ID → existing file named SHEET_NAME in the
 * folder → creates a new one inside the folder.
 * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet}
 */
function getOrCreateSpreadsheet() {
  var properties = PropertiesService.getScriptProperties();
  var id = properties.getProperty("SHEET_ID");
  if (id) {
    try {
      if (!DriveApp.getFileById(id).isTrashed()) return SpreadsheetApp.openById(id);
    } catch (error) {
      // The file was deleted: look for it / create it below.
    }
  }

  var folder = getOrCreateFolder();
  var existing = findFileInFolder(folder, SHEET_NAME, MimeType.GOOGLE_SHEETS);
  if (existing) {
    properties.setProperty("SHEET_ID", existing.getId());
    return SpreadsheetApp.openById(existing.getId());
  }

  // Not found: create it (Google creates it in "My Drive"), then move it into the folder.
  var spreadsheet = SpreadsheetApp.create(SHEET_NAME);
  DriveApp.getFileById(spreadsheet.getId()).moveTo(folder);
  properties.setProperty("SHEET_ID", spreadsheet.getId());
  return spreadsheet;
}

/**
 * Finds the enquiry log document: remembered ID → existing file named DOC_NAME in the
 * folder → creates a new one inside the folder.
 * @returns {GoogleAppsScript.Document.Document}
 */
function getOrCreateDoc() {
  var properties = PropertiesService.getScriptProperties();
  var id = properties.getProperty("DOC_ID");
  if (id) {
    try {
      if (!DriveApp.getFileById(id).isTrashed()) return DocumentApp.openById(id);
    } catch (error) {
      // The file was deleted: look for it / create it below.
    }
  }

  var folder = getOrCreateFolder();
  var existing = findFileInFolder(folder, DOC_NAME, MimeType.GOOGLE_DOCS);
  if (existing) {
    properties.setProperty("DOC_ID", existing.getId());
    return DocumentApp.openById(existing.getId());
  }

  var doc = DocumentApp.create(DOC_NAME);
  doc.getBody().appendParagraph(DOC_NAME).setHeading(DocumentApp.ParagraphHeading.TITLE);
  doc.saveAndClose();
  DriveApp.getFileById(doc.getId()).moveTo(folder);
  properties.setProperty("DOC_ID", doc.getId());
  return DocumentApp.openById(doc.getId());
}

/**
 * Turns an object into a JSON response for the website.
 * @param {Object} object
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function jsonResponse(object) {
  return ContentService.createTextOutput(JSON.stringify(object)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * RUN THIS ONCE from the Apps Script editor (select "setup" and press ▶ Run) to:
 *  - give the script permission to use Drive, Sheets, Docs and Gmail,
 *  - find (or create) the "Dhyan Yog" folder, Sheet and Doc straight away, and
 *  - print their links in the Execution log so you can bookmark them.
 */
function setup() {
  var folder = getOrCreateFolder();
  var spreadsheet = getOrCreateSpreadsheet();
  var doc = getOrCreateDoc();
  console.log("Running as: " + Session.getEffectiveUser().getEmail());
  console.log("Folder: " + folder.getName() + " → " + folder.getUrl());
  console.log("Enquiries Sheet: " + spreadsheet.getUrl());
  console.log("Enquiry Log Doc: " + doc.getUrl());
}
