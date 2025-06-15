import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vidhur - AI-Powered IIT JEE TUTOR",
  description: "Vidhur is an AI-powered tutor for IIT JEE aspirants, providing personalized learning paths, smart chapter generation, and interactive doubt-solving.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} flex ${geistMono.variable} antialiased`}
      >
        <Sidebar></Sidebar>
        <main className="pl-80">{children}</main>
      </body>
    </html>
  );
}
