"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShoppingCart, MessageCircle, Package, Star, CheckCircle, Camera } from "lucide-react";
import { getProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { getWhatsAppLink, SITE_CONFIG } from "@/lib/config";
import { SITE_IMAGES } from "@/lib/images";

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0) scale(1)";
          }
        });
      },
      { threshold: 0.08 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  const getOrderMessage = (product: Product) =>
    `Hello Unde Farm! I am interested in ordering *${product.name}* at ₹${product.price} ${product.unit}. Please confirm availability and delivery details.`;

  const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
    "Farm Fresh": { bg: "#e8f5e9", color: "#2d6a4f" },
    "Best Seller": { bg: "#fff3e0", color: "#e65100" },
    "Quality Pick": { bg: "#e3f2fd", color: "#1565c0" },
    Wholesale: { bg: "#f3e5f5", color: "#6a1b9a" },
  };

  return (
    <section
      id="products"
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #f0faf0 0%, #fefae0 100%)" }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ display: "inline-flex" }}>
            <Package size={14} />
            Our Products
          </div>
          <h2 className="section-title">Fresh from Our Farm</h2>
          <div className="divider-gold" style={{ margin: "20px auto" }} />
          <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center" }}>
            Premium Sitafal grown in Karjule Harya, Maharashtra. Order directly from the farm for the
            freshest custard apples.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {products.map((product, idx) => {
            const badgeStyle = BADGE_COLORS[product.badge || ""] || { bg: "#e8f5e9", color: "#2d6a4f" };
            return (
              <div
                key={product.id}
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className="card-premium"
                style={{
                  opacity: 0,
                  transform: "translateY(40px) scale(0.95)",
                  transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
                  transitionDelay: `${idx * 0.12}s`,
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: "relative",
                    height: "220px",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #f0faf0, #e8f5e9)",
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.08)")}
                    onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
                  />
                  {/* Badge */}
                  {product.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        padding: "4px 12px",
                        background: badgeStyle.bg,
                        color: badgeStyle.color,
                        borderRadius: "50px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {product.badge}
                    </div>
                  )}
                  {/* Availability */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "4px 10px",
                      background: product.isAvailable ? "#25D366" : "#e53935",
                      color: "white",
                      borderRadius: "50px",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  >
                    {product.isAvailable ? "✓ Available" : "Out of Stock"}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "22px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "var(--forest-green)",
                      marginBottom: "8px",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                      marginBottom: "14px",
                      minHeight: "65px",
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Features */}
                  <div style={{ marginBottom: "16px" }}>
                    {product.features.map((f) => (
                      <div
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.78rem",
                          color: "var(--mid-green)",
                          marginBottom: "4px",
                        }}
                      >
                        <CheckCircle size={12} color="#52b788" />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Price & Stock */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "8px",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.7rem",
                        fontWeight: 800,
                        color: "var(--forest-green)",
                        lineHeight: 1,
                      }}
                    >
                      ₹{product.price}
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{product.unit}</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: product.stock > 20 ? "#2d6a4f" : "#e65100",
                      fontWeight: 600,
                      marginBottom: "18px",
                    }}
                  >
                    {product.stock > 0
                      ? `Stock: ${product.stock} ${product.stockUnit} available`
                      : "Currently out of stock"}
                  </div>

                  {/* Rating */}
                  <div style={{ display: "flex", gap: "2px", marginBottom: "18px" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="#f4a535" color="#f4a535" />
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <a
                      href={getWhatsAppLink(SITE_CONFIG.whatsappPrimary, getOrderMessage(product))}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "11px",
                        background: product.isAvailable ? "var(--grad-golden)" : "#ccc",
                        color: "var(--forest-green)",
                        borderRadius: "12px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        pointerEvents: product.isAvailable ? "auto" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (product.isAvailable) {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 8px 20px rgba(244,165,53,0.4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <ShoppingCart size={14} />
                      Order Now
                    </a>
                    <a
                      href={getWhatsAppLink(SITE_CONFIG.whatsappPrimary, getOrderMessage(product))}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "42px",
                        background: "#25D366",
                        color: "white",
                        borderRadius: "12px",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <MessageCircle size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wholesale CTA */}
        <div
          style={{
            marginTop: "60px",
            padding: "48px",
            background: "var(--grad-green)",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            boxShadow: "var(--shadow-hover)",
          }}
        >
          <div>
            <h3
              className="font-display"
              style={{ fontSize: "1.8rem", fontWeight: 700, color: "white", marginBottom: "8px" }}
            >
              Bulk & Wholesale Orders
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "500px" }}>
              Are you a retailer, juice shop or business owner? Contact us directly for bulk pricing and
              wholesale Sitafal supply from our Karjule Harya farm.
            </p>
          </div>
          <a
            href={getWhatsAppLink(
              SITE_CONFIG.whatsappPrimary,
              "Hello Unde Farm, I am interested in a wholesale/bulk order for Sitafal. Please share your wholesale rates and minimum order quantity."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle size={18} />
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
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
