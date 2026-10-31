"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/data";
import { GalleryImage } from "@/lib/types";

const CATEGORIES = [
  { id: "all", label: "All Photos" },
  { id: "fruits", label: "Sitafal Fruits" },
  { id: "farm", label: "Our Farm" },
  { id: "harvest", label: "Harvest" },
  { id: "packaging", label: "Packaging" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [filtered, setFiltered] = useState<GalleryImage[]>(GALLERY_IMAGES);
  const imgRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setFiltered(
      activeCategory === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory)
    );
  }, [activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "scale(1)";
          }
        });
      },
      { threshold: 0.05 }
    );
    imgRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filtered]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i! + 1) % filtered.length);
      if (e.key === "ArrowLeft")
        setLightboxIdx((i) => (i! - 1 + filtered.length) % filtered.length);
      if (e.key === "Escape") setLightboxIdx(null);
    },
    [lightboxIdx, filtered.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Masonry-like heights
  const getHeight = (idx: number) => {
    const heights = [280, 340, 260, 320, 300, 360, 280, 310];
    return heights[idx % heights.length];
  };

  return (
    <section
      id="gallery"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #fefae0 0%, #f0faf0 100%)" }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="section-label" style={{ display: "inline-flex" }}>
            📸 Farm Gallery
          </div>
          <h2 className="section-title">Life at Unde Farm</h2>
          <div className="divider-gold" style={{ margin: "20px auto" }} />
          <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center" }}>
            A visual journey through our Sitafal orchard in Karjule Harya — from blossom to your table.
          </p>
        </div>

        {/* Category filters */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "9px 22px",
                borderRadius: "50px",
                border: "2px solid",
                borderColor: activeCategory === cat.id ? "var(--forest-green)" : "rgba(26,74,46,0.2)",
                background: activeCategory === cat.id ? "var(--forest-green)" : "transparent",
                color: activeCategory === cat.id ? "white" : "var(--forest-green)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div
          style={{
            columns: "4",
            columnGap: "16px",
          }}
        >
          {filtered.map((img, idx) => (
            <div
              key={img.id}
              ref={(el) => {
                if (el) imgRefs.current[idx] = el;
              }}
              onClick={() => setLightboxIdx(idx)}
              style={{
                position: "relative",
                height: getHeight(idx),
                borderRadius: "16px",
                overflow: "hidden",
                marginBottom: "16px",
                breakInside: "avoid",
                cursor: "pointer",
                opacity: 0,
                transform: "scale(0.95)",
                transition: `all 0.5s ease ${idx * 0.07}s`,
                boxShadow: "var(--shadow-card)",
              }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector(".gallery-overlay") as HTMLElement;
                if (overlay) overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector(".gallery-overlay") as HTMLElement;
                if (overlay) overlay.style.opacity = "0";
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
              />
              <div
                className="gallery-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(15,45,28,0.7)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <ZoomIn size={32} color="white" />
                {img.caption && (
                  <span
                    style={{
                      color: "white",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textAlign: "center",
                      padding: "0 16px",
                    }}
                  >
                    {img.caption}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setLightboxIdx(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIdx(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: 44,
              height: 44,
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <X size={22} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((i) => (i! - 1 + filtered.length) % filtered.length);
            }}
            style={{
              position: "absolute",
              left: "20px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: 50,
              height: 50,
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronLeft size={26} />
          </button>

          {/* Image */}
          <div
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh", borderRadius: "16px", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].alt}
              width={1000}
              height={700}
              style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain" }}
            />
            {filtered[lightboxIdx].caption && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "16px",
                  background: "rgba(0,0,0,0.7)",
                  color: "white",
                  textAlign: "center",
                  fontSize: "0.9rem",
                }}
              >
                {filtered[lightboxIdx].caption}
              </div>
            )}
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((i) => (i! + 1) % filtered.length);
            }}
            style={{
              position: "absolute",
              right: "20px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: 50,
              height: 50,
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronRight size={26} />
          </button>

          {/* Counter */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
            }}
          >
            {lightboxIdx + 1} / {filtered.length}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="columns: '4'"] {
            columns: 2 !important;
          }
        }
        @media (max-width: 500px) {
          div[style*="columns: '4'"] {
            columns: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
