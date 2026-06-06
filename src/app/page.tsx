"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MessageCircle,
  MapPin,
  ExternalLink,
  Menu,
  Phone,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

// INGENIERO: En Next.js, las imágenes de public/ se llaman con strings así
const heroImg = "/torta-hero.webp";
const producto1Img = "/producto-1.webp";
const producto2Img = "/producto-2.webp";
const producto3Img = "/producto-3.jpg";
const producto4Img = "/producto-4.webp";
const producto5Img = "/producto-5.webp";
const nosotrosImg = "/nosotros.webp";
const ubi1Img = "/ubi-1.webp";
const ubi2Img = "/ubi-2.webp";
const logoImg = "/logo.webp";

const WHATSAPP = "https://wa.me/59172712392";

const navLinks = [
  { label: "Inicio", href: "#top" }, 
  { label: "Productos", href: "#productos" },
  { label: "Estrellas", href: "#estrellas" }, 
  { label: "Nosotros", href: "#nosotros" },
  { label: "Ubicación", href: "#ubicacion" }, 
  { label: "FAQ", href: "#faq" },
];

const products = [
  { name: "Tortas Artesanales por Encargo", img: producto5Img, alt: "Torta artesanal" },
  { name: "Empanadas de Queso", img: producto4Img, alt: "Empanadas de Queso" },
  { name: "Pay de limon", img: producto3Img, alt: "Pay de limon" },
  { name: "Rollo de Queso", img: producto2Img, alt: "Rollo de Queso" },
  { name: "Tartaletas de distintos sabores", img: producto1Img, alt: "Tartaletas" },
];

const starProducts = [
  { name: "Torta Estrella 1", img: producto1Img, alt: "Torta Estrella 1" },
  { name: "Torta Estrella 2", img: producto2Img, alt: "Torta Estrella 2" },
  { name: "Torta Estrella 3", img: producto3Img, alt: "Torta Estrella 3" },
  { name: "Torta Estrella 4", img: producto4Img, alt: "Torta Estrella 4" },
  { name: "Torta Estrella 5", img: producto5Img, alt: "Torta Estrella 5" },
];

const locations = [
  { name: "V. Del Carmen, Cochabamba", href: "https://maps.app.goo.gl/jPSDekzGAJG5j3BC6", img: ubi2Img },
  { name: "Champarrancho, Cochabamba", href: "https://maps.app.goo.gl/mq8nYAvfpBpeQjrR9", img: ubi1Img },
];

const faqs = [
  { q: "¿Hacen envíos a domicilio?", a: "Sí, podemos traer personalmente su pedido dependiendo la zona donde quiera su entrega." },
  { q: "¿Cuánto es el costo de envío?", a: "Con pronta coordinación y si su pedido no es muy alejado, el costo es gratis." },
  { q: "¿Para qué tipo de eventos hacen pedidos?", a: "Para todo tipo de acontecimientos: cumpleaños, bodas, aniversarios, graduaciones, etc." },
];

