// ========================================
// Physics Platform - Main JavaScript
// ========================================

// Global token management
const getToken = () => localStorage.getItem('authToken');
const setToken = (token) => localStorage.setItem('authToken', token);
const removeToken = () => localStorage.removeItem('authToken');

// Check authentication state
const isAuthenticated = () => !!getToken();

// Update navigation based on auth state
function updateNav() {
  const authLinks = document.getElementById('auth-links');
  if (!authLinks) return;

  if (isAuthenticated()) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = user.role;
    authLinks.innerHTML = `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          <i class="fas fa-user-circle me-1"></i>Dashboard
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          ${role === 'teacher'
            ? `<li><a class="dropdown-item" href="teacher-dashboard.html">Teacher Dashboard</a></li>`
            : `<li><a class="dropdown-item" href="student-dashboard.html">Student Dashboard</a></li>`
          }
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#" id="logout-btn">Logout</a></li>
        </ul>
      </li>
    `;
    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  } else {
    authLinks.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
      <li class="nav-item"><a class="nav-link btn-accent ms-2" href="register.html">Register</a></li>
    `;
  }
}

function logout() {
  removeToken();
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// API helper
async function apiRequest(url, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
  const res = await fetch(url, { ...options, headers });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}

// Loading overlay
function showLoading() {
  const overlay = document.createElement('div');
  overlay.className = 'spinner-overlay';
  overlay.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';
  document.body.appendChild(overlay);
}
function hideLoading() {
  const overlay = document.querySelector('.spinner-overlay');
  if (overlay) overlay.remove();
}

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Update nav on page load
document.addEventListener('DOMContentLoaded', updateNav);

// Export utilities globally (if needed)
window.apiRequest = apiRequest;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
