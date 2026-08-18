import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
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
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-dark/50 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in glass-card relative my-4 w-full max-w-3xl rounded-2xl p-6 shadow-xl sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close article"
          className="absolute top-4 right-4 rounded-full border border-border bg-card/80 p-2 text-muted-foreground transition-all hover:rotate-90 hover:border-emerald-bright/40 hover:text-emerald-rich"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="tag-pill">{post.category}</span>
          <time className="text-xs font-medium text-muted-foreground" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-dark">{post.title}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{post.summary}</p>

        <div className="mt-8 space-y-5 border-t border-border pt-8">
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "heading":
      return <h3 className="pt-2 text-xl font-semibold text-slate-dark">{block.text}</h3>;
    case "paragraph":
      return <p className="leading-relaxed text-muted-foreground">{block.text}</p>;
    case "list":
      return (
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-emerald-bright/60 pl-4 text-lg leading-relaxed font-medium text-slate-dark italic">
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl border border-border bg-slate-dark/95 p-4 text-sm leading-relaxed">
          <code className="font-mono text-mint">{block.code}</code>
        </pre>
      );
    default:
      return null;
  }
}
