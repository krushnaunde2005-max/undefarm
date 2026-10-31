"use client";
import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { SITE_CONFIG, getWhatsAppLink } from "@/lib/config";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <div
        className="whatsapp-float"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "12px",
        }}
      >
        {/* Popup */}
        {isOpen && (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              width: "300px",
              overflow: "hidden",
              animation: "scale-in 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              transformOrigin: "bottom right",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "#25D366",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  🌿
                </div>
                <div>
                  <div style={{ color: "white", fontWeight: 700, fontSize: "0.95rem" }}>Unde Farm</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.75rem" }}>
                    🟢 Usually replies quickly
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Message bubble */}
            <div
              style={{
                padding: "20px",
                background: "#f0f4f3",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "12px 12px 12px 0",
                  padding: "12px 16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  fontSize: "0.88rem",
                  color: "#333",
                  lineHeight: 1.5,
                  marginBottom: "8px",
                }}
              >
                👋 Hello! Welcome to <strong>Unde Farm</strong>. We grow fresh Sitafal in Karjule Harya,
                Maharashtra. How can we help you?
              </div>
              <div style={{ fontSize: "0.72rem", color: "#999" }}>Unde Farm</div>
            </div>

            {/* Quick action buttons */}
            <div style={{ padding: "12px 20px 20px" }}>
              {[
                { label: "🍈 Order Fresh Sitafal", msg: "Hello Unde Farm, I want to order fresh Sitafal. Please share price and availability." },
                { label: "📦 Wholesale Enquiry", msg: "Hello Unde Farm, I am interested in wholesale/bulk Sitafal. Please share wholesale rates." },
                { label: "❓ General Question", msg: SITE_CONFIG.whatsappMessage },
              ].map((action) => (
                <a
                  key={action.label}
                  href={getWhatsAppLink(SITE_CONFIG.whatsappPrimary, action.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: "#f8fffe",
                    border: "1px solid #e0f5ea",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: "#1a4a2e",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: "8px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#e8f5e9";
                    e.currentTarget.style.borderColor = "#25D366";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f8fffe";
                    e.currentTarget.style.borderColor = "#e0f5ea";
                  }}
                >
                  {action.label}
                  <Send size={13} color="#25D366" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="whatsapp-fab"
          aria-label="WhatsApp Unde Farm"
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#25D366",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 30px rgba(37,211,102,0.5)",
            position: "relative",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,211,102,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.5)";
          }}
        >
          <MessageCircle size={28} color="white" fill="white" />
          {/* Ripple indicator */}
          {!isOpen && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid rgba(37,211,102,0.6)",
                animation: "ripple 2s linear infinite",
              }}
            />
          )}
        </button>
      </div>
    </>
  );
}
