---
title: Divedust
tagline: A 3D action game built around a card system, in a glassy Frutiger Aero world.
role: Freelance project
engine: Godot
year: 2026
status: In development
tags: ['Godot', '3D', 'Action', 'Card Game', 'PC']
cover: /media/divedust/cover.mp4
poster: /media/divedust/shot-01.webp
# Croquis de recherche avec le logo: c'est l'image qui identifie le jeu.
preview: /media/divedust/capsule.webp
gallery:
  - /media/divedust/shot-02.webp
  - /media/divedust/shot-03.webp
  - /media/divedust/shot-04.webp
links: []
accent: '#3fd0e0'
category: games
order: 1
secret: true
draft: false
---

Three modes around the same playable character: an action mode for traversal and
real-time combat, a turn-based card battle with a deck, and free exploration across
the studio's maps.

## What I built

The player controller shared by the three modes: sprint, slide, wall run, wall jump,
vault, ledge hang, parry, and a dodge with a perfect-dodge window, hit-stop and slow
motion. Every value is set in metres and seconds, and the scripts check their own
setup in the editor, so the level designer tunes movement without touching code.

A combat arena on top of it: enemies driven by a state machine pick telegraphed
attacks from move sets authored as resources, and the threatened area fills up on
the ground during the wind-up. Cards, dialogues, enemies and decks are resources
too, edited through a set of in-house content editors.
