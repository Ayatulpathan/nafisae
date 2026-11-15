import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { StudioProvider } from "@/contexts/StudioContext";
import Header from "@/components/layout/Header";
import CartDrawer from "@/components/layout/CartDrawer";
import Footer from "@/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NAFISAÉ — Cybernetic Couture",
  description:
    "An avant-garde digital fashion house. Explore collections through our Virtual Fashion Studio, 3D model viewer, and AI virtual try-on. Shipping from Dhaka worldwide.",
  keywords: ["fashion", "couture", "luxury", "Bangladesh", "virtual try-on", "3D fashion"],
  openGraph: {
    title: "NAFISAÉ — Cybernetic Couture",
    description: "Where structural intention meets the poetry of fabric.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-[#FDFDFB] text-[#080808] antialiased">
        <CartProvider>
          <StudioProvider>
            <Header />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
          </StudioProvider>
        </CartProvider>
      </body>
    </html>
  );
}
