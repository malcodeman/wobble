import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { METADATA } from "./constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...METADATA,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        {children}
        <Analytics />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              color: "#fff",
              backgroundColor: "#29303d",
              padding: "8px",
            },
          }}
        />
      </body>
    </html>
  );
}
