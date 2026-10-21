import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TripProvider } from "@/components/providers/TripProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoCabxi | Book Your Ride",
  description: "Book district-to-district rides with GoCabxi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <TripProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </TripProvider>
      </body>
    </html>
  );
}
