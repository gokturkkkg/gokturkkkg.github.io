import { Sparkles, BookOpen, Lightbulb, Quote } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";

export function PersonalSpotlight() {
  const { sectionTitle, subtitle, bio, currentFocus, quickThoughts } = personalInfo;

  return (
    <section className="mt-24">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-dark sm:text-4xl">
          {sectionTitle}
        </h2>
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bio card */}
        <article className="glass-card group relative flex flex-col rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-mint-soft p-2 text-emerald-deep transition-colors group-hover:bg-emerald-bright group-hover:text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-slate-dark">About Me</h3>
          </div>
          <p className="flex-grow leading-relaxed text-muted-foreground">{bio}</p>
        </article>

        {/* Current Focus card */}
        <article className="glass-card group rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-full bg-mint-soft p-2 text-emerald-deep transition-colors group-hover:bg-emerald-bright group-hover:text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-slate-dark">{currentFocus.title}</h3>
          </div>
          <ul className="space-y-4">
            {currentFocus.items.map((item, index) => (
              <li key={index} className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-rich">
                  {item.label}
                </span>
                <span className="leading-relaxed text-muted-foreground">{item.value}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Quick Thoughts card */}
        <article className="glass-card group rounded-2xl p-6 lg:col-span-3">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-full bg-mint-soft p-2 text-emerald-deep transition-colors group-hover:bg-emerald-bright group-hover:text-primary-foreground">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-slate-dark">{quickThoughts.title}</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickThoughts.notes.map((note, index) => (
              <div
                key={index}
                className="flex gap-3 rounded-xl border border-border bg-card/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-bright/30"
              >
                <Quote className="mt-0.5 h-4 w-4 shrink-0 text-emerald-bright" />
                <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
