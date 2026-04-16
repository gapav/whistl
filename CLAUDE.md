# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Plannr is a React-based AI-powered youth sports training session planner. Coaches describe their training sessions in natural language (typically Norwegian), and the app parses them into structured, editable plans that can be exported as shareable HTML documents.

## Repository Structure

Only two files — no build system or package.json in this directory. These are React components intended to be used in a larger application:

- `plannr_app.js` — The full interactive planner (main app)
- `landing_page.js` — Marketing/demo landing page

## Architecture

### Main App (`plannr_app.js`)

**Data flow:**
1. User types a session description in the chat input
2. `handleSend()` appends the message and calls `callAI()`
3. `callAI()` sends the last 6 messages to Claude Sonnet (`claude-sonnet-4-20250514`) with the `SYSP` system prompt
4. Claude returns raw JSON: `{status:"ready", session:{...}}` or `{status:"need_info", message:"..."}`
5. On `"ready"`, `normSession()` transforms the AI response into the app's internal data structure
6. The session is rendered in **Edit** or **Preview** mode; users can manually adjust blocks, exercises, and teams
7. `doExport()` / `buildHTML()` generates a self-contained HTML file for download or clipboard copy

**Session data structure:**
```js
{
  id, title, startDateTime, coach, notes, createdAt,
  blocks: [
    // Regular block:
    { id, name, duration, detail, coachNotes, media, isSplit: false }
    // Station block:
    { id, name, duration, isSplit: true, switchAfter, stations: [
      { id, label, exercises: [{id, name, detail, coachNotes, media}], fieldZones }
    ]}
  ],
  teams: [{ id, label, players: [{id, name}] }]
}
```

**Key constants:**
- `DUR` — allowed block durations (e.g. "5 min" … "90 min")
- `SW` — allowed station rotation intervals (e.g. "5 min" … "30 min")
- `STN` / `STC` — station label names and colors (Red, Green, Pink, Yellow)
- `SYSP` — the Claude system prompt (defines JSON output schema and behavior)
- `TMPL` — example session text shown as a placeholder

**Claude API call:** Direct `fetch` to `https://api.anthropic.com/v1/messages`. No API key is stored in the code — it must be injected at runtime or via the hosting environment.

**Excel import:** `parseXLSX()` reads Hoopit-exported roster files (filters rows where `Role=player` and `Response=accepted`).

**Teams:** `shuffleInto(players, n)` distributes the player list randomly into `n` teams.

### Landing Page (`landing_page.js`)

Self-contained marketing page with animated demos (`Step1`, `Step2`) illustrating the problem (messy group chat) and the AI-powered solution. Uses the same color theme as the main app (`T` object).

## Styling Conventions

All styles are inline CSS-in-JS (no external stylesheets). The shared design tokens:

```js
var T = {
  bg: "#1C1B18",   // page background
  sf: "#2A2925",   // surface/card
  ac: "#E8580C",   // orange accent
  tx: "#E8E4DE",   // primary text
  // ...
};
```

Primary font: Inter. Monospace (times, durations): JetBrains Mono.

## Language

The app is Norwegian-first. The `SYSP` prompt instructs Claude to respond in the coach's language (typically Norwegian). All UI strings, example data, and error messages are in Norwegian.

## Modifying the AI Behavior

The entire AI parsing logic lives in the `SYSP` string constant at the top of `plannr_app.js`. Changes to the JSON schema returned by Claude must be reflected in both `SYSP` and `normSession()` (which transforms raw AI output into the internal session shape).
