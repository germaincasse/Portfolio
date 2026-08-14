/**
 * Toutes les infos "site" au meme endroit.
 * Modifier ici change le header, le footer, la home et les metadonnees SEO.
 */
export const site = {
  name: 'Germain Cassé',
  shortName: 'Germain Cassé',
  role: 'Game Developer',
  location: 'Remote — currently Batumi, GE',
  email: 'germaincasse@gmail.com',
  description:
    'Solo game developer working in Unity and Godot. I take games from prototype to release — gameplay systems, tools and shipping.',

  /** Deux lignes du hero. */
  hero: {
    line1: 'Game',
    line2: 'Developer',
    intro:
      'I build and ship games in Unity and Godot — gameplay systems, tools, and the unglamorous plumbing that gets a project to release. Solo, freelance, from anywhere.',
  },

  /** Bloc "What I do" de la home. */
  capabilities: [
    {
      icon: '/icons/games.png',
      title: 'Game Development',
      body: 'Full production in Unity and Godot, PC and mobile. Gameplay systems, multiplayer, editor tooling, performance work and release builds.',
      stack: ['Unity', 'Godot', 'C#', 'GDScript'],
    },
    {
      icon: '/icons/software.png',
      title: 'Software Development',
      body: 'Front-end and back-end when a game needs more than a client: dashboards, APIs, live content pipelines and player-facing tools.',
      stack: ['React', 'Node', 'SQL'],
    },
    {
      icon: '/icons/ai.png',
      title: 'AI & Data',
      body: 'Machine learning and data pipelines in Python — content generation, analytics on player data, and automation around production.',
      stack: ['Python', 'PyTorch', 'TensorFlow'],
    },
  ],

  /** Bloc "About". */
  about: [
    'I am Germain, a French developer who ships games solo. Most of my work is contract: a studio or a solo creative has a game to get out, and I handle the code from grey-box prototype to store page.',
    'That means gameplay systems, engine tooling, build pipelines and the last twenty percent nobody wants to touch. Unity and Godot are home, but I have shipped web and Python work too when a project needed it.',
    'I work remotely, currently from Georgia. Available for contract work.',
  ],

  /**
   * Liens du footer / contact. Ajouter ou retirer librement, ex:
   *   { label: 'GitHub',   url: 'https://github.com/<user>' },
   *   { label: 'itch.io',  url: 'https://<user>.itch.io' },
   *   { label: 'LinkedIn', url: 'https://www.linkedin.com/in/<user>' },
   */
  links: [{ label: 'Email', url: 'mailto:germaincasse@gmail.com' }],

  /** Navigation du header. */
  nav: [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;
