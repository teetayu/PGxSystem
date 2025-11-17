document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  if (!loginBtn) {
    console.error("loginBtn not found");
    return;
  }

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    try {
      const res = await window.electronAPI.login(email, password);

      if (!res.success) {
        alert(res.message);
        return;
      }

      localStorage.setItem("loginUser", JSON.stringify(res.user));
      switch (res.user.role_id) {
        case 1: window.location.href = "doctor-main.html"; break;
        case 2: window.location.href = "pharmacist-main.html"; break;
        case 3: window.location.href = "เทคนิกการแพทย์/MedicalTechDoctor.html"; break;
        case 4: window.location.href = "staff-main.html"; break;
        default: alert("role_id ไม่ถูกต้อง"); break;
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  });
});
