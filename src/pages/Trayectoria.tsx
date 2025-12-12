import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Briefcase, GraduationCap, Award, Calendar } from "lucide-react";

const timeline = [
  {
    type: "work",
    title: "Analista de Ciberseguridad",
    company: "BFI",
    period: "2020 - 2023",
    description: "Análisis de vulnerabilidades, respuesta a incidentes de seguridad, despliegue y administración de herramientas del lado defensivo (WAZUH, Kaspersky Security Center).",
  },
  {
    type: "Educación",
    title: "Ingeniero en Ciencia Informáticas",
    company: "UCI",
    period: "2015 - 2020",
    description: "Bases sobre informática, programación, ingeniería de software y redes.",
  },
];

const skills = [
  { name: "Pentesting", level: 20 },
  { name: "Seguridad de la Red", level: 70 },
  { name: "Python", level: 30 },
  { name: "Linux", level: 80 },
  { name: "Seguridad Web", level: 40 },
  { name: "", level: 30 },
];

export default function Trayectoria() {
  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return Briefcase;
      case "education":
        return GraduationCap;
      case "cert":
        return Award;
      default:
        return Briefcase;
    }
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
                Trayectoria
              </h1>
              <p className="text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Mi camino profesional en el mundo de la tecnología y la ciberseguridad.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Timeline */}
            <section>
              <h2 className="text-2xl font-bold mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                Experiencia
              </h2>
              <div className="space-y-6">
                {timeline.map((item, index) => {
                  const Icon = getIcon(item.type);
                  return (
                    <div
                      key={index}
                      className="relative pl-8 pb-6 border-l-2 border-border last:border-transparent opacity-0 animate-fade-in-up"
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                        <Icon className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        {item.period}
                      </div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-primary text-sm mb-2">{item.company}</p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-2xl font-bold mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                Habilidades
              </h2>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
