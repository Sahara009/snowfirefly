import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Collections } from "@/components/Collections";
import { Menagerie } from "@/components/Menagerie";
import { Catalog } from "@/components/Catalog";
import { FireGallery } from "@/components/FireGallery";
import { Apples } from "@/components/Apples";
import { NewYear } from "@/components/NewYear";
import { Gifts } from "@/components/Gifts";
import { Corporate } from "@/components/Corporate";
import { Buy } from "@/components/Buy";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Collections />
        <Catalog />
        <Menagerie />
        <FireGallery />
        <Apples />
        <NewYear />
        <Gifts />
        <Corporate />
        <Buy />
      </main>
      <Footer />
    </>
  );
}
