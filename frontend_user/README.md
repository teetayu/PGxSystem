# pgx-frontend

README สั้น ๆ สำหรับเพื่อนที่ไม่ถนัด React — ไกด์ให้อ่านและเริ่มทำงานกับโปรเจคนี้ได้ทันที

สรุป
This folder is a small Vite + React app used to incrementally migrate the legacy static UI into a SPA. The frontend is UI-first: components live under `src/` and currently use fixture data so you can run and preview without Supabase credentials.

Prerequisites
- Node.js 18+ (recommended)
- Git (to commit/push branches)

สำคัญ: ติดตั้ง dependencies ก่อนรัน (รวมไอคอนใหม่ที่ใช้ `@heroicons/react`)

ติดตั้งและรัน (PowerShell)
```powershell
# เข้าโฟลเดอร์โปรเจค
cd "e:\CODE\University_app\SWU Y-3\PGXSystem\PGxSystem\frontend_user"

# ติดตั้ง dependencies (ต้องทำครั้งแรก หรือหลังเพิ่ม dependency)
npm install

# รัน dev server (Vite)
npm run dev

# build สำหรับ production
npm run build
```

วิธีดูหน้าเพจ

- เปิดเบราว์เซอร์ไปที่ URL ที่ Vite แสดง (โดยปกติ `http://localhost:5173`)

- หน้าและเส้นทางสำคัญ:

  - `/dashboard` — หน้าแดชบอร์ด
  - `/patients` — หน้ารายชื่อผู้ป่วย (ตาราง + panel ขวามือ)
  - `/patients/:id` — รายละเอียดผู้ป่วย
  - `/order` — หน้าสั่งตรวจ
  - `/order-result/:code` — รายละเอียดผลตรวจ (มีปุ่มย้อนกลับ)

โครงสร้างไฟล์สั้น ๆ (สำคัญ)
- `src/components/Sidebar.jsx` — Sidebar ที่เปลี่ยนเป็น collapsible และใช้ Heroicons
- `src/pages/Patients.jsx` — ตารางผู้ป่วย + การเลือกผู้ป่วย + การเปลี่ยนสถานะ
- `src/pages/OrderResult.jsx` — แบบฟอร์มผลตรวจ (มีปุ่ม "กลับ")
- `src/services/supabaseClient.js` — supabase client (safe stub ถ้าไม่มี env)
- `src/contexts/AuthContext.jsx` — simple auth provider (signIn/signOut stub)
- `src/styles/userpage.css` — CSS หลักที่ใช้ในโปรเจค (ปรับจาก legacy)

Environment (Supabase)

- หากต้องการเชื่อมจริง ให้สร้างไฟล์ `.env.local` ที่ root ของ `frontend_user` (อย่า commit ไฟล์นี้)

- ตัวแปรที่ใช้โดย Vite ต้องขึ้นต้นด้วย `VITE_` ตัวอย่าง:

  - `VITE_SUPABASE_URL=https://your-project.supabase.co`
  - `VITE_SUPABASE_ANON_KEY=public-anon-key`

ข้อควรระวัง: `VITE_SUPABASE_ANON_KEY` เป็นคีย์สาธารณะ (public) แต่ไม่ควรวางใน repo สาธารณะโดยตรง — ใส่ใน `.env.local` และอย่า commit

การแก้ UI แบบง่าย ๆ (เพื่อนที่ไม่ถนัด React)
- ถ้าอยากแก้ข้อความ, ปุ่ม หรือเลย์เอาต์: มองหาไฟล์ใน `src/pages/` ที่เกี่ยวข้องแล้วแก้ JSX ได้โดยตรง (HTML-like syntax)
- ถ้าต้องการเปลี่ยนไอคอนของเมนู: แก้ `src/components/Sidebar.jsx` — ใช้ Heroicons ที่ import แล้ว (ดูตัวอย่างการใช้งานในไฟล์)
- เพื่อซ่อน/แสดงปุ่ม "รายละเอียดเพิ่มเติม": ค้นหา `Patients.jsx` และดูตัวแปร `selected` (จะมี logic แสดงปุ่มเฉพาะเมื่อเลือกแถว)

ทิปสำหรับการแก้โค้ดทีละน้อย
- ทำ branch ใหม่ก่อนแก้: `git checkout -b feature/your-change`
- ทำ commit เล็ก ๆ อ่านง่าย และ push: `git add . && git commit -m "feat(patients): move details button to right panel" && git push -u origin feature/your-change`
- เปิด Pull Request จาก branch ที่ push ขึ้นไป

Lint / Format

- ลองรัน linter/formatter ก่อน commit

```powershell
npm run lint
npm run format
```

ถ้ามีปัญหา runtime ที่เกี่ยวกับ Supabase
- ถ้าไม่มี `.env.local` โค้ดใช้ safe-stub ที่ไม่ทำให้แอปล่ม — แต่วิธีนี้จะแสดงข้อมูล fixture เท่านั้น
- หากต้องการทดสอบการดึงข้อมูลจริง ให้เตรียมค่า VITE_SUPABASE_URL และ VITE_SUPABASE_ANON_KEY แล้วรัน `npm run dev` ใหม่

อยากให้ผมช่วยอะไรต่อไหม?
- เพิ่ม unit test / snapshot tests
- เชื่อม `react-query` hooks กับ Supabase และตัวอย่าง query
- ย้าย Tailwind จาก CDN มาเป็น build-time (แนะนำก่อนขึ้น production)
- ทำ print-friendly layout สำหรับผลตรวจ

ถ้าติดตั้งแล้วเกิดข้อผิดพลาด ให้ส่ง error log มาผมช่วยไล่ให้ครับ

---

Small note: ผมเพิ่ม `@heroicons/react` และปรับ Sidebar ให้พับได้ — อย่าลืมรัน `npm install` ก่อนรัน dev server อีกครั้ง

Happy hacking! 🚀
