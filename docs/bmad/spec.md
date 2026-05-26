# Discipline = Freedom — Spec v3

> v3: Apple HIG light theme + full English + colorful sunrise gradient + custom touch wheel (smooth on mobile).

## Vấn đề
Andy muốn rèn kỷ luật bằng cách so sánh **Plan** vs **Actual** hằng ngày, với giao diện sáng theo Apple HIG, đầy năng lượng/màu sắc tạo động lực, và time picker mượt khi dùng trên điện thoại.

## Triết lý thiết kế v3

### Color psychology — chọn warm sunrise gradient
Tham khảo Apple HIG (semantic colors + strong contrast), color trends 2026 (gradient có chiến lược + neutrals ấm), và psychology of motivation:
- **Pink (#FF3D7F)** — emotional energy, dám hành động
- **Orange (#FF6B35)** — nhiệt huyết, ấm áp, thân thiện (Headspace, Strava dùng)
- **Yellow (#F7B801)** — lạc quan, sáng tạo, niềm vui

Kết hợp 3 màu thành **sunrise gradient** dùng cho: title text, primary button (`+`, Save), match card hero, soft blob background. Đây là "gradient system" theo nguyên tắc 2026 — gradient có vai trò cụ thể (action + reward), không random.

### Nền sáng "alive" — không sterile
- **`#FFF8F0` warm off-white** thay vì `#FFFFFF` cold — cảm giác có sự sống, không lạnh lẽo
- 3 soft gradient blobs animated rất nhẹ trong background (pink/orange/yellow, alpha 10%)
- Card pure white `#FFFFFF` để tách lớp

### Apple HIG compliance
- iOS system gray scale: `#F2F2F7`, `#E5E5EA`, `#D1D1D6`, `#8E8E93`
- iOS semantic colors cho 7 category: Blue/Green/Orange/Pink/Purple/Cyan/Gray
- Shadow 3 cấp (1/2/3) cho elevation
- Backdrop blur saturate(180%) cho header
- SF Pro Text font stack

### Custom touch wheel (KHÔNG dùng native scroll)
Reference app dùng native `overflow-y:scroll` + `scroll-snap` — bị lag trên iOS Safari. v3 thay bằng:
- **Pointer events** (unified mouse + touch)
- **Manual drag transform** — track translateY theo dy
- **Velocity tracking** — px/16ms
- **Inertia decel** — `v *= 0.94` mỗi frame
- **Rubber band bounds** — kéo quá biên có resistance 30%
- **Snap to nearest** sau khi velocity < threshold
- **Visual feedback** — item ở giữa: bold + scale 1.08, item near: dim
- **Tap to select** — bấm thẳng item cụ thể
- **Mouse wheel support** — desktop cũng dùng được

## Bảng màu v3

### Palette chính
| Vai trò | Hex | Ghi chú |
|---|---|---|
| Background | `#FFF8F0` | Warm off-white |
| Card | `#FFFFFF` | Pure white |
| Surface 2 | `#F2F2F7` | iOS gray 6 |
| Surface 3 | `#E5E5EA` | iOS gray 5 |
| Text | `#1C1C1E` | Near-black |
| Muted | `#6E6E73` | iOS gray |
| Hint | `#AEAEB2` | iOS light gray |
| **Accent gradient** | `#FF3D7F → #FF6B35 → #F7B801` | Sunrise — energy + warmth + optimism |
| Star | `#F7B801` | Warm yellow |

### Categories (iOS vibrant)
Work `#007AFF` · Health `#34C759` · Rest `#FF9500` · Family `#FF2D55` · Learning `#AF52DE` · Social `#5AC8FA` · Other `#8E8E93`

## Tech: Custom wheel implementation
```js
// Track translateY directly, no native scroll
let y = -idx * ITEM_H + CENTER_OFFSET;
on pointermove: y = startY + (e.clientY - startTouchY)  // direct
on pointerup: if(|velocity| > 0.5) inertia else snapNearest
inertia: y += v; v *= 0.94; repeat until |v| < 0.4 → snap
```
Smoother than `scroll-snap-type` on iOS because:
- không bị "skip" khi vuốt nhanh
- không bị Safari override scroll behavior
- snap chính xác về item gần nhất sau inertia hết
- visual feedback ngay từ frame đầu (item highlighted theo position)

## Data model (không đổi, key bump v2 → v3)
`localStorage['tkl_data_v3']` = `{ "YYYY-MM-DD": {plan:[], actual:[], rating:0, note:''} }`

Mỗi block: `{id, start:"HH:MM", end:"HH:MM", title, cat}`

## Acceptance criteria v3
- [x] Light theme `#FFF8F0` warm bg
- [x] Sunrise gradient cho title, `+` button, hero card, save button
- [x] iOS system colors cho 7 category
- [x] Full English (Plan/Actual/Compare, Today/Yesterday/Tomorrow, weekday names)
- [x] Custom touch wheel với inertia + snap + rubber band
- [x] Visual feedback: item ở giữa bold + scale, near = dim
- [x] Tap item để chọn nhanh
- [x] Mouse wheel support desktop
- [x] Empty state có icon emoji (🎯 plan / 📝 actual)
- [x] Verdict text English: "🔥 Discipline mastered" / "💪 Strong day" / "🌱 Freeform — that's OK"
- [x] Match card có gradient bg + glassmorphism verdict pill
- [x] Animated soft blobs (3 màu) — respect prefers-reduced-motion
- [x] PWA cài được, theme `#FFF8F0`
- [x] JS syntax valid
