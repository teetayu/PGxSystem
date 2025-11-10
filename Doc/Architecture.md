# architecture.md — SWU-PGx Digital Platform

> เอกสารสรุปโครงสร้างโปรเจกต์ปัจจุบัน (full scan จาก `PGxSystem-main.zip`) และแผนการย้ายเป็น React + Vite + Supabase

---

## 1. สรุปโดยย่อ

โปรเจกต์ที่สแกนเป็นเว็บแบบ static/รหัสฝั่งไคลเอนต์ (HTML/CSS/JS) แยกเป็นสองส่วนหลักคือ `User page/` (หน้าผู้ใช้ เช่น user page สำหรับ doctor/patient) และ `view/` (หน้าจัดการระบบและแอดมิน เช่น login, admin pages, forgot-password) มีไฟล์ HTML ~18, CSS ~13, JS ~4, รูปภาพประกอบหลายไฟล์

ผลสแกนแสดงว่าโค้ดเป็นแบบ monolithic static pages — เหมาะสำหรับย้ายเป็น SPA (React + Vite) มาก ๆ เพราะแต่ละหน้าเป็นหน้าฟอร์มและตารางที่สามารถแยกเป็น component ได้อย่างชัดเจน

---

## 2. รายการไฟล์สำคัญที่พบ (คัดเลือก)

* `User page/`

  * `UserpageDoctor-pre.html`, `UserpageDoctor-pre.css`, `UserpageDoctor-pre.js`
  * `Userpage_Patient-order.html`, `Userpage_Patient-order.css`, `Userpage_Patient-order.js`
  * รูปภาพใน `Userpage_image/`

* `view/` (admin/frontend)

  * `index.html` (Dashboard)
  * `login-main.html`, `forget-password.html`, `forget-otp-check.html`, `forget-change-password.html`, `forget-change-complete.html`
  * หลายหน้าแอดมิน: `admin-manage-user.html`, `admin-manage-role.html`, `admin-manage-pdpa-*.html`, `admin-general-setting.html`, `admin-log-usage.html`
  * โฟลเดอร์ `view/css/` ที่มีไฟล์ CSS สำหรับแต่ละหน้า
  * โฟลเดอร์ `view/js/` ที่มี JS เล็ก ๆ สำหรับแต่ละหน้าผู้ดูแล

(หมายเหตุ: README มีเนื้อหาเบื้องต้น — แต่โปรเจกต์ไม่มี package.json หรือโครงสร้าง Node project จากที่สแกน)

---

## 3. ประเมินคุณภาพโค้ดปัจจุบัน & ปัญหาที่เจอ

* โครงสร้างเป็น multiple static pages ทำให้โค้ดซ้ำ (repeated markup / repeated styles)
* CSS แยกไฟล์ตามหน้า ไม่มีระบบ componentization (utility classes / design tokens ไม่มี)
* JavaScript จำนวนไม่มาก แต่มีแนวโน้มเป็น DOM-manipulation แบบเก่า (querySelector + inline handlers)
* ไม่มีระบบจัดการ state, routing, หรือ reactivity ที่เป็นระเบียบ
* ไม่มีไฟล์ config/node tooling (เช่น package.json, build scripts) — ต้องสร้างโปรเจกต์ Vite ใหม่

ผล: เหมาะมากที่จะทำ incremental migration — แปลงแต่ละหน้าเป็น React component ทีละหน้า/โมดูล และเชื่อม Supabase เป็น backend (Auth, Database, Storage)

---

## 4. ข้อเสนอสถาปัตยกรรม (React + Vite + Supabase)

### 4.1 สรุปเทคโนโลยี

* Frontend: Vite + React (แนะนำ TypeScript แต่ถ้าทีมไม่ถนัดให้เริ่มด้วย JS ก่อน)
* UI framework: Tailwind CSS (เร็วในการรีแฟก CSS), หรือจัดเป็น CSS modules / styled-components หากต้องการ encapsulation
* State: React Query (for server state) + Context / Zustand สำหรับ client state หากจำเป็น
* Auth & DB: Supabase (Postgres) — ใช้ Auth, Realtime (subscriptions), Storage สำหรับไฟล์/PDF/labels
* PDF generation: generate server-side via Supabase Edge function หรือ client-side library (jsPDF/html2pdf) ขึ้นกับความต้องการ
* Deployment: Vercel / Netlify (frontend), Supabase hosting for DB and edge functions

