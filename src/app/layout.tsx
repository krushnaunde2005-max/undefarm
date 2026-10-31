import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unde Farm – Fresh Sitafal (Custard Apple) | Karjule Harya, Maharashtra",
  description:
    "Unde Farm grows premium fresh Sitafal (Custard Apple) in Karjule Harya, Parner, Ahilyanagar, Maharashtra. Order fresh, naturally farmed custard apples directly from our farm. Wholesale enquiries welcome.",
  keywords: [
    "Sitafal farm",
    "Custard Apple Maharashtra",
    "Unde Farm Karjule Harya",
    "fresh sitafal Parner",
    "Ahilyanagar sitafal",
    "buy custard apple Maharashtra",
    "wholesale sitafal",
  ],
  openGraph: {
    title: "Unde Farm – Fresh Sitafal Straight From the Farm",
    description: "Premium Sitafal grown with care in Karjule Harya, Maharashtra. Order fresh custard apples directly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a4a2e" />
      </head>
      <body>{children}</body>
    </html>
  );
}
