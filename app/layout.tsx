"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Laoder from "@/components/ui/laoder";
import { LoadingProvider } from "@/context";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Firefly Online Booking Service",
//   description: "Book your next flight with Firefly Online Booking Service",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoadingProvider>
          <Laoder />
          <Header />
          {children}
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
