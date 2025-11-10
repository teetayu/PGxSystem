// ----- MOCK DATA (รอแทนด้วยข้อมูลจริงจาก backend) -----
const mockOrder = {
    patient: {
        name: 'นายเทส ทดสอบ',
        hn: 'HN00001',
        physician: 'นายแพทย์ อิสราพงษ์ ชุ่มอ้อ'
    },
    tests: [
        { code: '400097', name: 'Genomic DNA Extraction' },
        { code: '410028', name: 'PGx for Acetaminophen (CYP2D6)' }
    ],
    extra: {
        collectedAt: '29/10/2023 10:30',
        collector: 'คุณสมชาย ทดสอบ',
        specimenType: 'BloodEDTA',
        containerNo: 'TUBE123456'
    }
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
    setText('collected-at', order?.extra?.collectedAt);
    setText('collector', order?.extra?.collector);
    setText('specimen-type', order?.extra?.specimenType);
    setText('container-no', order?.extra?.containerNo);
}

// ----- เรียกใช้ตอนนี้ด้วย mock -----
renderOrder(mockOrder);

// ----- ตัวอย่างการเรียกใช้เมื่อได้ข้อมูลจาก backend -----
// fetch('/api/orders/123')
//   .then(res => res.json())
//   .then(renderOrder)
//   .catch(console.error);

