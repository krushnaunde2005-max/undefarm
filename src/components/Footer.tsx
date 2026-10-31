"use client";
import { Leaf, Phone, MessageCircle, MapPin, Mail, ChevronUp } from "lucide-react";
import { SITE_CONFIG, getWhatsAppLink } from "@/lib/config";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Our Farm", href: "#farm" },
    { label: "Products", href: "#products" },
    { label: "Gallery", href: "#gallery" },
    { label: "Farming Process", href: "#process" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <footer
      style={{
        background: "var(--deep-green)",
        borderTop: "1px solid rgba(116,198,157,0.15)",
        position: "relative",
      }}
    >
      {/* Scroll to top */}
      <div style={{ textAlign: "center", paddingTop: "0" }}>
        <button
          onClick={scrollToTop}
          id="scroll-to-top"
          aria-label="Scroll to top"
          style={{
            marginTop: "-24px",
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--grad-golden)",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-golden)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <ChevronUp size={22} color="var(--forest-green)" />
        </button>
      </div>

      <div className="container-custom" style={{ padding: "48px 24px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "linear-gradient(135deg, #52b788, #1a4a2e)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Leaf size={22} color="white" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "white",
                    letterSpacing: "0.05em",
                  }}
                >
                  UNDE FARM
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em" }}>
                  SITAFAL FARM, MAHARASHTRA
                </div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "24px", maxWidth: "340px" }}>
              Premium Sitafal (Custard Apple) grown with care in the fertile fields of Karjule Harya,
              Parner, Ahilyanagar, Maharashtra. Nature's sweetness, straight from our farm.
            </p>
            {/* Social / contact quick */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a
                href={`tel:${SITE_CONFIG.phone1}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50px",
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  transition: "all 0.2s",
                }}
              >
                <Phone size={13} />
                {SITE_CONFIG.phone1}
              </a>
              <a
                href={getWhatsAppLink(SITE_CONFIG.whatsappPrimary)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  background: "#25D366",
                  borderRadius: "50px",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
              >
                <MessageCircle size={13} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                color: "#74c69d",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(link.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#74c69d")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  >
                    › {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: "#74c69d",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <MapPin size={16} color="#74c69d" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  Karjule Harya, Parner,
                  <br />
                  Ahilyanagar, Maharashtra, India.
                </span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Phone size={16} color="#74c69d" style={{ flexShrink: 0 }} />
                <div>
                  <a
                    href={`tel:${SITE_CONFIG.phone1}`}
                    style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "block", fontSize: "0.88rem" }}
                  >
                    {SITE_CONFIG.phone1}
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.phone2}`}
                    style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "block", fontSize: "0.88rem" }}
                  >
                    {SITE_CONFIG.phone2}
                  </a>
                </div>
              </div>
            </div>

            {/* Admin link */}
            <a
              href="/admin"
              style={{
                display: "inline-block",
                marginTop: "24px",
                padding: "7px 16px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.78rem",
                textDecoration: "none",
              }}
            >
              🔒 Admin Panel
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>
            © 2024 Unde Farm. All rights reserved. | Karjule Harya, Parner, Ahilyanagar, Maharashtra.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "1rem" }}>🍈</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>
              Grown with ❤️ in Maharashtra
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: '2fr 1fr 1fr'"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
