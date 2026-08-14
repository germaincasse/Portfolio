/**
 * Toutes les infos "site" au meme endroit.
 * Modifier ici change le header, le footer, la home et les metadonnees SEO.
 */
export const site = {
  name: 'Germain Cassé',
  shortName: 'Germain Cassé',
  role: 'Game Developer',
  location: 'Remote, currently Batumi, GE',
  email: 'germaincasse@gmail.com',
  description:
    'Game developer working in Unity and Godot. Contract work, from prototype to release.',

  hero: {
    intro:
      'I build games in Unity and Godot, mostly on contract. Gameplay code, tools, and getting builds out.',
  },

  /** Bloc "What I do" de la home. */
  capabilities: [
    {
      icon: '/icons/games.png',
      title: 'Game Development',
      body: 'Unity and Godot, PC and mobile. Gameplay systems, multiplayer, editor tools, release builds.',
      stack: ['Unity', 'Godot', 'C#', 'GDScript'],
    },
    {
      icon: '/icons/software.png',
      title: 'Software Development',
      body: 'Front-end and back-end when a project needs more than a game client: APIs, dashboards, content pipelines.',
      stack: ['React', 'Node', 'SQL'],
    },
    {
      icon: '/icons/ai.png',
      title: 'AI & Data',
      body: 'Python for machine learning and data work: content generation, analytics, automation.',
      stack: ['Python', 'PyTorch', 'TensorFlow'],
    },
  ],

  /** Bloc "About". */
  about: [
    'I am Germain, a French developer. Most of my work is contract: a studio or a solo creative needs a game built, and I write the code.',
    'Gameplay systems, engine tools, build pipelines. Unity and Godot mostly, plus web and Python when a project calls for it.',
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
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;
