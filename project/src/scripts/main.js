function eventListens() {
  const $logoutBtn = document.getElementById('logout');
  $logoutBtn?.addEventListener('click', logout);
}

async function logout() {
  if (confirm('로그아웃을 진행하시겠습니까?')) {
    window.location.replace('/logout');
  }
}

document.addEventListener('DOMContentLoaded', () => eventListens());
