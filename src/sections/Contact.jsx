import React, { useMemo, useState } from "react";
import { Mail, Phone, MapPin, Clock, FileText, Send } from "lucide-react";
import { useSection } from "../hooks/useWordPressData.js";
import { sendContactEmail, sanitizePhoneForHref } from "../utils/contact-service.js";

const INITIAL_FORM_STATE = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export default function Contact({ data }) {
  const fallbackData = useSection("contact");
  const contactData = useMemo(() => {
    if (!data) {
      return fallbackData;
    }

    return {
      ...fallbackData,
      ...data,
      info: {
        ...fallbackData.info,
        ...data.info,
        address: {
          ...fallbackData.info?.address,
          ...data.info?.address,
        },
        phones: data.info?.phones ?? fallbackData.info?.phones,
        emails: data.info?.emails ?? fallbackData.info?.emails,
      },
      officeHours: data.officeHours ?? fallbackData.officeHours,
      availability: {
        ...fallbackData.availability,
        ...data.availability,
      },
      imprint: data.imprint ?? fallbackData.imprint,
      form: {
        ...fallbackData.form,
        ...data.form,
      },
      cc: data.cc ?? fallbackData.cc,
    };
  }, [fallbackData, data]);
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
    <section id="kontakt" className="relative overflow-hidden py-20 text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="hover-tilt transform-3d rounded-2xl py-6 card-padding-x text-center mb-8 border border-white/12 backdrop-blur-md bg-white/5 shadow-lg shadow-black/10">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-ctm">
            {contactData.title || "Jetzt Kontakt aufnehmen"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-3xl mx-auto">
            {contactData.subtitle || "Wir sind für Sie da."}
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-start">
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
                {contactDetails.map(({ icon: Icon, title, entries }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="icon-3d icon-glow rounded-2xl p-3 text-yellow-300">
                      <Icon className="h-5 w-5" />
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
                  <h3 className="text-lg font-semibold text-white mb-1">Öffnungszeiten</h3>
                  <p className="text-sm text-white/60">Unsere Disposition ist zu diesen Zeiten besetzt.</p>
                </div>
                <div className="icon-3d icon-glow rounded-2xl p-3 text-yellow-300">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-white/80">
                {contactData.officeHours?.map(({ day, time }) => (
                  <div key={day} className="flex items-center justify-between rounded-xl bg-white/4 px-3 py-2">
                    <span>{day}</span>
                    <span className="text-white">{time}</span>
                  </div>
                ))}
              </div>
              {contactData.availability?.label && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-yellow-400/30 bg-yellow-500/10 px-3 py-2 text-sm font-semibold text-yellow-200">
                  <span>{contactData.availability.label}</span>
                  <span>{contactData.availability.status}</span>
                </div>
              )}
            </div>

            <div className="glass-strong hover-lift transform-3d rounded-3xl border border-white/12 py-7 card-padding-x shadow-xl shadow-black/35" style={{
              background: "linear-gradient(145deg, rgba(255,215,0,0.18), rgba(22,28,43,0.85))",
              backdropFilter: "blur(18px)"
            }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Impressum</h3>
                  <p className="text-sm text-white/60">Wichtige rechtliche Angaben auf einen Blick.</p>
                </div>
                <div className="icon-3d icon-glow rounded-2xl p-3 text-yellow-300">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-white/80">
                {(Array.isArray(contactData.imprint) ? contactData.imprint : []).map(({ label, value }) => (
                  <div key={label} className="rounded-xl bg-white/4 px-3 py-2">
                    <p className="font-semibold text-white">{label}</p>
                    <p className="mt-0.5 text-white/80">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}