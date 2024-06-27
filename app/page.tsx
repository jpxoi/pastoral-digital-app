import Footer from "./ui/components/footer";
import FormContainer from "./ui/components/formContainer";

export default function Home() {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center">
      <FormContainer />
      <footer className="hidden sm:block">
        <Footer mt={4} mb={0} />
      </footer>
    </main>
  );
}
