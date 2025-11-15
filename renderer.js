console.log("renderer.js loaded");
window.electronAPI.getUsers()

//
// Global store เก็บข้อมูลจาก Supabase
//
const Store = {
  users: [],

  setUsers(list) {
    this.users = list;
    console.log("📦 Users stored in Store:", this.users);
  },

  getUsers() {
    return this.users;
  }
};

//
// ดึงข้อมูลจาก main.js ผ่าน preload.js
//
async function loadUsers() {
  try {
    const user = await window.electronAPI.getUsers();
    Store.setUsers(user);     // เก็บในตัวแปร
    renderUsers(user);        // แสดงผลในหน้าเว็บ
  } catch (err) {
    console.error("❌ loadUsers Error:", err);
  }
}

//
// ฟังก์ชันแสดงผลในหน้าเว็บ (แก้ตาม UI ของคุณได้เลย)
//
function renderUsers(users) {
  const table = document.getElementById("user-table-body");
  if (!table) return;

  table.innerHTML = "";

  users.forEach(u => {
    table.innerHTML += `
      <tr>
        
        <td>${u.first_name} ${u.last_name}</td>
        <td>${u.email}</td>
        <td>${u.role_id}</td>
        <td>${u.access_id}</td>
        <td>${new Date(u.created_at).toISOString().split('T')[0]}</td>
      </tr>
    `;
  });
}

//
// โหลดข้อมูลตอนหน้าเว็บเปิด
//
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎉 DOM loaded — loading users...");
  loadUsers();
});
