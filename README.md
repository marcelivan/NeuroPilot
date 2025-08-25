# NeuroPilot 🧠✈️ 

> **Product Spec v1.1** - Updated August 24, 2025

**An ADHD‑aligned daily ritual app that turns 15 minutes into reliable executive function: Morning → Daytime → Evening.**

## 🚀 One‑liner

Clarity and discipline in 15 minutes a day for ADHD adults and high-stimulus knowledge workers.

---

## 📋 Product Spec v1.1 Update Summary

**This update includes comprehensive specifications for:**
- Enhanced business model with clear freemium/premium tiers
- Detailed MVP scope and user stories for development
- Complete data model changes and technical architecture
- Updated roadmap with specific milestones
- Risk mitigation strategies for ADHD-specific challenges

---

## 1. Problem, Audience, Outcome

**Audience**: Adults with ADHD (diagnosed or suspected), plus ADHD‑adjacent high‑stimulus knowledge workers.
  
**Problem**: Task apps and generic mindfulness tools break under ADHD constraints: overwhelm, time blindness, shame spirals, novelty decay.
  
**Desired Outcome**: Consistent daily loops that reduce reactivity, increase intention, and build discipline with minimal configuration.

---

## 2. Positioning

- **Category**: Wellness + Niche Content  
- **Value prop**: Structured ADHD ritual system for clarity and self‑management.  
  
> "Clarity and discipline in 15 minutes a day."

- **Differentiators**:  
  - Stoic + CBT hybrid (Premeditatio Malorum, Shadow check, Gratitude for struggle)
  - Micro‑commitments (5‑minute blocks) fit ADHD cognitive load
  - Accountability loops without shame (3‑day streak lens, flexible forgiveness)

- **Why subscription fits**: Daily habit anchor, fresh prompts, guided rituals, community, and evolving insights justify ongoing value

---

## 3. Business Model (v1.1 Enhanced)

### Free Tier
- Morning + Evening journaling
- Basic streak tracking
- Minimal mood tags
- One-breath pause feature

### Premium Tier ($7–10/mo or $70/yr)
- Guided audio/video rituals
- ADHD micro‑lessons (impulse control, time blindness, initiation)
- Accountability pods (3–5 users by timezone)
- Data insights (trends, trigger patterns, weekly summaries)
- Monthly prompt library expansions
- Advanced customization options

### Upsell Opportunities
- Expert workshops and courses
- 1:1 coaching sessions
- Enterprise/team accounts

---

## 4. Success Metrics (MVP → PMA)

- **Activation**: 70% complete first Morning within 24h of install
- **D1 retention**: ≥45% • **D7**: ≥25% • **D30**: ≥12%
- **Monthly churn (paid)**: <5%
- **FTUE time**: ≤60 sec to first entry
- **Time‑on‑task**: Median 12–18 min/day in‑app ritual time
- **Conversion**: 7–12% Free→Paid by Day 7 cohort

---

## 5. MVP User Stories (v1.1 Detailed)

### Core User Stories
- As a user with ADHD, I can start a Morning ritual in one tap and finish in ≤15 minutes
- I can record 3 obstacles with if‑then plans and one intention
- I can trigger a one‑breath pause during the day without opening the app
- I can complete an Evening review with wins/slips/lessons and 3 struggle gratitudes
- I see streaks in forgiving weekly loops and a generated weekly summary
- I control prompts and notifications windows without complex setup
- My data is private by default and sync is optional

### Additional User Stories (v1.1)
- As a premium user, I can access guided audio rituals for each session
- I can join accountability pods with users in my timezone
- I can view data insights showing my patterns and triggers
- I can customize ritual depth (short vs full versions)
- I can export my data for personal analysis

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

### Onboarding Strategy
- "You are not broken. You need a pilot system."
- Micro‑commitment: pick one‑word intention
- Ritual preview: show Morning/Day/Evening map
- Personalization: toggle ritual depth (short vs full)

### Notifications
- Questions, not commands
- Example: Morning "What obstacle might derail you today?" Evening "What truth did you face today?"
- Windows chosen in FTUE
- Lock‑screen action: "One breath."

### Retention Mechanics
- 3‑day loop streak view, resets after 2 missed days
- Variable mild rewards on completion
- Weekly summary auto‑generated

---

## 7. MVP Scope (v1.1 Expanded)

### Core Features
- **Morning (15m)**: Silence timer, 3 obstacles + plans, Memento Mori note, 1 intention
- **Daytime**: One‑breath pause, Choose effort over ease, Shadow check micro‑prompt
- **Evening (15m)**: Review wins/slips/lessons, 3 struggle gratitudes, one shadow truth

