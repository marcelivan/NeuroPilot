# NeuroPilot 🧠✈️ 

**An ADHD‑aligned daily ritual app that turns 15 minutes into reliable executive function: Morning → Daytime → Evening.**

## 🚀 One‑liner
Clarity and discipline in 15 minutes a day for ADHD adults and high-stimulus knowledge workers.

---

## 1. Problem, Audience, Outcome

**Audience**: Adults with ADHD (diagnosed or suspected), plus ADHD‑adjacent high‑stimulus knowledge workers.  
**Problem**: Task apps and generic mindfulness tools break under ADHD constraints: overwhelm, time blindness, shame spirals, novelty decay.  
**Desired Outcome**: Consistent daily loops that reduce reactivity, increase intention, and build discipline with minimal configuration.

---

## 2. Positioning

- **Category**: Wellness + Niche Content  
- **Value prop**: Structured ADHD ritual system for clarity and self‑management.  
  > “Clarity and discipline in 15 minutes a day.”
- **Differentiators**:  
  - Stoic + CBT hybrid (Premeditatio Malorum, Shadow check, Gratitude for struggle)
  - Micro‑commitments (5‑minute blocks) fit ADHD cognitive load
  - Accountability loops without shame (3‑day streak lens, flexible forgiveness)
- **Why subscription fits**: Daily habit anchor, fresh prompts, guided rituals, community, and evolving insights justify ongoing value

---

## 3. Business Model

- **Freemium**: Morning + Evening journaling, light streaks, minimal mood tags
- **Premium** ($7–10/mo or $70/yr):  
  - Guided audio/video rituals
  - ADHD micro‑lessons (impulse control, time blindness, initiation)
  - Accountability pods (3–5 by timezone)
  - Data insights (trends, trigger patterns, weekly summaries)
  - Monthly prompt library expansions
- **Upsell**: Expert workshops and courses

---

## 4. Success Metrics (MVP → PMA)

- **Activation**: 70% complete first Morning within 24h of install
- **D1 retention**: ≥45% • **D7**: ≥25% • **D30**: ≥12%
- **Monthly churn (paid)**: <5%
- **FTUE time**: ≤60 sec to first entry
- **Time‑on‑task**: Median 12–18 min/day in‑app ritual time
- **Conversion**: 7–12% Free→Paid by Day 7 cohort

---

## 5. MVP User Stories

- As a user with ADHD, I can start a Morning ritual in one tap and finish in ≤15 minutes
- I can record 3 obstacles with if‑then plans and one intention
- I can trigger a one‑breath pause during the day without opening the app
- I can complete an Evening review with wins/slips/lessons and 3 struggle gratitudes
- I see streaks in forgiving weekly loops and a generated weekly summary
- I control prompts and notifications windows without complex setup
- My data is private by default and sync is optional

---

## 6. Funnel & Lifecycle
```
flowchart LR
A[Install] --> B[Onboarding <60s]
B --> C[Morning Preview]
C --> D[Freemium Week 1]
D --> E{Day 3–7 Trigger}
E -- Guided ritual preview --> F[Paywall]
E -- Shadow exercise teaser --> F
F -- Upgrade --> G[Subscription Tier]
D -->|Inactive 3d| H[Gentle Re‑entry Nudge]
G --> I[Weekly Insight + Pods]
I --> J[Retention: novelty + library]
```
#### Onboarding copy:
- “You are not broken. You need a pilot system.”
- Micro‑commitment: pick one‑word intention.
- Ritual preview: show Morning/Day/Evening map.
- Personalization: toggle ritual depth (short vs full).

#### Notifications:
- Questions, not commands.  
- Example: Morning “What obstacle might derail you today?” Evening “What truth did you face today?”
- Windows chosen in FTUE.
- Lock‑screen action: “One breath.”

#### Retention mechanics:
- 3‑day loop streak view, resets after 2 missed days
- Variable mild rewards on completion
- Weekly summary auto‑generated

---

## 7. MVP Scope

- **Morning (15m):** Silence timer, 3 obstacles + plans, Memento Mori note, 1 intention
- **Daytime:** One‑breath pause, Choose effort over ease, Shadow check micro‑prompt
- **Evening (15m):** Review wins/slips/lessons, 3 struggle gratitudes, one shadow truth
- **System:** Offline‑first SQLite, local encryption, optional cloud sync later. Push notifications. Minimal analytics local‑first.

---

## 8. Content Design

- Prompt sets ship as templates; monthly expansions for premium
- Tone: calm, directive, non‑shaming
- Length: micro‑copy by default

---

## 9. UX Principles (ADHD)

- One big primary action per step
- Timers start immediately; skipping allowed
- Micro‑inputs and presets
- High contrast, large tap targets, haptics, voice input ready

---

## 10. Data Model

**SQLite, local-first (see `schema.sql`):**
- sessions(id, date UNIQUE, morning_done INT, evening_done INT, effort_min INT)
- obstacles(id, session_id, text, plan)
- intentions(id, session_id, text)
- truths(id, session_id, text, type 'shadow'|'lesson')
- gratitudes(id, session_id, text)
- events(id, ts ISO8601, type, meta_json)

---

## 11. Security & Privacy

- Local‑only by default. Encrypted storage when device supports it.
- If cloud added: RLS per user, minimal PII, opt‑in analytics.
- Crash reporting opt‑in.

---

## 12. Technical Stack

- **App:** React Native + Expo (TypeScript)
- **Local DB:** expo‑sqlite
- **State:** local component state for MVP; upgrade to Zustand later
- **Push:** Expo Notifications

---

## 13. Roadmap

- **M0 (2–3 weeks):** MVP flows for Morning/Daytime/Evening, notifications windows, weekly summary stub, local DB
- **M1:** Guided audio, insights V1, premium wall, payments stub
- **M2:** Accountability pods, prompt library updates, desktop web view

---

## 14. Risks & Mitigations

- **Novelty decay:** Monthly prompt drops, mild variable rewards
- **Shame spirals:** Flexible streaks, non‑judgmental copy, easy re‑entry
- **Over‑complexity:** Defaults first, advanced toggles hidden

---

## 🗂️ Initial File Structure

- `package.json`
- `.github/workflows/ci.yml`
- `schema.sql`
- `src/lib/db.ts`
- `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/morning.tsx`, `app/(tabs)/daytime.tsx`, `app/(tabs)/evening.tsx`

---

## 📦 Local Setup
```
git clone https://github.com/marcelivan/NeuroPilot.git
cd NeuroPilot
npm i
npm run start
```
Align package versions if needed:  
`npx expo install expo-router expo-sqlite expo-notifications`

---

## 🤝 Contributing

- Keep main stable (only merged PRs)
- Use dev for integration, feat/* for new features, fix/* for bugfixes
- Open issues, submit PRs, and reference user stories in this README

---

## 📄 License

MIT © 2025 Marcel Rivera-Baillargeon


