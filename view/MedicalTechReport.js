// ระบุจุดที่จะเติมข้อมูล
const tbody = document.getElementById('report-body');

fetch('')  //ใช้คำสั่ง fetch() เพื่อเรียก API ที่ backend เตรียมไว้
    .then(response => response.json()) // แปลงข้อมูลที่ได้ให้เป็น JSON
    .then(data => {
        console.log(data); // ดูข้อมูลที่ backend ส่งมา
    });

// ตัวอย่างข้อมูลจำลอง (Mock data) รอ back end พร้อมค่อยลบ
const reportData = [
    { no: 1, fullName: "นายเทส ทดสอบ", hn: "HN000011", status: "รอดำเนินการ", genotype: "CYP2C9" },
    { no: 2, fullName: "นายราม ไชยราบ", hn: "HN000012", status: "รอดำเนินการ", genotype: "VKORC1" },
    { no: 3, fullName: "นายอาม นานมาก", hn: "HN000013", status: "รอดำเนินการ", genotype: "CYP2C19" }
];

// ฟังก์ชันแสดงข้อมูลในตาราง
function renderReportTable(data) {
    const tbody = document.getElementById("report-body");
    tbody.innerHTML = ""; // เคลียร์ของเก่าออก

    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${item.no}</td>
      <td>${item.fullName}</td>
      <td>${item.hn}</td>
      <td><span class="badge">${item.status}</span></td>
      <td>${item.genotype}</td>
      <td><button class="muted-btn" onclick="editRow(${item.no})">แก้ไข</button></td>
      <td><button class="select-btn" onclick="viewResult(${item.no})">เลือก</button></td>
    `;
        tbody.appendChild(tr);
    });
}

// ✅ ฟังก์ชันเมื่อกดปุ่ม “แก้ไข”
function editRow(no) {
    // ส่งหมายเลข (no) ไปยังหน้า MedicalTechPatient.html ผ่านพารามิเตอร์ URL
    window.location.href = `MedicalTechCYP2D6-genotype.html?id=${no}`;
}

// เมื่อกดปุ่ม “เลือก”
function selectRow(no) {
    window.location.href = ``;
}

// เริ่มแสดงข้อมูลเมื่อหน้าโหลดเสร็จ
document.addEventListener("DOMContentLoaded", () => {
    renderReportTable(reportData);
});

//ปุ่ม 3 ปุ่ม ใน menu
document.addEventListener("DOMContentLoaded", () => {
    // ดึงชื่อไฟล์ปัจจุบัน เช่น "Report.html"
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    // ดึงปุ่มทั้งหมดในเมนู
    const menuItems = document.querySelectorAll(".menu-item");

    // วนเช็กแต่ละปุ่ม
    menuItems.forEach(item => {
        const text = item.textContent.trim().toLowerCase();

        if (
            (currentPage.includes("dashboard") && text === "dashboard") ||
            (currentPage.includes("patients") && text === "patients") ||
            (currentPage.includes("report") && text === "report")
        ) {
            item.classList.add("active");
        }
    });
});

