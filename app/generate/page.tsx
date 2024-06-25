import PastoralID from "../ui/components/pastoralID";
import PastoralButtons from "../ui/components/pastoralButtons";

export default function PastoralIDPage() {

  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center">
      <PastoralID />
      <PastoralButtons />
    </main>
  );
}
