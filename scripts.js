// Firebase SDKs import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCLC4Dz-qxNOPtRFhybiBA5SqCDJgvKqMY",
  authDomain: "neat-53fa9.firebaseapp.com",
  projectId: "neat-53fa9",
  storageBucket: "neat-53fa9.appspot.com",
  messagingSenderId: "857317417173",
  appId: "1:857317417173:web:6b84a45c96ebe56fce425c"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const form = document.getElementById("subscribeForm");
const emailInput = document.getElementById("email");
const popupCard = document.getElementById("popupCard");
const thankYouMsg = document.getElementById("thankYouMsg");
const overlay = document.getElementById("subscriptionPopup");
const bgVideo = document.getElementById("bgVideo");


// Form submit handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (!email) {
    alert("Please enter a valid email.");
    return;
  }

  try {
    // Save email to Firestore with server timestamp
    await addDoc(collection(db, "email"), {
      email,
      timestamp: serverTimestamp(),
    });

    // Animate form sliding down & fading out
    popupCard.classList.add("hide");

    // When form hide animation ends, show thank you message and brighten video
    const onAnimationEnd = () => {
      // Hide form from layout
      popupCard.style.display = "none";

      // Show thank you message with slower fade + slide animation
      thankYouMsg.classList.add("visible");

      // Brighten and reduce blur on background video & overlay with smooth transition
      bgVideo.style.transition = "filter 0.6s ease";
      overlay.style.transition = "backdrop-filter 0.6s ease";
      bgVideo.style.filter = "brightness(0.6) blur(1px)";
      overlay.style.backdropFilter = "blur(5px)";

      // Remove listener after running once
      popupCard.removeEventListener("animationend", onAnimationEnd);
    };

    popupCard.addEventListener("animationend", onAnimationEnd);
  } catch (error) {
    alert("Oops! There was an error subscribing. Please try again.");
    console.error("Error saving email:", error);
  }
});




