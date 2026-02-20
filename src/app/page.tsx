import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { Solutions } from "@/components/sections/solutions";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 -mt-[4.5rem]">
        <Hero />
        <Solutions />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
