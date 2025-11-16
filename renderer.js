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
  
const accessMap = {
  1: { text: 'Admin', class: 'badge-admin' },
  2: { text: 'User', class: 'badge-user' },
  3: { text: 'Manager', class: 'badge-manager' }
};

const roleMap = {
  1: 'แพทย์',
  2: 'เภสัช',
  3: 'นักเทคนิคการแพทย์',
  4: 'พนักงาน'
};


  users.forEach(u => {
  table.innerHTML += `
    <tr data-id="${u.user_id}">
      <td>${u.first_name} ${u.last_name}</td>
      <td>${u.email}</td>
      <td>${roleMap[u.role_id] || 'ไม่ทราบ'}</td>
      <td><span class="badge ${accessMap[u.access_id]?.class || 'badge-default'}">${accessMap[u.access_id]?.text || 'Unknown'}</span></td>
      <td>${new Date(u.created_at).toISOString().split('T')[0]}</td>

      <td>
        <button class="btn btn-edit" data-id="${u.user_id}">แก้ไข</button>
        <button class="btn btn-delete" data-id="${u.user_id}">ลบ</button>
      </td>
    </tr>
  `;
});
}

//
// โหลดข้อมูลตอนหน้าเว็บเปิด(delete this line if not needed)
//
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎉 DOM loaded — loading users...");
  loadUsers();
});
console.log("renderer.js loaded");


// Global store เก็บข้อมูลผู้ใช้งาน
const Store1 = {
  users: [],
  setUsers(list) {
    this.users = list;
    console.log("📦 Users stored in Store:", this.users);
  },
  getUsers() {
    return this.users;
  }
};

// ฟังก์ชันดึงข้อมูลจาก main process
async function loadUsers() {
  try {
    const user = await window.electronAPI.getUsers();
    Store.setUsers(user);
    renderUsers(user); // <-- เรียก renderUsers ที่เราสร้าง
  } catch (err) {
    console.error("❌ loadUsers Error:", err);
  }
}

// --------------------------------------------------
// ใส่ฟังก์ชัน renderUsers ตรงนี้เลย
// --------------------------------------------------
function renderUsers(users) {
    const table = document.getElementById("user-table-body");
    if (!table) return;

    table.innerHTML = "";

    const accessMap = {
      1: { text: 'Admin', class: 'badge-admin' },
      2: { text: 'User', class: 'badge-user' },
      3: { text: 'Manager', class: 'badge-manager' }
    };

    const roleMap = {
      1: 'แพทย์',
      2: 'เภสัช',
      3: 'นักเทคนิคการแพทย์',
      4: 'พนักงาน'
    };

    users.forEach(u => {
        table.innerHTML += `
        <tr>
            <td>${u.first_name} ${u.last_name}</td>
            <td>${u.email}</td>
            <td>${roleMap[u.role_id] || 'ไม่ทราบ'}</td>
            <td><span class="badge ${accessMap[u.access_id]?.class || 'badge-default'}">${accessMap[u.access_id]?.text || 'Unknown'}</span></td>
            <td>${new Date(u.created_at).toISOString().split('T')[0]}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" data-id="${u.user_id}">แก้ไข</button>
                    <button class="btn btn-delete" data-id="${u.user_id}">ลบ</button>
                </div>
            </td>
        </tr>
        `;
    });

    // เพิ่ม event listener สำหรับปุ่มลบ
    document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const userId = e.target.dataset.id;
        console.log("Clicked delete user ID:", userId); // debug
        if (!confirm("คุณต้องการลบผู้ใช้นี้ใช่หรือไม่?")) return;

        try {
            const response = await window.electronAPI.deleteUser(userId);
            console.log("Delete response:", response); // debug
            if (response.success) {
                alert("ลบผู้ใช้เรียบร้อยแล้ว");
                await loadUsers();
            } else {
                alert(response.message || "ไม่สามารถลบผู้ใช้ได้");
            }
        }   catch (err) {
            console.error("Failed to delete user:", err);
            alert("เกิดข้อผิดพลาดในการลบผู้ใช้");
        }
    });
});

}

// โหลดข้อมูลผู้ใช้ตอนหน้าเว็บพร้อม
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎉 DOM loaded — loading users...");
  loadUsers();
});

