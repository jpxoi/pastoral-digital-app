import Footer from "./ui/components/footer";
import FormContainer from "./ui/components/formContainer";
import PWAPrompt from "./ui/components/pwaPrompt";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center">
      <FormContainer />
      <PWAPrompt />
      <Footer />
    </main>
  );
}
