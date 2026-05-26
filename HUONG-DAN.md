# Discipline = Freedom — User Guide

> "Hey Andy, plan your day with intention."

## What's new in v3
- **Light theme** with warm sunrise gradient (pink → orange → yellow)
- **Full English** — Plan / Actual / Compare, all UI text
- **Custom touch wheel** for time picker — smoother on iPhone than native scroll
- **Apple HIG** colors, shadows, typography (SF Pro)
- **3 animated soft gradient blobs** in background — alive, not sterile

## What the app does
- **Plan tab** — write what you intend to do, time-blocked
- **Actual tab** — log what you actually did
- **Compare tab** — see % match between plan and reality + rate your day (5 stars) + leave a note
- **Day navigation** ‹ Today › — browse any day, past or future
- **Backup / Restore** — export all data as JSON, restore from file

## How to use the time wheel
- **Swipe up/down** on hour or minute column — flick fast for momentum
- **Tap** an item directly to jump to it
- **Mouse wheel** scroll on desktop
- Items snap to nearest after release
- Center highlighted item is the selected value

## Color meaning
- **Pink → Orange → Yellow sunrise** = energy, warmth, optimism (motivation palette)
- Used for: title, `+` button, primary actions, match card, background blobs
- Category dots use iOS system colors: Work=blue, Health=green, Rest=orange, Family=pink, Learning=purple, Social=cyan, Other=gray

## Deploy & install

### Quickest — Netlify Drop (2 min)
1. Go to https://app.netlify.com/drop
2. Drag the whole `thich-ky-luat/` folder onto the drop zone
3. Open the `https://<random>.netlify.app` link on your phone

### Local network testing
```bash
cd thich-ky-luat
python3 -m http.server 8080
```
On phone → `http://<your-laptop-IP>:8080`

### Install as native app

**iPhone (Safari):**
1. Open the link in Safari
2. Tap **Share** → "Add to Home Screen" → **Add**

**Android (Chrome):**
1. Open in Chrome → tap "Install app" banner
2. Or menu (⋮) → "Install app"

App will launch fullscreen, no URL bar, splash screen on cold start.

## Daily ritual suggestion
1. **Morning** — open app → Plan tab → tap `+` → add time blocks for the day
2. **During day** — switch to Actual tab → tap `+` (auto-fills current time + 30min) → log what you actually did
3. **Evening** — go to Compare tab:
   - See the big % match (your discipline score)
   - Read the verdict (🔥 Discipline mastered / 💪 Strong day / 🌱 Freeform — that's OK)
   - Rate the day (1–5 stars)
   - Note what you learned for tomorrow
4. **Weekly** — export JSON backup to Drive/iCloud

## Tips
- **Match scoring** = overlap between plan and actual (by category) ÷ max(plan total, actual total). So padding either side won't fake the score.
- **Smart default** — adding to Actual tab auto-fills time wheel with "now → now + 30min"
- **Verdict is encouraging, not punitive** — no red colors, even at 0%
- **Data is local** — stays in browser. Use Export JSON to back up before clearing browser data.

## Version history
- **v1** — minimal: 2 tabs, fixed 30-min grid, dark navy
- **v2** — iOS-native: 3 tabs, day nav, flexible time blocks, dark theme
- **v3** — Apple HIG light + sunrise gradient + English + custom smooth wheel ← current

## Roadmap
- Streak counter (consecutive days ≥80% match)
- Weekly/monthly discipline chart
- Notification to log actuals at end of day
- Multi-device sync (Supabase)
- Share with team
