import React, { useMemo, useState } from "react";
import { Mail, Phone, MapPin, FileText, Send } from "lucide-react";
import { sendContactEmail, sanitizePhoneForHref } from "../utils/contact-service.js";

const INITIAL_FORM_STATE = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

const CONTACT_FALLBACK = {
  title: "Kontakt aufnehmen",
  subtitle: "Wir sind für Sie da.",
  info: {
    address: {
      label: "Standort",
      lines: ["Industriestraße 12", "55120 Mainz"],
    },
    phones: [
      { label: "Disposition", number: "+49 6131 123456" },
      { label: "Notfall", number: "+49 170 9876543" },
    ],
    emails: [
      { label: "Allgemein", address: "info@ctm-mainz.de" },
      { label: "Disposition", address: "dispo@ctm-mainz.de" },
    ],
  },
  availability: {
    label: "Erreichbarkeit",
    value: "24/7 für dringende Transporte",
  },
  imprint: [
    { label: "Firma", value: "Container Transport Mainz GmbH" },
    { label: "Rechtsform", value: "Gesellschaft mit beschränkter Haftung" },
    { label: "Anschrift", value: "Industriestraße 12, 55120 Mainz" },
    { label: "Geschäftsführung", value: "Jan Example, Tobias Example" },
    { label: "Handelsregister", value: "Amtsgericht Mainz, HRB 12345" },
    { label: "USt-IdNr.", value: "DE 123456789" },
  ],
  form: {
    privacyNotice: "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zu.",
    submitLabel: "Anfrage senden",
    successTitle: "Danke für Ihre Nachricht!",
    successMessage: "Wir melden uns schnellstmöglich bei Ihnen.",
    errorTitle: "Versand fehlgeschlagen",
    errorMessage: "Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.",
  },
  recipient: "info@ctm-mainz.de",
  cc: [],
};

