/**
 * EnquiryModalProvider.jsx
 * Controls the "Let's Talk" enquiry pop-up for the whole website.
 * Used on: src/App.jsx wraps every page with it.
 *
 * HOW TO OPEN THE POP-UP FROM ANYWHERE:
 *  1. In any component use a normal link: <a href="#enquire">...</a>.
 *     This provider listens for clicks on those links and opens the pop-up instead.
 *  2. Or call: const { openModal } = useEnquiryModal(); openModal();
 *
 * WHY a native <dialog>: the browser then handles focus trapping, the Escape key and
 * hiding the rest of the page from screen readers, which makes the pop-up accessible.
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import { rememberUtmTags } from "./useFormSubmit";

const EnquiryModalContext = createContext({ openModal: () => {}, closeModal: () => {} });

/**
 * Lets any component open or close the pop-up.
 * @returns {{openModal: (service?: string) => void, closeModal: () => void}}
 */
export function useEnquiryModal() {
  return useContext(EnquiryModalContext);
}

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children  The whole website
 * @param {Array<{group:string, options:string[]}>} props.serviceOptions Service dropdown options (from the server)
 * @param {string} props.whatsapp Business WhatsApp number (digits)
 */
export default function EnquiryModalProvider({ children, serviceOptions, whatsapp }) {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [presetService, setPresetService] = useState("");

  /** Opens the pop-up, optionally with a service already selected. */
  const openModal = useCallback((service = "") => {
    setPresetService(service);
    setIsOpen(true);
  }, []);

  /** Closes the pop-up. */
  const closeModal = useCallback(() => setIsOpen(false), []);

  // Show/hide the <dialog> whenever isOpen changes. (Page scrolling behind it is
  // locked by the "body:has(dialog[open])" rule in globals.css.)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    else if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // Listen for clicks on any <a href="#enquire"> link on the page (event delegation:
  // one listener on the document instead of one per button).
  useEffect(() => {
    rememberUtmTags(); // save UTM tags from the landing page (see useFormSubmit.js)

    function handleClick(event) {
      const link = event.target.closest?.('a[href="#enquire"]');
      if (!link) return;
      event.preventDefault();
      openModal(link.dataset.service || "");
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openModal]);

  return (
    <EnquiryModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* ===== "Let's Talk" pop-up ===== */}
      <dialog
        ref={dialogRef}
        aria-labelledby="enquiry-modal-title"
        // Escape key or browser "close" → keep React state in sync
        onClose={closeModal}
        // Clicking the dark backdrop (outside the white box) closes the pop-up
        onClick={(event) => {
          if (event.target === dialogRef.current) closeModal();
        }}
        // Full screen on phones; centred box with max width from 640px up.
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-navy-900/70 sm:m-auto sm:h-auto sm:max-h-[90vh] sm:max-w-2xl"
      >
        <div className="flex h-full flex-col overflow-y-auto bg-white p-5 sm:rounded-2xl sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow !mb-1">Let&apos;s Talk</p>
              <h2 id="enquiry-modal-title" className="text-2xl font-bold">
                Tell us about your project
              </h2>
              <p className="mt-1 text-gray-600">We reply within one working day.</p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close enquiry form"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-ink hover:bg-gray-200"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          {/* The form is only rendered while open, so it starts empty each time
              and does not add work to the first page load. */}
          {isOpen && (
            <EnquiryForm
              formType="lets-talk"
              serviceOptions={serviceOptions}
              whatsapp={whatsapp}
              defaultService={presetService}
            />
          )}
        </div>
      </dialog>
    </EnquiryModalContext.Provider>
  );
}
