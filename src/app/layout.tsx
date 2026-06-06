import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Repostería Mónica | Tortas y Pedidos en Cochabamba",
  description: "Deliciosas tortas artesanales, pastelería fina y pedidos por encargo en Cochabamba. Endulzá tus momentos especiales con Repostería Mónica.",
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}