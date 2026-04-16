# Plannr — Design Plan v2

Living document. The landing page walks a coach through **four steps**. We're rewriting steps 1 and 2, which forces adjustments to steps 3 and 4. Decisions made here also shape the real app (Phase 2).

---

## Product narrative (target)

1. **Problemet** — Gruppechatten drukner treningsplanen i støy.
2. **Løsningen** — Coachen oppretter en økt i Plannr, velger dato, chatter med AI-en, og planen bygges live.
3. **Resultatet** — Planen havner automatisk på lagets delte kalender/liste.
4. **Delingen / verktøyet** — (TBD — see open questions)

---

## Step 1 — "Problemet" (rewrite)

### What's broken today

- Chat container doesn't autoscroll → the climax ("Hva var planen?") often lands offscreen.
- Only 4 messages in the pool. Not enough mass to feel overwhelming.
- Messages are all training-related. The real chaos of a youth-sports chat is the *mix* (dugnad, loddsalg, kjøring) drowning out the one message that matters.

### New design

- **Accelerating cadence.** Messages arrive with shrinking gaps: ~900ms → 700ms → 500ms → 350ms → 250ms. Feels like a dam breaking.
- **Autoscroll.** Container scrolls to the latest message on each append (`scrollIntoView({ behavior: "smooth", block: "end" })` on a ref at the bottom).
- **Opacity fade.** Older messages fade toward ~25% opacity as they scroll up. Easy rule: every message older than the last 3 gets `opacity: 0.35`. Creates a visual "noise" layer.
- **Climactic final message.** `"Hva var egentlig treningsplanen idag igjen?? 😅"` — full opacity, slight scale-up + pulse highlight, maybe a thin accent border. Followed by a brief pause before the section caption resolves to `Planen druknet. / Det finnes en bedre måte.`
- **Keep** the phone frame, avatars, notification overlay accumulation.

### Message pool (Norwegian, draft — edit freely)

Neutral chatter interleaved with a few training-adjacent ones:

1. "Hvem skal ha med ekstra vester?"
2. "Loddsalget starter på lørdag — alle må ta med minst ett hefte 🙏"
3. "Kaker til kampen lørdag — noen frivillige?"
4. "Glemte nøkkelen til hallen, kan noen låse opp?"
5. "Er det dugnad neste tirsdag?"
6. "Noen som har ekstra håndball?"
7. "Må hente Jonas tidlig i dag, kan noen andre kjøre?"
8. "Kampen på lørdag flyttet til kl 11"
9. "Sorry, kommer 10 min sent"
10. "Fakturaen for cupen kom i dag — sjekk mail"
11. "Noen som har bilder fra treningen?"
12. "hvem har ansvar for oppvarmingen?"
13. **(final, emphasized)** "Hva var egentlig treningsplanen idag igjen?? 😅"

A mini-variant pool (2–3 notifications that slide in top) stays but can also escalate.

### Technical notes

- Drive timing from a `delays` array (`[900, 900, 700, 700, 500, 500, 350, 350, 250, 250, 250, 600]`) rather than uniform interval.
- Reset on section re-entry (if the parent ever re-mounts Step1).
- Use CSS `@keyframes` for the final-message pulse; existing `fadeU` / `slideD` can stay.

---

## Step 2 — "Løsningen" (redesign)

### Concept shift

Old: "paste text into a chatbot, get a parsed plan back."
New: "inside the Plannr app, the coach creates a session on a specific date, chats with the AI, and watches the structured plan assemble in real time beside the conversation. When it's done, the plan is already on the team's calendar."

### Layout — desktop (split)

Horizontal 2-column composition inside a single app-frame card:

```
┌─────────────────────────────────────────────────────────────────┐
│  Ny økt  ▸  Torsdag 17. april ▼                   [Lagre] [Del] │
├───────────────────────────────┬─────────────────────────────────┤
│  CHAT (≈40%)                  │  PLAN PREVIEW (≈60%)            │
│                               │                                  │
│  [AI] Hva skal dere jobbe     │  (empty state → populates live)  │
│       med i dag?              │                                  │
│                               │   17:00 Oppvarming   10 min      │
│  [me] Oppvarming, pasnings-   │   17:10 Kast til trener  5 min   │
│       lek, stasjoner          │   17:15 Stasjoner     40 min     │
│                               │        🔴 Angrep 2v1             │
│  [AI] Hvor lenge på           │        🟢 Forsvar                │
│       stasjonene?             │        🩷 Hinderløype            │
│                               │   17:55 Avslutning     5 min     │
│  [typing indicator]           │                                  │
│                               │                                  │
│  ┌─────────────────────┐  ▶   │                                  │
│  │ Beskriv økten…      │      │                                  │
│  └─────────────────────┘      │                                  │
└───────────────────────────────┴─────────────────────────────────┘
```

### Layout — mobile

Vertical stack: plan preview on top (collapsed/peeking), chat below. Or tabbed toggle (Chat / Plan). Desktop-first for now; mobile can be a follow-up.

