/* =========================================================
   NEATGARMS — DROP LOCK EXPERIENCE
   ========================================================= */


/* =========================================================
   0. FIREBASE CONFIG
   ========================================================= */

const firebaseConfig = {

  apiKey:
    "AIzaSyCLC4Dz-qxNOPtRFhybiBA5SqCDJgvKqMY",

  authDomain:
    "neat-53fa9.firebaseapp.com",

  projectId:
    "neat-53fa9",

  storageBucket:
    "neat-53fa9.appspot.com",

  messagingSenderId:
    "857317417173",

  appId:
    "1:857317417173:web:6b84a45c96ebe56fce425c"

};



/* =========================================================
   1. FIREBASE — LAZY INITIALISATION
   ========================================================= */

let db = null;


async function getDatabase() {

  if (db) {
    return db;
  }


  const [
    appModule,
    firestoreModule
  ] = await Promise.all([

    import(
      "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
    ),

    import(
      "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore-lite.js"
    )

  ]);


  const {
    initializeApp,
    getApps
  } = appModule;


  const {
    getFirestore
  } = firestoreModule;


  const app =
    getApps().length
      ? getApps()[0]
      : initializeApp(firebaseConfig);


  db = getFirestore(app);


  return db;

}



/* =========================================================
   2. DOM
   ========================================================= */

const body =
  document.body;


const introCurtain =
  document.getElementById(
    "introCurtain"
  );


const campaignFrame =
  document.querySelector(
    ".campaign-frame"
  );


const campaignImage =
  document.getElementById(
    "campaignImage"
  );


const accessPanel =
  document.getElementById(
    "accessPanel"
  );


const successPanel =
  document.getElementById(
    "successPanel"
  );


const subscribeForm =
  document.getElementById(
    "subscribeForm"
  );


const emailInput =
  document.getElementById(
    "email"
  );


const subscribeButton =
  document.getElementById(
    "subscribeButton"
  );


const alreadyMsg =
  document.getElementById(
    "alreadySubscribedMsg"
  );


const closeAlreadyBtn =
  document.getElementById(
    "closeAlreadyBtn"
  );


const errorMsg =
  document.getElementById(
    "errorMsg"
  );


const errorText =
  document.getElementById(
    "errorText"
  );


const dDays =
  document.getElementById(
    "dDays"
  );


const dHours =
  document.getElementById(
    "dHours"
  );


const dMins =
  document.getElementById(
    "dMins"
  );


const dSecs =
  document.getElementById(
    "dSecs"
  );


const dropNote =
  document.getElementById(
    "dropNote"
  );



/* =========================================================
   3. DROP DATE
   OCTOBER 9 2026 — 00:00 EAT
   ========================================================= */

const targetDrop =
  new Date(
    "2026-09-28T00:00:00+03:00"
  );



/* =========================================================
   4. COUNTDOWN
   ========================================================= */

function pad2(number) {

  return String(number)
    .padStart(2, "0");

}


function updateCountdown() {

  const now =
    new Date();


  const difference =
    targetDrop.getTime() -
    now.getTime();


  if (difference <= 0) {

    dDays.textContent =
      "00";

    dHours.textContent =
      "00";

    dMins.textContent =
      "00";

    dSecs.textContent =
      "00";


    dropNote.textContent =
      "DROP LIVE";


    return;

  }


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const days =
    Math.floor(
      totalSeconds / 86400
    );


  const hours =
    Math.floor(
      (
        totalSeconds %
        86400
      ) / 3600
    );


  const minutes =
    Math.floor(
      (
        totalSeconds %
        3600
      ) / 60
    );


  const seconds =
    totalSeconds % 60;


  dDays.textContent =
    pad2(days);


  dHours.textContent =
    pad2(hours);


  dMins.textContent =
    pad2(minutes);


  dSecs.textContent =
    pad2(seconds);


  dropNote.textContent = "";

}


updateCountdown();


setInterval(
  updateCountdown,
  1000
);



/* =========================================================
   5. TEXT SCRAMBLE
   ========================================================= */

const scrambleCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%#?+=-_";


