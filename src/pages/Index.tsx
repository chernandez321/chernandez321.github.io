import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Terminal, Code, BookOpen, Zap, Github, Linkedin, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Ciberseguridad",
    description: "Artículos sobre pentesting, análisis de vulnerabilidades y seguridad ofensiva.",
  },
  {
    icon: Terminal,
    title: "Write-ups",
    description: "Resoluciones paso a paso de CTFs y máquinas de HackTheBox.",
  },
  {
    icon: Code,
    title: "Herramientas",
    description: "Reviews y tutoriales de las mejores herramientas de seguridad.",
  },
  {
    icon: BookOpen,
    title: "Recursos",
    description: "Guías y recursos para aprender y mejorar en ciberseguridad.",
  },
];

const socialLinks = [
  { href: "https://youtube.com/@chlorenzo", icon: Youtube, label: "YouTube" },
  { href: "https://instagram.com/chlorenzo_", icon: Instagram, label: "Instagram" },
  { href: "https://github.com/chernandez321", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/carlos-hernandez-l", icon: Linkedin, label: "LinkedIn" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container relative mx-auto px-4 lg:px-8 py-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <Zap className="h-4 w-4" />
                Blog de Ciberseguridad
              </div>

              {/* Main Heading */}
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Hola, soy{" "}
                <span className="text-gradient">Carlos Hernández</span>
              </h1>

              {/* Description */}
              <p 
                className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                Comparto recursos sobre ciberseguridad, tecnología y aprendizajes personales 
                para ayudar a otros a crecer en el mundo digital.
              </p>

              {/* CTA Buttons */}
              <div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <Button asChild size="lg" className="glow-sm">
                  <Link to="/blog">
                    Ver artículos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contacto">Contactar</Link>
                </Button>
              </div>

              {/* Social Links */}
              <div 
                className="flex items-center justify-center gap-3 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 
                className="text-3xl lg:text-4xl font-bold mb-4 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                ¿Qué encontrarás aquí?
              </h2>
              <p 
                className="text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Contenido enfocado en ciberseguridad y tecnología para todos los niveles.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 border-t border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div 
              className="relative max-w-4xl mx-auto text-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border cyber-border opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl" />
              <div className="relative">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  ¿Quieres conocer mi trayectoria?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Descubre mi experiencia profesional, habilidades y certificaciones en el mundo de la ciberseguridad.
                </p>
                <Button asChild size="lg" className="glow-sm">
                  <Link to="/trayectoria">
                    Ver trayectoria
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
