---
title: Starborn
tagline: A card-based fighting game with dozens of cards, enemies and build-defining synergies.
role: Freelance project
engine: Godot
year: 2025
tags: ['Godot', '2D', 'Card Game', 'PC']
cover: /media/starborn/cover.mp4
poster: /media/starborn/shot-01.webp
# Screenshots en plus (le poster ci-dessus est deja affiche en grand).
# Deposer les fichiers dans public/media/starborn/ puis les lister ici :
#   - /media/starborn/shot-02.png
gallery: []
links: []
accent: '#e0a03c'
order: 2
draft: false
---

A turn-based duel game where each fight depends on the deck you brought and the
order you play it in. Damage types, blocks, statuses and enemy intents stack.

## What I built

The combat engine and the content pipeline behind it. Cards and enemies are data
rather than code, so new content gets authored and balanced without touching turn
resolution.

Scale was the constraint: dozens of cards means every interaction has to resolve in
a predictable order, and each new card has to be cheap to add.
