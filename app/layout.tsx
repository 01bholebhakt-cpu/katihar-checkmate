
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Katihar Checkmate | Think. Play. Conquer.",
  description:
    "Discover chess players, tournaments and the growing chess community of Katihar, Bihar.",
  applicationName: "Katihar Checkmate",
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
