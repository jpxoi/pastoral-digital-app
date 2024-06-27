import type { Metadata } from "next";
import AppHeader from "../ui/components/appHeader";
import Footer from "../ui/components/footer";

export const metadata: Metadata = {
  title: "Dashboard | Pastoral Digital Services",
  description:
    "Pastoral Digital es una plataforma digital para uso interno de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <AppHeader />
    {children}
    <Footer mt={4} mb={8} />
    </>
  );
}