### Scripted animation flow

1. **t=0** Empty frame: date dropdown shows "Torsdag 17. april ▼", plan column reads *"Ingen blokker enda — fortell AI-en hva dere skal gjøre."*
2. **t=600ms** AI opens: *"Hei Gard! Hva skal dere trene på i dag?"*
3. **t=1600ms** Coach types (char-by-char): *"Oppvarming 10 min, pasningslek. Kast til trener 5 min. Stasjoner 40 min bytte 12 min — angrep 2v1 (Magnus), forsvar (Camilla), hinderløype (Gard). Avslutning."*
4. **t≈3500ms** AI: *"Perfekt, lager øktplanen..."* with typing dots.
5. **t=4200ms** **Transformation beam** — subtle animated gradient/particles between chat column and plan column (orange → fade). This is the "ah, that's where the text becomes structure" moment.
6. **t=4600ms** Plan blocks appear one by one on the right, fade-up, ~200ms stagger. Station chips animate in last.
7. **t=6500ms** Small toast slides in bottom-right: *"Lagt til på lagets kalender ✓"*. This foreshadows Step 3.

### Technical notes

- Use a two-phase state machine for `ph` (phase): `idle → coachTyping → coachSent → aiThinking → transforming → planRendering → done`.
- Plan blocks stagger via individual `FI` fade-ins with computed delays.
- "Transformation beam" can be a CSS-only gradient bar with `animation: beam 0.8s ease` sweeping left-to-right.
- Data source for the plan: the existing `outBlocks` array — no schema change needed.
- Date dropdown is cosmetic (non-interactive) for the landing page. In the real app it drives the session's `startDateTime`.

---

## Ripple effects — Steps 3 & 4

Step 2 now ends with "plan on team calendar." That pulls the rug out from under today's Steps 3 and 4:

- **Step 3 today** (Resultatet — Ferdig plan): zoomed view of a single rendered plan. Still useful but partially shown already in Step 2's right column.
- **Step 4 today** (Dele — Send til laget): the *sharing* story. Largely obsolete if Step 2 already put the plan on a shared calendar.

### Proposed resolution (needs your sign-off)

- **Step 3 → "Laget ser det"**: pull back from the single plan to the **team calendar/list**. Show 3–4 upcoming sessions with today's highlighted. Tap one → expands to the full plan (uses today's Step 3 visuals, repurposed as the expanded state).
- **Step 4 → "Verktøyet som følger med"**: reframe as a feature montage — Hoopit-import, lagoppsett, coach cues, Excel-import, PDF/HTML-export. Drops the "sharing" framing because sharing is now inherent.

### Calendar vs. list for Step 3

| | Calendar grid | Sorted list |
|---|---|---|
| Visual impact | High | Medium |
| Build cost | High (cells, week/month nav) | Low |
| Readability on mobile | Cramped | Native |
| Conveys "team-shared, scheduled" | Strong | Strong |

**Recommendation:** sorted list for v1. Add calendar grid later if the product warrants it.

---

## Open questions (need your call before I start)

1. **Step 3 framing:** Accept the "Laget ser det" calendar/list repurposing, or keep Step 3 focused on the single-plan zoom?
answer: accept
2. **Step 4 framing:** Accept "Verktøyet som følger med" feature montage, or want something else (e.g. pricing, testimonial, waitlist CTA)?
answer:accept
3. **Desktop-only landing page for now?** Or should mobile Step 2 (vertical split / tabs) also land in v1?
answer: it should work on both mobile and desktop
4. **Message pool in Step 1:** Happy with the Norwegian draft above, or want to rewrite any? Keep/drop the 😅 emoji on the climactic one?
answer: happy!
5. **Loading beam in Step 2:** OK with a subtle gradient sweep, or want something more visually distinctive (e.g. particles flying from chat → plan)?
answer: OK!

---

## Implementation order (once questions are answered)

1. **Step 1 rewrite** — message pool, cadence, autoscroll, opacity fade, climactic final.
2. **Step 2 redesign** — two-column layout, date dropdown, scripted flow, transformation beam, plan stagger.
3. **Step 3 rework** — team calendar/list with expandable plan (assumes option 1 is accepted).
4. **Step 4 rework** — feature montage.
5. **Cross-step polish** — step-nav labels, section captions, scroll behaviour.

---

## Phase-2 handoff (the real app)

Decisions above that the actual app should inherit:

- **Session creation is date-first.** Pick a date → open the chat+preview editor.
- **Editor is a split view** — chat on the left, live-rendering plan on the right. No more "edit mode vs preview mode" toggle; it's always both.
- **Saving = publishing to team.** No separate share/export step for the common case. Export-to-HTML stays as an escape hatch.
- **Home screen is a team-shared session list** (sorted by date, upcoming highlighted). Opens individual sessions for editing/viewing.
- **Claude API goes through `/api/claude`** server route (see README/Phase 2 of project plan).
