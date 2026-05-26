# Discipline Is All You Need

> Plan your day in time blocks, log what actually happened, see how disciplined you were.

PWA tĩnh — chạy trên trình duyệt, cài được vào Home Screen như native app, offline được nhờ service worker.

## Tính năng

- **3 tab**: Plan / Actual / Compare
- **Day navigation**: ‹ Today › — xem bất kỳ ngày nào
- **Custom touch wheel** chọn thời gian — mượt trên iPhone, có inertia + snap
- **Match score** so sánh kế hoạch và thực tế theo % category
- **Star rating + note** cho mỗi ngày
- **Backup / Restore** JSON ra file
- **Apple HIG light theme** + sunrise gradient (pink → orange → yellow)
- **Offline** — service worker cache toàn bộ asset

## Stack

Pure HTML + CSS + Vanilla JS. Không build, không framework, không dependency.

- `index.html` — toàn bộ app trong 1 file (~647 dòng)
- `manifest.json` — PWA manifest
- `service-worker.js` — cache-first offline
- `icons/` — 192px + 512px sunrise icon

## Dev local

```bash
python3 -m http.server 8080
# Mở http://localhost:8080 trên trình duyệt
```

Trên điện thoại cùng wifi: `http://<laptop-IP>:8080`.

## Deploy

Auto-deploy qua Cloudflare Pages khi push lên `main`. Xem chi tiết tại `../DISCIPLINE-GITHUB-CLOUDFLARE.md`.

## License

MIT — Andy Pham (Luna Base)
