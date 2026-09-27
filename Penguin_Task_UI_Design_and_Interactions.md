# Penguin Task — UI Design & Interaction Spec
**Companion to:** Penguin_Task_PRD.md
**Derived from:** supplied moodboard/reference images (icons, widgets, screens, component sheet)

---

## 1. Visual Identity

- **Tone:** cute, playful, motivating, calm — never cluttered, never guilt-driven.
- **Mascot-first:** the penguin appears on nearly every screen (corner illustration, reaction, or speech bubble) and always has emotional context tied to app state.
- **Wordmark:** "Penguin Task" in a rounded, friendly display face (main/playful lockup from the reference sheet); a small crowned-penguin badge doubles as the app icon mark.

## 2. Color Tokens (`theme/colors.ts`)

| Token | Hex (approx) | Use |
|---|---|---|
| `penguinBlack` | #17212B | primary text, penguin body |
| `darkNavy` | #0E2A3D | dark surfaces, night theme |
| `iceBlue` | #4FA8E0 | primary brand / links / water task |
| `snowWhite` | #FFFFFF | surfaces |
| `mist` | #F4F7FA | app background |
| `softGreen` | #3FAE60 | success, "done" state, primary CTA |
| `mint` | #B9EFD2 | success surface tint |
| `warmYellow` | #F5B942 | coins, XP, crown, streak fire |
| `coral` | #F2725A | alerts, delete, missed-task |
| `lavender` | #8E7CE0 | study/reading category |

Each theme (Arctic/Forest/Sunset/Dark) remaps these tokens — components never hardcode colors, only tokens.

## 3. Typography (`theme/typography.ts`)

- Display/headline: rounded geometric sans, bold — greetings, big numbers (streak count, %).
- Body: same family, regular/medium — task titles, descriptions.
- Scale: `xs 12 / sm 14 / md 16 / lg 20 / xl 28 / xxl 36`.
- Numbers that celebrate progress (streaks, %, coins) are always the largest, boldest element on their card.

## 4. Spacing, Radius, Shadow

- Spacing scale: `xs 4, sm 8, md 16, lg 24, xl 32`.
- Radius: `small 8, medium 16, large 24, pill 999` — cards use `large`, buttons use `pill` or `medium`.
- Shadows: one soft, low-opacity elevation token (`card`) reused everywhere; no harsh drop shadows.

## 5. Core Components (design system)

| Component | Notes from references |
|---|---|
| `PrimaryButton` / `SecondaryButton` | Full-width, pill or medium-radius, green primary; bold label + optional arrow icon |
| `Card` | White/mist surface, large radius, soft shadow, generous internal padding |
| `TaskCard` | Left icon chip (category color) + title + streak sublabel + right-aligned checkbox circle |
| `ProgressRing` | Circular ring, bold fraction (e.g. "4/6") + % centered |
| `StreakCard` | Flame icon + day count, warm-yellow accent |
| `CoinBadge` | Coin icon + count, pill shape, used in nav header |
| `Penguin` | Central illustration; props: `mood`, `size` |
| `PenguinSpeechBubble` | Rounded bubble anchored to Penguin, short encouraging copy |
| `SectionHeader` | Title + optional "View all →" |
| `BottomSheet` / `Modal` | For reward redemption, task create/edit |
| `EmptyState` / `LoadingState` / `ErrorState` | Illustration + message + single CTA |
| `CelebrationOverlay` | Confetti + Penguin celebrating + stats recap |
| `AchievementCard` / `RewardCard` | Icon badge, name, cost/unlock status |
| `Toggle`, `Input`, `Selector` | Standard form controls, theme-token styled |

**Rule:** every screen composes these; no one-off styled elements duplicated per screen.

## 6. Penguin Mood Map

| App state | Mood | Where seen |
|---|---|---|
| First open / new user | `waving` | Welcome screen |
| Creating a task | `writing` | Add Task |
| Partial daily progress | `happy` | Home hero |
| 100% tasks done | `celebrating` (+confetti) | Celebration overlay |
| Missed tasks | `encouraging` (soft, not sad-shaming) | Missed-task screen |
| Long streak | `streak` (crown) | Streak card, profile |
| Night / low activity | `sleeping` | Sleep widget, dark theme |
| Reward unlocked | `reward` | Achievements toast |

## 7. Screen-by-Screen Notes (core journey, Phase 1)

1. **Splash** — full-bleed icy gradient, centered penguin + wordmark, "Small Steps, Big Dreams," thin loading bar.
2. **Onboarding (Welcome → Ready)** — one question per screen, big illustration top, single primary CTA bottom, progress dots; "Skip for now" on non-critical steps (goals/challenge).
3. **Paywall** — value teaser → benefits list w/ icons → pricing cards (Monthly/Yearly-highlighted/Lifetime) → "Maybe later" always present, never blocked without an exit.
4. **Home Dashboard** — greeting header, ProgressRing + streak/best-streak stat card, Penguin hero illustration, "Today's Habits" list of TaskCards, floating add button, bottom tab bar (Home/Progress/Rewards/Settings).
5. **Add/Edit Task** — Penguin "writing" hero, Task Name input, icon selector, frequency, reminder time, notes, single Save CTA.
6. **Task Details** — same TaskCard styling expanded, streak history strip, Edit/Delete quick actions.
7. **Progress** — segmented control (Weekly/Monthly/All-time), ProgressRing + celebrating penguin, per-habit progress bars, weekly bar chart.
8. **Rewards** — coin balance header, RewardCard grid (themes, penguins, widgets, stickers), redeem CTA per card.
9. **Settings** — profile row, list rows (Notifications, Theme, Language, Help, About), destructive "Log out" isolated at bottom.

## 8. Interaction & Motion Rules

- **Task complete:** checkbox fills → brief scale-bounce → progress ring animates to new % → small coin (+10) pop-up near the tapped row. Reanimated spring, ~250–350ms, no more than one flourish per action.
- **All tasks done:** `CelebrationOverlay` fades in, confetti burst, Penguin switches to `celebrating`, stats recap, single "Awesome!" dismiss CTA.
- **Streak milestone:** StreakCard briefly glows/scales; Penguin shows `streak` mood with crown.
- **Screen transitions:** standard Expo Router native transitions; no custom page-transition gimmicks in Phase 1.
- **Empty/loading/error:** every list-bearing screen must render one of `EmptyState` / `LoadingState` / `ErrorState` rather than a blank view.

## 9. Responsiveness & Accessibility

- Flex-based layouts, no fixed pixel screen heights; respect `SafeAreaView`/notches.
- Support Dynamic Type scaling on text where feasible; don't clip on longer localized strings (Nepali/Hindi labels will run longer than English).
- Minimum tap target 44×44.

## 10. Asset Strategy (Phase 1)

No exported illustration/Lottie files exist yet. All Penguin/illustration visuals are **code-based placeholders** — simple composed shapes/SVG built to match silhouette and mood from the references — wired through the single `Penguin` component so real artwork can replace them later without touching any screen.