function scrambleText(
  element,
  finalText,
  duration = 850,
  delay = 0
) {

  if (!element) {
    return;
  }


  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    element.textContent =
      finalText;

    return;

  }


  setTimeout(() => {

    const startTime =
      performance.now();


    function frame(currentTime) {

      const elapsed =
        currentTime -
        startTime;


      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      const resolvedCharacters =
        Math.floor(
          progress *
          finalText.length
        );


      let output = "";


      for (
        let i = 0;
        i < finalText.length;
        i++
      ) {

        const character =
          finalText[i];


        /*
          Preserve spaces and punctuation.
        */
        if (
          character === " " ||
          character === "." ||
          character === "/" ||
          character === ":"
        ) {

          output += character;
          continue;

        }


        if (
          i <
          resolvedCharacters
        ) {

          output +=
            finalText[i];

        } else {

          output +=
            scrambleCharacters[
              Math.floor(
                Math.random() *
                scrambleCharacters.length
              )
            ];

        }

      }


      element.textContent =
        output;


      if (progress < 1) {

        requestAnimationFrame(
          frame
        );

      } else {

        element.textContent =
          finalText;

      }

    }


    requestAnimationFrame(
      frame
    );

  }, delay);

}



/* =========================================================
   6. PAGE INTRO SEQUENCE
   ========================================================= */

function beginIntro() {

  /*
    Scramble curtain branding.
  */

  const introCode =
    introCurtain.querySelector(
      ".intro-code"
    );


  scrambleText(
    introCode,
    "NEATGARMS",
    900,
    100
  );


  /*
    Let curtain exist briefly.
  */

  setTimeout(() => {

    body.classList.add(
      "loaded"
    );


    introCurtain.classList.add(
      "is-hidden"
    );


    /*
      Main typography scramble.
    */

    document
      .querySelectorAll(
        ".scramble"
      )
      .forEach(
        (
          element,
          index
        ) => {

          if (
            element ===
            introCode
          ) {
            return;
          }


          const finalText =
            element.dataset.text ||
            element.textContent.trim();


          scrambleText(
            element,
            finalText,
            800,
            250 +
              index * 90
          );

        }
      );


    /*
      Countdown initial shuffle.
    */

    scrambleCountdownNumbers();


  }, 1200);


  /*
    Fully remove curtain.
  */

  setTimeout(() => {

    introCurtain.remove();

  }, 2300);

}



/* =========================================================
   7. COUNTDOWN INITIAL SCRAMBLE
   ========================================================= */

function scrambleCountdownNumbers() {

  const elements = [
    dDays,
    dHours,
    dMins,
    dSecs
  ];


  elements.forEach(
    (
      element,
      index
    ) => {

      const finalValue =
        element.textContent;


      setTimeout(() => {

        let iterations = 0;


        const interval =
          setInterval(() => {

            element.textContent =
              String(
                Math.floor(
                  Math.random() *
                  100
                )
              )
              .padStart(
                2,
                "0"
              );


            iterations++;


            if (
              iterations >= 9
            ) {

              clearInterval(
                interval
              );


              /*
                Return immediately to
                real countdown values.
              */

              updateCountdown();

            }

          }, 55);

      }, 350 + index * 120);

    }
  );

}



/* =========================================================
   8. MICRO PARALLAX
   ========================================================= */

const supportsFinePointer =
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;


const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


if (
  supportsFinePointer &&
  !prefersReducedMotion
) {

  campaignFrame.addEventListener(
    "mousemove",
    event => {

      /*
        Disable while success state
        is visible.
      */

      if (
        campaignFrame.classList.contains(
          "is-success"
        )
      ) {
        return;
      }


      const rect =
        campaignFrame
          .getBoundingClientRect();


      const relativeX =
        (
          event.clientX -
          rect.left
        ) / rect.width;


      const relativeY =
        (
          event.clientY -
          rect.top
        ) / rect.height;


      const moveX =
        (
          relativeX -
          0.5
        ) * -5;


      const moveY =
        (
          relativeY -
          0.5
        ) * -5;


      campaignImage.style.transform =
        `
        scale(1.012)
        translate(
          ${moveX}px,
          ${moveY}px
        )
        `;

    }
  );


  campaignFrame.addEventListener(
    "mouseleave",
    () => {

      if (
        campaignFrame.classList.contains(
          "is-success"
        )
      ) {
        return;
      }


      campaignImage.style.transform =
        "";

    }
  );

}



/* =========================================================
   9. EMAIL VALIDATION
   ========================================================= */

function isValidEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);

}



/* =========================================================
   10. TOAST HELPERS
   ========================================================= */

let toastTimer = null;


