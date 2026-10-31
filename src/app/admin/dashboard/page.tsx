"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Leaf, Plus, Edit, Trash2, Save, X, Package, Users, MessageSquare,
  LogOut, CheckCircle, XCircle, Eye, BarChart3, Settings
} from "lucide-react";
import { getProducts, saveProducts, getEnquiries, updateEnquiryStatus } from "@/lib/data";
import { Product, Enquiry } from "@/lib/types";

type Tab = "overview" | "products" | "enquiries" | "settings";

const EMPTY_PRODUCT: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  unit: "per kg",
  stock: 0,
  stockUnit: "kg",
  image: "/sitafal_product.png",
  badge: "",
  isAvailable: true,
  features: [""],
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [products, setProducts] = useState<Product[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(EMPTY_PRODUCT);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    // Auth check
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("undeFarm_admin");
      if (auth !== "authenticated") {
        router.push("/admin");
        return;
      }
    }
    setProducts(getProducts());
    setEnquiries(getEnquiries());
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("undeFarm_admin");
    router.push("/admin");
  };

  const showSaveMsg = (msg: string) => {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(""), 2500);
  };

  // Product operations
  const handleSaveProduct = (product: Product) => {
    const updated = products.map((p) => (p.id === product.id ? product : p));
    saveProducts(updated);
    setProducts(updated);
    setEditingProduct(null);
    showSaveMsg("✅ Product updated successfully!");
  };

  const handleAddProduct = () => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      features: newProduct.features.filter(Boolean),
    };
    const updated = [...products, product];
    saveProducts(updated);
    setProducts(updated);
    setIsAddingProduct(false);
    setNewProduct(EMPTY_PRODUCT);
    showSaveMsg("✅ Product added successfully!");
  };

  const handleDeleteProduct = (id: string) => {
    if (!confirm("Delete this product?")) return;
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    setProducts(updated);
    showSaveMsg("🗑️ Product deleted.");
  };

  const handleEnquiryStatus = (id: string, status: Enquiry["status"]) => {
    updateEnquiryStatus(id, status);
    setEnquiries(getEnquiries());
  };

  const newEnquiries = enquiries.filter((e) => e.status === "new").length;

  // Sidebar
  const TABS: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "overview", label: "Overview", icon: <BarChart3 size={18} /> },
    { id: "products", label: "Products", icon: <Package size={18} />, badge: products.length },
    { id: "enquiries", label: "Enquiries", icon: <MessageSquare size={18} />, badge: newEnquiries || undefined },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8faf8",
        fontFamily: "var(--font-body)",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "var(--deep-green)",
          borderRight: "1px solid rgba(116,198,157,0.15)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #52b788, #1a4a2e)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Leaf size={18} color="white" />
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", fontFamily: "var(--font-display)" }}>
                UNDE FARM
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                padding: "11px 14px",
                marginBottom: "4px",
                borderRadius: "10px",
                border: "none",
                background: activeTab === tab.id ? "rgba(82,183,136,0.15)" : "transparent",
                color: activeTab === tab.id ? "#74c69d" : "rgba(255,255,255,0.6)",
                fontFamily: "var(--font-body)",
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: "0.9rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {tab.icon}
                {tab.label}
              </span>
              {tab.badge !== undefined && (
                <span
                  style={{
                    background: tab.id === "enquiries" ? "#e74c3c" : "rgba(116,198,157,0.2)",
                    color: tab.id === "enquiries" ? "white" : "#74c69d",
                    borderRadius: "50px",
                    padding: "1px 8px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(231,76,60,0.1)",
              color: "#e74c3c",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <LogOut size={17} />
            Logout
          </button>
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              marginTop: "8px",
              borderRadius: "10px",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              fontSize: "0.85rem",
            }}
          >
            ← View Website
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: "240px", flex: 1, padding: "32px" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.7rem",
                fontWeight: 700,
                color: "var(--forest-green)",
                marginBottom: "4px",
              }}
            >
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "products" && "Manage Products"}
              {activeTab === "enquiries" && "Customer Enquiries"}
              {activeTab === "settings" && "Settings"}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Unde Farm Admin Panel
            </p>
          </div>
          {saveMsg && (
            <div
              style={{
                padding: "10px 20px",
                background: "#e8f5e9",
                border: "1px solid #a5d6a7",
                borderRadius: "10px",
                color: "#2d6a4f",
                fontWeight: 600,
                fontSize: "0.88rem",
              }}
            >
              {saveMsg}
            </div>
          )}
        </div>

        {/* ============================
            OVERVIEW TAB
        ============================ */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
              {[
                { label: "Total Products", value: products.length, icon: "📦", color: "#1a4a2e" },
                { label: "Available Products", value: products.filter((p) => p.isAvailable).length, icon: "✅", color: "#2d6a4f" },
                { label: "Total Enquiries", value: enquiries.length, icon: "💬", color: "#f4a535" },
                { label: "New Enquiries", value: newEnquiries, icon: "🔔", color: "#e74c3c" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "var(--shadow-card)",
                    borderLeft: `4px solid ${stat.color}`,
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{stat.icon}</div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "4px" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent enquiries */}
            <div style={{ background: "white", borderRadius: "16px", padding: "24px", boxShadow: "var(--shadow-card)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--forest-green)", marginBottom: "16px" }}>
                Recent Enquiries
              </h3>
              {enquiries.slice(0, 5).length === 0 ? (
                <p style={{ color: "var(--text-muted)" }}>No enquiries yet.</p>
              ) : (
                enquiries.slice(0, 5).map((enq) => (
                  <div
                    key={enq.id}
                    style={{
                      padding: "14px 0",
                      borderBottom: "1px solid #f0f4f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--forest-green)" }}>{enq.name}</div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{enq.phone} · {enq.type}</div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "2px" }}>{enq.message.slice(0, 60)}...</div>
                    </div>
                    <span
                      style={{
                        padding: "3px 12px",
                        borderRadius: "50px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: enq.status === "new" ? "#ffebee" : enq.status === "read" ? "#e3f2fd" : "#e8f5e9",
                        color: enq.status === "new" ? "#c62828" : enq.status === "read" ? "#1565c0" : "#2e7d32",
                      }}
                    >
                      {enq.status.toUpperCase()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ============================
            PRODUCTS TAB
        ============================ */}
        {activeTab === "products" && (
          <div>
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setIsAddingProduct(true)}
                className="btn-primary"
              >
                <Plus size={16} />
                Add Product
              </button>
            </div>

            {/* Add Product Form */}
            {isAddingProduct && (
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "28px",
                  boxShadow: "var(--shadow-card)",
                  marginBottom: "24px",
                  border: "2px solid rgba(82,183,136,0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--forest-green)" }}>
                    Add New Product
                  </h3>
                  <button onClick={() => setIsAddingProduct(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <X size={20} color="#999" />
                  </button>
                </div>
                <ProductForm product={newProduct} onChange={setNewProduct} onSave={handleAddProduct} onCancel={() => setIsAddingProduct(false)} />
              </div>
            )}

            {/* Products table */}
            <div style={{ background: "white", borderRadius: "16px", boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--forest-green)", color: "white" }}>
                    {["Product", "Price", "Stock", "Status", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontWeight: 600, fontSize: "0.85rem" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <>
                      <tr
                        key={product.id}
                        style={{
                          borderBottom: "1px solid #f0f4f0",
                          background: idx % 2 === 0 ? "white" : "#fafff8",
                        }}
                      >
                        <td style={{ padding: "14px 20px" }}>
                          <div style={{ fontWeight: 600, color: "var(--forest-green)" }}>{product.name}</div>
                          {product.badge && (
                            <span style={{ fontSize: "0.72rem", color: "var(--mid-green)", fontWeight: 600 }}>
                              {product.badge}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "14px 20px", fontWeight: 700, color: "var(--forest-green)" }}>
                          ₹{product.price} {product.unit}
                        </td>
                        <td style={{ padding: "14px 20px", color: "var(--text-muted)" }}>
                          {product.stock} {product.stockUnit}
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <span
                            style={{
                              padding: "3px 10px",
                              borderRadius: "50px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              background: product.isAvailable ? "#e8f5e9" : "#ffebee",
                              color: product.isAvailable ? "#2e7d32" : "#c62828",
                            }}
                          >
                            {product.isAvailable ? "Available" : "Out of Stock"}
                          </span>
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => setEditingProduct(product)}
                              style={{
                                padding: "6px 12px",
                                background: "rgba(26,74,46,0.1)",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                color: "var(--forest-green)",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                              }}
                            >
                              <Edit size={13} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              style={{
                                padding: "6px 12px",
                                background: "rgba(231,76,60,0.1)",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                color: "#e74c3c",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                              }}
                            >
                              <Trash2 size={13} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* Inline edit row */}
                      {editingProduct?.id === product.id && (
                        <tr key={`edit-${product.id}`}>
                          <td colSpan={5} style={{ padding: "20px" }}>
                            <div style={{ background: "#f8faf8", borderRadius: "12px", padding: "20px" }}>
                              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--forest-green)", marginBottom: "16px" }}>
                                Edit: {editingProduct.name}
                              </h4>
                              <ProductForm
                                product={editingProduct}
                                onChange={(p) => setEditingProduct({ ...editingProduct, ...p })}
                                onSave={() => handleSaveProduct(editingProduct)}
                                onCancel={() => setEditingProduct(null)}
                              />
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================
            ENQUIRIES TAB
        ============================ */}
        {activeTab === "enquiries" && (
          <div style={{ background: "white", borderRadius: "16px", boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
            {enquiries.length === 0 ? (
              <div style={{ padding: "60px", textAlign: "center", color: "var(--text-muted)" }}>
                <MessageSquare size={48} color="#ccc" style={{ margin: "0 auto 16px" }} />
                <p>No enquiries yet. They will appear here when customers fill the contact form.</p>
              </div>
            ) : (
              <div>
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    style={{
                      padding: "20px 24px",
                      borderBottom: "1px solid #f0f4f0",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "20px",
                      alignItems: "flex-start",
                      background: enq.status === "new" ? "#fffbf0" : "white",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                        <span style={{ fontWeight: 700, color: "var(--forest-green)", fontSize: "1rem" }}>{enq.name}</span>
                        <span
                          style={{
                            padding: "2px 10px",
                            borderRadius: "50px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            background: enq.status === "new" ? "#ffebee" : enq.status === "read" ? "#e3f2fd" : "#e8f5e9",
                            color: enq.status === "new" ? "#c62828" : enq.status === "read" ? "#1565c0" : "#2e7d32",
                          }}
                        >
                          {enq.status.toUpperCase()}
                        </span>
                        <span
                          style={{
                            padding: "2px 10px",
                            borderRadius: "50px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            background: "rgba(82,183,136,0.1)",
                            color: "var(--mid-green)",
                            textTransform: "capitalize",
                          }}
                        >
                          {enq.type}
                        </span>
                      </div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "4px" }}>
                        📞 <a href={`tel:${enq.phone}`} style={{ color: "var(--mid-green)", textDecoration: "none" }}>{enq.phone}</a>
                        {enq.email && <> · 📧 {enq.email}</>}
                      </div>
                      <div style={{ color: "var(--text-dark)", fontSize: "0.9rem", lineHeight: 1.5 }}>{enq.message}</div>
                      <div style={{ color: "#999", fontSize: "0.75rem", marginTop: "8px" }}>
                        {new Date(enq.createdAt).toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexShrink: 0, flexWrap: "wrap" }}>
                      {enq.status !== "read" && (
                        <button
                          onClick={() => handleEnquiryStatus(enq.id, "read")}
                          style={{
                            padding: "6px 12px",
                            background: "rgba(21,101,192,0.1)",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            color: "#1565c0",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                          }}
                        >
                          <Eye size={13} />
                          Mark Read
                        </button>
                      )}
                      {enq.status !== "replied" && (
                        <button
                          onClick={() => handleEnquiryStatus(enq.id, "replied")}
                          style={{
                            padding: "6px 12px",
                            background: "rgba(46,125,50,0.1)",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            color: "#2e7d32",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                          }}
                        >
                          <CheckCircle size={13} />
                          Replied
                        </button>
                      )}
                      <a
                        href={`https://wa.me/${enq.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(enq.name)}%2C%20thank%20you%20for%20contacting%20Unde%20Farm!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: "6px 12px",
                          background: "rgba(37,211,102,0.1)",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          color: "#25D366",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        💬 Reply
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================
            SETTINGS TAB
        ============================ */}
        {activeTab === "settings" && (
          <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "var(--shadow-card)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--forest-green)", marginBottom: "8px" }}>
              Site Configuration
            </h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
              To update WhatsApp numbers, contact details and admin password, edit the file:
            </p>
            <div
              style={{
                background: "#f8faf8",
                borderRadius: "12px",
                padding: "16px 20px",
                border: "1px solid #e0efe0",
                fontFamily: "monospace",
                fontSize: "0.88rem",
                color: "var(--forest-green)",
                marginBottom: "24px",
              }}
            >
              src/lib/config.ts
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Business Name", value: "Unde Farm" },
                { label: "Primary Phone", value: "7710947898" },
                { label: "Secondary Phone", value: "9702554471" },
                { label: "Location", value: "Karjule Harya, Parner, Ahilyanagar, Maharashtra" },
                { label: "Admin Username", value: "undeFarmAdmin" },
                { label: "Admin Password", value: "UndeFarm2024! (change in /admin/page.tsx)" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: "#f8faf8",
                    borderRadius: "10px",
                  }}
                >
                  <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{item.label}</span>
                  <span style={{ color: "var(--forest-green)", fontWeight: 600, fontSize: "0.88rem" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ============================
// ProductForm helper component
// ============================
function ProductForm({
  product,
  onChange,
  onSave,
  onCancel,
}: {
  product: Omit<Product, "id"> | Product;
  onChange: (p: Omit<Product, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e0efe0",
    borderRadius: "10px",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    outline: "none",
    background: "white",
    color: "var(--forest-green)",
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>Product Name *</label>
          <input style={inputStyle} value={product.name} onChange={(e) => onChange({ ...product, name: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>Badge (e.g. Best Seller)</label>
          <input style={inputStyle} value={product.badge || ""} onChange={(e) => onChange({ ...product, badge: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>Price (₹) *</label>
          <input type="number" style={inputStyle} value={product.price} onChange={(e) => onChange({ ...product, price: Number(e.target.value) })} />
        </div>
        <div>
          <label style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>Price Unit</label>
          <input style={inputStyle} value={product.unit} onChange={(e) => onChange({ ...product, unit: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>Stock Quantity *</label>
          <input type="number" style={inputStyle} value={product.stock} onChange={(e) => onChange({ ...product, stock: Number(e.target.value) })} />
        </div>
        <div>
          <label style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>Stock Unit</label>
          <input style={inputStyle} value={product.stockUnit} onChange={(e) => onChange({ ...product, stockUnit: e.target.value })} />
        </div>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>Description *</label>
        <textarea
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
          value={product.description}
          onChange={(e) => onChange({ ...product, description: e.target.value })}
        />
      </div>
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <label style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>Available for Order:</label>
        <input
          type="checkbox"
          checked={product.isAvailable}
          onChange={(e) => onChange({ ...product, isAvailable: e.target.checked })}
          style={{ width: 18, height: 18, cursor: "pointer" }}
        />
        <span style={{ color: product.isAvailable ? "#2e7d32" : "#c62828", fontWeight: 600 }}>
          {product.isAvailable ? "Yes" : "No"}
        </span>
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={onSave} className="btn-primary">
          <Save size={15} />
          Save Product
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: "12px 24px",
            background: "rgba(0,0,0,0.05)",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            color: "var(--text-muted)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
