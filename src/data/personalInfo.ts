export type PersonalInfo = {
  sectionTitle: string;
  subtitle: string;
  /** Short bio / introductory paragraph shown in the spotlight section. */
  bio: string;
  /** Card highlighting what you are currently learning, reading, or researching. */
  currentFocus: {
    title: string;
    items: {
      label: string;
      value: string;
    }[];
  };
  /** Short micro-notes or quick thoughts. */
  quickThoughts: {
    title: string;
    notes: string[];
  };
};

/**
 * Edit this single object to update the "Göktürk's Corner" section.
 * No AI or rebuild tooling is required — just change the text below.
 */
export const personalInfo: PersonalInfo = {
  sectionTitle: "Göktürk's Corner",
  subtitle: "Personal spotlight, current focus, and quick notes.",
  bio: "I'm a high school senior who enjoys building software, reading about systems, and competing in research competitions. Outside of code, you'll find me in the theater, at the weightlifting platform, or exploring how technology can make organizations work better.",
  currentFocus: {
    title: "Current Focus",
    items: [
      { label: "Learning", value: "Advanced data analytics with Python, Power BI, and IBM Data Science coursework." },
      { label: "Reading", value: "Papers on AI in education and the intersection of business strategy with information systems." },
      { label: "Researching", value: "How low-cost sensor networks can improve environmental health monitoring." },
    ],
  },
  quickThoughts: {
    title: "Quick Thoughts / Micro-Notes",
    notes: [
      "The best code is the code you can explain to a teammate six months later.",
      "MIS sits exactly where my two interests meet: solving problems and shipping useful systems.",
      "A good research question is half the answer.",
      "Theater taught me that timing matters as much as content.",
    ],
  },
};
