"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent } from "react";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  images?: string[];
  author?: string;
  readTime?: string;
};

const STORAGE_KEY = "cameroonpoi.blogPosts.v1";

const DEFAULT_IMAGE_URL = "/gastro.jpeg";
const ALTERNATE_IMAGE_URL = "/chemin.jpeg";

const seedPosts: BlogPost[] = [
  {
    id: "seed-1",
    title: "Découvrir Douala en 24h: idées simples",
    excerpt: "Balade, cuisine, marchés et points de vue: un itinéraire facile pour une journée réussie.",
    content: [
      "Commence par une promenade tôt le matin au bord du fleuve Wouri, où tu pourras observer les pêcheurs locaux préparer leurs filets. L'air frais du matin et l'ambiance paise sont parfaits pour bien commencer la journée.",
      "Ensuite, direction le marché des fleurs pour une explosion de couleurs et de parfums. C'est l'endroit idéal pour acheter des souvenirs authentiques et discuter avec les vendeurs locaux.",
      'Pour le déjeuner, ne manque pas de goûter au célèbre ndolè, le plat emblématique du Cameroun. Le restaurant \'La Fourchette\' en propose une excellente version, avec des crevettes fraîches et de la pâte d\'arachide.',
      "L'après-midi, monte au sommet du Mont Fébé pour une vue imprenable sur toute la ville. C'est le spot parfait pour des photos souvenirs inoubliables.",
      'Termine ta journée en beauté par un coucher de soleil sur la plage d\'Akwa, avec un cocktail à la main et les pieds dans le sable fin.'
    ].join("\n\n"),
    images: ["/gastro.jpeg", "/chemin.jpeg"],
    date: "2025-12-01",
    author: "Jean Dupont",
    readTime: "5 min",
    imageUrl: "/gastro.jpeg",
  },
  {
    id: "seed-2",
    title: "Conseils photo: mettre en valeur un POI",
    excerpt: "Lumière, cadrage et informations utiles: 6 astuces pour des photos qui donnent envie.",
    content: [
      "1. La lumière est primordiale : privilégie les heures dorées (tôt le matin ou en fin d'après-midi) pour des clichés aux couleurs chaudes et des ombres douces.",
      "2. Pense au cadrage : utilise la règle des tiers pour des compositions équilibrées. Place ton point d'intérêt sur les lignes de force ou aux intersections.",
      "3. Montre l'échelle : inclus des éléments de référence (personnes, objets) pour donner une idée des dimensions du lieu.",
      "4. Capture les détails : en plus des vues d'ensemble, photographie des éléments caractéristiques qui font l'identité du lieu.",
      "5. Soigne le premier plan : un premier plan intéressant donne de la profondeur à tes images.",
      "6. N'oublie pas les informations pratiques : note les horaires d'ouverture, le prix d'entrée et les conditions d'accès pour compléter tes photos."
    ].join("\n\n"),
    images: ["/chemin.jpeg", "/gastro.jpeg"],
    date: "2025-12-10",
    author: "Jean Dupont",
    readTime: "4 min",
    imageUrl: "/chemin.jpeg",
  },
  {
    id: "seed-3",
    title: "Itinéraire nature: chutes + plage",
    excerpt: "Un week-end entre fraîcheur des chutes et détente au bord de l'océan.",
    content: [
      "Jour 1 - Les chutes de la Lobe : Départ matinal pour les chutes de la Lobe, un site naturel exceptionnel où la rivière se jette directement dans l'océan. Prévoyez de bonnes chaussures pour la randonnée d'environ 45 minutes à travers la forêt tropicale. Le sentier est bien aménagé mais peut être glissant par endroits.",
      "Sur place, vous pourrez vous baigner dans les bassins naturels formés par les chutes. Ne manquez pas de faire un tour en pirogue pour admirer le spectacle des chutes depuis la mer.",
      "Nuit à Kribi : Installez-vous dans un des hébergements de Kribi pour la nuit. Le soir, baladez-vous sur la plage et dégustez des fruits de mer frais dans l'un des restaurants du bord de mer.",
      "Jour 2 - Plage de Grand-Batanga : Direction la plage de Grand-Batanga, à environ 1h30 de route de Kribi. Cette plage de sable fin bordée de cocotiers est encore préservée du tourisme de masse. Profitez de la journée pour vous détendre, vous baigner dans les eaux turquoises ou faire du snorkeling dans les récifs coralliens proches du rivage.",
      "Conseils pratiques : Prévoyez de la crème solaire, un chapeau et assez d'eau. La meilleure période pour ce circuit est la saison sèche, de novembre à mars."
    ].join("\n\n"),
    images: ["/gastro.jpeg", "/chemin.jpeg"],
    date: "2025-12-20",
    author: "Marie Martin",
    readTime: "7 min",
    imageUrl: "/gastro.jpeg",
  },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

const newId = () => {
  const maybe = globalThis.crypto?.randomUUID?.();
  return maybe ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          const incoming = parsed as Partial<BlogPost>[];
          const normalized = incoming
            .filter((p) => p && typeof p === "object")
            .map((p) => ({
              id: String(p.id ?? newId()),
              title: String(p.title ?? ""),
              excerpt: String(p.excerpt ?? ""),
              content: String(p.content ?? ""),
              date: String(p.date ?? todayISO()),
              imageUrl: String(p.imageUrl ?? DEFAULT_IMAGE_URL),
              author: typeof p.author === "string" ? p.author : "",
            }))
            .filter((p) => p.title.trim().length > 0 && p.content.trim().length > 0);

          const merged = normalized.length >= 3 ? normalized : [...normalized, ...seedPosts.slice(0, 3 - normalized.length)];
          setPosts(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          return;
        }
      } catch {
        // ignore
      }
    }

    setPosts(seedPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
  }, []);

  const canSubmit = useMemo(() => {
    return title.trim().length > 0 && content.trim().length > 0;
  }, [title, content]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const finalImageUrl = imageUrl.trim() || (posts.length % 2 === 0 ? DEFAULT_IMAGE_URL : ALTERNATE_IMAGE_URL);

    const next: BlogPost = {
      id: newId(),
      title: title.trim(),
      excerpt: excerpt.trim() || content.trim().slice(0, 140) + (content.trim().length > 140 ? "…" : ""),
      content: content.trim(),
      date: todayISO(),
      imageUrl: finalImageUrl,
      author: author.trim() || "Auteur",
    };

    setPosts((prev) => {
      const updated = [next, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    setTitle("");
    setExcerpt("");
    setContent("");
    setImageUrl("");
    setAuthor("");
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">Blog</h1>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-zinc-300">
              Découvrez nos conseils et récits de voyage au Cameroun
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {isFormOpen ? 'Annuler' : 'Ajouter un article'}
          </button>
        </div>

        {isFormOpen && (
          <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-200">Auteur</label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                  placeholder="Ex: Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-200">Titre</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                  placeholder="Ex: Les 5 lieux à voir à Yaoundé"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-200">Résumé (optionnel)</label>
                <input
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                  placeholder="Une phrase qui donne envie…"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-200">Contenu</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 min-h-[140px]"
                  placeholder="Raconte ton expérience, ajoute des conseils, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-200">Image (optionnel)</label>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                  placeholder="/gastro.jpeg ou /chemin.jpeg"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </form>
        )}

        {posts.length === 0 ? (
          <div className="text-slate-600 dark:text-zinc-300">Chargement…</div>
        ) : (
          <div className="grid gap-5">
            {posts.map((post) => {
              // Vérifier si c'est un article de démonstration pour afficher le bon ID
              const isDemoPost = post.id.startsWith('seed-');
              const postId = isDemoPost ? post.id.replace('seed-', '') : post.id;

              return (
                <article key={post.id} className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-56 h-48 md:h-auto">
                      <div className="relative w-full h-full">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center text-sm text-slate-500 dark:text-zinc-400 mb-2">
                        <span className="font-medium">{post.author?.trim() || "Auteur"}</span>
                        <span className="mx-2">•</span>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                      <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 mb-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 dark:text-zinc-300 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <a 
                          href={`/blog/${postId}`}
                          className="inline-flex items-center text-slate-900 hover:text-slate-700 font-semibold transition-colors dark:text-zinc-50 dark:hover:text-zinc-200"
                        >
                          Lire l'article
                          <svg 
                            className="w-4 h-4 ml-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                          </svg>
                        </a>
                        <span className="text-sm text-slate-500 dark:text-zinc-400">
                          {Math.ceil(post.content.length / 300)} min de lecture
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
    </div>
  );
}
