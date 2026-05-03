// ─────────────────────────────────────────────────────────────
//  src/lib/data.ts  — single source of truth for all content
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Renish",
  fullName: "Renish R",
  title: "Aspiring Software Engineer",
  description:
    "First-year B.Tech Computer Science student at LPU, India. Passionate about building impactful software and growing in the IT industry.",
  email: "renish474@gmail.com",
  location: "Punjab, India · LPU",
  github: "https://github.com/ren-ishh",
  linkedin: "https://www.linkedin.com/in/ren-ishh",
  instagram: "https://instagram.com/ren.ishh",
  twitter: "https://x.com/renishh7",
  url: "https://renish.dev", // update after Vercel deploy
};

export const heroRoles = [
  "Software Engineer",
  "Python Developer",
  "Web Developer",
  "Problem Solver",
  "CS Student @ LPU",
];

export const skills = [
  {
    category: "Languages",
    items: [
      { name: "Python",     level: 75, icon: "🐍" },
      { name: "C",          level: 65, icon: "⚙️" },
      { name: "JavaScript", level: 60, icon: "🟨" },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "HTML5", level: 82, icon: "🌐" },
      { name: "CSS3",  level: 78, icon: "🎨" },
    ],
  },
  {
    category: "Databases & Tools",
    items: [
      { name: "DBMS / SQL",  level: 60, icon: "🗄️" },
      { name: "Git & GitHub", level: 72, icon: "🔀" },
      { name: "VS Code",     level: 88, icon: "💻" },
      { name: "Linux CLI",   level: 55, icon: "🐧" },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Text Adventure Game",
    description:
      "A command-line text-based adventure game built in Python. Navigate rooms, make choices, and explore an interactive story entirely through the terminal.",
    longDescription:
      "Built using core Python — functions, loops, conditionals, and dictionaries. The game features multiple rooms, item collection, and branching story paths. A great demonstration of logical thinking and Python fundamentals.",
    tech: ["Python"],
    github: "https://github.com/ren-ishh/text-game",
    live: null,
    status: "Completed",
    featured: true,
  },
  {
    id: 2,
    title: "QuickRent",
    description:
      "A rental platform UI — a clean, responsive front-end interface for listing and browsing rental properties, built with HTML & CSS.",
    longDescription:
      "Demonstrates front-end layout skills with a property listing page, card-based design, and responsive layout using pure HTML and CSS. Focuses on clean structure and visual hierarchy.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/ren-ishh/quickrent",
    live: null,
    status: "Completed",
    featured: true,
  },
  {
    id: 3,
    title: "Student Institution Management",
    description:
      "A web-based management system for student and institution data, built with JavaScript for DOM-driven data handling.",
    longDescription:
      "Manages student records, course data, and institutional information. Built as a JavaScript project to practice DOM manipulation, event handling, and front-end logic.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/ren-ishh/student-institution-management-system",
    live: null,
    status: "Completed",
    featured: true,
  },
  {
    id: 4,
    title: "Digital Business Card",
    description:
      "A personal, shareable digital business card — a minimal HTML/CSS profile page built for instant first impressions.",
    longDescription:
      "A minimalistic personal profile card built with HTML and CSS. Designed to be shareable as a quick personal introduction link.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/ren-ishh/business-card",
    live: null,
    status: "Completed",
    featured: false,
  },
];

export const achievements = [
  {
    id: 1,
    title: "Google Python Professional Certificate",
    issuer: "Google · Coursera",
    year: "2024",
    type: "Certification",
    description:
      "Completed Google's official Python programming course — covering syntax, data structures, OOP fundamentals, and scripting.",
  },
  {
    id: 2,
    title: "Introduction to Artificial Intelligence",
    issuer: "Coursera",
    year: "2024",
    type: "Certification",
    description:
      "Foundational AI course covering machine learning concepts, neural networks, and the trajectory of intelligent systems.",
  },
  {
    id: 3,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2025",
    type: "Certification",
    description:
      "Core concepts in digital security, threat landscapes, and defence mechanisms. Future scope certification.",
  },
  {
    id: 4,
    title: "B.Tech CSE — Year 1",
    issuer: "Lovely Professional University",
    year: "2025 – Present",
    type: "Academic",
    description:
      "Actively studying core CS fundamentals — DSA, OS, DBMS, and building personal projects alongside the curriculum.",
  },
];

export const education = [
  {
    id: 1,
    degree: "B.Tech Computer Science & Engineering",
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    year: "2024 – 2028",
    status: "Current",
    description:
      "4-year engineering degree with focus on software development, data structures, algorithms, and emerging technologies.",
  },
  {
    id: 2,
    degree: "Class XII — Higher Secondary",
    institution: "Sacred Heart Matric Higher Secondary School",
    location: "India",
    year: "2024",
    status: "Completed",
    description: "Completed higher secondary education with a focus on science.",
  },
  {
    id: 3,
    degree: "Class X — Secondary School",
    institution: "Holy Cross Convent Matric School",
    location: "India",
    year: "2022",
    status: "Completed",
    description: "Completed secondary education with a strong academic foundation.",
  },
];