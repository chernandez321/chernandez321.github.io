import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MapPin, Github, Linkedin, Youtube, Instagram, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  //{ href: "https://youtube.com/@chlorenzo", icon: Youtube, label: "YouTube", username: "@chlorenzo" },
  //{ href: "https://instagram.com/chlorenzo_", icon: Instagram, label: "Instagram", username: "@chlorenzo_" },
  { href: "https://www.linkedin.com/in/carloshernandezlorenzo/", icon: Linkedin, label: "LinkedIn", username: "carloshernandezlorenzo" },
  { href: "https://github.com/chernandez321", icon: Github, label: "GitHub", username: "chernandez321" },
];

export default function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  const form = new FormData(e.target);
  const res = await fetch("https://formspree.io/f/xblnnbqj", {
    method: "POST",
    body: form,
    headers: { Accept: "application/json" }
  });
  if (res.ok) {
    toast({ title: "¡Mensaje enviado!", description: "Gracias..." });
    e.target.reset();
  } else {
    toast({ title: "Error", description: "No se pudo enviar el mensaje." });
  }
  setIsSubmitting(false);
};

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 lg:py-24 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Contacto
              </h1>
              <p className="text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                ¿Tienes alguna pregunta o propuesta? ¡Me encantaría escucharte!
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <h2 className="text-2xl font-bold mb-6">Envíame un mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input id="name" name="name" placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto</Label>
                    <Input id="subject" name="subject" placeholder="¿De qué quieres hablar?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      required 
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto glow-sm" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
                  <div className="space-y-4">
                    <a 
                      href="mailto:chlorenzo96@gmail.com"
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground text-sm">chlorenzo96@gmail.com</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Ubicación</p>
                        <p className="text-muted-foreground text-sm">España</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <h3 className="text-xl font-semibold mb-4">Redes sociales</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                      >
                        <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div>
                          <p className="font-medium text-sm">{social.label}</p>
                          <p className="text-muted-foreground text-xs">{social.username}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}