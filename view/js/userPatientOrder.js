document.addEventListener('DOMContentLoaded', () => {
    // ----- ข้อมูลตัวอย่าง (ตามภาพ) -----
    const mock = {
        name: 'นายเทส ทดสอบ',
        hn: 'HN00001',
        physician: 'นายแพทย์ อิสราพงษ์ ชุ่มอ้อ'
    };

    // เติมลงหน้า
    document.getElementById('patient-name').textContent = mock.name;
    document.getElementById('patient-hn').textContent = mock.hn;
    document.getElementById('patient-doctor').textContent = mock.physician;

    // ถ้าภายหลังมีแบ็กเอนด์แล้ว ให้ลบโค้ดด้านบนนี้ทิ้ง
    // แล้วเรียกฟังก์ชัน fetch จากตัวอย่างก่อนหน้าแทน
});

// เมื่อกดปุ่มแท็บ เลือกรายการตรวจวินิจฉัย
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        // เอาคลาส active ออกจากทุกปุ่ม
        tabButtons.forEach((b) => b.classList.remove("active"));
        // ใส่คลาส active ให้ปุ่มที่ถูกคลิก
        btn.classList.add("active");

        // ซ่อนทุกแท็บ
        tabPanels.forEach((panel) => (panel.style.display = "none"));

        // แสดงเฉพาะแท็บที่เลือก
        const target = btn.getAttribute("data-tab");
        const panelsToShow = document.querySelectorAll(`#${target}, #${target}-2`);
        panelsToShow.forEach((p) => (p.style.display = "block"));
    });
});

// แสดงแท็บแรกตอนโหลด
document.addEventListener("DOMContentLoaded", () => {
    const defaultPanels = document.querySelectorAll("#tab-snp, #tab-snp-2");
    defaultPanels.forEach((p) => (p.style.display = "block"));
});

// แสดงรายการวินิจฉัย
document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('selected-tests-body');
    const boxes = document.querySelectorAll('.chk input[type="checkbox"]');

    // เก็บรายการที่เลือก (key = code หรือ name)
    const selected = new Map();

    const escapeHtml = (s) =>
        String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

    const getKey = (el) => el.dataset.code || el.dataset.name;

    const addItem = (el) => {
        const code = el.dataset.code || '';
        const name = el.dataset.name || el.parentElement.textContent.trim();
        selected.set(getKey(el), { code, name });
    };

    const removeItem = (el) => {
        selected.delete(getKey(el));
    };

    const render = () => {
        const rows = Array.from(selected.values());

        // จัดเรียง: มี code มาก่อน -> เรียงตาม code (เลข/ตัวอักษร) -> ไม่มีก็เรียงตามชื่อ
        rows.sort((a, b) => {
            const aHas = !!a.code, bHas = !!b.code;
            if (aHas && !bHas) return -1;
            if (!aHas && bHas) return 1;

            if (aHas && bHas) {
                const an = parseInt(a.code, 10), bn = parseInt(b.code, 10);
                if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;
                return a.code.localeCompare(b.code, 'th');
            }
            return a.name.localeCompare(b.name, 'th');
        });

        tbody.innerHTML = rows.map(r =>
            `<tr>
         <td>${escapeHtml(r.code || '')}</td>
         <td>${escapeHtml(r.name)}</td>
       </tr>`
        ).join('');
    };

    // ผูก event และ preload รายการที่ถูกเช็คไว้แล้ว
    boxes.forEach(box => {
        if (box.checked) addItem(box);
        box.addEventListener('change', (e) => {
            if (e.target.checked) addItem(e.target);
            else removeItem(e.target);
            render();
        });
    });

    // แสดงผลครั้งแรก (กรณีมีค่าเช็คไว้ใน HTML)
    render();
});