import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Briefcase, GraduationCap, Award, Calendar } from "lucide-react";

const timeline = [
  {
    type: "work",
    title: "Security Analyst",
    company: "Empresa de Ciberseguridad",
    period: "2023 - Presente",
    description: "Análisis de vulnerabilidades, pentesting y respuesta a incidentes de seguridad.",
  },
  {
    type: "education",
    title: "Máster en Ciberseguridad",
    company: "Universidad",
    period: "2022 - 2023",
    description: "Especialización en seguridad ofensiva y análisis forense digital.",
  },
  {
    type: "cert",
    title: "Certificaciones",
    company: "Varias instituciones",
    period: "2021 - Presente",
    description: "OSCP, CEH, CompTIA Security+ y otras certificaciones relevantes.",
  },
  {
    type: "work",
    title: "IT Support",
    company: "Empresa Tecnológica",
    period: "2020 - 2022",
    description: "Soporte técnico y primeros pasos en seguridad informática.",
  },
];

const skills = [
  { name: "Pentesting", level: 90 },
  { name: "Network Security", level: 85 },
  { name: "Python", level: 80 },
  { name: "Linux", level: 95 },
  { name: "Web Security", level: 85 },
  { name: "Forensics", level: 70 },
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