import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold font-headline">Privacy Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Our privacy policy will be detailed here.
        </p>
      </main>
      <Footer />
    </div>
  );
}
