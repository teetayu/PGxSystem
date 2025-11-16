// 1. เลือกองค์ประกอบ (Element) ที่ต้องใช้
const modalOverlay = document.getElementById('user-modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalTitle = document.getElementById('modal-title'); // หัวข้อ Pop-up

// 2. เลือก "ปุ่ม" ที่จะใช้เปิด Modal
const createUserBtn = document.querySelector('.add-user-button'); // ปุ่ม "Create New user"
const editButtons = document.querySelectorAll('.btn-edit'); // ปุ่ม "แก้ไข" ทั้งหมด
const confirmBtn = document.querySelector('.confirm-btn');

// 3. เลือก "ช่องกรอกข้อมูล" ใน Pop-up
const modalFirstname = document.getElementById('modal-firstname');
const modalLastname = document.getElementById('modal-lastname');
const modalEmail = document.getElementById('modal-email');
const modalPassword = document.getElementById('modal-password');
const modalJobRole = document.getElementById('modal-job-role'); // เพิ่ม
const modalAccessLevel = document.getElementById('modal-access-level'); // เปลี่ยน
const modalConfirmPassword = document.getElementById('modal-confirm-password');

const tableBody = document.getElementById('user-table-body');
const roleLabel = { 1: 'แพทย์', 2: 'เภสัช', 3: 'นักเทคนิคการแพทย์', 4: 'พนักงาน' };
const accessLabel = { 1: 'Admin', 2: 'User' };

// 4. ฟังก์ชันสำหรับ "ปิด" Modal (เหมือนเดิม)
function closeTheModal() {
    modalOverlay.style.display = 'none'; // ซ่อน Pop-up
}

// 5. สั่งให้ปุ่ม "รอฟัง" การคลิก

// ---------------------------------------------
// เมื่อคลิกปุ่ม "Create New user"
// ---------------------------------------------
createUserBtn.addEventListener('click', function() {
    // 1. ลบคลาส "editing" เพื่อ "ซ่อน" ไอคอน
    modalOverlay.classList.remove('modal-is-editing');
    
    // 2. ตั้งหัวข้อ
    modalTitle.textContent = 'เพิ่มข้อมูลผู้ใช้งาน';
    
    // 3. ล้างฟอร์มให้ว่างทั้งหมด (และใส่ placeholder)
    modalFirstname.value = '';
    modalFirstname.placeholder = '';
    modalLastname.value = '';
    modalLastname.placeholder = '';
    modalEmail.value = '';
    modalEmail.placeholder = '';
    modalPassword.value = '';
    modalPassword.placeholder = ''; // รหัสผ่านไม่ต้องมี placeholder
    modalJobRole.value = ''; // ตั้งค่าเริ่มต้น
    modalAccessLevel.value = ''; // ตั้งค่าเริ่มต้น
    modalConfirmPassword.value = '';
    modalConfirmPassword.placeholder = ''; // รหัสผ่านไม่ต้องมี placeholder

    // 4. เปิด Pop-up
    modalOverlay.style.display = 'flex';
});

// ---------------------------------------------
// เมื่อคลิกปุ่ม "แก้ไข" (ปุ่มใดก็ตาม)
// ---------------------------------------------
editButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 1. เพิ่มคลาส "editing" เพื่อ "แสดง" ไอคอน
        modalOverlay.classList.add('modal-is-editing');

        // 2. ตั้งหัวข้อ
        modalTitle.textContent = 'แก้ไขข้อมูลผู้ใช้งาน';
        
        // 3. (สำหรับอนาคต) ดึงข้อมูลเก่ามาใส่
        // (ตัวอย่างสมมติ)
        modalFirstname.value = 'เทส'; // ดึงชื่อจริง
        modalFirstname.placeholder = 'ชื่อจริง';
        modalLastname.value = 'ทดสอบ'; // ดึงนามสกุล
        modalLastname.placeholder = 'นามสกุล';
        modalEmail.value = 'login@gmail.com';
        modalEmail.placeholder = 'login@gmail.com';
        modalPassword.value = '●●●●●●●●';
        modalPassword.placeholder = '';
        modalJobRole.value = 'pharmacist'; // ดึงบทบาท
        modalAccessLevel.value = 'user'; // ดึงระดับ
        modalConfirmPassword.value = '●●●●●●●●';
        modalConfirmPassword.placeholder = '';

        // 4. เปิด Pop-up
        modalOverlay.style.display = 'flex';
    });
});

// ---------------------------------------------
// การปิด Pop-up (เหมือนเดิม)
// ---------------------------------------------

// เมื่อคลิกปุ่ม 'X'
closeModalBtn.addEventListener('click', closeTheModal);

// (ทางเลือก) เมื่อคลิกที่พื้นหลังสีเทา ให้ปิด Pop-up ด้วย
window.addEventListener('click', function (event) {
    if (event.target == modalOverlay) {
        closeTheModal();
    }
});

// ...existing code...
// ---------------------------------------------
// เมื่อคลิกปุ่ม "ยืนยัน" ให้ส่งข้อมูลไปยัง main process
// ---------------------------------------------

if (confirmBtn) {
    confirmBtn.addEventListener('click', async function (event) {
        event.preventDefault();

        if (!window.electronAPI || typeof window.electronAPI.createUser !== 'function') {
            console.error('electronAPI.createUser is not available');
            alert('ไม่สามารถเชื่อมต่อกับระบบได้ กรุณาลองใหม่อีกครั้ง');
            return;
        }

        if (modalOverlay.classList.contains('modal-is-editing')) {
            document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.dataset.id;
                const user = users.find(u => u.user_id === parseInt(userId));
                openEditForm(user);
            });
            });
            async function updateUser(updatedUser) {
            const result = await window.electronAPI.updateUser(updatedUser);
            if (result.success) {
                alert('อัปเดตข้อมูลสำเร็จ');
                loadUsers(); // โหลดข้อมูลใหม่
            } else {
                alert('เกิดข้อผิดพลาด: ' + result.error);
            }
            }
            // alert('ฟังก์ชันแก้ไขยังไม่พร้อมใช้งาน');
            return;
        }

        const firstname = modalFirstname.value.trim();
        const lastname = modalLastname.value.trim();
        const email = modalEmail.value.trim();
        const password = modalPassword.value;
        const confirmPassword = modalConfirmPassword.value;
        const jobRole = modalJobRole.value;
        const accessLevel = modalAccessLevel.value;

        if (!firstname || !lastname || !email || !password || !confirmPassword || !jobRole || !accessLevel) {
            alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
            return;
        }

        if (password !== confirmPassword) {
            alert('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
            return;
        }

        try {
            const response = await window.electronAPI.createUser({
                firstname,
                lastname,
                email,
                password,
                job_role: jobRole,
                access_level: accessLevel
            });

                        if (response && response.success) {
                                alert('เพิ่มผู้ใช้เรียบร้อยแล้ว');
                                closeTheModal();
                                await loadUsers();
                        } else {
                const message = response && response.message ? response.message : 'ไม่สามารถเพิ่มผู้ใช้ได้';
                alert(message);
            }
        } catch (error) {
            console.error('Failed to create user:', error);
            alert('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้');
        }
    });
}

