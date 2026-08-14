---
title: Death Drive
tagline: A road-trip visual novel rich with unexpected phenomena.
role: Freelance project
engine: Godot
year: 2024
tags: ['Godot', '2D', 'Visual Novel', 'PC']
cover: /media/death-drive/cover.mp4
poster: /media/death-drive/shot-01.webp
# Screenshots en plus (le poster ci-dessus est deja affiche en grand).
# Deposer les fichiers dans public/media/death-drive/ puis les lister ici :
#   - /media/death-drive/shot-02.png
gallery: []
links: []
accent: '#5aa8d6'
order: 3
draft: false
---

Two people, one car, and a road that stops behaving like a road. A branching visual
novel about what the passenger seat sees and the driver refuses to.

## What I built

A narrative engine on top of Godot: a script format the writer edits directly,
branching and flag tracking across chapters, saves that survive mid-scene, and the
presentation layer that puts characters, transitions and dialogue timing on screen.

The rule was that nobody should have to open the engine to change a line. The
script is the source of truth and the game is what reads it.