// --- CARRUSEL ---
function CarouselSection({ items, reverse = false, bgColor = "bg-pink-50" }: { items: typeof products; reverse?: boolean; bgColor?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (reverse) emblaApi.scrollPrev();
      else emblaApi.scrollNext();
    }, 2500); 
    return () => clearInterval(interval);
  }, [emblaApi, reverse]);

  return (
    <div className="relative">
      <div className={`absolute inset-y-0 left-0 w-16 ${bgColor} bg-gradient-to-r to-transparent z-10 pointer-events-none`} />
      <div className={`absolute inset-y-0 right-0 w-16 ${bgColor} bg-gradient-to-l to-transparent z-10 pointer-events-none`} />
      <button onClick={reverse ? scrollNext : scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/60 backdrop-blur-sm hover:bg-white/90 p-2 rounded-full shadow-sm transition-all"><ChevronLeft className="w-5 h-5 text-stone-700" /></button>
      <button onClick={reverse ? scrollPrev : scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/60 backdrop-blur-sm hover:bg-white/90 p-2 rounded-full shadow-sm transition-all"><ChevronRight className="w-5 h-5 text-stone-700" /></button>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((p, i) => (
            <div key={i} className="flex-[0_0_85%] sm:flex-[0_0_calc(50%-0.5rem)] lg:flex-[0_0_calc((100%-2rem)/3)] min-w-0">
              <article className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden group cursor-pointer relative aspect-square">
                <Image src={p.img} alt={p.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <h3 className="text-white text-xl font-serif">{p.name}</h3>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- WHATSAPP ---
function FloatingWhatsApp() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50 bg-pink-600 hover:bg-pink-700 text-white font-extrabold py-5 px-8 rounded-2xl shadow-[0_0_40px_rgba(219,39,119,0.9)] flex items-center gap-4 animate-bounce transition-colors">
      <MessageCircle className="w-8 h-8" />
      <span className="text-xl uppercase tracking-wider">¡HAGA SU PEDIDO!</span>
    </a>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-pink-50 text-stone-800">
      <Navbar />
      <FloatingWhatsApp />
      <main>
        <Hero />
        <Products />
        <StarCakes />
        <About />
        <Locations />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

// --- NAVBAR ---
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-[6rem] flex items-center justify-between gap-6">
        <a href="#top" className="shrink-0 py-2">
          <Image src={logoImg} alt="Repostería Mónica" width={250} height={80} className="h-24 w-auto object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (<a key={l.href} href={l.href} className="text-base font-medium text-stone-600 hover:text-pink-600 transition-colors">{l.label}</a>))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-sm hover:shadow-md transition-all items-center gap-2 text-base"><MessageCircle className="w-5 h-5" />Haga su pedido</a>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild><button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-pink-100 text-stone-700"><Menu className="w-5 h-5" /></button></DrawerTrigger>
            <DrawerContent className="bg-white">
              <DrawerHeader><DrawerTitle className="font-serif text-stone-800">Repostería Mónica</DrawerTitle></DrawerHeader>
              <nav className="px-6 pb-8 flex flex-col gap-1">
                {navLinks.map((l) => (<DrawerClose asChild key={l.href}><a href={l.href} className="py-3 text-stone-700 hover:text-pink-600 border-b border-pink-100 text-base">{l.label}</a></DrawerClose>))}
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex justify-center bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-5 rounded-full items-center gap-2"><MessageCircle className="w-4 h-4" />Haga su pedido</a>
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

// --- HERO ---
function Hero() {
  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-end overflow-hidden z-0">
      <Image src={heroImg} alt="" fill className="absolute inset-0 object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-pink-50 via-pink-50/70 to-transparent" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 sm:px-12 pb-24 md:pb-32">
        <Reveal><h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-stone-800 max-w-4xl">Dulzura Artesanal para Momentos Especiales</h1></Reveal>
        <Reveal delay={120}><p className="text-lg md:text-xl text-stone-600 max-w-2xl mt-6">Deliciosas tortas artesanales, pastelería fina y pedidos por encargo en Cochabamba.</p></Reveal>
        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-sm hover:shadow-md transition-all"><MessageCircle className="w-5 h-5" />Haga su pedido</a>
            <a href="#productos" className="inline-flex items-center gap-2 border border-pink-300 text-pink-600 hover:bg-pink-100 font-semibold py-3 px-6 rounded-full transition-colors">Ver Productos</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// --- PRODUCTOS ---
function Products() {
  return (
    <section id="productos" className="py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal><h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 border-b-2 border-amber-900 pb-2 inline-block mb-12">Nuestros Productos</h2></Reveal>
        <CarouselSection items={products} bgColor="bg-pink-50" />
      </div>
    </section>
  );
}

// --- ESTRELLAS ---
function StarCakes() {
  return (
    <section id="estrellas" className="py-20 md:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal><h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 border-b-2 border-amber-900 pb-2 inline-block mb-12">Tortas Estrellas ✨</h2></Reveal>
        <CarouselSection items={starProducts} reverse={true} bgColor="bg-white" />
      </div>
    </section>
  );
}

// --- NOSOTROS ---
function About() {
  return (
    <section id="nosotros" className="py-20 md:py-28 px-4 sm:px-6 bg-pink-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <Reveal><Image src={nosotrosImg} alt="Repostera" width={800} height={1000} className="w-full h-full object-cover rounded-2xl shadow-sm border border-pink-100 aspect-[4/5]" /></Reveal>
        <Reveal delay={120}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 border-b-2 border-amber-900 pb-2 inline-block mb-6">Nuestra Historia</h2>
          <p className="text-stone-600 leading-relaxed text-lg">Nuestra historia nació de la resiliencia y la pasión. Tras años en la gastronomía, un giro del destino nos llevó a la repostería. Al principio, el camino no fue fácil, pero con dedicación, esfuerzo y mucho amor, transformamos cada intento en perfección. Hoy, en Repostería Mónica, cada torta y postre es el reflejo de esa perseverancia: elaborados a medida, con la calidad que nos caracteriza y el cariño que nos inspira. Descubrí el sabor de lo hecho con el corazón.</p>
        </Reveal>
      </div>
    </section>
  );
}

// --- UBICACIÓN ---
function Locations() {
  return (
    <section id="ubicacion" className="py-20 md:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal><h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 border-b-2 border-amber-900 pb-2 inline-block mb-12">Nuestra Ubicación</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((loc, i) => (
            <Reveal key={loc.name} delay={i * 100}>
              <div>
                <Image 
                  src={loc.img} 
                  alt={`Fachada en ${loc.name}`}
                  width={1200}
                  height={675}
                  className="w-full aspect-video rounded-2xl border border-pink-100 object-cover shadow-sm" 
                />
                <p className="text-stone-600 font-medium mt-4">{loc.name}</p>
                <a href={loc.href} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 underline flex items-center gap-1 text-sm mt-2">Abrir en Google Maps<ExternalLink className="w-3.5 h-3.5" /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- FAQ ---
function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 bg-pink-50">
      <div className="max-w-3xl mx-auto">
        <Reveal><h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 border-b-2 border-amber-900 pb-2 inline-block mb-12">Preguntas Frecuentes</h2></Reveal>
        <Reveal delay={120}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-pink-200 rounded-xl px-6">
                <AccordionTrigger className="text-left font-serif text-lg text-stone-800 hover:text-pink-600">{f.q}</AccordionTrigger>
                <AccordionContent className="text-stone-600 leading-relaxed text-base">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-pink-100 py-12 px-6 text-pink-800 border-t border-pink-200">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div><h2 className="font-serif text-2xl font-bold text-stone-800">Repostería Mónica</h2><p className="mt-3 text-sm text-pink-800/80">Tortas artesanales y pastelería fina por encargo en Cochabamba.</p></div>
        <div><h3 className="font-serif text-lg font-semibold text-stone-800 mb-3">Enlaces</h3><ul className="space-y-2 text-sm"><li><a href="#inicio" className="hover:text-pink-600">Inicio</a></li><li><a href="#productos" className="hover:text-pink-600">Productos</a></li><li><a href="#nosotros" className="hover:text-pink-600">Nosotros</a></li></ul></div>
        <div><h3 className="font-serif text-lg font-semibold text-stone-800 mb-3">Contacto</h3><ul className="space-y-2 text-sm"><li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-pink-600"><Phone className="w-4 h-4" />+591 72712392</a></li><li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-pink-600"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>Facebook</a></li></ul></div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-pink-200 mt-8 pt-8 text-center text-sm text-pink-600 space-y-1">
        <p>© 2024 Repostería Mónica. Todos los derechos reservados.</p>
        <p className="inline-flex items-center justify-center gap-1">Hecho con <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> por STARTERS</p>
      </div>
    </footer>
  );
}