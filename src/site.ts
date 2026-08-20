/**
 * Toutes les infos "site" au meme endroit.
 * Modifier ici change le header, le footer, la home et les metadonnees SEO.
 */
export const site = {
  name: 'Germain Cassé',
  shortName: 'Germain Cassé',
  role: 'Game Developer',
  email: 'germaincasse@gmail.com',
  description:
    'Game developer working in Unity and Godot. Open to full-time and freelance roles.',

  /** Ligne d'accroche au-dessus du titre de la home. */
  availability: 'Open to full-time and freelance roles',

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

  /** Bloc "About": la phrase d'accroche, puis le corps du texte. */
  about: {
    lead: 'I am Germain, a young developer from France looking for new opportunities!',
    body: [
      'I build games in Unity and Godot. Gameplay systems, narrative engines, networked physics, and the editor tools that let a team add content without going back into the code every time.',
      'Most of that has been client work: a studio or a solo creative has a game to make, and I take care of the code from prototype to release build. Card battlers, visual novels, co-op multiplayer.',
      'Outside of games I also work on the web, front-end and back-end, and in Python for machine learning and data. Whatever a project needs around the game itself.',
      'I am looking for a full-time position as much as for freelance projects. If you have something in mind, my inbox is open.',
    ],
  },

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
