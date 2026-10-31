"use client";
import { useEffect, useRef } from "react";
import { Leaf, TruckIcon, Users, Package } from "lucide-react";

const FEATURES = [
  {
    icon: "🌿",
    lucide: <Leaf size={28} color="#52b788" />,
    title: "Fresh Farm Harvest",
    description:
      "Every Sitafal is picked fresh from our Karjule Harya farm. No storage delays — you receive fruits at peak freshness and natural sweetness.",
    highlight: "Farm to Table",
    color: "rgba(82,183,136,0.1)",
    border: "rgba(82,183,136,0.3)",
  },
  {
    icon: "🏡",
    lucide: <Users size={28} color="#f4a535" />,
    title: "Natural Farming Experience",
    description:
      "Our Sitafal is grown using traditional farming methods in Maharashtra's natural environment — without harmful shortcuts to quality.",
    highlight: "Traditional Methods",
    color: "rgba(244,165,53,0.1)",
    border: "rgba(244,165,53,0.3)",
  },
  {
    icon: "🤝",
    lucide: <TruckIcon size={28} color="#3498db" />,
    title: "Direct Farm Connection",
    description:
      "Order directly from the farmers. Speak with us on WhatsApp or call to arrange your order. No middlemen means better prices for you.",
    highlight: "No Middlemen",
    color: "rgba(52,152,219,0.1)",
    border: "rgba(52,152,219,0.3)",
  },
  {
    icon: "📦",
    lucide: <Package size={28} color="#9b59b6" />,
    title: "Wholesale Enquiries",
    description:
      "We supply to retailers, juice shops, fruit vendors and bulk buyers. Contact us for wholesale rates and consistent supply from our farm.",
    highlight: "Bulk Available",
    color: "rgba(155,89,182,0.1)",
    border: "rgba(155,89,182,0.3)",
  },
];

export default function WhyChooseUs() {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #f0faf0 0%, #fefae0 100%)" }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ display: "inline-flex" }}>
            ⭐ Why Choose Us
          </div>
          <h2 className="section-title">Why Choose Unde Farm?</h2>
          <div className="divider-gold" style={{ margin: "20px auto" }} />
          <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center" }}>
            When you buy from Unde Farm, you're buying directly from the people who grow your food with
            care in Karjule Harya, Maharashtra.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.title}
              ref={(el) => {
                if (el) cardRefs.current[idx] = el;
              }}
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "36px 28px",
                boxShadow: "var(--shadow-card)",
                border: `1px solid ${feature.border}`,
                opacity: 0,
                transform: "translateY(40px)",
                transition: `all 0.6s ease ${idx * 0.15}s`,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "var(--shadow-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
              }}
            >
              {/* Background glow */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: feature.color.replace("0.1)", "0.8)"),
                  borderRadius: "4px 4px 0 0",
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: feature.color,
                  border: `2px solid ${feature.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: "2rem",
                }}
              >
                {feature.icon}
              </div>

              {/* Highlight badge */}
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 12px",
                  background: feature.color,
                  borderRadius: "50px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--forest-green)",
                  letterSpacing: "0.06em",
                  marginBottom: "14px",
                }}
              >
                {feature.highlight}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--forest-green)",
                  marginBottom: "12px",
                  lineHeight: 1.2,
                }}
              >
                {feature.title}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div
          style={{
            marginTop: "60px",
            textAlign: "center",
            padding: "48px",
            background: "linear-gradient(135deg, #fefae0, #f0faf0)",
            borderRadius: "24px",
            border: "1px solid rgba(82,183,136,0.2)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🍈</div>
          <h3
            className="font-display"
            style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--forest-green)", marginBottom: "12px" }}
          >
            Taste the Difference of Farm-Fresh Sitafal
          </h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px" }}>
            Ready to experience the natural sweetness of freshly harvested custard apples? Order today
            and taste the difference.
          </p>
          <a
            href="https://wa.me/917710947898?text=Hello%20Unde%20Farm%2C%20I%20am%20interested%20in%20purchasing%20fresh%20Sitafal.%20Please%20share%20product%20details%2C%20price%20and%20availability."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            🛒 Order Fresh Sitafal Now
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
