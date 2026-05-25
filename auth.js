import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

/* 🔥 Firebase Config (الذي أرسلته أنت) */
const firebaseConfig = {
  apiKey: "AIzaSyCRv57HFPXZ_7Hf1M-453gDRf6cW_0zVLk",
  authDomain: "school-points-reward-4d72b.firebaseapp.com",
  projectId: "school-points-reward-4d72b",
  storageBucket: "school-points-reward-4d72b.firebasestorage.app",
  messagingSenderId: "969463853954",
  appId: "1:969463853954:web:b6e7245ca8c3667d05559b",
  measurementId: "G-FFVKG4HFQD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const allowedDomain = "@education.qa";

/* عناصر الصفحة */
const loginScreen = document.getElementById("loginScreen");
const appScreen = document.getElementById("appScreen");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

/* تسجيل الدخول */
window.login = () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;

      if (!user.email.endsWith(allowedDomain)) {
        alert("غير مصرح لك بالدخول");
        signOut(auth);
        return;
      }
    });
};

/* تسجيل خروج */
window.logout = () => {
  signOut(auth);
};

/* حماية الموقع */
onAuthStateChanged(auth, user => {

  if (user && user.email.endsWith(allowedDomain)) {

    if (loginScreen) loginScreen.style.display = "none";
    if (appScreen) appScreen.style.display = "block";

    if (userName) userName.innerText = user.displayName;
    if (userEmail) userEmail.innerText = user.email;

  } else {

    if (loginScreen) loginScreen.style.display = "block";
    if (appScreen) appScreen.style.display = "none";

  }

});