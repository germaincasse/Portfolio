---
title: VSCode Tabs
tagline: Chrome-style tabs for VS Code windows, with live Claude Code activity on each tab.
role: Personal project
engine: C# / .NET
year: 2026
status: Released
tags: ['C#', '.NET', 'Win32', 'Windows', 'Tools']
# Pas encore de video: l'image est provisoire.
poster: /media/vscode-tabs/shot-01.webp
gallery: []
links:
  - { label: 'GitHub', url: 'https://github.com/germaincasse/VSCode-Tabs' }
accent: '#3d9df3'
category: software
order: 3
secret: true
draft: false
---

A Windows application that docks real VS Code windows into one tabbed window. Each
project keeps its own extension host, terminals and debugger: switching tabs is
instant and nothing reloads.

## What I built

Docking through Win32: each VS Code window is reparented into the host with
`SetParent`, after stripping the styles Windows would otherwise draw inside it. Its
original styles, owner and placement are saved, so every window goes back to the
desktop exactly as it was taken, crash included.

The tab bar doubles as the title bar, with drag, double click and Aero Snap, plus
per-project colors, reordering and global shortcuts. Each tab also shows what Claude
Code is doing in that project, read from its session transcripts: working, with the
number of active agents, finished, or waiting for an answer.