function showAlreadySubscribed() {

  clearTimeout(
    toastTimer
  );


  alreadyMsg.classList.add(
    "visible"
  );


  toastTimer =
    setTimeout(() => {

      alreadyMsg.classList.remove(
        "visible"
      );

    }, 4500);

}


function hideAlreadySubscribed() {

  alreadyMsg.classList.remove(
    "visible"
  );

}


closeAlreadyBtn.addEventListener(
  "click",
  hideAlreadySubscribed
);



let errorTimer = null;


function showError(
  message =
  "COULDN'T ADD YOU. TRY AGAIN."
) {

  clearTimeout(
    errorTimer
  );


  errorText.textContent =
    message;


  errorMsg.classList.add(
    "visible"
  );


  errorTimer =
    setTimeout(() => {

      errorMsg.classList.remove(
        "visible"
      );

    }, 4200);

}



/* =========================================================
   11. SUCCESS EXPERIENCE
   ========================================================= */

function showSuccess() {

  /*
    Remove form.
  */

  accessPanel.classList.add(
    "is-leaving"
  );


  campaignFrame.classList.add(
    "is-success"
  );


  /*
    Reveal success panel.
  */

  setTimeout(() => {

    successPanel.classList.add(
      "visible"
    );


    const successTitle =
      successPanel.querySelector(
        ".success-title"
      );


    scrambleText(
      successTitle,
      "ACCESS GRANTED.",
      950,
      50
    );

  }, 600);

}



/* =========================================================
   12. FORM SUBMISSION
   ========================================================= */

subscribeForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    /*
      Normalize email exactly like
      your original implementation.
    */

    const email =
      emailInput
        .value
        .trim()
        .toLowerCase();


    /*
      Validate.
    */

    if (
      !email ||
      !isValidEmail(email)
    ) {

      showError(
        "ENTER A VALID EMAIL ADDRESS."
      );


      emailInput.focus();


      return;

    }


    /*
      Start loading state.
    */

    subscribeForm.classList.add(
      "loading"
    );


    subscribeButton.disabled =
      true;


    const buttonText =
      subscribeButton.querySelector(
        ".button-text"
      );


    const originalButtonText =
      buttonText.textContent;


    buttonText.textContent =
      "ENTERING";


    try {

      /*
        Load database.
      */

      const database =
        await getDatabase();


      /*
        Firestore utilities.
      */

      const {
        doc,
        getDoc,
        setDoc,
        serverTimestamp
      } =
        await import(
          "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore-lite.js"
        );


      /*
        IMPORTANT:

        We intentionally continue using:

        collection: email
        document ID: email address

        so your existing database logic
        remains compatible.
      */

      const docRef =
        doc(
          database,
          "email",
          email
        );


      const docSnapshot =
        await getDoc(
          docRef
        );


      /*
        Existing subscriber.
      */

      if (
        docSnapshot.exists()
      ) {

        showAlreadySubscribed();


        /*
          Still show success because
          they already have access.
        */

        showSuccess();


        return;

      }


      /*
        New signup.
      */

      await setDoc(
        docRef,
        {

          email:
            email,

          timestamp:
            serverTimestamp(),

          source:
            "neatgarms-drop-october-2026"

        }
      );


      /*
        Reveal confirmation.
      */

      showSuccess();


    } catch (error) {

      console.error(
        "Neatgarms signup error:",
        error
      );


      showError(
        "COULDN'T ADD YOU. TRY AGAIN."
      );


    } finally {

      subscribeForm.classList.remove(
        "loading"
      );


      subscribeButton.disabled =
        false;


      buttonText.textContent =
        originalButtonText;

    }

  }
);



/* =========================================================
   13. ENTER / INPUT MICRO INTERACTION
   ========================================================= */

emailInput.addEventListener(
  "input",
  () => {

    /*
      Keep email visually clean.
    */

    emailInput.value =
      emailInput.value
        .replace(/\s/g, "");

  }
);



/* =========================================================
   14. IOS / MOBILE HEIGHT SUPPORT
   ========================================================= */

function setViewportHeight() {

  document.documentElement.style
    .setProperty(
      "--real-vh",
      `${window.innerHeight * 0.01}px`
    );

}


setViewportHeight();


window.addEventListener(
  "resize",
  setViewportHeight,
  {
    passive: true
  }
);



/* =========================================================
   15. START PAGE
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    beginIntro,
    {
      once: true
    }
  );

} else {

  beginIntro();

}