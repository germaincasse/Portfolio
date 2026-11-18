---
title: Eldritch Break
tagline: A fast-paced solo boomer-shooter with hand-painted visuals.
role: Freelance for LunaticMoon
engine: Unity
year: 2026
status: Demo
tags: ['Unity', '3D', 'FPS', 'PC']
cover: /media/eldritch-break/cover.mp4
poster: /media/eldritch-break/shot-01.webp
preview: /media/eldritch-break/capsule.webp
gallery: []
links:
  - { label: 'Steam', url: 'https://store.steampowered.com/app/4438400/Eldritch_Break/' }
accent: '#a855f7'
order: 2
draft: false
---

A single-player boomer-shooter built for speed: dense arenas, weapons that reward
aggression, and enemies that never give you a moment to stand still.

Everything on screen is hand-painted, which puts the game closer to a moving
illustration than to a render, and keeps the readability high even when the
screen fills up.

## What I built

I am the only programmer on the team, so all the code is mine, from the first
prototype to the Steam demo, across more than fifty internal builds.

The player and the weapons: a first-person controller written from scratch on a
rigidbody and driven by forces, so momentum carries through jumps, slopes and the
Bite-Dash. Bitey, the living revolver, talks back with voiced and subtitled lines
that wait their turn instead of cutting over each other. The nine-barrel shotgun
knocks enemies back, and the cigarettes trade a moment of vulnerability for healing
and buffs, picked from a radial wheel with the mouse or a gamepad.

Enemies and fights: spider swarms that spread out instead of piling up, a ranged
enemy that keeps its distance and hops over cover, and a boss. Encounters are laid
out as waves in the editor, with gizmos for every trigger zone and spawn point, and
the music crossfades into combat while a wave is alive.

The level itself, from blockout to final geometry. Non-Euclidean corridors teleport
the player without a visible seam: the destination is rendered off screen ahead of
time, so nothing hitches on arrival. Two URP render features light it: sun shafts
raymarched through the shadow map, and an eye adaptation driven by where the player
stands rather than by what the frame shows.

Around the game: checkpoints and saves, quality presets, rebindable controls and
full controller support, tutorials and an end-of-level stats screen. And tools for
the team: Blender scripts that generate level meshes, editor tools for pipes and
chains, and an in-game cheat panel with a hitbox viewer for playtests.
