---
title: Hopf
tagline: A 4D game engine and its editor, for worlds with four spatial dimensions.
role: Personal project
engine: C++ / OpenGL
year: 2026
status: In development
tags: ['C++', 'OpenGL', 'Engine', '4D', 'Dear ImGui']
cover: /media/hopf/cover.mp4
poster: /media/hopf/shot-01.webp
gallery: []
links:
  - { label: 'GitHub', url: 'https://github.com/germaincasse/Hopf-4D' }
accent: '#f08a4b'
category: software
order: 1
secret: true
draft: false
---

An engine in the spirit of Unity or Godot, for games whose world has four spatial
dimensions. The editor shows a 4D scene the only ways a screen can: as a slice
through a hyperplane, or as a projection down to 3D.

## What I built

All of it, in C++20 on OpenGL 4.6 and Dear ImGui. The 4D math, with rotations in six
planes instead of three. The meshes of the regular polytopes and their cousins:
tesseract, 16-cell, 24-cell, duoprisms, cubinder, spherinder. Slicing and projection,
four display styles, and an editor with dockable panels, several viewports, picking,
gizmos and a scene hierarchy.

On top of that, a first game layer: collisions and rigid bodies between hypersolids,
script components, audio, and two small example games, a 4D minigolf and a 4D
minesweeper. Math, geometry and scene code are covered by Catch2 unit tests.
