// ----- Load order from previous page or fallback to mock -----
function loadOrder() {
    try {
        const raw = localStorage.getItem('pgxOrderDraft');
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        console.error('Failed parsing pgxOrderDraft', e);
        return null;
    }
}

const fallbackMock = {
    patient: { name: 'N/A', hn: 'N/A', physician: 'N/A' },
    tests: [],
    reason: '',
    currentMeds: '',
    treatmentDrug: '',
    createdAt: '',
    extra: { collectedAt: '', collector: '', specimenType: '', containerNo: '' }
};

// ----- RENDER FUNCTIONS -----
function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? '';
}

function renderOrder(order) {
    // ชื่อ-เลข HN-แพทย์
    setText('patient-name', order?.patient?.name);
    setText('patient-hn', order?.patient?.hn);
    setText('physician', order?.patient?.physician);

    // ตารางรายการตรวจ
    const rowsHost = document.getElementById('order-rows');
    if (rowsHost) {
        rowsHost.innerHTML = (order?.tests ?? [])
            .map(t => `
          <div class="tr">
            <div class="td code">${t.code ?? ''}</div>
            <div class="td name">${t.name ?? ''}</div>
          </div>
        `).join('');
    }

    // ข้อมูลเพิ่มเติม
    // Reason
    setText('order-reason', order?.reason);

    // Fill medicine note inputs if present
    const treatmentInput = document.querySelector('.medicine-note input[name="order"]');
    // There are two inputs with name="order" in template; queryAll and map
    const noteInputs = document.querySelectorAll('.medicine-note input');
    if (noteInputs.length >= 2) {
        // First: treatmentDrug, Second: currentMeds (based on template order)
        if (noteInputs[0]) noteInputs[0].value = order?.treatmentDrug || '';
        if (noteInputs[1]) noteInputs[1].value = order?.currentMeds || '';
    }

    // Extra info (if later provided)
    setText('collected-at', order?.extra?.collectedAt);
    setText('collector', order?.extra?.collector);
    setText('specimen-type', order?.extra?.specimenType);
    setText('container-no', order?.extra?.containerNo);
}

// Attempt load and render
const loaded = loadOrder() || fallbackMock;
renderOrder(loaded);

// ----- ตัวอย่างการเรียกใช้เมื่อได้ข้อมูลจาก backend -----
// Example future integration (replace localStorage):
// fetch('/api/orders/123')
//   .then(res => res.json())
//   .then(order => { renderOrder(order); localStorage.removeItem('pgxOrderDraft'); })
//   .catch(console.error);