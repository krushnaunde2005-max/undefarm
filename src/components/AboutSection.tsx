"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Leaf, Sun, Heart, Shield, Users, Camera } from "lucide-react";
import { SITE_IMAGES } from "@/lib/images";

const ABOUT_CARDS = [
  {
    icon: <Leaf size={22} color="#52b788" />,
    title: "Our Farming Story",
    body: "Unde Farm is a family agricultural venture rooted in the fertile lands of Karjule Harya. We began with a deep love for the land and a commitment to growing fresh, natural Sitafal for families across Maharashtra.",
  },
  {
    icon: <MapPin size={22} color="#52b788" />,
    title: "Our Village",
    body: "Nestled in Karjule Harya village, Parner Taluka, Ahilyanagar district — our farm benefits from Maharashtra's rich agricultural soil, clean air and ideal climate for growing Sitafal.",
  },
  {
    icon: <Sun size={22} color="#52b788" />,
    title: "Our Farm",
    body: "Our custard apple orchard is carefully maintained with traditional farming knowledge. Each tree receives personal attention, from soil preparation through to harvest season.",
  },
  {
    icon: <Heart size={22} color="#52b788" />,
    title: "Our Vision",
    body: "To connect farm-fresh Sitafal directly with families, retailers and juice shops — eliminating middlemen and ensuring you get the freshest custard apples at fair prices.",
  },
  {
    icon: <Shield size={22} color="#52b788" />,
    title: "Our Commitment",
    body: "We are committed to quality. Every Sitafal leaving our farm is checked for ripeness, size and sweetness. We take pride in delivering what we would serve our own family.",
  },
  {
    icon: <Users size={22} color="#52b788" />,
    title: "Direct Connection",
    body: "Order directly from the farmers. No middlemen, no delays. Call or WhatsApp us and we'll arrange fresh Sitafal delivery straight from Karjule Harya to you.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #fefae0 0%, #f0faf0 100%)" }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <div className="section-label" style={{ display: "inline-flex" }}>
            <Leaf size={14} />
            About Unde Farm
          </div>
          <h2 className="section-title">Welcome to Unde Farm</h2>
          <div className="divider-gold" style={{ margin: "20px auto" }} />
          <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center" }}>
            Located in the beautiful village of Karjule Harya, Parner, Ahilyanagar, Maharashtra, Unde Farm is
            dedicated to cultivating and sharing the natural taste of fresh Sitafal.
          </p>
        </div>

        {/* Main About Block */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
            marginBottom: "80px",
          }}
          id="farm"
        >
          {/* Image Side */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 30px 80px rgba(26,74,46,0.2)",
                animation: "float-3 8s ease-in-out infinite",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <Image
                src={SITE_IMAGES.aboutFarm}
                alt="Unde Farm – Karjule Harya, Parner, Ahilyanagar"
                width={600}
                height={450}
                style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.6s ease" }}
              />
              {/* Real Photo badge overlay */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 12px",
                  background: "rgba(10,28,18,0.8)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "50px",
                  border: "1px solid rgba(116,198,157,0.3)",
                }}
              >
                <Camera size={11} color="#74c69d" />
                <span style={{ color: "#74c69d", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em" }}>
                  OUR REAL FARM
                </span>
              </div>
            </div>
            {/* Floating info card */}
            <div
              className="glass-light"
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                borderRadius: "20px",
                padding: "20px 24px",
                textAlign: "center",
                minWidth: "160px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--forest-green)",
                  lineHeight: 1,
                }}
              >
                🍈
              </div>
              <div style={{ fontWeight: 700, color: "var(--forest-green)", marginTop: "6px" }}>
                Sitafal Farm
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Karjule Harya, MH</div>
            </div>

            {/* Decorative element */}
            <div
              style={{
                position: "absolute",
                top: "-15px",
                left: "-15px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "2px dashed rgba(82,183,136,0.4)",
                animation: "rotate-slow 20s linear infinite",
              }}
            />
          </div>

          {/* Text Side */}
          <div>
            <div className="section-label" style={{ display: "inline-flex" }}>
              <MapPin size={14} />
              Karjule Harya, Parner, Ahilyanagar
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: "2.2rem",
                fontWeight: 700,
                color: "var(--forest-green)",
                lineHeight: 1.2,
                marginBottom: "20px",
              }}
            >
              Grown with Love,
              <br />
              <span className="text-gradient-green">Delivered with Pride</span>
            </h3>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "16px" }}>
              At Unde Farm, we believe that the best food comes from the simplest places — our own village,
              our own farm, our own hands. Every Sitafal we grow carries the warmth of Karjule Harya's
              fertile soil.
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "32px" }}>
              We welcome wholesale buyers, retail customers and families who want to experience truly
              fresh, naturally-grown custard apples directly from the source.
            </p>

            {/* Contact quick links */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="tel:7710947898"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  background: "var(--forest-green)",
                  color: "white",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                }}
              >
                📞 7710947898
              </a>
              <a
                href="tel:9702554471"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  background: "var(--mid-green)",
                  color: "white",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                }}
              >
                📞 9702554471
              </a>
            </div>
          </div>
        </div>

        {/* About Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {ABOUT_CARDS.map((card, idx) => (
            <div
              key={card.title}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "var(--shadow-card)",
                transition: "all 0.5s ease",
                opacity: 0,
                transform: "translateY(30px)",
                transitionDelay: `${idx * 0.1}s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "var(--shadow-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "rgba(82,183,136,0.1)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                {card.icon}
              </div>
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "var(--forest-green)",
                  marginBottom: "10px",
                }}
              >
                {card.title}
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
