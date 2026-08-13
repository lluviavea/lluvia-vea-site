export type NavItem = { label: string; href: string };
export type RoleEntry = {
  role: string;
  org: string;
  period: string;
  location: string;
  description: string;
  current: boolean;
  tags: string[];
};
export type EducationEntry = { title: string; org: string; period: string };
export type FactEntry = { label: string; value: string };
export type StatEntry = { value: string; label: string };
export type PortfolioCase = {
  index: string;
  title: string;
  blurb: string;
  tags: string[];
};

export const profile = {
  name: "Lluvia Esmeralda Vea Heredia",
  shortName: "Lluvia Vea",
  firstName: "Lluvia",
  initials: "LV",
  role: "Cosmetóloga · Cosmiatra",
  roleShort: "Cosmiatra",
  location: "Culiacán Rosales, Sinaloa, México",
  locationShort: "Culiacán, Sinaloa",
  email: "vea.lluvia@gmail.com",
  phoneDisplay: "+52 667 247 0858",
  whatsapp: "526672470858",
  linkedin: "https://www.linkedin.com/in/lluviavea",
};

export const cv = {
  label: "Descargar CV",
  hint: "PDF · LinkedIn",
  href: "/cv-lluvia-vea.pdf",
};

export const nav: NavItem[] = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Trayectoria", href: "#trayectoria" },
  { label: "Portafolio", href: "/portafolio" },
  { label: "Contacto", href: "#contacto" },
];

export const hero = {
  eyebrow: "Cosmiatría con visión de marketing",
  headlinePre: "Piel con propósito,",
  headlineAccent: "marca",
  headlinePost: "con presencia.",
  subhead:
    "Cosmiatra emprendedora en Culiacán. Uno el cuidado profesional de la piel con una mirada estratégica de marketing para crear experiencias de belleza que dejan huella.",
  primaryCta: { label: "Conectemos", href: "#contacto" },
  secondaryCta: { label: "Ver trayectoria", href: "#trayectoria" },
  stats: [
    { value: "4+", label: "años en cosmiatría" },
    { value: "2022", label: "fundé Serendipia" },
    { value: "100%", label: "enfocada en la piel" },
  ] as StatEntry[],
  marquee: [
    "Diagnóstico de piel",
    "Aparatología facial",
    "Cosmiatría",
    "Marketing",
    "Branding",
    "Serendipia",
    "Culiacán",
    "Belleza con propósito",
  ],
};

export const about = {
  heading: "Sobre mí",
  lead: "Cosmetóloga y cosmiatra que entiende la piel y la marca.",
  paragraphs: [
    "Soy Lluvia Esmeralda Vea Heredia, cosmetóloga y cosmiatra radicada en Culiacán, Sinaloa. Combino el cuidado profesional de la piel con una visión estratégica de marketing para crear experiencias de belleza con propósito.",
    "Fundé Serendipia, mi propia cabina, donde aplico diagnóstico facial y aparatología de vanguardia. Mi objetivo es aportar mis conocimientos técnicos y creativos a un nivel profesional, conectando la cosmiatría con el poder de la marca.",
  ],
  facts: [
    { label: "Basada en", value: "Culiacán, Sinaloa" },
    { label: "Especialidad", value: "Cosmiatría facial" },
    { label: "Enfoque", value: "Diagnóstico y aparatología" },
    { label: "Formación", value: "Marketing · UAS" },
  ] as FactEntry[],
  skills: [
    "Diagnóstico de piel facial",
    "Aparatología facial",
    "Marketing y branding",
    "Atención al cliente",
    "Emprendimiento",
    "Comunicación",
  ],
  quote:
    "Gran pasión por la mercadotecnia, esperando aportar mis conocimientos a un nivel profesional.",
  quoteSource: "Perfil de LinkedIn",
};

