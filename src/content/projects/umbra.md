---
title: Umbra
tagline: An interactive atlas of solar eclipses, computed entirely in the browser.
role: Personal project
engine: JavaScript
year: 2026
status: Released
tags: ['JavaScript', 'Canvas', 'Astronomy', 'Web']
cover: /media/umbra/cover.mp4
poster: /media/umbra/shot-01.webp
gallery: []
links:
  - { label: 'Live site', url: 'https://germaincasse.github.io/Umbra/' }
  - { label: 'GitHub', url: 'https://github.com/germaincasse/Umbra' }
accent: '#e8c37a'
category: software
order: 2
secret: true
draft: false
---

Every solar eclipse from 2000 BC to the year 3000, on a world map or a globe. No
server, no build step, no dependencies: the shadow paths are computed on the fly,
when the page needs them.

## What I built

The astronomy engine: Sun and Moon positions from the Meeus series, Besselian
elements derived from that geometry, ΔT after Espenak and Meeus, then the central
line of each eclipse and the limits of its path. Click anywhere on the map and it
computes the local circumstances at that point: type, magnitude, obscuration,
duration.

Around it, the interface: two projections drawn on a canvas, the shadow animated as
it sweeps across the Earth, a timeline, GeoJSON export of the computed paths, and
French and English versions. On the modern era, the paths land within a few tens of
kilometres of the NASA canon.
