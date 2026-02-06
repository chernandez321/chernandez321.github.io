import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "@/pages/Blog";
import NotFound from "./NotFound";
import React, { useEffect, useState } from "react";

export default function BlogPost() {
  const { slug } = useParams();
  if (!slug) return <NotFound />;

  const post = getPostBySlug(slug);
  if (!post) return <NotFound />;

  const [DynamicContent, setDynamicContent]: [any, (value: any) => void] = useState(null);

  const InlineContent = (post as any).Content ?? null;

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const key = `/src/pages/Blog/${slug}.tsx`;
        const modules = import.meta.glob('/src/pages/Blog/*.tsx');
        if (modules[key]) {
          const mod = await (modules[key] as () => Promise<any>)();
          if (mounted && mod?.default) setDynamicContent(() => mod.default);
          return;
        }
      } catch (e) {
        // fallback to post.Content if present
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary mb-4">
              <ArrowLeft className="h-4 w-4" /> Volver al blog
            </Link>

            <div className="mt-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Tag className="h-3 w-3" /> {post.category}
              </span>

              <h1 className="text-3xl lg:text-4xl font-bold mt-4">{post.title}</h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {post.readTime}
                </span>
              </div>

              <p className="text-muted-foreground mt-6">{post.excerpt}</p>

              <article className="prose prose-invert mt-8">
                {DynamicContent ? (
                  <DynamicContent />
                ) : InlineContent ? (
                  <InlineContent />
                ) : (
                  <>
                    <p>
                      Contenido del artículo — este es un placeholder. Puedes reemplazarlo con el contenido real
                      del post o cargarlo desde un CMS/MDX cuando esté disponible.
                    </p>
                    <p>
                      Para añadir contenido real, crea una fuente de datos (MDX, JSON, o una API) y mapea el
                      contenido aquí usando `slug`.
                    </p>
                  </>
                )}
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