### 4.2 โครงสร้างโฟลเดอร์ที่แนะนำ

```
pgx-frontend/
├─ public/               # static assets
├─ src/
│  ├─ app/
│  │  └─ RootApp.tsx
│  ├─ main.tsx
│  ├─ pages/
│  │  ├─ Dashboard/
│  │  │  └─ Dashboard.tsx
│  │  ├─ Login/
│  │  │  └─ Login.tsx
│  │  ├─ Case/
│  │  │  ├─ CaseList.tsx
│  │  │  └─ CaseDetail.tsx
│  │  └─ Admin/
│  │     └─ ManageUsers.tsx
│  ├─ components/
│  │  ├─ ui/              # buttons, inputs, modal, table
│  │  ├─ forms/           # PatientForm, SpecimenForm
│  │  └─ layout/          # TopNav, SideNav, Footer
│  ├─ hooks/              # useAuth, useCases, useNotifications
│  ├─ services/           # supabase client wrapper, api adaptors
│  ├─ types/              # TS types / interfaces
│  ├─ utils/              # helpers, formatters
│  └─ styles/             # globals, design tokens
├─ test/
├─ package.json
└─ vite.config.ts
```

(ถ้าไม่ใช้ TypeScript ให้เปลี่ยน .ts/.tsx เป็น .js/.jsx และตัด types/)

---

## 5. Mapping: หน้า HTML เดิม -> React Components / Routes

ตัวอย่างแมปหน้าสำคัญที่สแกน

* `index.html` → `/dashboard` → `pages/Dashboard/Dashboard.tsx` + `components/Dashboard/Widget*`
* `login-main.html` → `/login` → `pages/Login/Login.tsx`
* `UserpageDoctor-pre.html` → `/patient-order` → `pages/Case/CaseList.tsx` + `components/forms/PatientForm.tsx`
* `Userpage_Patient-order.html` → `/case/:caseId` → `pages/Case/CaseDetail.tsx` (genotype, CDS, reports)
* `admin-*.html` → `/admin/*` → `pages/Admin/...` (Manage Users, PDPA, Roles)
* `forget-*.html` → `/auth/forgot-password` flows (supabase auth magic links or OTP)

---

## 6. ข้อมูลโดเมน (Data Model) — ตารางฐานข้อมูล (Supabase / Postgres)

ออกแบบตารางหลัก (ย่อ):

### users

* id (uuid, PK)
* email
* full_name
* role (enum: admin, lab_tech, doctor, viewer)
* metadata (jsonb)
* created_at

### patients

* id (uuid, PK)
* hn (string, unique)
* name_first, name_last
* dob, gender
* contact
* e_consent (jsonb)
* created_by
* created_at

### cases / orders

* id (uuid)
* patient_id (fk)
* order_number (string)
* tests (jsonb) // list of ordered tests with details
* status (enum: received, pre-analytic, analytic, post-analytic, reported)
* tat_due (timestamp)
* assigned_lab
* created_at, updated_at

### specimens

* id
* case_id
* specimen_type
* volume
* container
* collected_at
* received_at
* rejection_reason (nullable)

### results

* id
* case_id
* test_code
* genotype (jsonb)
* phenotype
* interpretation (text)
* reported_at
* reported_by

### cds_rules

* id
* name
* trigger_condition (jsonb)
* action (jsonb) // e.g., recommendation, dose change
* source_reference

### audit_logs

* id, user_id, action_type, target_table, target_id, payload(jsonb), timestamp

(เพิ่มเติม: QC logs, SOPs, training logs, reports metadata)

---

## 7. Supabase integration points

