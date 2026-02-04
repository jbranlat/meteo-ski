import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Météo Ski Pyrénées",
  description: "Météo AROME 1.3km haute précision pour les stations de ski.",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Météo Ski",
  },
  icons: {
    apple: "/icons/icon-192x192.png", // Utilise l'icône générée pour iOS
  },
};

export const viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Empêche le zoom accidentel sur mobile pour un look "App"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Balise supplémentaire pour forcer le mode plein écran sur certains navigateurs Android */}
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none`}
      >
        {children}
      </body>
    </html>
  );
}