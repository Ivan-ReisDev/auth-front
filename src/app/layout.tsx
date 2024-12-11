
'use client';
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  cz-shortcut-listen="true">
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
      </body>
    </html>
  );
}
