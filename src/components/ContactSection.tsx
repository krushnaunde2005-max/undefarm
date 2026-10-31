"use client";
import { useState, useRef } from "react";
import { Phone, MessageCircle, MapPin, Send, CheckCircle } from "lucide-react";
import { saveEnquiry } from "@/lib/data";
import { SITE_CONFIG, getWhatsAppLink } from "@/lib/config";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    type: "general" as "general" | "wholesale" | "order",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async save
    await new Promise((r) => setTimeout(r, 600));
    saveEnquiry(form);
    setSubmitted(true);
    setLoading(false);
    setForm({ name: "", phone: "", email: "", message: "", type: "general" });
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "linear-gradient(135deg, #0f2d1c 0%, #1a4a2e 100%)" }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            className="section-label"
            style={{ display: "inline-flex", background: "rgba(116,198,157,0.15)", color: "#74c69d" }}
          >
            <Phone size={14} />
            Get In Touch
          </div>
          <h2 className="section-title" style={{ color: "white" }}>
            Contact Unde Farm
          </h2>
          <div className="divider-gold" style={{ margin: "20px auto" }} />
          <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
            Reach out for orders, wholesale enquiries or any questions about our Sitafal.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Left: Contact Info */}
          <div>
            {/* Business card */}
            <div
              className="glass-dark"
              style={{ borderRadius: "24px", padding: "36px", marginBottom: "24px" }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🌿</div>
              <h3
                className="font-display"
                style={{ fontSize: "1.8rem", fontWeight: 700, color: "white", marginBottom: "8px" }}
              >
                UNDE FARM
              </h3>
              <p style={{ color: "#74c69d", fontWeight: 500, marginBottom: "20px" }}>
                Sitafal (Custard Apple) Farm
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <MapPin size={18} color="#74c69d" style={{ marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <div style={{ color: "white", fontWeight: 600, marginBottom: "2px" }}>Address</div>
                    <div style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                      Karjule Harya, Parner,
                      <br />
                      Ahilyanagar, Maharashtra, India.
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Phone size={18} color="#74c69d" style={{ marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <div style={{ color: "white", fontWeight: 600, marginBottom: "8px" }}>Phone Numbers</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <a
                        href={`tel:${SITE_CONFIG.phone1}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#74c69d",
                          textDecoration: "none",
                          fontWeight: 600,
                          fontSize: "1.05rem",
                          transition: "color 0.2s",
                        }}
                      >
                        📞 {SITE_CONFIG.phone1}
                        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>(Click to call)</span>
                      </a>
                      <a
                        href={`tel:${SITE_CONFIG.phone2}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#74c69d",
                          textDecoration: "none",
                          fontWeight: 600,
                          fontSize: "1.05rem",
                          transition: "color 0.2s",
                        }}
                      >
                        📞 {SITE_CONFIG.phone2}
                        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>(Click to call)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              <a
                href={getWhatsAppLink(SITE_CONFIG.whatsappPrimary)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ justifyContent: "center" }}
              >
                <MessageCircle size={18} />
                WhatsApp: {SITE_CONFIG.phone1}
              </a>
              <a
                href={getWhatsAppLink(SITE_CONFIG.whatsappSecondary)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ justifyContent: "center", background: "#128C7E" }}
              >
                <MessageCircle size={18} />
                WhatsApp: {SITE_CONFIG.phone2}
              </a>
            </div>

            {/* Map placeholder */}
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(116,198,157,0.15)",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <MapPin size={36} color="#74c69d" />
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "white", fontWeight: 600 }}>Karjule Harya, Parner</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Ahilyanagar, Maharashtra</div>
              </div>
              <a
                href="https://maps.google.com/?q=Karjule+Harya,Parner,Ahilyanagar,Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "8px 20px",
                  background: "rgba(116,198,157,0.2)",
                  color: "#74c69d",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "1px solid rgba(116,198,157,0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="glass-dark" style={{ borderRadius: "24px", padding: "36px" }}>
            <h3
              className="font-display"
              style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: "8px" }}
            >
              Send Enquiry
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "28px" }}>
              Fill in the form and we will get back to you shortly.
            </p>

            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <CheckCircle size={56} color="#25D366" />
                <div style={{ color: "white", fontWeight: 700, fontSize: "1.2rem" }}>
                  Enquiry Sent!
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                  Thank you for reaching out. We will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: "12px",
                    padding: "10px 24px",
                    background: "rgba(116,198,157,0.2)",
                    color: "#74c69d",
                    border: "1px solid rgba(116,198,157,0.3)",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Enquiry type */}
                <div>
                  <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "8px", display: "block" }}>
                    Enquiry Type
                  </label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {(["general", "wholesale", "order"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, type: t })}
                        style={{
                          padding: "7px 18px",
                          borderRadius: "50px",
                          border: "1px solid",
                          borderColor: form.type === t ? "#74c69d" : "rgba(255,255,255,0.15)",
                          background: form.type === t ? "rgba(116,198,157,0.15)" : "transparent",
                          color: form.type === t ? "#74c69d" : "rgba(255,255,255,0.6)",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          textTransform: "capitalize",
                        }}
                      >
                        {t === "general" ? "General" : t === "wholesale" ? "Wholesale" : "Order"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input fields */}
                {[
                  { key: "name", label: "Your Name *", type: "text", placeholder: "Enter your name", required: true },
                  { key: "phone", label: "Phone Number *", type: "tel", placeholder: "Your phone number", required: true },
                  { key: "email", label: "Email (Optional)", type: "email", placeholder: "Your email address", required: false },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "6px", display: "block" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form] as string}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "12px",
                        color: "white",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(116,198,157,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                ))}

                {/* Message */}
                <div>
                  <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "6px", display: "block" }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your requirements — quantity, delivery location, etc."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "12px",
                      color: "white",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(116,198,157,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", marginTop: "4px" }}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={16} />
                      Send Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
