import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { postsData, postCategories, type BlogPost, type PostBlock } from "@/data/posts";

const PAGE_SIZE = 6;

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BlogSection() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [active, setActive] = useState<BlogPost | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...postsData]
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .filter((p) => (category === "All" ? true : p.category === category))
      .filter((p) =>
        q === ""
          ? true
          : p.title.toLowerCase().includes(q) ||
            p.summary.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q),
      );
  }, [category, query]);

  const shown = filtered.slice(0, visible);

  const categories = ["All", ...postCategories];

  return (
    <section className="mt-24">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-dark sm:text-4xl">
          Blog & Research Writings
        </h2>
        <p className="mt-3 text-muted-foreground">
          Thoughts on software engineering, technology research, and academic projects.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => {
            const activeCat = c === category;
            return (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCategory(c);
                  setVisible(PAGE_SIZE);
                }}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                  activeCat
                    ? "border-transparent bg-emerald-rich text-primary-foreground shadow-sm"
                    : "border-border bg-card/60 text-muted-foreground hover:-translate-y-0.5 hover:border-emerald-bright/40 hover:text-emerald-rich"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search posts…"
            aria-label="Search blog posts"
            className="w-full rounded-full border border-border bg-card/60 py-2 pr-4 pl-9 text-sm text-slate-dark outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-bright/60"
          />
        </div>
      </div>

      {/* Grid */}
      {shown.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No posts match your search yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((post) => (
            <article
              key={post.slug}
              role="button"
              tabIndex={0}
              onClick={() => setActive(post)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(post);
                }
              }}
              className="glass-card group flex cursor-pointer flex-col rounded-2xl p-6 text-left transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-emerald-bright/30 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="tag-pill">{post.category}</span>
                <time className="text-xs font-medium text-muted-foreground" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
              <h3 className="text-xl font-semibold leading-snug text-slate-dark">{post.title}</h3>
              <p className="mt-3 flex-grow leading-relaxed text-muted-foreground">{post.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-rich transition-colors group-hover:text-emerald-deep">
                Read Post
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </article>
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-emerald-bright/40 bg-card/60 px-6 py-2.5 text-sm font-semibold text-emerald-rich transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-rich hover:text-primary-foreground hover:shadow-md"
          >
            Load More
          </button>
        </div>
      )}

      {active && <PostModal post={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function PostModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-dark/50 p-0 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in glass-card relative my-0 w-full max-w-3xl rounded-none p-6 shadow-xl sm:my-4 sm:rounded-2xl sm:p-12"
      >
        <div className="sticky top-0 z-10 -mx-6 mb-6 flex items-center justify-between gap-3 border-b border-border bg-card/85 px-6 py-3 backdrop-blur-md sm:-mx-12 sm:px-12">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-bright/40 bg-card/70 px-4 py-2 text-sm font-semibold text-emerald-rich transition-all duration-300 hover:-translate-x-0.5 hover:bg-emerald-rich hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close article"
            className="rounded-full border border-border bg-card/80 p-2 text-muted-foreground transition-all hover:rotate-90 hover:border-emerald-bright/40 hover:text-emerald-rich"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="tag-pill">{post.category}</span>
          <time className="text-xs font-medium text-muted-foreground" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </div>

        <h2 className="text-3xl leading-tight font-bold tracking-tight text-balance text-slate-dark sm:text-4xl">
          {post.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.summary}</p>

        <div className="mx-auto mt-8 max-w-[68ch] space-y-6 border-t border-border pt-8 text-[1.0625rem]">
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mt-12 flex justify-center border-t border-border pt-8">
          <button
            type="button"
            onClick={onClose}
            className="btn-emerald hover:-translate-y-0.5 hover:shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </button>
        </div>
      </div>
    </div>
  );
}


function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h3 className="pt-4 text-2xl font-bold tracking-tight text-slate-dark">{block.text}</h3>
      );
    case "paragraph":
      return <p className="leading-[1.85] text-muted-foreground">{block.text}</p>;
    case "list":
      return (
        <ul className="list-outside list-disc space-y-2 pl-5 marker:text-emerald-bright text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i} className="leading-[1.85] pl-1">
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="rounded-r-xl border-l-4 border-emerald-bright/60 bg-mint-soft/40 py-3 pr-4 pl-5 text-lg leading-relaxed font-medium text-slate-dark italic">
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <figure className="overflow-hidden rounded-xl border border-border bg-slate-dark/95">
          {block.language && (
            <figcaption className="border-b border-white/10 px-4 py-2 font-mono text-xs tracking-wide text-mint/70 uppercase">
              {block.language}
            </figcaption>
          )}
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code className="font-mono text-mint">{block.code}</code>
          </pre>
        </figure>
      );
    default:
      return null;
  }
}

