"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Sprout, TreePine, Shovel, Scissors, CheckSquare, Package } from "lucide-react";

const STEPS = [
  {
    step: 1,
    icon: <Sprout size={28} color="white" />,
    title: "Plantation",
    description:
      "Carefully selecting and planting Sitafal saplings in the fertile soil of Karjule Harya. Each tree is positioned for optimal sunlight and airflow.",
    image: "/farm_landscape.png",
    color: "#1a4a2e",
  },
  {
    step: 2,
    icon: <TreePine size={28} color="white" />,
    title: "Growing",
    description:
      "Our Sitafal trees grow naturally in Maharashtra's climate. Proper watering, spacing and care during the growing season ensures strong, healthy trees.",
    image: "/sitafal_tree.png",
    color: "#2d6a4f",
  },
  {
    step: 3,
    icon: <Shovel size={28} color="white" />,
    title: "Farm Care",
    description:
      "Regular farm maintenance — soil care, pruning and monitoring — ensures each tree receives the attention it needs to produce the best Sitafal.",
    image: "/farm_landscape.png",
    color: "#52b788",
  },
  {
    step: 4,
    icon: <Scissors size={28} color="white" />,
    title: "Harvesting",
    description:
      "At peak ripeness, our Sitafal fruits are carefully hand-harvested to avoid bruising. Each fruit is picked with gentle care to preserve its quality.",
    image: "/harvest_scene.png",
    color: "#f4a535",
  },
  {
    step: 5,
    icon: <CheckSquare size={28} color="white" />,
    title: "Quality Checking",
    description:
      "Every batch of Sitafal is individually checked for ripeness, size and condition. Only the best fruits make it to our customers.",
    image: "/sitafal_hero.png",
    color: "#e67e22",
  },
  {
    step: 6,
    icon: <Package size={28} color="white" />,
    title: "Packaging & Delivery",
    description:
      "Fruits are carefully packed to protect them during transport. We ensure they reach you fresh and in perfect condition from our farm.",
    image: "/sitafal_packaging.png",
    color: "#c0392b",
  },
];

export default function FarmingProcess() {
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateX(0) scale(1)";
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      className="section-padding"
      style={{
        background: "linear-gradient(135deg, #0f2d1c 0%, #1a4a2e 50%, #0f2d1c 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(82,183,136,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(244,165,53,0.06) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div
            className="section-label"
            style={{
              display: "inline-flex",
              background: "rgba(116,198,157,0.15)",
              color: "#74c69d",
            }}
          >
            🌱 From Seed to Table
          </div>
          <h2
            className="section-title"
            style={{ color: "white" }}
          >
            Our Farming Process
          </h2>
          <div className="divider-gold" style={{ margin: "20px auto" }} />
          <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
            From planting to packaging, every step is done with dedication and care at our Karjule Harya
            farm.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(to bottom, transparent, rgba(116,198,157,0.4), rgba(244,165,53,0.4), transparent)",
              transform: "translateX(-50%)",
            }}
          />

          {STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.step}
                ref={(el) => {
                  if (el) stepRefs.current[idx] = el;
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 1fr",
                  gap: "24px",
                  alignItems: "center",
                  marginBottom: idx < STEPS.length - 1 ? "48px" : 0,
                  opacity: 0,
                  transform: `translateX(${isEven ? "-40px" : "40px"}) scale(0.95)`,
                  transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${idx * 0.1}s`,
                }}
              >
                {/* Left side */}
                {isEven ? (
                  <div
                    className="glass-dark"
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      gridColumn: 1,
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr" }}>
                      <div style={{ position: "relative", height: "160px" }}>
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ padding: "24px" }}>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#74c69d",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            marginBottom: "6px",
                          }}
                        >
                          STEP {step.step}
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            color: "white",
                            marginBottom: "10px",
                          }}
                        >
                          {step.title}
                        </h3>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                {/* Center icon */}
                <div
                  style={{
                    gridColumn: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 0 4px rgba(255,255,255,0.1), 0 0 20px ${step.color}60`,
                      flexShrink: 0,
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Right side */}
                {!isEven ? (
                  <div
                    className="glass-dark"
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      gridColumn: 3,
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 180px" }}>
                      <div style={{ padding: "24px" }}>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#74c69d",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            marginBottom: "6px",
                          }}
                        >
                          STEP {step.step}
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            color: "white",
                            marginBottom: "10px",
                          }}
                        >
                          {step.title}
                        </h3>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                          {step.description}
                        </p>
                      </div>
                      <div style={{ position: "relative", height: "160px" }}>
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
