// Load patient orders from Supabase via Electron IPC and render table (Doctor view)

function mapStatusToText(status) {
    if (!status) return 'รอดำเนินการ';
    const s = String(status).toLowerCase();
    if (['pending', 'รอดำเนินการ'].includes(s)) return 'รอดำเนินการ';
    if (['completed', 'เสร็จสิ้น', 'complete', 'finished'].includes(s)) return 'เสร็จสิ้น';
    if (['processing', 'กำลังดำเนินการ', 'inprogress'].includes(s)) return 'กำลังดำเนินการ';
    return status;
}

function renderOrders(orders) {
    const tbody = document.getElementById('report-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    (orders || []).forEach((o, idx) => {
        const tr = document.createElement('tr');

        const pat = o.patient || {};
        const name = [pat.first_name || pat.firstname || pat.fname, pat.last_name || pat.lastname || pat.lname]
            .filter(Boolean)
            .join(' ');
        const hn = pat.hospital_number || pat.hn || pat.HN || pat.id_number || pat.national_id || '-';
        const inspectionCode = (o.inspection && o.inspection.inspection_code) || o.inspection_code || '';
        // ใช้ status_name จาก join ถ้ามี ไม่งั้น fallback map
        const statusText = (o.status && o.status.status_name) ? o.status.status_name : mapStatusToText(o.status_id || 'รอดำเนินการ');
        const userId = (o.patient && o.patient.users_id) || '';
        const geneId = (o.inspection && o.inspection.gene && o.inspection.gene.gene_id) || '';

        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${name || '-'}</td>
            <td>${hn}</td>
            <td><span class="badge">${statusText}</span></td>
            <td>${inspectionCode || '-'}</td>
            <td></td>
        `;

        const actionTd = tr.lastElementChild;
        const btn = document.createElement('button');
        btn.className = 'select-btn';
        btn.type = 'button';
        btn.textContent = 'เลือก';
        btn.disabled = !inspectionCode;
        btn.addEventListener('click', () => {
            if (!inspectionCode) return;
            // Always navigate to doctorReport2D6.html with params
            const params = new URLSearchParams({
                order_id: String(o.order_id ?? '').trim(),
                inspection_code: String(inspectionCode ?? '').trim(),
                users_id: String(userId ?? '').trim(),
                gene_id: String(geneId ?? '').trim()
            });
            location.href = `doctorReport2D6.html?${params.toString()}`;
        });
        actionTd.appendChild(btn);

        tbody.appendChild(tr);
    });
}

async function loadOrders() {
    try {
        const orders = await window.electronAPI.getPatientOrders();
        renderOrders(orders);
    } catch (err) {
        console.error('โหลดรายการตรวจล้มเหลว:', err);
        renderOrders([]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ตั้งชื่อผู้ใช้งานแบบ dynamic จาก sessionStorage (ตั้งตอน login)
    try {
        const raw = sessionStorage.getItem('currentUser');
        if (raw) {
            const u = JSON.parse(raw);
            const fullName = [u.first_name || u.fname, u.last_name || u.lname].filter(Boolean).join(' ');
            const nameBtn = document.querySelector('.newPatients');
            if (nameBtn && fullName) nameBtn.textContent = fullName;
        }
    } catch (e) {
        console.warn('อ่านข้อมูลผู้ใช้ไม่สำเร็จ:', e);
    }
    loadOrders();
});
