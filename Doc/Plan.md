ได้ จะให้เป็นแผนงานชัด ๆ สำหรับค่อย ๆ แปลงจาก HTML → React (Vite) + Supabase โดยแบ่งเป็นส่วนที่ Copilot (หรือทีม) ทำเป็นชิ้น ๆ ได้สบาย — ฉันจะไม่ย่อมียวนเยาะมากนัก... แค่พอหยอดให้เจ็บใจหน่อย (¬_¬)

# แผนงานการย้าย: HTML → React + Vite + Supabase (แบ่งเป็น 9 PARTs)

---

## PART 0 — ข้อกำหนดก่อนเริ่ม (Prereqs)

* สร้าง repo ใหม่ (private) / ใช้ monorepo ถ้าต้องการ backend/edge-fn แยก
* ใส่ `.gitignore`, `README.md`, `CONTRIBUTING.md` แบบสั้น
* ตกลง stack: React (JS/TS?), Tailwind/CSS Modules, react-router, @supabase/supabase-js, TanStack Query
* บังคับ lint & format: ESLint + Prettier, commit hooks (husky + lint-staged)

> แนะนำ: ถ้ทีมยังไม่ถนัด TS ให้เริ่มด้วย JS แต่ตั้งโครงให้รองรับ TS ภายหลัง.

---

## PART 1 — Bootstrap project (Small)

**เป้าหมาย:** สร้าง skeleton project ที่ Copilot จะไปเติมโค้ดต่อได้
**ผลลัพธ์ที่ต้องการ:** โปรเจค Vite รัน `npm run dev` ได้, Supabase client มี template

**งาน (tasks):**

1. สร้าง project

   ```bash
   npm create vite@latest pgx-frontend -- --template react
   cd pgx-frontend
   npm install
   npm i react-router-dom @supabase/supabase-js @tanstack/react-query
   npm i -D eslint prettier husky lint-staged
   ```
