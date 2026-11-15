# NAFISAÉ — Avant-Garde Luxury Fashion & Virtual Showroom

> High-Fashion Editorial Showroom · Animated Video Models · Real-Time 3D WebGL · AI Virtual Try-On · Complete Atelier E-Commerce · Admin Management Console

![NAFISAÉ Preview](https://raw.githubusercontent.com/Ayatulpathan/nafisae/main/public/images/preview.png)

---

## 💎 Zero-Cost Architecture & Open-Source Stack

NAFISAÉ is designed to be developed, operated, and hosted using **free and open-source technologies**:

| Layer | Technology | License / Tier | Cost |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router) + React 19 + TypeScript | MIT | **$0** |
| **Styling & System** | Tailwind CSS + Lucide Icons + Framer Motion | MIT | **$0** |
| **3D Rendering** | Three.js + React Three Fiber + Drei (Phase 3) | MIT | **$0** |
| **State & Persistence** | React Context + LocalStorage | Native | **$0** |
| **AI Try-On Engine** | CatVTON / IDM-VTON + PyTorch (Phase 4) | Apache-2.0 / Open Weights | **$0** (Local GPU) |
| **Backend & Database** | Supabase (PostgreSQL + RLS + Auth + Storage) | Free Tier (500MB DB, 1GB Storage) | **$0** |
| **Default Currency** | Bangladeshi Taka (`BDT ৳`) — Configurable | Native Engine | **$0** |

---

## 🏛️ Website Routes & Architecture

### 1. Consumer Storefront
- **`/` — Editorial Homepage**: Full-screen campaign hero, manifesto, runway highlights, brand story, and showroom entrance.
- **`/virtual-studio` — Virtual Fashion Studio (Main Attraction)**:
  - **Left Half**: Full-height model runway stage with real-time outfit swap and bracketed categories list (`[ NEW DROPP ]`, `[ DRESSES ]`, `[ CORSETS ]`, `[ BODYS ]`, `[ COATS ]`, `[ PANTS ]`).
  - **Right Half**: Asymmetrical staggered miniature fashion model rack with interactive hover and active selection indicators.
  - **Bottom Dock**: Real-time garment details, BDT (`৳`) pricing, size chips, color swatches, and "Add to Bag".
  - **Live Switching**: Zero-flicker shared state store updating the model, details, and HUD without full page reload.
- **`/shop` — Product Catalogue**: Filter by category, size, color, price range (BDT ৳), and search.
- **`/product/[id]` — Product Detail**: Zoom gallery, craftsmanship story, size selector, and direct "View in Studio" trigger.
- **`/try-on` — AI Virtual Try-On**: Photo upload, privacy consent agreement, local diffusion model synthesis, and drape preview.
- **`/cart` — Shopping Bag**: Free delivery meter, item count, quantity controls, BDT calculation, and atelier packaging notes.
- **`/checkout` — Atelier Checkout**: Delivery address (Bangladesh divisions), Cash on Delivery (COD) / mobile banking (bKash/Nagad test mode), and encrypted order confirmation.
- **`/collections` & `/collections/[slug]`**: High-fashion runway archives.
- **`/story`**: Brand manifesto & craftsmanship philosophy.
- **`/account` & `/account/orders` & `/account/wishlist`**: Client portal and order history.

### 2. Atelier Admin Console (`/admin`)
- **`/admin` — Dashboard Overview**: Real-time sales metrics in BDT (`৳`), order pipeline, critical stock alerts, new client counts, and studio telemetry.
- **`/admin/products` — Product Management**: Full catalog table with add/edit/delete, product photos, model video links (idle/walk/turn), 3D GLB assets, and try-on cutouts.
- **`/admin/orders` — Orders & Fulfillment**: Order status pipeline (Pending → Confirmed → Shipped → Delivered).
- **`/admin/customers` — Client Directory**: Role-based access control (`super_admin`, `manager`, `staff`, `customer`) and account blocking.
- **`/admin/categories` — Taxonomy**: Manage categories, display orders, and product counts.
- **`/admin/inventory` — Stock Management**: Variant stock (size × color) with low-stock alerts.
- **`/admin/discounts` — Coupons & Promotions**: Percentage & fixed BDT coupons with minimum spend requirements.
- **`/admin/studio` — Virtual Studio Assets**: Manage video model loops, 3D GLBs, and cutout masks.
- **`/admin/settings/shipping` — Shipping Rules**: Dhaka and national delivery rates with free shipping thresholds.
- **`/admin/settings/currencies` — Currency Engine**: Base currency (BDT ৳) with secondary global display currencies.
- **`/admin/settings/ai` — AI Settings**: Local Python daemon URL configuration and health check pings.
- **`/admin/analytics` — Analytics & Reports**: Top performing silhouettes and revenue metrics.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v25)
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Ayatulpathan/nafisae.git
cd nafisae

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Verification

```bash
npm run build
```

---

## 🎨 Design System

- **Obsidian Black (`#080808`)**: Structural borders, deep typography.
- **Alabaster White (`#FDFDFB`)**: Editorial background, pure light balance.
- **Ivory Grey (`#F5F5F0`)**: Studio stage background, neutral canvas.
- **Crimson Accent (`#D02020`)**: Reference-style category tags.
- **Champagne Gold (`#C5A880`)**: Muted luxury hover & active indicators.
- **Hairline Dividers (`rgba(0,0,0,0.08)`)**: Ultra-thin 0.5px architectural lines.

---

## 📄 License

MIT License — free for personal and commercial use.
