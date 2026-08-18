export type BlogPost = {
  slug: string;
  title: string;
  category: "Software" | "Research" | "Essays" | string;
  summary: string;
  date: string; // ISO date, e.g. "2026-08-12"
  /** Simple block-based content — add as many blocks as you like. */
  content: PostBlock[];
};

export type PostBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; language?: string; code: string };

/**
 * Add new articles by appending objects to this array.
 * Newest posts are shown first automatically (sorted by `date`).
 */
export const postsData: BlogPost[] = [
  {
    slug: "teknofest-lessons",
    title: "Lessons from 3 Years at TEKNOFEST",
    category: "Software",
    summary:
      "What leading Python-based engineering projects taught me about system architecture, teamwork, and rapid iteration under pressure.",
    date: "2026-08-12",
    content: [
      {
        type: "paragraph",
        text: "Three consecutive years of TEKNOFEST competitions reshaped how I think about building software: not as isolated code, but as a system that has to survive deadlines, hardware failures, and a team of people with different priorities.",
      },
      { type: "heading", text: "Architecture before code" },
      {
        type: "paragraph",
        text: "Our first year failed because we wrote features before agreeing on interfaces. In year two we started every sprint with a one-page diagram of data flow, and integration time dropped from days to hours.",
      },
      {
        type: "list",
        items: [
          "Define module boundaries before writing the first function",
          "Freeze data formats early; iterate on logic, not schemas",
          "Automate the boring parts: builds, tests, deployment",
        ],
      },
      { type: "heading", text: "A small utility that saved us" },
      {
        type: "code",
        language: "python",
        code: `def retry(fn, attempts=3, delay=0.5):
    """Retry a flaky hardware call before failing the run."""
    for i in range(attempts):
        try:
            return fn()
        except Exception:
            if i == attempts - 1:
                raise
            time.sleep(delay * (2 ** i))`,
      },
      {
        type: "quote",
        text: "The team that debugs fastest wins — not the team that writes the most code.",
      },
    ],
  },
  {
    slug: "radon-research",
    title: "Building Research Software for a TÜBİTAK Project",
    category: "Research",
    summary:
      "How I engineered data pipelines and analysis workflows for a Radon gas environmental-effects study evaluated at the national level.",
    date: "2026-07-04",
    content: [
      {
        type: "paragraph",
        text: "Scientific software has a different definition of 'done': the result has to be reproducible by someone who has never seen your machine.",
      },
      { type: "heading", text: "From raw sensors to clean datasets" },
      {
        type: "paragraph",
        text: "Radon measurements arrive noisy and irregularly sampled. We normalised timestamps, removed calibration drift, and stored every transformation step so any figure in the report could be traced back to raw input.",
      },
      {
        type: "code",
        language: "python",
        code: `df = (
    read_sensor_logs(path)
      .pipe(normalize_timestamps, freq="1H")
      .pipe(remove_drift, window=24)
      .pipe(flag_outliers, z=3.0)
)`,
      },
      {
        type: "list",
        items: [
          "Version every dataset, not just the code",
          "Prefer plain CSV/Parquet over proprietary formats",
          "Write the methodology section while coding, not after",
        ],
      },
    ],
  },
  {
    slug: "cs50p-health-app",
    title: "From CS50P to a Digital Health App",
    category: "Software",
    summary:
      "Reflecting on my Harvard CS50P capstone: designing algorithms, handling database operations, and shipping a real-world health tool.",
    date: "2026-06-18",
    content: [
      {
        type: "paragraph",
        text: "CS50P taught syntax; the capstone taught product thinking. Turning a class exercise into something a real person would open every morning meant caring about latency, data safety, and interface clarity.",
      },
      { type: "heading", text: "The data model came first" },
      {
        type: "paragraph",
        text: "Health data is append-only by nature. Instead of updating rows, I stored immutable measurement events and derived every summary on read — which made history, charts, and undo trivial.",
      },
      {
        type: "code",
        language: "sql",
        code: `CREATE TABLE measurements (
  id        INTEGER PRIMARY KEY,
  user_id   INTEGER NOT NULL,
  kind      TEXT    NOT NULL,
  value     REAL    NOT NULL,
  recorded  TEXT    NOT NULL
);`,
      },
    ],
  },
  {
    slug: "why-mis",
    title: "Why I Chose Business Informatics (MIS)",
    category: "Essays",
    summary:
      "An essay on standing between engineering and management, and why the translation layer between the two is where the real leverage lives.",
    date: "2026-05-09",
    content: [
      {
        type: "paragraph",
        text: "I like writing code, but I like deciding which code is worth writing even more. Business Informatics sits exactly at that intersection.",
      },
      { type: "heading", text: "Technology is a means, not the goal" },
      {
        type: "paragraph",
        text: "Every project I have joined failed or succeeded on communication far more often than on technical difficulty. MIS is the discipline that takes that seriously.",
      },
      {
        type: "quote",
        text: "The hardest engineering problem is usually the one nobody wrote down.",
      },
    ],
  },
  {
    slug: "ai-in-classrooms",
    title: "AI in Classrooms: Tool, Not Tutor",
    category: "Education",
    summary:
      "Notes from using large language models as a study partner for a full academic year — where they help, and where they quietly hurt.",
    date: "2026-04-02",
    content: [
      {
        type: "paragraph",
        text: "Used well, an LLM compresses hours of searching into minutes. Used badly, it replaces the struggle that actually creates understanding.",
      },
      {
        type: "list",
        items: [
          "Great for: explaining a concept five different ways",
          "Great for: reviewing your reasoning after you attempt it",
          "Dangerous for: producing answers you never verify",
        ],
      },
      { type: "heading", text: "A rule I follow" },
      {
        type: "paragraph",
        text: "I never ask for an answer before I have written down my own. The comparison is where the learning happens.",
      },
    ],
  },
  {
    slug: "reading-papers",
    title: "How I Read a Research Paper in 20 Minutes",
    category: "Research",
    summary:
      "A repeatable three-pass method for extracting the useful part of an academic paper without drowning in notation.",
    date: "2026-03-15",
    content: [
      { type: "heading", text: "Pass 1 — Shape" },
      {
        type: "paragraph",
        text: "Title, abstract, figures, conclusion. Five minutes. Decide whether the paper answers a question you actually have.",
      },
      { type: "heading", text: "Pass 2 — Argument" },
      {
        type: "paragraph",
        text: "Read the method section for the idea, skipping proofs. Write the core claim in one sentence in your own words.",
      },
      { type: "heading", text: "Pass 3 — Detail" },
      {
        type: "paragraph",
        text: "Only if you will build on it. Reproduce the key equation or algorithm by hand.",
      },
    ],
  },
];

/** Filter buttons shown above the grid. "All" is added automatically. */
export const postCategories = ["Software", "Research", "Essays", "Education"];
