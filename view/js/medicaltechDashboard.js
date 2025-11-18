document.addEventListener('DOMContentLoaded', () => {
  // โหลดชื่อผู้ใช้จาก sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  const userNameBtn = document.querySelector('.newPatients');
  
  if (userNameBtn && currentUser.first_name) {
    userNameBtn.textContent = `${currentUser.first_name} ${currentUser.last_name}`;
  }
});
