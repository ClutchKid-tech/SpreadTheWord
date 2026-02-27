// ── DOM References ──────────────────────────────────────────
var authGate  = document.getElementById('auth-gate');
var dashboard = document.getElementById('portal-dashboard');
var userName  = document.getElementById('user-name');
var userEmail = document.getElementById('user-email');
var userAvatar = document.getElementById('user-avatar');

// ── Reduce Flash for Returning Users ────────────────────────
if (localStorage.getItem('stw_user_hint')) {
  authGate.style.display = 'none';
}

// ── Auth State Listener ─────────────────────────────────────
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Signed in
    localStorage.setItem('stw_user_hint', '1');
    authGate.style.display = 'none';
    dashboard.style.display = 'block';

    userName.textContent  = user.displayName || 'Welcome';
    userEmail.textContent = user.email || '';

    if (user.photoURL) {
      userAvatar.src = user.photoURL;
      userAvatar.style.display = 'block';
    } else {
      userAvatar.style.display = 'none';
    }
  } else {
    // Signed out
    authGate.style.display = 'flex';
    dashboard.style.display = 'none';
  }
});

// ── Calendly Booking (gated behind auth) ────────────────────
function bookConsultation() {
  Calendly.initPopupWidget({
    url: 'https://calendly.com/spreadtheword_appdeveloper',
    color: '#c05a30',
    textColor: '#0f1114',
    branding: false
  });
}

// ── Toast Notifications ─────────────────────────────────────
function showToast(message, type) {
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.className = 'toast toast-' + (type || 'info');
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger reflow for animation
  toast.offsetHeight;
  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 300);
  }, 4000);
}
