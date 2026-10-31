"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, MessageCircle, Star, Leaf, Camera } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/config";
import { SITE_IMAGES, OWN_PHOTOS } from "@/lib/images";

// Each floating element's config
const FLOATING_FRUITS = [
  { id: 1, x: 5, y: 15, size: 90, animDur: 6, animDel: 0, opacity: 0.5, blur: 2 },
  { id: 2, x: 12, y: 65, size: 70, animDur: 8, animDel: 1.2, opacity: 0.45, blur: 1 },
  { id: 3, x: 20, y: 30, size: 55, animDur: 7, animDel: 2, opacity: 0.35, blur: 3 },
  { id: 4, x: 75, y: 10, size: 65, animDur: 9, animDel: 0.5, opacity: 0.4, blur: 2 },
  { id: 5, x: 85, y: 55, size: 80, animDur: 7.5, animDel: 1.8, opacity: 0.35, blur: 4 },
  { id: 6, x: 60, y: 75, size: 50, animDur: 6.5, animDel: 3, opacity: 0.3, blur: 2 },
  { id: 7, x: 45, y: 8, size: 60, animDur: 8.5, animDel: 0.8, opacity: 0.25, blur: 5 },
  { id: 8, x: 92, y: 25, size: 45, animDur: 10, animDel: 2.5, opacity: 0.3, blur: 3 },
];

const FLOATING_LEAVES = [
  { id: 1, x: 8, y: 40, size: 40, animDur: 5, animDel: 0, rotate: 20 },
  { id: 2, x: 30, y: 80, size: 30, animDur: 6, animDel: 1, rotate: -15 },
  { id: 3, x: 70, y: 15, size: 35, animDur: 7, animDel: 2, rotate: 45 },
  { id: 4, x: 88, y: 70, size: 28, animDur: 5.5, animDel: 0.5, rotate: -30 },
  { id: 5, x: 52, y: 88, size: 32, animDur: 6.5, animDel: 1.5, rotate: 10 },
  { id: 6, x: 15, y: 88, size: 26, animDur: 8, animDel: 3, rotate: -20 },
];

