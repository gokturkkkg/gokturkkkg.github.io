import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Trophy, Microscope, HeartPulse, Award, BookOpen, Dumbbell, Drama, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Göktürk Günbatı | Software Developer & Technology Researcher" },
      { name: "description", content: "Personal portfolio of Göktürk Günbatı, a High School Senior specializing in Software Development and Technology Research, targeting Business Informatics / MIS." },
      { property: "og:title", content: "Göktürk Günbatı | Software Developer & Technology Researcher" },
      { property: "og:description", content: "High School Senior | Software Developer & Technology Researcher | Targeting Business Informatics / MIS" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Göktürk Günbatı | Software Developer & Technology Researcher" },
      { name: "twitter:description", content: "High School Senior | Software Developer & Technology Researcher | Targeting Business Informatics / MIS" },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient gradient spheres */}
      <div className="glow-sphere -top-24 -left-24 h-80 w-80 bg-emerald-bright/30" />
      <div className="glow-sphere top-1/3 right-0 h-96 w-96 bg-mint/25" />
      <div className="glow-sphere bottom-40 left-1/4 h-72 w-72 bg-emerald-rich/20" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center">
          <div className="tag-pill mb-6 animate-fade-in">
            Targeting Business Informatics / Management Information Systems (MIS)
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-slate-dark sm:text-6xl lg:text-7xl">
            Göktürk <span className="text-gradient-emerald">Günbatı</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            High School Senior | Software Developer & Technology Researcher
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-emerald group"
            >
              <Linkedin className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              LinkedIn (800+ Network)
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-emerald-ghost group"
            >
              <Github className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              GitHub
            </a>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mt-28">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-dark sm:text-4xl">
              Tech & Research Projects
            </h2>
            <p className="mt-3 text-muted-foreground">
              A selection of technical work, competitions, and research.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              tag="3 Consecutive Years"
              title="TEKNOFEST Competitions"
              description="Led software design, system architecture, and technical documentation for Python-based engineering projects."
              icon={<Trophy className="h-5 w-5" />}
            />
            <ProjectCard
              tag="National Competition"
              title="TÜBİTAK 2204 Research"
              description="Engineered research software and conducted data analysis on environmental effects (Radon gas study) for national evaluation."
              icon={<Microscope className="h-5 w-5" />}
            />
            <ProjectCard
              tag="Harvard CS50P Capstone"
              title="Digital Health App"
              description="Designed and deployed a specialized digital health application featuring algorithmic data processing and database operations."
              icon={<HeartPulse className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* Certifications & Academic Strengths */}
        <section className="mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-dark sm:text-4xl">
              Certifications & Academic Strengths
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard
              title="Technical Certifications"
              icon={<Award className="h-5 w-5" />}
              items={[
                "Harvard CS50P Python Certified",
                "WHO Digital Health Systems Certified",
                "Generative AI & Power BI Training (BTK Akademi)",
                "IBM Data Science & AI (Ongoing)",
              ]}
            />
            <InfoCard
              title="Languages & Academics"
              icon={<BookOpen className="h-5 w-5" />}
              items={[
                "English (TOEFL iBT Candidate - Sep 2026)",
                "Russian (A1 Certified - RUDN / Stepik)",
                "Academic Honors (GPA 95/100 in 11th Grade)",
              ]}
            />
          </div>
        </section>

        {/* Extracurriculars & Athletics */}
        <section className="mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-dark sm:text-4xl">
              Extracurriculars & Athletics
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ExtracurricularCard
              title="School Theater Lead & Debate Champions"
              description="Lead actor in high school theater productions and 9th grade debate champion."
              icon={<Drama className="h-5 w-5" />}
            />
            <ExtracurricularCard
              title="Regional Athletics"
              description="1st Place Winner in Bursa Regional Weightlifting Championship & Traditional Turkish Archery competitor."
              icon={<Dumbbell className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* Blog & Research Writings */}
        <section className="mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-dark sm:text-4xl">
              Blog & Research Writings
            </h2>
            <p className="mt-3 text-muted-foreground">
              Thoughts on software, research, and emerging technology.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-28 border-t border-border pt-10 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Göktürk Günbatı. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}


function ProjectCard({
  tag,
  title,
  description,
  icon,
}: {
  tag: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="glass-card group relative rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-emerald-bright/30 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <span className="tag-pill">{tag}</span>
        <div className="rounded-full bg-mint-soft p-2 text-emerald-deep transition-colors group-hover:bg-emerald-bright group-hover:text-primary-foreground">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-slate-dark">{title}</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}

function InfoCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <article className="glass-card group rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-bright/30 hover:shadow-lg">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-full bg-mint-soft p-2 text-emerald-deep transition-colors group-hover:bg-emerald-bright group-hover:text-primary-foreground">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-dark">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-muted-foreground">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-bright" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ExtracurricularCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="glass-card group rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-bright/30 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-mint-soft p-2 text-emerald-deep transition-colors group-hover:bg-emerald-bright group-hover:text-primary-foreground">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-dark">{title}</h3>
      </div>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}