* Auth: Supabase Auth for users (email + password, magic link)
* Database: Postgres tables as above (use RLS policies)
* Storage: PDFs, uploaded documents, barcode label templates
* Edge Functions: PDF generation, heavy CDS logic if needed server-side
* Realtime: listen to case status changes to update dashboard widgets

Security: ใช้ RLS (Row Level Security) — policy แยกตาม role; เข้ารหัสข้อมูล PII หากจำเป็น

---

## 8. Migration plan (incremental)

### Phase A — Setup

1. สร้าง repo ใหม่ (Vite + React) และตั้งค่า lint/format (ESLint + Prettier)
2. ติดตั้ง Supabase client และตั้งค่า `.env` (SUPABASE_URL, SUPABASE_KEY)
3. สร้าง base layout (TopNav, SideNav) และ theme (Tailwind หรือ CSS variables)

### Phase B — Core pages ( MVP )

1. Login / Auth flow → เชื่อม Supabase Auth
2. Dashboard (index) → แปลง stat widgets
3. Case list & Case detail (สำคัญ) → migration ของฟอร์มเพิ่มเคส, การแสดงผล genotype, CDS basic

### Phase C — Admin / PDPA / Reports

1. ย้ายหน้าจัดการผู้ใช้งาน และ PDPA flows พร้อม audit logs
2. Integrations: HIS/EMR (future) — เตรียม endpoints/adapter
3. PDF reports, barcode printing, storage

### Phase D — Polish & QA

* Accessibility, E2E tests (Cypress/Playwright), performance optimization, caching

> ระหว่าง migration ให้รักษา URL mapping เดิม (ถ้าจำเป็น) หรือวาง reverse-proxy เพื่อให้ระบบเก่ายังคงใช้งานได้ชั่วคราว

---

## 9. ตัวอย่างโค้ดเริ่มต้น (commands)

```bash
# สร้าง project (with TypeScript recommended)
npm create vite@latest pgx-frontend -- --template react-ts
cd pgx-frontend
npm install
npm i @supabase/supabase-js react-router-dom @tanstack/react-query
# optional: tailwind
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

ตัวอย่างการตั้งค่า Supabase client (`src/services/supabaseClient.ts`):

```ts
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
```

---

## 10. ข้อแนะนำเชิงปฏิบัติ (Refactor tips)

* แยก UI เป็น small reusable components (Button, Input, Table, Modal)
* สร้าง form schema (zod/yup) เพื่อ validate ฟอร์มการเพิ่มผู้ป่วยและการรับสิ่งส่งตรวจ
* เก็บ CDS rules แยกจาก UI — ให้เป็นชุดข้อมูลที่ deploy ได้ (JSON-driven)
* เก็บ logic การสร้าง PDF และปริ้นบาร์โค้ดไว้ใน service layer
* ปรับ CSS เป็น utility-first (Tailwind) หรือ CSS modules เพื่อป้องกันความยุ่งเหยิง
* ตั้ง RLS และ logging ตั้งแต่ต้น — สำคัญกับ PDPA

---

## 11. Risks & Considerations

* ต้องออกแบบ RLS ให้รัดกุมก่อนขึ้น production (PDPA)
* ถ้ามี integration กับเครื่องมือวิเคราะห์ (Analyzer) ที่ใช้ HL7/ASTM อาจต้องใช้อินเตอร์เฟซกลาง (middleware)
* การย้ายข้อมูลผู้ป่วยจากระบบเดิม อาจต้องทำ data migration + cleansing

---

## 12. Next steps (เทคนิคที่ฉันพร้อมทำให้ต่อ)

* สร้าง repo skeleton พร้อม Vite + React + Supabase
* แปลงหน้า `login-main.html` และ `index.html` เป็น React components (สองหน้าเป็น priority)
* ทำ mapping ของแต่ละ HTML → component พร้อม example PR

---

ไฟล์นี้สรุปจากการสแกน `PGxSystem-main.zip` โดยตรง และเสนอแผนการย้ายเป็น React + Supabase แบบ incremental ถ้านายอยากให้ฉันเริ่มสร้าง skeleton project จริง ๆ บอกมาได้เลย เดี๋ยวฉันจัดให้