export const journey: RoleEntry[] = [
  {
    role: "Cosmiatra — Fundadora",
    org: "Serendipia",
    period: "Jul 2022 — Presente",
    location: "Culiacán, México",
    description:
      "Emprendimiento de cabina propia dedicada a la cosmiatría facial. Diagnóstico de piel, tratamientos con aparatología y acompañamiento personalizado de cada cliente.",
    current: true,
    tags: ["Aparatología", "Diagnóstico facial", "Emprendimiento"],
  },
  {
    role: "Aprendiz en prácticas",
    org: "Universidad Autónoma de Sinaloa",
    period: "Feb 2021 — Presente",
    location: "Sinaloa, México",
    description:
      "Formación continua y participación en proyectos académicos vinculados al marketing dentro de la Universidad Autónoma de Sinaloa.",
    current: true,
    tags: ["Marketing", "Investigación", "Desarrollo profesional"],
  },
];

export const education: EducationEntry[] = [
  {
    title: "Licenciatura en Marketing",
    org: "Universidad Autónoma de Sinaloa",
    period: "Sep 2016 — Jun 2021",
  },
];

export const portfolio = {
  eyebrow: "Portafolio",
  title: "Próximamente",
  description:
    "Estoy preparando una colección de casos, tratamientos y proyectos donde la cosmiatría se encuentra con el marketing. Muy pronto, un espacio para mostrar el trabajo con la misma piel con la que lo construyo.",
  cta: "Ver portafolio",
};

export const portfolioPage = {
  eyebrow: "Portafolio",
  headlinePre: "Donde la cosmiatría",
  headlineAccent: "encuentra",
  headlinePost: "al marketing.",
  lead: "Estoy curando una colección de casos, tratamientos y proyectos con el mismo esmero con el que trato la piel. Mientras se llena, esto es lo que se viene.",
  casesNote: "Piezas en preparación",
  cases: [
    {
      index: "01",
      title: "Estudio de caso — Cabina Serendipia",
      blurb:
        "El recorrido completo de una clienta: de la consulta al diagnóstico, al plan de tratamiento y al seguimiento.",
      tags: ["Diagnóstico facial", "Aparatología", "Antes / Después"],
    },
    {
      index: "02",
      title: "Marca personal — Cosmiatra emprendedora",
      blurb:
        "Cómo construí la identidad visual y el tono de una cosmiatra con visión de marketing: colores, voz y presencia digital.",
      tags: ["Branding", "Marketing", "Identidad"],
    },
    {
      index: "03",
      title: "Serie educativa de piel",
      blurb:
        "Contenido para explicar rutinas y tratamientos faciales en términos que las personas sí entienden y recuerdan.",
      tags: ["Contenido", "Educación", "Piel"],
    },
  ] as PortfolioCase[],
  ctaLabel: "Conectemos",
  ctaHref: "/#contacto",
};

export const contact = {
  heading: "Contacto",
  title: "Construyamos algo hermoso.",
  lead: "¿Colaboración, sesión o simplemente conectar? Escríbeme y te respondo con cariño.",
  emailLabel: "Correo",
  whatsappLabel: "WhatsApp",
  linkedinLabel: "LinkedIn",
};

export const twin = {
  label: "Habla conmigo",
  title: "Digital Twin",
  subtitle: "Respondo sobre la carrera y visión de Lluvia.",
  placeholder: "Pregunta sobre su trayectoria…",
  greeting:
    "¡Hola! Soy el digital twin de Lluvia 👋✨ Pregúntame lo que quieras sobre su trayectoria, su cabina Serendipia o su visión de la cosmiatría con marketing.",
  sendLabel: "Enviar",
  openLabel: "Abrir chat",
  closeLabel: "Cerrar",
  suggestions: [
    "¿Cuál es tu trayectoria?",
    "¿Qué hace una cosmiatra?",
    "¿Qué es Serendipia?",
    "¿Cómo la contacto?",
  ],
};

export const footer = {
  tagline: "Cosmiatría con propósito · Marketing con presencia.",
  rights: "Todos los derechos reservados.",
  builtIn: "Hecho con cariño desde Sinaloa, México.",
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