// Fixed particle data — no Math.random() at module level to avoid SSR mismatch
const PARTICLE_SEEDS = [
  { id: 0, x: 12, y: 22, size: 4, dur: 5, del: 0, op: 0.25 },
  { id: 1, x: 28, y: 65, size: 3, dur: 7, del: 1, op: 0.2 },
  { id: 2, x: 45, y: 10, size: 5, dur: 4, del: 2, op: 0.3 },
  { id: 3, x: 62, y: 80, size: 3, dur: 6, del: 0.5, op: 0.2 },
  { id: 4, x: 78, y: 35, size: 4, dur: 8, del: 1.5, op: 0.25 },
  { id: 5, x: 90, y: 58, size: 3, dur: 5, del: 3, op: 0.2 },
  { id: 6, x: 35, y: 42, size: 5, dur: 7, del: 0.8, op: 0.3 },
  { id: 7, x: 55, y: 90, size: 4, dur: 6, del: 2.2, op: 0.2 },
  { id: 8, x: 8, y: 75, size: 3, dur: 9, del: 1.8, op: 0.25 },
  { id: 9, x: 70, y: 18, size: 4, dur: 5, del: 4, op: 0.2 },
  { id: 10, x: 22, y: 50, size: 3, dur: 7, del: 0.3, op: 0.15 },
  { id: 11, x: 48, y: 30, size: 5, dur: 6, del: 2.8, op: 0.2 },
  { id: 12, x: 85, y: 85, size: 3, dur: 8, del: 1.2, op: 0.25 },
  { id: 13, x: 15, y: 5, size: 4, dur: 5, del: 3.5, op: 0.2 },
  { id: 14, x: 95, y: 45, size: 3, dur: 7, del: 0.7, op: 0.15 },
  { id: 15, x: 40, y: 70, size: 5, dur: 6, del: 2.5, op: 0.2 },
  { id: 16, x: 72, y: 60, size: 4, dur: 9, del: 1.0, op: 0.25 },
  { id: 17, x: 58, y: 15, size: 3, dur: 5, del: 4.2, op: 0.2 },
  { id: 18, x: 30, y: 95, size: 4, dur: 7, del: 0.5, op: 0.15 },
  { id: 19, x: 82, y: 5, size: 5, dur: 6, del: 2.0, op: 0.2 },
];

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, [handleMouseMove, handleScroll]);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--grad-hero)",
      }}
    >
      {/* Radial gradient overlays for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(45,106,79,0.4) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 50%, rgba(15,45,28,0.6) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Animated sunlight rays */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "-20%",
              left: `${10 + i * 18}%`,
              width: "2px",
              height: "140%",
              background: `linear-gradient(to bottom, rgba(244,165,53,${0.06 - i * 0.01}), transparent)`,
              transform: `rotate(${-10 + i * 4}deg)`,
              transformOrigin: "top center",
              animation: `leaf-sway ${4 + i}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {PARTICLE_SEEDS.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(244, 165, 53, ${p.op})`,
              animation: `particle-rise ${p.dur}s ease-out infinite`,
              animationDelay: `${p.del}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Background Fruits */}
      <div
        ref={parallaxRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -10}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {FLOATING_FRUITS.map((fruit, idx) => (
          <div
            key={fruit.id}
            style={{
              position: "absolute",
              left: `${fruit.x}%`,
              top: `${fruit.y}%`,
              width: fruit.size,
              height: fruit.size,
              opacity: fruit.opacity,
              filter: `blur(${fruit.blur}px)`,
              animation: `float-${(idx % 4) + 1} ${fruit.animDur}s ease-in-out infinite`,
              animationDelay: `${fruit.animDel}s`,
              transform: `translate(${mousePos.x * (10 + idx * 3)}px, ${mousePos.y * (8 + idx * 2)}px)`,
            }}
          >
            <Image
              src={idx % 3 === 0 ? OWN_PHOTOS.freshSitafalHand : SITE_IMAGES.heroFloat}
              alt="Sitafal fruit"
              width={fruit.size}
              height={fruit.size}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              priority={fruit.id <= 2}
            />
          </div>
        ))}

        {/* Floating Leaves */}
        {FLOATING_LEAVES.map((leaf) => (
          <div
            key={leaf.id}
            style={{
              position: "absolute",
              left: `${leaf.x}%`,
              top: `${leaf.y}%`,
              animation: `leaf-sway ${leaf.animDur}s ease-in-out infinite alternate`,
              animationDelay: `${leaf.animDel}s`,
              opacity: 0.35,
              transform: `rotate(${leaf.rotate}deg)`,
            }}
          >
            <Leaf size={leaf.size} color="#74c69d" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div
        className="container-custom"
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
          paddingTop: "100px",
          paddingBottom: "60px",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* Left: Text Content */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              background: "rgba(244,165,53,0.15)",
              border: "1px solid rgba(244,165,53,0.3)",
              borderRadius: "50px",
              marginBottom: "24px",
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            <Star size={14} fill="#f4a535" color="#f4a535" />
            <span style={{ color: "#f4a535", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.1em" }}>
              KARJULE HARYA, MAHARASHTRA
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1,
              marginBottom: "16px",
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0) skewY(0)" : "translateY(40px) skewY(2deg)",
              transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s",
            }}
          >
            UNDE{" "}
            <span
              style={{
                display: "block",
                background: "linear-gradient(135deg, #74c69d, #b7e4c7, #52b788)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              FARM
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="font-display"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              color: "#f4a535",
              fontStyle: "italic",
              marginBottom: "20px",
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.8s ease 0.4s",
            }}
          >
            "Nature's Sweetness, Straight From Our Farm."
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.8,
              marginBottom: "40px",
              maxWidth: "480px",
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.5s",
            }}
          >
            Fresh Sitafal Grown With Care in Karjule Harya, Maharashtra.{" "}
            <strong style={{ color: "#b7e4c7" }}>
              Experience the Natural Taste of Our Village Farms.
            </strong>
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.6s",
            }}
          >
            <button onClick={scrollToProducts} className="btn-primary">
              🍈 Explore Our Sitafal
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={18} />
              Order on WhatsApp
            </a>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "48px",
              opacity: isLoaded ? 1 : 0,
              transition: "all 0.7s ease 0.8s",
            }}
          >
            {[
              { label: "Village Farm", value: "Our Home" },
              { label: "Natural Farming", value: "100%" },
              { label: "Direct to You", value: "Farm Fresh" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#f4a535",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginTop: "4px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hero Fruit */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateX(0) scale(1)" : "translateX(60px) scale(0.9)",
            transition: "all 1s cubic-bezier(0.34,1.56,0.64,1) 0.3s",
          }}
        >
          {/* Glow ring */}
          <div
            style={{
              position: "absolute",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(82,183,136,0.25) 0%, rgba(26,74,46,0.1) 50%, transparent 70%)",
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          />
          {/* Rotating ring */}
          <div
            style={{
              position: "absolute",
              width: "380px",
              height: "380px",
              borderRadius: "50%",
              border: "1px dashed rgba(116,198,157,0.25)",
              animation: "rotate-slow 20s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "340px",
              height: "340px",
              borderRadius: "50%",
              border: "1px dashed rgba(244,165,53,0.2)",
              animation: "rotate-slow-rev 15s linear infinite",
            }}
          />

          {/* Main Fruit — real farm photo with parallax */}
          <div
            style={{
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 4px rgba(116,198,157,0.3), inset 0 0 0 2px rgba(244,165,53,0.2)",
              animation: "float-3 6s ease-in-out infinite",
              transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -15}px)`,
              transition: "transform 0.15s ease-out",
              flexShrink: 0,
            }}
          >
            <Image
              src={OWN_PHOTOS.freshSitafalHand}
              alt="Fresh Sitafal hand-picked at Unde Farm, Karjule Harya"
              width={320}
              height={320}
              style={{ objectFit: "cover", width: "100%", height: "100%", transition: "transform 0.5s ease" }}
              priority
            />
          </div>

          {/* Floating mini badge */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "-20px",
              background: "rgba(10,28,18,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(116,198,157,0.25)",
              borderRadius: "16px",
              padding: "12px 18px",
              animation: "float-2 7s ease-in-out infinite",
              animationDelay: "1s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>
              <Camera size={10} color="#74c69d" />
              Real Farm Photo
            </div>
            <div style={{ color: "#f4a535", fontWeight: 700, fontSize: "0.95rem" }}>Sitafal 🍈</div>
          </div>

          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "-30px",
              background: "rgba(244,165,53,0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(244,165,53,0.3)",
              borderRadius: "16px",
              padding: "10px 16px",
              animation: "float-1 8s ease-in-out infinite",
              animationDelay: "2s",
            }}
          >
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>Location</div>
            <div style={{ color: "white", fontWeight: 600, fontSize: "0.85rem" }}>Karjule Harya, MH 🌿</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          zIndex: 10,
          animation: "float-1 2s ease-in-out infinite",
        }}
        aria-label="Scroll down"
      >
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>SCROLL</span>
        <ChevronDown size={20} />
      </button>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, #fefae0)",
          pointerEvents: "none",
        }}
      />

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
