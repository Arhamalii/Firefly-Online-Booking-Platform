import Footer from "@/components/footer";
import Header from "@/components/header";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firefly Online Booking Service",
  description: "Book your next flight with Firefly Online Booking Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
