import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Pastoral Digital Services | Pastoral Mariana",
  description: "Pastoral Digital es una plataforma digital para uso interno de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
