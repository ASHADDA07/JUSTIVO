/* =====================================================
   JUSTIVO – APPLICATION STATE & NAVIGATION LOGIC
   ===================================================== */

/*
  We treat each major screen as a "state".
  Browser history is updated so that:
  - Back button works naturally
  - Forward button works naturally
*/
console.log("JS IS RUNNING");

document.querySelector(".role-public").addEventListener("click", () => {
  console.log("PUBLIC CLICKED");
});


const screens = {
  intro: document.getElementById("screen-intro"),
  public: document.getElementById("screen-public"),
  student: document.getElementById("screen-student"),
  lawyer: document.getElementById("screen-lawyer")
};

/* -----------------------------------------------------
   UTILITY: Hide all screens
----------------------------------------------------- */
function hideAllScreens() {
  Object.values(screens).forEach(screen => {
    screen.classList.remove("active");
  });
}

/* -----------------------------------------------------
   CORE NAVIGATION FUNCTION
----------------------------------------------------- */
/*
  screenName: one of 'intro', 'public', 'student', 'lawyer'
  pushState: whether to push to browser history
*/
function navigateTo(screenName, pushState = true) {
  hideAllScreens();

  if (screens[screenName]) {
    screens[screenName].classList.add("active");
  }

  if (pushState) {
    history.pushState(
      { screen: screenName },
      "",
      `#${screenName}`
    );
  }
}

/* -----------------------------------------------------
   INTRO ROLE BUTTON HANDLERS
----------------------------------------------------- */

// Public role
document.querySelector(".role-public").addEventListener("click", () => {
  navigateTo("public");
});

// Law Student role
document.querySelector(".role-student").addEventListener("click", () => {
  navigateTo("student");
});

// Lawyer role
document.querySelector(".role-lawyer").addEventListener("click", () => {
  navigateTo("lawyer");
});

/* -----------------------------------------------------
   PUBLIC DASHBOARD OPTION HANDLING
----------------------------------------------------- */

const publicOptions = document.querySelectorAll(".public-option");
const publicDetailArea = document.querySelector(".public-detail-area");

/*
  When a public option is clicked:
  - Highlight the option
  - Show contextual content below
*/
publicOptions.forEach(option => {
  option.addEventListener("click", () => {

    // Remove highlight from all options
    publicOptions.forEach(opt => opt.classList.remove("active"));

    // Highlight selected option
    option.classList.add("active");

    // Decide content based on option type
    if (option.classList.contains("option-ai")) {
      renderPublicDetail(
        "Legal Guidance Assistant",
        "No conversations yet.",
        "Describe your situation in simple language to receive general legal information."
      );
    }

    if (option.classList.contains("option-lawyer")) {
      renderPublicDetail(
        "Connect with a Lawyer",
        "You have not contacted any lawyers yet.",
        "Verified advocates relevant to your issue will appear here."
      );
    }

    if (option.classList.contains("option-cases")) {
      renderPublicDetail(
        "My Legal Cases",
        "No registered or ongoing cases found.",
        "Once a case is added, its progress will be shown here."
      );
    }

    if (option.classList.contains("option-evidence")) {
      renderPublicDetail(
        "My Evidence Vault",
        "You have not stored any evidence yet.",
        "Documents, photos, and videos will be recorded with date and integrity metadata."
      );
    }
  });
});

/* -----------------------------------------------------
   PUBLIC DETAIL RENDER FUNCTION
----------------------------------------------------- */

function renderPublicDetail(title, line1, line2) {
  publicDetailArea.innerHTML = `
    <article class="detail-panel">
      <h4>${title}</h4>
      <p>${line1}</p>
      <p>${line2}</p>
    </article>
  `;
}

/* -----------------------------------------------------
   BROWSER BACK / FORWARD HANDLING
----------------------------------------------------- */

/*
  This ensures that:
  - Browser back button navigates between screens
  - No custom back buttons are needed
*/
window.addEventListener("popstate", event => {
  if (event.state && event.state.screen) {
    navigateTo(event.state.screen, false);
  } else {
    navigateTo("intro", false);
  }
});

/* -----------------------------------------------------
   INITIAL LOAD HANDLING
----------------------------------------------------- */

/*
  If user refreshes or opens a URL with a hash,
  restore the correct screen.
*/
function initApp() {
  const hash = window.location.hash.replace("#", "");

  if (hash && screens[hash]) {
    navigateTo(hash, false);
  } else {
    navigateTo("intro", false);
  }
}

// Initialize on page load
initApp();
