const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, maxLength = 4000) {
  return String(value || "").trim().slice(0, maxLength);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Método no permitido." });
  }

  const { name, company, email, phone, interest, subject, message, website } = request.body || {};
  if (clean(website)) return response.status(200).json({ ok: true });

  const payload = {
    name: clean(name, 120),
    company: clean(company, 160),
    email: clean(email, 200),
    phone: clean(phone, 80),
    interest: clean(interest, 160),
    subject: clean(subject, 180),
    message: clean(message, 6000),
  };

  if (!payload.name || !EMAIL_PATTERN.test(payload.email) || !payload.message) {
    return response.status(400).json({ error: "Complete el nombre, un correo válido y el mensaje." });
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(503).json({ error: "El envío todavía no está habilitado. Escríbanos por WhatsApp." });
  }

  const to = process.env.CONTACT_TO_EMAIL || "contacto@bojautomatizacion.com";
  const from = process.env.CONTACT_FROM_EMAIL || "BOJ Web <onboarding@resend.dev>";
  const lines = [
    `Nombre: ${payload.name}`,
    `Empresa: ${payload.company || "No indicada"}`,
    `Email: ${payload.email}`,
    `Teléfono: ${payload.phone || "No indicado"}`,
    `Interés: ${payload.interest || "Consulta general"}`,
    "",
    payload.message,
  ];

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: payload.subject || "Nueva consulta desde la web BOJ",
        text: lines.join("\n"),
      }),
    });

    if (!resendResponse.ok) throw new Error("Resend rechazó el envío.");
    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ error: "No se pudo enviar la consulta. Intente por WhatsApp." });
  }
}
