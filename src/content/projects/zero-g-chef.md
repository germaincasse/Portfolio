---
title: Space Burger (unreleased)
tagline: A chaotic zero-gravity cooking game where ingredients float and aliens wait. Can you handle the chaos?
role: Personal project
engine: Unity
year: 2025
tags: ['Unity', '3D', 'Multiplayer', 'PC']
cover: /media/zero-g-chef/cover.mp4
poster: /media/zero-g-chef/shot-01.webp
# Screenshots en plus (le poster ci-dessus est deja affiche en grand).
# Deposer les fichiers dans public/media/zero-g-chef/ puis les lister ici :
#   - /media/zero-g-chef/shot-02.png
gallery: []
links: []
accent: '#6ee36e'
order: 1
draft: false
---

A co-op cooking game set in orbit. Orders come in from alien customers, ingredients
drift across the kitchen, and nothing stays on the counter.

## What I built

All of it: networked physics where each ingredient stays in sync across clients, a
recipe and order system driving the round loop, and the alien customer behaviour.

Zero gravity turns every object into a projectile, so most of the work went into
making grab, throw and collision behave the same on both machines once latency is
in the mix.