2. สราป `src/main.jsx`, `src/App.jsx`, `src/services/supabaseClient.js`
3. สร้าง `.env.example` (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
4. ติดตั้ง husky hook ตัวอย่าง pre-commit lint

**Copilot prompt (ตัวอย่าง):**

> “Create a Vite + React project skeleton with react-router, react-query, and supabase client file. Include basic App route /login and /dashboard placeholders.”

**Acceptance criteria:**

* `npm run dev` เปิดหน้า `localhost:5173` และเห็น “Welcome” page.

---

## PART 2 — Routing & Auth flow (Medium)

**เป้าหมาย:** ทำระบบเส้นทาง (Router) และเชื่อม Supabase Auth (login/logout, protected routes)

**งาน:**

1. สร้าง `src/routes/ProtectedRoute.jsx`
2. สร้าง `src/pages/Login.jsx` (email/password + magic link support)
3. สร้าง `src/pages/Dashboard.jsx` (placeholder widgets)
4. ทำ `AuthProvider` (context) ที่ใช้ Supabase session และ expose `user, signIn, signOut`

**Copilot prompt:**

> “Implement AuthProvider using @supabase/supabase-js that stores session, provides login(email,password), logout, and protects routes via ProtectedRoute.”

**Acceptance criteria:**

* Login ผ่าน Supabase (dev) ทำ session และเข้าถึง `/dashboard` ได้เฉพาะผู้ล็อกอิน

---

## PART 3 — แปลงหน้า HTML เป็น Components แบบ Incremental (Large, do per-page)

**เป้าหมาย:** แปลงแต่ละหน้า HTML เดิมเป็น React page + reusable components ทีละหน้า ให้ Copilot ทำเป็น PR ทีละหน้า

**วิธี:** แบ่งเป็น micro-tasks ต่อหน้า — ตัวอย่าง workflow สำหรับแต่ละหน้า:

* วิเคราะห์ HTML -> ทำ component mapping (header, sidebar, form, table, widget)
* สร้าง presentational components (Button, Input, Table, Modal)
* สร้าง page wrapper และเชื่อมกับ API services

**ตัวอย่าง mapping (ให้ Copilot ทำเป็น PRs):**

1. `index.html` → `/dashboard`

   * สร้าง `src/pages/Dashboard/Dashboard.jsx`
   * สร้าง `src/components/Dashboard/StatCard.jsx`, `CaseListWidget.jsx`
2. `Userpage_Patient-order.html` → `/cases`

   * `src/pages/Case/CaseList.jsx`, `src/pages/Case/CaseDetail.jsx`
   * Components: `PatientForm.jsx`, `SpecimenTable.jsx`
3. `login-main.html` → `/login` (already in PART 2)

**Copilot prompt (per-page):**

> “Convert this HTML (paste fragment) into a React page with these components: X, Y, Z. Create presentational components and a page that uses them. Don't add business logic yet — only UI and props.”

**Acceptance criteria per PR:**

* UI visually matches original page
* Components are reusable and small (<200 lines each)
* No inline styles; use CSS module/Tailwind

---

## PART 4 — Services / API Layer (Medium)

**เป้าหมาย:** แยก logic ที่เรียก DB/Storage ไปที่ `services/` ให้ React components เรียกผ่าน hooks

**งาน:**

1. `src/services/supabaseClient.js` — createClient
2. `src/services/casesService.js` — functions: `listCases`, `getCaseById`, `createCase`, `updateCase`
3. `src/hooks/useCases.js` — wrapper around react-query `useQuery`/`useMutation`
4. Logging wrapper + error handling util

**Copilot prompt:**

> “Create a casesService.js for Supabase with listCases({page,limit,filter}), getCase(id), createCase(payload), updateCase(id,payload). Use Postgres schema: cases table fields...”

**Acceptance criteria:**

* Components call `useCases` and show real data from Supabase (dev DB)

---

## PART 5 — Forms, Validation & PDF generation (Medium)

**เป้าหมาย:** ฟอร์มต้อง validate และสามารถ export ใบสั่งเป็น PDF

**งาน:**

1. ใช้ `react-hook-form` + `zod` (หรือ `yup`) ใน `PatientForm`
2. สร้าง `src/services/reportService.js` — ฟังก์ชัน `generateCaseReport(caseId)` ที่สร้าง HTML แล้วใช้ `html2pdf` หรือ `@react-pdf/renderer` เพื่อดาวน์โหลดเป็น PDF
3. สร้าง button “บันทึกและพิมพ์” ที่เรียก createCase -> generate PDF

**Copilot prompt:**

> “Implement PatientForm with react-hook-form and zod schema. On submit, call createCase() and generate PDF using html2pdf.”

**Acceptance criteria:**

* Form validate front-end; generate report PDF that matches template

---

## PART 6 — Specimen Accessioning & Barcode (Medium)

**เป้าหมาย:** หน้าสแกนรับเข้า, พิมพ์บาร์โค้ด, rejection flow

**งาน:**

1. `Accessioning` page: scan (simulate) input barcode → map to order → mark received
2. Integrate `jsbarcode` or `bwip-js` for barcode/QR label generation
3. Store label templates in Supabase Storage

**Copilot prompt:**

> “Create Accessioning page with barcode scan input, show case details, and a Print Label button that renders a barcode and triggers browser print.”

**Acceptance criteria:**

* Simulated scan maps to case; printable barcode generated

---

## PART 7 — Admin Panel, PDPA, Audit logs (Large)

**เป้าหมาย:** ย้ายหน้าจัดการผู้ใช้งาน, PDPA flows, และ audit log

**งาน:**

1. Pages: `Admin/ManageUsers`, `Admin/PDPASettings`, `Admin/AuditLogs`
2. Backend: Supabase RLS policies and audit trigger (use DB trigger function inserting into `audit_logs`)
3. Frontend: admin table UI with role management, user invite flows

**Copilot prompt:**

> “Implement ManageUsers page: list users (from auth.users), search, role editing (update users table metadata). Ensure actions call a service and write audit log row.”

**Acceptance criteria:**

* Admin can change roles; audit_logs table populated

---

## PART 8 — Testing, CI/CD, Linting (Small → Medium)

**เป้าหมาย:** ตั้งมาตรฐานคุณภาพโค้ดก่อน deploy

**งาน:**

1. Setup ESLint + Prettier rules, husky pre-commit to run lint
2. Unit tests: Jest + React Testing Library for components
3. E2E tests: Playwright/Cypress for main flows: login, create case, generate PDF
4. CI: GitHub Actions workflow — build, lint, test, deploy to Vercel (on main)

**Copilot prompt:**

> “Create GitHub Actions workflow that runs npm ci, npm run lint, npm test, and builds on push to main. Also configure a dev preview on PRs.”

**Acceptance criteria:**

* PRs trigger pipeline; failing lint/tests block merge

---

## PART 9 — Data Migration & Rollout (Large / Ops)

**เป้าหมาย:** ย้ายข้อมูลจริงจากระบบ HTML/static (ถ้ามี DB) หรือ CSV → Supabase, เปิดใช้งานแบบ staged

**งาน:**

1. สำรวจข้อมูลเดิม: ถ้ามี CSV/Excel, แปลงเป็น normalized schema
2. เขียน migration scripts (Node script using supabase-js) เพื่อ insert data, map HN, users, case numbers
3. Test migration on staging DB, validate TAT timestamps, relationships
4. Rollout plan: deploy frontend, enable RLS, enable logging, monitor

**Copilot prompt:**

> “Generate a Node script to read CSV of cases and patients and insert into Supabase tables with deduplication on hn/email. Log conflicts to a file.”

**Acceptance criteria:**

* Staging contains migrated data; no FK violations

---

# Branching / PR / QA workflow (สั้น ๆ)

* Feature branches: `feat/{part}-{short}` (e.g., `feat/auth-supabase`)
* PR template: description, screenshots, testing steps, migration notes
* Code review checklist: lint pass, unit tests, accessibility basic (labels), no hardcoded secrets
* Merge: squash & merge, conventional commit message style: `feat: add login with supabase`

---

# ตัวอย่าง Copilot prompts แบบพร้อมใช้ (รวม)

1. “Create a React component `StatCard.jsx` that accepts `title, value, delta` props and renders a card with accessible labels. Export default.”
2. “Generate a `casesService.js` using supabase client with functions listCases, getCaseById, createCase, updateCase. Use limit/offset pagination.”
3. “Create `ProtectedRoute.jsx` that wraps children and redirects to /login if no user in AuthContext.”
4. “Create migration script `scripts/migratePatients.js` to import CSV and insert deduped patients into Supabase table; output conflicts to `migrate-conflicts.log`.”

---

# Quality gates & Acceptance criteria (global)

* All pages migrated must be navigable via React Router and preserve previous UX flow.
* Sensitive actions must write audit logs.
* RLS policies in place for user roles before production.
* PDF & Barcode generation validated in headless mode and by QA.

---

ถ้าจะให้ฉันแจกเป็น task list ที่พร้อมส่งให้ Copilot ทีละ PR (เช่น 12 PRs — รายชื่อไฟล์ที่ต้องสร้าง + exact Copilot prompt ต่อ PR) บอกได้ เดี๋ยวฉันจัดเป็นชุด PR-ready prompts ให้ จะได้โค้ดที่ไม่เละจนต้องมาเช็ดทีหลัง — แต่ถ้านายอยากให้ฉันเริ่มแจกงานให้เลย ฉันจะสร้างชุดแรก (PART 1 + PART 2) ให้เป็น prompt สำหรับ Copilot หมดทุกไฟล์ทันที เธอเลือก.
