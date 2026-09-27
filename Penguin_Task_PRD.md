# Penguin Task — Product Requirements Document (PRD)
**Version:** 1.0 (Phase 1 — UI-First Build)
**Platform:** Expo + React Native (iOS & Android)
**Owner:** Pratap

---

## 1. Product Summary

Penguin Task is a cute, gamified daily-habit and task tracker starring a penguin mascot ("Pingu"). Users build streaks, earn coins/XP, unlock rewards, and get warm, encouraging feedback instead of guilt-driven nagging. The product's north star is Duolingo-style habit-forming UX, wrapped in an original arctic/penguin visual identity.

**Tagline:** "Small Steps, Big Dreams."

## 2. Goals for Phase 1 (this build)

- Ship a polished, navigable, **frontend-only** Expo app.
- All 8 core-journey screens working end-to-end with mock/in-memory data.
- Reusable design system + component library other screens (and future AI coding sessions) can build on without redesigning.
- No backend, auth, payments, notifications, or analytics wired up yet — clean seams left for them.

## 3. Non-Goals (explicitly deferred)

| Deferred system | Target phase |
|---|---|
| Supabase (DB/auth/cloud sync) | Phase 3 |
| SQLite local persistence | Phase 2 |
| RevenueCat / real subscriptions | Phase 5 |
| expo-notifications (real scheduling) | Phase 4 |
| PostHog analytics / Sentry crash reporting | Phase 6 |
| Final illustration/Lottie assets | Ongoing (placeholders now) |

## 4. Target Users

People who want a friendlier, less punishing alternative to habit trackers — students, young professionals, and anyone who responds better to encouragement than streak-shaming.

## 5. Core User Journey (priority order)

```
Splash → Onboarding (9 screens) → Premium Paywall → Choose Penguin
   → Home Dashboard → Create/Complete Tasks → Progress + Rewards
   → Daily Check-in → Weekly Summary → Repeat daily
```

## 6. Feature Set by System

### 6.1 Onboarding (9 screens)
Splash, Welcome, Name, Goals, Biggest Challenge, Daily Task Goal, Reminder Setup, Choose Penguin, Ready.

### 6.2 Premium / Paywall (6 screens)
Value Teaser, Premium Benefits, Pricing (Monthly/Yearly/Lifetime), Free vs Premium comparison, Limited-Time Offer, Success/Continue-Free. **Phase 1: paywall is UI-only — "purchase" just sets a mock `isPremium` flag.**

### 6.3 Task Engine
Create, edit, complete, delete, repeat/frequency, reminders (UI only), history. Screens: Home, Today's Tasks, Add Task, Task Details, Edit Task.

### 6.4 Progress & Analytics
Completion ring, weekly bar chart, monthly heatmap calendar, stats (totals, success rate, streak), habit history.

### 6.5 Gamification
Coins (+10/task, +30/day streak, +100/week streak, bonus chest), XP & Levels, Streaks (current/best), Achievements/Badges, Rewards Shop (themes, penguins, widget packs, stickers).

### 6.6 Emotional/Retention Screens
Empty state, All-Tasks-Completed celebration, Missed-Task encouragement, Daily Check-in (mood + gratitude), Weekly Summary.

### 6.7 Settings & Profile
Profile, Penguin Customization, Notification Settings (UI toggles only), Theme Selection (Arctic/Forest/Sunset/Dark), Language, Help & FAQ, About.

### 6.8 Penguin Character System
A single `<Penguin mood="..." />` component with states: idle, waving, happy, celebrating, writing, thinking, sleeping, sad, encouraging, streak, reward, focused. Built as code-based placeholder graphics now; swappable for Lottie/SVG art later without touching screen code.

## 7. Mock Data Requirements

Realistic, non-lorem-ipsum data for: user profile, ~6 tasks (Drink Water, Study, Exercise, Healthy Food, Read Book, Meditate), completion history, streak counters, coin/XP balances, achievements, rewards catalog, weekly/monthly stats. Lives in `/mock/` as typed fixtures, structured so it's a drop-in replacement target for real SQLite/Supabase queries later.

## 8. Success Criteria (Phase 1 "done")

The app runs in Expo and a user can: complete onboarding → see the paywall → land on Home → view/complete tasks → see progress/streak update → visit Rewards & Progress tabs → open Settings → see penguin reactions and a completion celebration — all with mock data, no crashes, no dead-end screens on the core path.

## 9. Tech Stack (locked for Phase 1)

Expo · React Native · TypeScript · Expo Router · React Native StyleSheet · Reanimated · Zustand (UI/app state) · in-memory/mock data module (stand-in for SQLite).
*Not installed yet:* Supabase, RevenueCat, expo-notifications (real), expo-sqlite, PostHog, Sentry — added in later phases per the tech stack doc already agreed.

## 10. Open Items / Assumptions

- No exported illustration assets exist yet → all penguin/illustration visuals are built as code-based placeholders (simple vector/shape compositions), structured so real Lottie/SVG files can drop in later via the same `Penguin` component API.
- Screen count for this pass: the 8 core-journey screens + their direct dependencies first; remaining ~34 screens follow in subsequent build passes using the same design system.
- Currency/locale: defaults to English; language switcher is UI-only (no real i18n engine yet).
