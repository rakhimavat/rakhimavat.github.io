import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPnZ8f4cek3JcIwfopsmxnCAGTXoH--yc",
  authDomain: "typewritertales-5bdda.firebaseapp.com",
  projectId: "typewritertales-5bdda",
  storageBucket: "typewritertales-5bdda.firebasestorage.app",
  messagingSenderId: "631041179526",
  appId: "1:631041179526:web:7d2fea0e3a5b48ce567607"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export function requireSignIn() {
  document.documentElement.style.visibility = "hidden";

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();

      if (user && user.emailVerified) {
        document.documentElement.style.visibility = "";
        resolve(user);
        return;
      }

      const page = location.pathname.endsWith("/wall.html")
        ? "wall.html"
        : "index.html";

      location.replace(
        `login.html?next=${encodeURIComponent(page)}`
      );
    }, error => {
      document.documentElement.style.visibility = "";
      reject(error);
    });
  });
}

export async function logOut() {
  await signOut(auth);
  location.replace("login.html");
}
