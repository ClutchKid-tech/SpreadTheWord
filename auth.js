// ── Auth Providers ──────────────────────────────────────────

var googleProvider  = new firebase.auth.GoogleAuthProvider();
var githubProvider  = new firebase.auth.GithubAuthProvider();
var twitterProvider = new firebase.auth.TwitterAuthProvider();

function signInWithGoogle() {
  firebase.auth().signInWithPopup(googleProvider).catch(handleAuthError);
}

function signInWithGithub() {
  firebase.auth().signInWithPopup(githubProvider).catch(handleAuthError);
}

function signInWithTwitter() {
  firebase.auth().signInWithPopup(twitterProvider).catch(handleAuthError);
}

function signOutUser() {
  firebase.auth().signOut().then(function () {
    localStorage.removeItem('stw_user_hint');
  }).catch(function (err) {
    showToast('Sign-out failed. Please try again.', 'error');
  });
}

// ── Error Handling ──────────────────────────────────────────
function handleAuthError(error) {
  var msg = 'Something went wrong. Please try again.';

  switch (error.code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return; // user dismissed — no toast needed
    case 'auth/account-exists-with-different-credential':
      msg = 'An account already exists with this email. Try a different sign-in method.';
      break;
    case 'auth/popup-blocked':
      msg = 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
      break;
    case 'auth/network-request-failed':
      msg = 'Network error. Check your connection and try again.';
      break;
  }

  showToast(msg, 'error');
}
