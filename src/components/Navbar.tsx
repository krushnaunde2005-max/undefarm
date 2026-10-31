"use client";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Leaf, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/config";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Farm", href: "#farm" },
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
    // Determine active section
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && window.scrollY >= el.offsetTop - 120) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled
            ? "rgba(10, 28, 18, 0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(116,198,157,0.15)" : "none",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, #52b788, #1a4a2e)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(82,183,136,0.4)",
              }}
            >
              <Leaf size={20} color="white" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  color: "white",
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                }}
              >
                UNDE FARM
              </div>
              <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em" }}>
                SITAFAL FARM
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  color:
                    activeSection === link.href.replace("#", "")
                      ? "#74c69d"
                      : "rgba(255,255,255,0.85)",
                  fontFamily: "var(--font-body)",
                  fontWeight: activeSection === link.href.replace("#", "") ? 600 : 500,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#74c69d";
                  e.currentTarget.style.background = "rgba(116,198,157,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    activeSection === link.href.replace("#", "")
                      ? "#74c69d"
                      : "rgba(255,255,255,0.85)";
                  e.currentTarget.style.background = "none";
                }}
              >
                {link.label}
              </button>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 20px",
                background: "#25D366",
                color: "white",
                borderRadius: "50px",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.88rem",
                textDecoration: "none",
                marginLeft: "12px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(37,211,102,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(37,211,102,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(37,211,102,0.35)";
              }}
            >
              <MessageCircle size={16} />
              Order on WhatsApp
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "white",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              background: "rgba(10, 28, 18, 0.98)",
              backdropFilter: "blur(20px)",
              padding: "20px 24px 30px",
              borderTop: "1px solid rgba(116,198,157,0.15)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  color: activeSection === link.href.replace("#", "") ? "#74c69d" : "rgba(255,255,255,0.85)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {link.label}
              </button>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}
            >
              <MessageCircle size={18} />
              Order on WhatsApp
            </a>
          </div>
        )}
      </nav>

      <style jsx>{`
        .desktop-nav {
          display: flex;
        }
        .mobile-menu-btn {
          display: none;
        }
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
