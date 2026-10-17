
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sheikh Hamim Islam Raju | Full-Stack Developer",
  description:
    "Portfolio of Sheikh Hamim Islam Raju — Computer Science student and aspiring full-stack developer building modern web applications.",
  keywords: [
    "Sheikh Hamim Islam Raju",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Portfolio",
  ],
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
