import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import SeguridadInstagram from "@/pages/Blog/seguridad-instagram";
import SeguridadWhatsapp from "@/pages/Blog/seguridad-whatsapp";

const blogPosts = [
  {
    id: 1,
    title: "Introducción al Pentesting: Primeros pasos",
    excerpt: "Una guía completa para comenzar en el mundo del pentesting y las pruebas de seguridad.",
    category: "Ciberseguridad",
    date: "2024-01-15",
    readTime: "8 min",
    slug: "introduccion-pentesting",
  },
  {
    id: 2,
    title: "Write-up: HackTheBox - Machine",
    excerpt: "Resolución paso a paso de una máquina de HackTheBox con técnicas de enumeración y escalada de privilegios.",
    category: "Write-ups",
    date: "2024-01-10",
    readTime: "12 min",
    slug: "writeup-htb-machine",
  },
  {
    id: 3,
    title: "Herramientas esenciales para Bug Bounty",
    excerpt: "Las mejores herramientas que todo cazador de bugs debería conocer y dominar.",
    category: "Herramientas",
    date: "2024-01-05",
    readTime: "6 min",
    slug: "herramientas-bug-bounty",
  },
  {
    id: 4,
    title: "¿Debería preocuparme por la seguridad de mi Whatsapp?",
    excerpt: "Protege tu red doméstica y aprende sobre las vulnerabilidades más comunes en redes inalámbricas.",
    category: "Privacidad",
    date: "2025-11-15",
    readTime: "3 min",
    slug: "seguridad-whatsapp",
    Content: SeguridadWhatsapp,
  },
  {
      id: 5,
      title: "¿Debería preocuparme por la seguridad de mi Instagram?",
      excerpt: "Consejos prácticos para proteger tu cuenta de Instagram: 2FA, revisar sesiones y cookies.",
      category: "Privacidad",
      date: "2025-12-15",
      readTime: "5 min",
      slug: "seguridad-instagram",
      Content: SeguridadInstagram,
    }
];

const categories = ["Todos", "Ciberseguridad", "Write-ups", "Herramientas", "Tecnología"];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export default function Blog() {
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
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    index === 0
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
              {blogPosts.map((post, index) => (
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