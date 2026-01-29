import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Kokurikuler SMAN 1 Belitang",
  description: "Platform Pembelajaran Kokurikuler - Cita Rasa Nusantara",
  icons: {
    icon: '/logo.png', // Explicitly point to logo
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Header />
        <main style={{ minHeight: "80vh" }}>{children}</main>
        <footer
          style={{
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "var(--color-text)",
            color: "var(--color-background)",
            marginTop: "auto",
          }}
        >
          <p>© 2026 - Tim Kurikulum SMA Negeri 1 Belitang</p>
        </footer>
      </body>
    </html>
  );
}
