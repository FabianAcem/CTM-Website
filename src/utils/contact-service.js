const sanitizePhoneForHref = (phone) => {
  if (!phone) return null;
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
};

const buildDefaultEndpoint = (recipient) => {
  if (!recipient) {
    return null;
  }
  const encoded = encodeURIComponent(recipient.trim());
  return `https://formsubmit.co/ajax/${encoded}`;
};

/**
 * Sends a contact inquiry to the configured endpoint.
 * Falls back to formsubmit.co if no custom endpoint is provided.
 * @param {{
 *  name: string,
 *  company?: string,
 *  email: string,
 *  phone?: string,
 *  message: string,
 *  source?: string
 * }} payload
 * @param {{
 *  recipient?: string,
 *  cc?: string[],
 *  endpoint?: string,
 *  headers?: Record<string,string>
 * }} options
 */
export async function sendContactEmail(payload, options = {}) {
  const { recipient, cc = [], endpoint, headers = {} } = options;
  const resolvedEndpoint = endpoint || import.meta.env?.VITE_CONTACT_ENDPOINT || buildDefaultEndpoint(recipient);

  if (!resolvedEndpoint) {
    throw new Error("Kein Kontakt-Endpunkt konfiguriert. Bitte setzen Sie VITE_CONTACT_ENDPOINT oder hinterlegen Sie einen Empfänger.");
  }

  const body = {
    name: payload.name,
    company: payload.company,
    email: payload.email,
    phone: payload.phone,
    message: payload.message,
    source: payload.source,
    _subject: `Neue Kontaktanfrage von ${payload.name || "Webseite"}`,
    _replyto: payload.email,
    _template: "table",
  };

  if (cc?.length) {
    body._cc = cc.join(",");
  }

  const response = await fetch(resolvedEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Kontaktanfrage konnte nicht gesendet werden.");
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return null;
}

export { sanitizePhoneForHref };
