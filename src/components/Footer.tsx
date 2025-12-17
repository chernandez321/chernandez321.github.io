import { Link } from "react-router-dom";
import { Shield, Github, Linkedin, Youtube, Instagram, Mail } from "lucide-react";

const socialLinks = [
  //{ href: "https://youtube.com/@chlorenzo", icon: Youtube, label: "YouTube" },
  { href: "https://www.linkedin.com/in/chlinked/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/chernandez321", icon: Github, label: "GitHub" },
  //{ href: "https://instagram.com/chlorenzo_", icon: Instagram, label: "Instagram" }, 
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">
                CHL <span className="text-primary">Blog</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Compartiendo recursos sobre ciberseguridad y tecnología para ayudar a otros a crecer en el mundo digital.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Enlaces</h3>
            <nav className="flex flex-col gap-2" aria-label="Enlaces del pie de página">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Blog
              </Link>
              <Link to="/trayectoria" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Trayectoria
              </Link>
              <Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Conecta</h3>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <a 
              href="mailto:chlorenzo96@gmail.com" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <Mail className="h-4 w-4" />
              chlorenzo96@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} CHL Blog. Hecho con pasión por la ciberseguridad.
          </p>
        </div>
      </div>
    </footer>
  );
}