import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Hack or Treat — Campus Halloween Guide",
  description: "Discover a fictional lineup of Halloween campus events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