### System Requirements
- Offline‑first SQLite database
- Local encryption for sensitive data
- Push notifications with customizable windows
- Optional cloud sync for premium users
- Minimal analytics (local‑first)

---

## 8. Content Design

- Prompt sets ship as templates; monthly expansions for premium
- Tone: calm, directive, non‑shaming
- Length: micro‑copy by default
- ADHD-friendly language patterns

---

## 9. UX Principles (ADHD-Optimized)

- One big primary action per step
- Timers start immediately; skipping allowed
- Micro‑inputs and presets
- High contrast, large tap targets, haptics
- Voice input ready for accessibility
- Minimal cognitive load in navigation

---

## 10. Data Model Changes (v1.1)

**SQLite, local-first (see `schema.sql`):**

### Core Tables
- `sessions(id, date UNIQUE, morning_done INT, evening_done INT, effort_min INT)`
- `obstacles(id, session_id, text, plan)`
- `intentions(id, session_id, text)`
- `truths(id, session_id, text, type 'shadow'|'lesson')`
- `gratitudes(id, session_id, text)`
- `events(id, ts ISO8601, type, meta_json)`

### New Tables (v1.1)
- `user_preferences(id, key, value, created_at, updated_at)`
- `streak_data(id, date, streak_count, reset_reason)`
- `insights(id, date_range, insight_type, data_json, created_at)`
- `accountability_pods(id, user_id, pod_id, joined_at, status)`

---

## 11. Security & Privacy

- Local‑only by default with encrypted storage when device supports it
- If cloud added: Row Level Security (RLS) per user, minimal PII, opt‑in analytics
- Crash reporting opt‑in only
- GDPR/CCPA compliant data handling
- Regular security audits for premium features

---

## 12. Technical Stack

- **App**: React Native + Expo (TypeScript)
- **Local DB**: expo‑sqlite with encryption
- **State**: Local component state for MVP; upgrade to Zustand for complex state
- **Push**: Expo Notifications
- **Audio**: Expo AV for guided rituals
- **Cloud (Premium)**: Supabase for sync and pods

---

## 13. Roadmap (v1.1 Updated)

### M0 (2–3 weeks) - MVP Foundation
- MVP flows for Morning/Daytime/Evening
- Notification windows and customization
- Weekly summary generation
- Local database with core tables
- Basic streak tracking

### M1 (4–6 weeks) - Premium Features
- Guided audio rituals
- Data insights V1
- Premium paywall implementation
- Payment processing (Stripe/RevenueCat)
- Enhanced UX polish

### M2 (8–10 weeks) - Community & Advanced
- Accountability pods feature
- Prompt library updates system
- Desktop web view for power users
- Advanced analytics dashboard
- Export functionality

### M3+ (Future) - Scale & Growth
- AI-powered insights
- Integration with health apps
- Team/enterprise features
- Multiple language support

---

## 14. Risks & Mitigations (v1.1 Enhanced)

### Product Risks
- **Novelty decay**: Monthly prompt drops, mild variable rewards, community features
- **Shame spirals**: Flexible streaks, non‑judgmental copy, easy re‑entry flows
- **Over‑complexity**: Defaults first, advanced toggles hidden, progressive disclosure

### Technical Risks
- **Data loss**: Regular backups, sync redundancy for premium users
- **Performance**: Local-first architecture, optimized queries
- **Platform changes**: Cross-platform compatibility, web fallback

### Business Risks
- **Low conversion**: A/B test paywall timing, improve onboarding flow
- **High churn**: Focus on habit formation, community retention
- **Competition**: Unique ADHD positioning, continuous feature innovation

---

## 🗂️ Current File Structure

```
├── package.json
├── .github/workflows/ci.yml
├── schema.sql
├── src/lib/db.ts
├── app/(tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── morning.tsx
│   ├── daytime.tsx
│   └── evening.tsx
└── README.md (this file)
```

---

## 📦 Local Setup

```bash
git clone https://github.com/marcelivan/NeuroPilot.git
cd NeuroPilot
npm i
npm run start
```

Align package versions if needed:
```bash
npx expo install expo-router expo-sqlite expo-notifications
```

---

## 🤝 Contributing

- Keep main stable (only merged PRs)
- Use dev for integration, feat/* for new features, fix/* for bugfixes
- Open issues, submit PRs, and reference user stories in this README
- Follow ADHD-first design principles in all contributions

---

## 📄 License

MIT © 2025 Marcel Rivera-Baillargeon

---

## 📚 Additional Resources

- [ADHD Design Guidelines](docs/adhd-design-principles.md) (Coming soon)
- [API Documentation](docs/api.md) (Coming soon)
- [Contributing Guide](CONTRIBUTING.md) (Coming soon)
- [Roadmap Details](ROADMAP.md) (Coming soon)
