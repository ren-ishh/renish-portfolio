// src/lib/data.ts — single source of truth for all portfolio content

export const siteConfig = {
  name:        "Renish",
  fullName:    "Renish R",
  title:       "Aspiring Software Engineer",
  description: "First-year B.Tech CSE student at LPU building real things, learning fast, and aiming for a meaningful career in software.",
  email:       "renish474@gmail.com",
  location:    "Punjab, India · LPU",
  github:      "https://github.com/ren-ishh",
  linkedin:    "https://www.linkedin.com/in/ren-ishh",
  instagram:   "https://instagram.com/ren.ishh",
  twitter:     "https://x.com/renishh7",
  url:         "https://renish.vercel.app",
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
      { name: "Python",     level: 75 },
      { name: "C",          level: 65 },
      { name: "JavaScript", level: 60 },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "HTML5", level: 82 },
      { name: "CSS3",  level: 78 },
      { name: "React", level: 40 }
    ],
  },
  {
    category: "Databases & Tools",
    items: [
      { name: "DBMS / SQL",   level: 60 },
      { name: "Git & GitHub", level: 72 },
     
      { name: "Linux CLI",    level: 55 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Text Adventure Game",
    description:
      "A command-line text-based adventure game built in Python. Navigate rooms, collect items, and follow branching story paths — all through the terminal.",
    longDescription:
      "Built using core Python — functions, loops, conditionals, and dictionaries. Features multiple rooms, item collection, and branching story paths. A solid demonstration of logical thinking and Python fundamentals applied to game design.",
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
      "A clean, responsive rental platform UI concept — built to practise real-world front-end layout and card-based design with pure HTML & CSS.",
    longDescription:
      "Demonstrates front-end layout skills through a property listing interface with responsive cards, clean typography, and structured HTML semantics. No frameworks — just solid fundamentals.",
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
      "A JavaScript-driven web app for managing student records, course data, and institutional information with full DOM interactivity.",
    longDescription:
      "Built to practice DOM manipulation, event-driven logic, and data management in the browser. Handles CRUD-style operations for student and institutional records entirely client-side.",
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
      "A minimal, shareable personal profile card — a clean HTML/CSS page designed for instant first impressions.",
    longDescription:
      "A focused exercise in clean HTML structure and CSS layout. Designed to be shared as a lightweight personal introduction link.",
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
      "Completed Google's official Python programming course — covering syntax, data structures, OOP, and real-world scripting.",
  },
  {
    id: 2,
    title: "Introduction to Artificial Intelligence",
    issuer: "Coursera",
    year: "2024",
    type: "Certification",
    description:
      "Foundational AI course covering machine learning concepts, neural network basics, and the trajectory of intelligent systems.",
  },
  {
    id: 3,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2025",
    type: "Certification",
    description:
      "Core concepts in digital security, common threat landscapes, and modern defence strategies.",
  },
  {
    id: 4,
    title: "B.Tech CSE — Year 1",
    issuer: "Lovely Professional University",
    year: "2024 – Present",
    type: "Academic",
    description:
      "Actively studying core CS fundamentals — DSA, OS, DBMS — while building personal projects alongside coursework.",
  },
];

export const education = [
  {
    id: 1,
    degree: "B.Tech Computer Science & Engineering",
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    year: "2025 – 2029",
    status: "Current",
    description:
      "4-year engineering programme focused on software development, data structures, algorithms, and emerging technologies.",
  },
  {
    id: 2,
    degree: "Class XII — Higher Secondary",
    institution: "Sacred Heart Matric Higher Secondary School",
    location: "India",
    year: "2024",
    status: "Completed",
    description: "Completed higher secondary education with a focus on science stream.",
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