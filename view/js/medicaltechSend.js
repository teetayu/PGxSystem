// ===== Mock data (รอเชื่อม backend) =====
const ORDERS = [
    {
        orderNo: "TOR0011",
        hn: "HN00001",
        patientName: "นายเทส ทดสอบ",
        testCode: "400094",
        doctor: "อิสราพงษ์ ซุ่นฮ้อ",
        date: "30/10/2025",

        orderId: "400094",
        orderName: "Genomic DNA Extraction",
        specimenType: "Blood/EDTA",
        minVolume: "3–6 mL, 1–2 หลอด",
        container: "TUBE123456",
        transportTemp: "20–25 องศา",
        reason: "*เหตุผลตรวจ*",
        regimen: "*ระบุยาใช้ในการรักษา*",
        currentMeds: "*ระบุที่ผู้ป่วยได้รับ*"
    },
    {
        orderNo: "TOR0012",
        hn: "HN00002",
        patientName: "นายราม บัวเอี่ยม",
        testCode: "410028",
        doctor: "สุภาวรรรณ แก้วมณี",
        date: "30/10/2025",

        orderId: "410028",
        orderName: "Genomic DNA Extraction",
        specimenType: "Blood/EDTA",
        minVolume: "3–6 mL, 1–2 หลอด",
        container: "TUBE987654",
        transportTemp: "2–8 องศา",
        reason: "*สงสัยภาวะทางพันธุกรรม*",
        regimen: "*จะใช้ยาตามแนวทาง*",
        currentMeds: "*ASA 81 mg*"
    }
];

// โหลดชื่อผู้ใช้จาก sessionStorage
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    const userNameBtn = document.querySelector('.newPatients');
    
    if (userNameBtn && currentUser.first_name) {
        userNameBtn.textContent = `${currentUser.first_name} ${currentUser.last_name}`;
    }
});

// ===== DOM refs =====
const tbody = document.getElementById('orderTbody');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-button');

// ฟอร์มด้านขวา
const $ = (id) => document.getElementById(id);
const fields = {
    orderId: $('orderId'),
    orderName: $('orderName'),
    specimenType: $('specimenType'),
    minVolume: $('minVolume'),
    container: $('container'),
    transportTemp: $('transportTemp'),
    reason: $('reason'),
    regimen: $('regimen'),
    currentMeds: $('currentMeds'),
};

// ปุ่ม
const btnViewOrder = document.getElementById('btnViewOrder');
const btnAccept = document.getElementById('btnAccept');
const btnReject = document.getElementById('btnReject');
const btnPrint = document.getElementById('btnPrint');

// ===== state =====
let filtered = [...ORDERS];
let selectedIndex = -1;

// ===== renderers =====
function renderTable(list) {
    tbody.innerHTML = '';
    list.forEach((o, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${o.orderNo}</td>
      <td>${o.hn}</td>
      <td>${o.testCode}</td>
      <td>${o.doctor}</td>
      <td>${o.date}</td>
    `;
        tr.addEventListener('click', () => onSelect(idx));
        if (idx === selectedIndex) tr.classList.add('selected');
        tbody.appendChild(tr);
    });
}

function fillForm(o) {
    fields.orderId.value = o.orderId || '';
    fields.orderName.value = o.orderName || '';
    fields.specimenType.value = o.specimenType || '';
    fields.minVolume.value = o.minVolume || '';
    fields.container.value = o.container || '';
    fields.transportTemp.value = o.transportTemp || '';
    fields.reason.value = o.reason || '';
    fields.regimen.value = o.regimen || '';
    fields.currentMeds.value = o.currentMeds || '';
}

// ===== interactions =====
let selectedOrder = null;

function onSelect(idx) {
    selectedIndex = idx;
    selectedOrder = filtered[idx];   // เก็บรายการที่เลือก

    // ไฮไลต์แถว
    [...tbody.children].forEach((tr, i) => {
        tr.classList.toggle('selected', i === idx);
    });

    // เติมฟอร์ม + แสดงแผงรายละเอียด
    fillForm(selectedOrder);
    panelDetail.classList.add('active');
}

function clearForm() {
    Object.values(fields).forEach(el => el.value = '');
    selectedOrder = null;            // เคลียร์สถานะที่เลือก
    panelDetail.classList.remove('active');
}

function doSearch() {
    const q = (searchInput.value || '').trim().toLowerCase();
    filtered = !q
        ? [...ORDERS]
        : ORDERS.filter(o =>
            [o.orderNo, o.hn, o.testCode, o.doctor, o.orderName]
                .some(v => (v || '').toLowerCase().includes(q))
        );

    selectedIndex = -1;
    clearForm();
    renderTable(filtered);
}

// ปุ่ม toolbar
searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });

// ===== init =====
renderTable(filtered);

// ===== อ้างอิง panel-detail เพื่อสลับสถานะปุ่ม =====
const panelDetail = document.querySelector('.panel-detail');
panelDetail.classList.remove('active');   // ให้แน่ใจว่าเริ่มต้นไม่มี .active

// ===== ปุ่ม "พิมพ์บาร์โค้ด" =====
btnPrint.addEventListener('click', () => {
    if (selectedOrder) {
        // ส่งข้อมูลไปยังหน้า BarcodePatient.html
        sessionStorage.setItem('selectedOrder', JSON.stringify(selectedOrder));
    } else {
        sessionStorage.removeItem('selectedOrder');
    }
    window.location.href = 'medicaltechSendBarcode.html';
});

btnViewOrder.addEventListener('click', () => {
    // ✅ ไม่เช็ก selectedOrder แล้ว ไปหน้าต่อได้เลย
    const o = selectedOrder || {};

    // สร้างพารามิเตอร์ส่งไปหน้า Pre-Doctor.html
    const params = new URLSearchParams({
        orderId: (fields.orderId.value || o.orderId || '').trim(),
        orderName: (fields.orderName.value || o.orderName || '').trim(),
        patientName: o.patientName || '',
        hn: o.hn || '',
        doctor: o.doctor || '',
        specimenType: (fields.specimenType.value || o.specimenType || '').trim(),
        container: (fields.container.value || o.container || '').trim(),
        collectedAt: '29/10/2023 10:30',
        collector: 'คุณสมชาย ทดสอบ'
    });

    // ✅ ไปหน้า Pre-Doctor.html พร้อมส่งพารามิเตอร์
    window.location.href = `medicaltechSendDoctor.html?${params.toString()}`;
});