"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Play, Pause } from "lucide-react";

type PodcastEpisode = {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  imageUrl: string;
};

const STORAGE_KEY = "cameroonpoi.podcastEpisodes.v1";

const DEFAULT_IMAGE_URL = "/gastro.jpeg";
const ALTERNATE_IMAGE_URL = "/chemin.jpeg";

const seedEpisodes: PodcastEpisode[] = [
  {
    id: "seed-1",
    title: "Épisode 01 — Découvrir les incontournables",
    description: "Comment bien commencer: repères, budget, et premières visites à privilégier.",
    duration: "18:42",
    date: "2025-12-03",
    imageUrl: "/gastro.jpeg",
  },
  {
    id: "seed-2",
    title: "Épisode 02 — Culture et gastronomie",
    description: "Saveurs, marchés et bonnes pratiques pour manger local en toute sérénité.",
    duration: "22:10",
    date: "2025-12-12",
    imageUrl: "/chemin.jpeg",
  },
  {
    id: "seed-3",
    title: "Épisode 03 — Itinéraires et routes",
    description: "Des conseils simples pour planifier, se déplacer, et profiter sans stress.",
    duration: "16:05",
    date: "2025-12-21",
    imageUrl: "/gastro.jpeg",
  },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

const newId = () => {
  const maybe = globalThis.crypto?.randomUUID?.();
  return maybe ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          const incoming = parsed as Partial<PodcastEpisode>[];
          const normalized = incoming
            .filter((p) => p && typeof p === "object")
            .map((p) => ({
              id: String(p.id ?? newId()),
              title: String(p.title ?? ""),
              description: String(p.description ?? ""),
              duration: String(p.duration ?? "00:00"),
              date: String(p.date ?? todayISO()),
              imageUrl: String(p.imageUrl ?? DEFAULT_IMAGE_URL),
            }))
            .filter((p) => p.title.trim().length > 0 && p.description.trim().length > 0);
          
          setEpisodes(normalized.length >= 3 ? normalized : [...normalized, ...seedEpisodes.slice(0, 3 - normalized.length)]);
          return;
        }
      } catch {
        // ignore
      }
    }

    setEpisodes(seedEpisodes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEpisodes));
  }, []);

  const canSubmit = useMemo(() => {
    return title.trim().length > 0 && description.trim().length > 0;
  }, [title, description]);

  const togglePlayPause = (episodeId: string) => {
    if (currentAudio === episodeId) {
      audioRef.current?.pause();
      setCurrentAudio(null);
    } else {
      // Créer un nouvel élément audio si nécessaire
      if (!audioRef.current) {
        audioRef.current = new Audio('/sample-audio.mp3');
        audioRef.current.onended = () => setCurrentAudio(null);
      } else {
        audioRef.current.pause();
      }
      
      audioRef.current.play().catch(e => console.error("Erreur de lecture audio:", e));
      setCurrentAudio(episodeId);
    }
  };

  useEffect(() => {
    // Nettoyer l'audio lors du démontage du composant
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const finalImageUrl = imageUrl.trim() || (episodes.length % 2 === 0 ? DEFAULT_IMAGE_URL : ALTERNATE_IMAGE_URL);

    const next: PodcastEpisode = {
      id: newId(),
      title: title.trim(),
      description: description.trim(),
      duration: duration.trim() || "00:00",
      date: todayISO(),
      imageUrl: finalImageUrl,
    };

    setEpisodes((prev) => {
      const updated = [next, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    setTitle("");
    setDescription("");
    setDuration("");
    setImageUrl("");
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">Podcast</h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-zinc-300">
            Écoute des épisodes sur la culture, le tourisme et les histoires derrière les lieux du Cameroun.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen((v) => !v)}
          className="shrink-0 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isFormOpen ? "Fermer" : "Ajouter un podcast"}
        </button>
      </div>

        {isFormOpen && (
          <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-200">Titre</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                  placeholder="Ex: Épisode 04 — Voyager en saison des pluies"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-200">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 min-h-[120px]"
                  placeholder="De quoi parle l'épisode ?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-200">Durée (optionnel)</label>
                <input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="00:00"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-200">Image (optionnel)</label>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/gastro.jpeg ou /chemin.jpeg"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                />
              </div>

              <div className="flex justify-end gap-3">
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

        {episodes.length === 0 ? (
          <div className="text-slate-600 dark:text-zinc-300">Chargement…</div>
        ) : (
          <div className="grid gap-5">
            {episodes.map((episode) => (
              <article key={episode.id} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow dark:border-zinc-800 dark:bg-zinc-950">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-900 mb-4">
                  <Image
                    src={episode.imageUrl}
                    alt={episode.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 100vw"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">{episode.title}</h2>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 shrink-0">{episode.date}</span>
                </div>
                <p className="mt-2 text-slate-600 dark:text-zinc-300">{episode.description}</p>

                <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-200 dark:bg-zinc-900/50 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => togglePlayPause(episode.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        aria-label={currentAudio === episode.id ? "Mettre en pause" : "Écouter"}
                      >
                        {currentAudio === episode.id ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                      </button>
                      <span className="text-sm font-medium text-slate-900 dark:text-zinc-100">
                        {currentAudio === episode.id ? 'En cours de lecture...' : 'Écouter l\'épisode'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-zinc-400">{episode.duration}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-amber-50 p-6 border border-amber-100 dark:bg-amber-950/30 dark:border-amber-900/40">
          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-200">Tu veux sponsoriser un épisode ?</h3>
          <p className="mt-2 text-amber-900/80 dark:text-amber-200/80">
            On pourra ajouter un espace sponsor, des liens d’écoute (Spotify/Apple Podcasts) et un flux RSS.
          </p>
        </div>
    </div>
  );
}
