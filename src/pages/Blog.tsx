import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useMemo, useState } from "react";
import SeguridadInstagram from "@/pages/Blog/Ciberseguridad_para_todos/seguridad-instagram";
import SeguridadWhatsapp from "@/pages/Blog/Ciberseguridad_para_todos/seguridad-whatsapp";
import HTBGettingStarted from "@/pages/Blog/Write_Ups_HTB_Tier_I_Laboratorios/Getting_Starterd_HTB";
import Network_Foundations from "@/pages/Blog/Write_Ups_HTB_Tier_I_Laboratorios/Network_Foundations_HTB";

import { Content } from "vaul";
import Cap from "./Blog/Write_ups_HTB_Máquinas/Cap/Cap";

const blogPosts = [
  {
    id: 1,
    title: "¿Debería preocuparme por la seguridad de mi Whatsapp?",
    excerpt: "Protege tu red doméstica y aprende sobre las vulnerabilidades más comunes en redes inalámbricas.",
    category: "Ciberseguridad para todos",
    date: "2025-05-12",
    readTime: "3 min",
    slug: "seguridad-whatsapp",
    Content: SeguridadWhatsapp,
  },
      {
        id: 2,
        title: "¿Debería preocuparme por la seguridad de mi Instagram?",
        excerpt: "Consejos prácticos para proteger tu cuenta de Instagram: 2FA, revisar sesiones y cookies.",
        category: "Ciberseguridad para todos",
        date: "2025-07-21",
        readTime: "5 min",
        slug: "seguridad-instagram",
        Content: SeguridadInstagram,
      },
      {
        id: 3,
        title: "Comprobación de Conocimientos — Getting Started (HTB)",
        excerpt: "Write-up del reto Getting Started en HackTheBox: reconocimiento, RCE y escalada a root.",
        category: "Write_Ups_HTB_Tier_I_Laboratorios",
        date: "2024-04-07",
        readTime: "10 min",
        slug: "Getting_Starterd_HTB",
        Content: HTBGettingStarted,
      },
      {
        id: 4,
        title: "Comprobación de Conocimientos — Network Foundations (HTB)",
        excerpt: "Write-up del reto Network Foundations en HackTheBox: uso de ifconfig y netstat para entender redes.",
        category: "Write_Ups_HTB_Tier_I_Laboratorios",
        date: "2024-11-30",
        readTime: "5 min",
        slug: "Network_Foundations_HTB",
        Content: Network_Foundations,
      },
      {
        id: 5,
        title: "Write Up de la Máquina Cap - HackTheBox",
        excerpt: "Write-up del reto Cap en HackTheBox: enumeración, explotación y escalada a root.",
        category: "Write_ups_HTB_Máquinas",
        date: "2026-01-03",
        readTime: "7 min",
        slug: "Cap_HTB",
        Content: Cap,
      }
];

const categories = ["Todos", "Ciberseguridad para todos", "Write_Ups_HTB_Tier_I_Laboratorios", "Write_ups_HTB_Máquinas"];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory]: [string, (value: string) => void] = useState("Todos");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "Todos") return blogPosts;
    return blogPosts.filter((p) => (p.category || "").trim() === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 lg:py-24 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Blog
              </h1>
              <p className="text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Artículos sobre ciberseguridad, write-ups de CTFs, herramientas y más.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b border-border bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
              <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {filteredPosts.map((post: typeof blogPosts[0], index: number) => (
                <article
                  key={post.id}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString("es-ES", { 
                          year: "numeric", 
                          month: "short", 
                          day: "numeric" 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all"
                    >
                      Leer más
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}