export default function Contact({ data }) {
  const contactData = useMemo(() => {
    const base = JSON.parse(JSON.stringify(CONTACT_FALLBACK));
    const source = data || {};

    const readString = (value) => (typeof value === "string" ? value.trim() : "");

    if (!source || Object.keys(source).length === 0) {
      return base;
    }

    const title = readString(source.contact_title);
    if (title) {
      base.title = title;
    }

    const subtitle = readString(source.contact_subtitle);
    if (subtitle) {
      base.subtitle = subtitle;
    }

    const infoSource = source.contact_info || {};
    const addressSource = infoSource.address || {};
    const addressLabel = readString(addressSource.label);
    if (addressLabel) {
      base.info.address.label = addressLabel;
    }

    const addressLines = [];
    const streetLine = readString(addressSource.street);
    if (streetLine) {
      addressLines.push(streetLine);
    }

    const postalCode = readString(addressSource.postal_code);
    const city = readString(addressSource.city);
    const combinedCityLine = [postalCode, city].filter(Boolean).join(" ");
    if (combinedCityLine) {
      addressLines.push(combinedCityLine);
    }

    if (Array.isArray(addressSource.lines)) {
      addressSource.lines.forEach((entry) => {
        const line = readString(entry?.line ?? entry?.value ?? entry);
        if (line) {
          addressLines.push(line);
        }
      });
    }

    [
      "contact_address_line_1",
      "contact_address_line_2",
      "contact_address_line_3",
      "contact_address_line_4"
    ].forEach((key) => {
      const line = readString(source[key]);
      if (line) {
        addressLines.push(line);
      }
    });

    const multiLine = readString(source.contact_address_lines);
    if (multiLine) {
      multiLine.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed) {
          addressLines.push(trimmed);
        }
      });
    }

    if (addressLines.length) {
      base.info.address.lines = addressLines;
    }

    const buildPhoneFromGroup = (group) => {
      if (!group || typeof group !== "object") return null;
      const number = readString(group.number);
      if (!number) return null;
      return {
        label: readString(group.label),
        number,
      };
    };

    const mapContactEntries = (entries, keys) => {
      if (!Array.isArray(entries)) return [];
      return entries
        .map((entry) => {
          const labelKeys = Array.isArray(keys.label) ? keys.label : [keys.label, "label"];
          const valueKeys = Array.isArray(keys.value) ? keys.value : [keys.value, "value"];

          const label = labelKeys
            .map((key) => readString(entry?.[key]))
            .find((val) => Boolean(val));

          const value = valueKeys
            .map((key) => readString(entry?.[key]))
            .find((val) => Boolean(val));

          if (!value) {
            return null;
          }
          return { label, [keys.outputValueKey]: value };
        })
        .filter(Boolean);
    };

    const structuredPhones = [
      buildPhoneFromGroup(infoSource.primary_phone),
      buildPhoneFromGroup(infoSource.secondary_phone),
    ].filter(Boolean);

    const repeaterPhones = mapContactEntries(infoSource.phones, {
      label: "label",
      value: "number",
      outputValueKey: "number"
    });

    const legacyPhones = mapContactEntries(source.contact_phones, {
      label: ["contact_phone_label", "label"],
      value: ["contact_phone_number", "number"],
      outputValueKey: "number"
    });

    const allPhones = [...structuredPhones, ...repeaterPhones, ...legacyPhones];
    if (allPhones.length) {
      const seen = new Set();
      base.info.phones = allPhones.filter((entry) => {
        const number = readString(entry?.number);
        if (!number) return false;
        const label = readString(entry?.label);
        const key = `${number}__${label}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    const buildEmailFromGroup = (group) => {
      if (!group || typeof group !== "object") return null;
      const address = readString(group.address);
      if (!address) return null;
      return {
        label: readString(group.label),
        address,
      };
    };

    const structuredEmails = [
      buildEmailFromGroup(infoSource.primary_email),
      buildEmailFromGroup(infoSource.secondary_email),
    ].filter(Boolean);

    const repeaterEmails = mapContactEntries(infoSource.emails, {
      label: "label",
      value: "address",
      outputValueKey: "address"
    });

    const legacyEmails = mapContactEntries(source.contact_emails, {
      label: ["contact_email_label", "label"],
      value: ["contact_email_address", "address"],
      outputValueKey: "address"
    });

    const allEmails = [...structuredEmails, ...repeaterEmails, ...legacyEmails];
    if (allEmails.length) {
      const seen = new Set();
      base.info.emails = allEmails.filter((entry) => {
        const address = readString(entry?.address);
        if (!address) return false;
        const label = readString(entry?.label);
        const key = `${address.toLowerCase()}__${label}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    const availabilitySource = source.contact_availability || {};
    const availabilityLabel = readString(availabilitySource.label);
    const availabilityValue = readString(availabilitySource.value);
    if (availabilityLabel) {
      base.availability.label = availabilityLabel;
    }
    if (availabilityValue) {
      base.availability.value = availabilityValue;
    }

    const imprintSource = source.contact_imprint;
    if (imprintSource && typeof imprintSource === "object" && !Array.isArray(imprintSource)) {
      const imprint = [];
      const addImprintEntry = (label, value) => {
        const resolved = readString(value);
        if (resolved) {
          imprint.push({ label, value: resolved });
        }
      };

      const companyParts = [readString(imprintSource.company), readString(imprintSource.legal_form)].filter(Boolean);
      if (companyParts.length) {
        imprint.push({ label: "Firma", value: companyParts.join(" · ") });
      }

      const streetValue = readString(imprintSource.street);
      const postalCity = [readString(imprintSource.postal_code), readString(imprintSource.city)].filter(Boolean).join(" ");
      const addressValue = [streetValue, postalCity].filter(Boolean).join(", ");
      if (addressValue) {
        imprint.push({ label: "Anschrift", value: addressValue });
      }

      addImprintEntry("Geschäftsführung", imprintSource.managing_directors);
      addImprintEntry("Handelsregister", imprintSource.trade_register);
      addImprintEntry("USt-IdNr.", imprintSource.vat_id);
      addImprintEntry("Aufsichtsbehörde", imprintSource.supervisory_authority);
      addImprintEntry("Hinweise", imprintSource.additional_notes);

      if (Array.isArray(imprintSource.additional_entries)) {
        imprintSource.additional_entries.forEach((entry, index) => {
          const label = readString(entry?.label) || `Zusatz ${index + 1}`;
          const value = readString(entry?.value);
          if (value) {
            imprint.push({ label, value });
          }
        });
      }

      if (imprint.length) {
        base.imprint = imprint;
      }
    } else if (Array.isArray(imprintSource)) {
      const imprint = imprintSource
        .map((item) => {
          const label = readString(item?.label);
          const value = readString(item?.value);
          if (!label && !value) return null;
          return { label, value };
        })
        .filter(Boolean);
      if (imprint.length) {
        base.imprint = imprint;
      }
    }

    const recipient = readString(source.contact_recipient);
    if (recipient) {
      base.recipient = recipient;
    }

    if (Array.isArray(source.contact_cc)) {
      const cc = source.contact_cc
        .map((item) => readString(item?.address ?? item?.email ?? item))
        .filter(Boolean);
      if (cc.length) {
        base.cc = cc;
      }
    }

    const endpoint = readString(source.contact_endpoint);
    if (endpoint) {
      base.endpoint = endpoint;
    }

    const formSource = source.contact_form || {};
    const resolveFormValue = (key, fallbackKey) => {
      const direct = readString(formSource[key]);
      if (direct) return direct;
      return readString(source[fallbackKey]);
    };

    const formOverrides = {
      privacyNotice: resolveFormValue("privacyNotice", "contact_form_privacy_notice"),
      submitLabel: resolveFormValue("submitLabel", "contact_form_submit_label"),
      successTitle: resolveFormValue("successTitle", "contact_form_success_title"),
      successMessage: resolveFormValue("successMessage", "contact_form_success_message"),
      errorTitle: resolveFormValue("errorTitle", "contact_form_error_title"),
      errorMessage: resolveFormValue("errorMessage", "contact_form_error_message"),
    };

    Object.entries(formOverrides).forEach(([key, value]) => {
      if (value) {
        base.form[key] = value;
      }
    });

    return base;
  }, [data]);
  const [formValues, setFormValues] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState(null);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const resolvedRecipient = useMemo(() => {
    if (contactData.recipient) return contactData.recipient;
    const emailEntry = contactData.info?.emails?.find((entry) => entry?.address) || contactData.info?.emails?.[0];
    return emailEntry?.address;
  }, [contactData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "loading") return;

    if (!resolvedRecipient) {
      setFeedback({
        type: "error",
        title: "Keine Empfänger-Adresse",
        message: "Es ist keine Zieladresse zum Versenden der Anfrage konfiguriert.",
      });
      return;
    }

    setStatus("loading");
    setFeedback(null);

    try {
      await sendContactEmail(
        {
          ...formValues,
          source: typeof window !== "undefined" ? window.location.href : "Kontaktformular",
        },
        {
          recipient: resolvedRecipient,
          cc: contactData.cc,
          endpoint: contactData.endpoint,
        }
      );

      setStatus("success");
      setFeedback({
        type: "success",
        title: contactData.form?.successTitle || "Danke für Ihre Nachricht!",
        message: contactData.form?.successMessage || "Wir melden uns schnellstmöglich bei Ihnen.",
      });
      setFormValues(INITIAL_FORM_STATE);
    } catch (error) {
      console.error("Kontaktformular Fehler", error);
      setStatus("error");
      setFeedback({
        type: "error",
        title: contactData.form?.errorTitle || "Versand fehlgeschlagen",
        message:
          contactData.form?.errorMessage ||
          "Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.",
      });
    }
  };

  const contactDetails = useMemo(() => {
    return [
      {
        icon: MapPin,
        title: contactData.info?.address?.label || "Adresse",
        entries: (contactData.info?.address?.lines || []).map((line) => ({ text: line })),
      },
      {
        icon: Phone,
        title: "Telefon",
        entries: (contactData.info?.phones || []).map(({ label, number }) => ({
          text: `${label ? `${label}: ` : ""}${number || ""}`.trim(),
          href: sanitizePhoneForHref(number),
        })),
      },
      {
        icon: Mail,
        title: "E-Mail",
        entries: (contactData.info?.emails || []).map(({ label, address }) => ({
          text: `${label ? `${label}: ` : ""}${address || ""}`.trim(),
          href: address ? `mailto:${address}` : undefined,
        })),
      },
    ].filter((section) => section.entries.length > 0);
  }, [contactData]);

  return (
    <section id="kontakt" className="viewport-section relative overflow-hidden text-white">
      <div className="mx-auto w-full max-w-6xl px-6 h-full flex flex-col justify-center">
        <div className="section-header text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-ctm mb-1">
            {contactData.title || "Kontakt aufnehmen"}
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
            {contactData.subtitle || "Wir sind für Sie da."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-start">
          {/* Kontaktformular ohne 3D Hover */}
          <div className="card-gradient-hero py-10 card-padding-x shadow-2xl">
            <form className="space-y-7" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-base font-semibold text-white mb-1">Name*</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formValues.name}
                      onChange={handleChange("name")}
                      placeholder="Ihr Name"
                      className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-white text-base font-normal focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-base font-semibold text-white mb-1">E-Mail*</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formValues.email}
                      onChange={handleChange("email")}
                      placeholder="ihre@email.de"
                      className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-white text-base font-normal focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 transition"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="contact-company" className="block text-base font-semibold text-white mb-1">Unternehmen</label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={formValues.company}
                      onChange={handleChange("company")}
                      placeholder="Ihr Unternehmen"
                      className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-white text-base font-normal focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-base font-semibold text-white mb-1">Telefon</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formValues.phone}
                      onChange={handleChange("phone")}
                      placeholder="06131 123456"
                      className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-white text-base font-normal focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 transition"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-base font-semibold text-white mb-1">Nachricht*</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formValues.message}
                  onChange={handleChange("message")}
                  placeholder="Beschreiben Sie Ihre Transportanforderungen..."
                  className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-white text-base font-normal focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 transition resize-none"
                />
              </div>

              {feedback && (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    feedback.type === "success"
                      ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
                      : "border-red-400/40 bg-red-500/10 text-red-100"
                  }`}
                  aria-live="polite"
                >
                  <p className="font-semibold">{feedback.title}</p>
                  <p className="mt-1 text-white/80">{feedback.message}</p>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-6">
                <p className="text-xs text-white/60 max-w-xs">
                  {contactData.form?.privacyNotice ||
                    "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zu."}
                </p>
                <button
                  type="submit"
                  className="ctm-btn--primary btn-3d inline-flex items-center gap-2 rounded-2xl px-7 py-3 font-semibold text-black shadow-lg shadow-yellow-900/30 hover:scale-105 transition-transform"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <span>Senden...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>{contactData.form?.submitLabel || "Anfrage senden"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="glass-strong hover-lift transform-3d rounded-3xl border border-white/12 py-7 card-padding-x shadow-xl shadow-black/35" style={{
              background: "linear-gradient(145deg, rgba(255,215,0,0.18), rgba(22,28,43,0.85))",
              backdropFilter: "blur(18px)"
            }}>
              <h3 className="text-lg font-semibold text-white mb-4">Kontaktdaten</h3>
              <div className="space-y-5">
                {contactDetails.map(({ icon, title, entries }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="icon-3d icon-glow rounded-2xl p-3 text-yellow-300">
                      {React.createElement(icon, { className: "h-5 w-5" })}
                    </div>
                    <div className="space-y-1 text-sm text-white/80">
                      <p className="font-semibold text-white">{title}</p>
                      {entries.map((entry, idx) => (
                        <p key={idx}>
                          {entry.href ? (
                            <a
                              href={entry.href}
                              className="transition-colors hover:text-yellow-200"
                              rel="noopener noreferrer"
                            >
                              {entry.text}
                            </a>
                          ) : (
                            entry.text
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-strong hover-lift transform-3d rounded-3xl border border-white/12 py-7 card-padding-x shadow-xl shadow-black/35" style={{
              background: "linear-gradient(145deg, rgba(255,215,0,0.18), rgba(22,28,43,0.85))",
              backdropFilter: "blur(18px)"
            }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Impressum</h3>
                  <p className="text-sm text-white/60">Wichtige rechtliche Angaben im kompakten Steckbrief.</p>
                </div>
                <div className="icon-3d icon-glow rounded-2xl p-3 text-yellow-300">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 grid gap-x-6 gap-y-3 text-xs text-white/70 sm:grid-cols-2">
                {(Array.isArray(contactData.imprint) ? contactData.imprint : []).map(({ label, value }) => (
                  <div key={label} className="leading-relaxed">
                    <span className="block text-[0.7rem] uppercase tracking-wide text-white/40">{label}</span>
                    <span className="mt-1 block text-white/80 text-sm sm:text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer integriert in Contact Section */}
        <footer className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-sm">
                © {new Date().getFullYear()} Container Transport Mainz
              </span>
            </div>
            <div className="text-white/60 text-xs">
              <span className="text-gradient">· Mainz, Deutschland</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}