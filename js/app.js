/* =====================================================
   JUSTIVO – APPLICATION STATE & NAVIGATION LOGIC
   ===================================================== */

/*
  We treat each major screen as a "state".
  Browser history is updated so that:
  - Back button works naturally
  - Forward button works naturally
*/

const screens = {
  intro: document.getElementById("screen-intro"),
  public: document.getElementById("screen-public"),
  "public-detail": document.getElementById("screen-public-detail"),
  student: document.getElementById("screen-student"),
  "student-detail": document.getElementById("screen-student-detail"),
  lawyer: document.getElementById("screen-lawyer"),
  "lawyer-detail": document.getElementById("screen-lawyer-detail"),

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

/* =====================================================
   PUBLIC OPTION → SUB-SCREEN NAVIGATION
   ===================================================== */

const publicDetailScreen = document.getElementById("screen-public-detail");
const publicDetailContent = document.getElementById("public-detail-content");

document.querySelectorAll(".public-option").forEach(option => {
  option.addEventListener("click", () => {

    let title = "";
    let line1 = "";
    let line2 = "";

    if (option.classList.contains("option-ai")) {
      title = "Legal Guidance Assistant";
      line1 = "No conversations yet.";
      line2 = "Describe your situation to receive general legal information.";
    }

    if (option.classList.contains("option-lawyer")) {
      title = "Connect with a Lawyer";
      line1 = "You have not contacted any lawyers yet.";
      line2 = "Verified advocates relevant to your issue will appear here.";
    }

    if (option.classList.contains("option-cases")) {
      title = "My Legal Cases";
      line1 = "No registered or ongoing cases found.";
      line2 = "Your case progress will appear here once added.";
    }

    if (option.classList.contains("option-evidence")) {
      title = "My Evidence Vault";
      line1 = "You have not stored any evidence yet.";
      line2 = "Uploaded files will include date, time, and integrity metadata.";
    }

    publicDetailContent.innerHTML = `
      <article class="detail-panel">
        <h4>${title}</h4>
        <p>${line1}</p>
        <p>${line2}</p>
      </article>
    `;

    navigateTo("public-detail");
  });
});
/* =====================================================
   STUDENT MODULE → SUB-SCREEN NAVIGATION
   ===================================================== */

const studentDetailContent = document.getElementById("student-detail-content");

document
  .querySelectorAll("#screen-student .student-module")
  .forEach(module => {

  module.addEventListener("click", () => {

    let title = "";
    let body = "";

    if (module.classList.contains("module-constitution")) {
      title = "Constitution Explorer";
      body = "Browse simplified explanations of constitutional principles, rights, and duties.";
    }

    if (module.classList.contains("module-cases")) {
      title = "Landmark Judgments";
      body = "Study judicial reasoning, doctrines, and constitutional interpretation through key cases.";
    }

    if (module.classList.contains("module-sections")) {
      title = "Section Lookup";
      body = "Search statutory provisions for academic understanding and exam preparation.";
    }

    studentDetailContent.innerHTML = `
      <article class="student-module">
        <h3>${title}</h3>
        <p>${body}</p>
        <p class="judicial-note">
          Content is for educational purposes only.
        </p>
      </article>
    `;

    navigateTo("student-detail");
  });
});
/* =====================================================
   LAWYER MODULE → SUB-SCREEN NAVIGATION
   ===================================================== */

const lawyerDetailContent = document.getElementById("lawyer-detail-content");

document
  .querySelectorAll("#screen-lawyer .lawyer-module")
  .forEach(module => {

  module.addEventListener("click", () => {

    let title = "";
    let body = "";

    if (module.classList.contains("module-clients")) {
      title = "Client Intake";
      body = "View incoming client requests and manage case onboarding.";
    }

    if (module.classList.contains("module-assistant")) {
      title = "Case Assistant";
      body = "Analyze issues, review relevant provisions, and prepare case strategy.";
    }

    if (module.classList.contains("module-drafts")) {
      title = "Draft Support";
      body = "Access structured drafting guidance for pleadings and legal documents.";
    }

    if (module.classList.contains("module-overview")) {
      title = "Practice Overview";
      body = "Monitor your professional activity and workload summary.";
    }

    lawyerDetailContent.innerHTML = `
      <section class="lawyer-module">
        <h3>${title}</h3>
        <p>${body}</p>
        <p class="judicial-note">
          Professional use only. Final responsibility rests with the advocate.
        </p>
      </section>
    `;

    navigateTo("lawyer-detail");
  });
});

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
