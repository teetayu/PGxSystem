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

    // ---- Submit Order Handler ----
    const submitBtn = document.getElementById('submit-order-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            try {
                const physician_order = document.getElementById('physician_order_input')?.value?.trim() || '';
                const patient_medication = document.getElementById('patient_medication_input')?.value?.trim() || '';
                const drug_name = document.getElementById('drug_name_input')?.value?.trim() || '';

                // Collect selected tests from rendered table
                const testRows = Array.from(document.querySelectorAll('#selected-tests-body tr'));
                const tests = testRows.map(r => {
                    const cells = r.querySelectorAll('td');
                    return {
                        inspection_code: (cells[0]?.textContent || '').trim(),
                        inspection_name: (cells[1]?.textContent || '').trim()
                    };
                });

                // Capture order_date (ISO + display)
                const now = new Date();
                const order_date = now.toISOString();
                const order_date_display = now.toLocaleString('th-TH', {
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit'
                }).replace(',', '');

                const orderDraft = {
                    patient: {
                        name: document.getElementById('patient-name')?.textContent?.trim() || '',
                        hospital_number: document.getElementById('patient-hn')?.textContent?.trim() || '',
                        physician_name: document.getElementById('patient-doctor')?.textContent?.trim() || ''
                    },
                    physician_order,
                    patient_medication,
                    drug_name,
                    tests,
                    order_date,            // raw ISO timestamp (for DB insert)
                    order_date_display,    // formatted for preview
                    created_at: order_date // keep backward compatibility
                };

                localStorage.setItem('pgxOrderDraft', JSON.stringify(orderDraft));
                // Navigate after save
                window.location.href = '/view/userDoctorPre.html';
            } catch (err) {
                console.error('Failed to save order draft', err);
                alert('เกิดข้อผิดพลาดในการบันทึกข้อมูลใบสั่งตรวจ');
            }
        });
    }
});