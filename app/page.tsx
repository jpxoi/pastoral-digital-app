import Footer from "./ui/components/footer";
import FormContainer from "./ui/components/formContainer";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center">
      <FormContainer />
      <Footer />
    </main>
  );
}
