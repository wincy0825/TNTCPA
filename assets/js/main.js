// Mobile hamburger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".navbar-hamburger");
  const nav = document.querySelector(".navbar-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // Mark active nav link based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // Language switcher functionality
  const langSwitcher = document.querySelector(".lang-switcher");
  if (langSwitcher) {
    langSwitcher.addEventListener("click", function (e) {
      e.preventDefault();
      const targetLang = e.target.getAttribute("data-lang");
      if (targetLang) {
        switchLanguage(targetLang);
      }
    });
  }

  // Initialize language switcher state
  updateLanguageSwitcherState();
});

function switchLanguage(lang) {
  // Save language preference to localStorage
  localStorage.setItem("preferred-language", lang);

  // Get current page name and path
  const currentPath = window.location.pathname;
  const isEnglish = currentPath.includes("/en/");
  
  // If already on the target language, do nothing
  if ((lang === "en" && isEnglish) || (lang === "zh" && !isEnglish)) {
    updateLanguageSwitcherState();
    return;
  }

  // Extract the page name (e.g., "index.html", "services.html", "contact.html")
  let pageName = currentPath.split("/").pop();
  if (!pageName || pageName === "") {
    pageName = "index.html";
  }

  // Construct the new path
  let newPath = "";
  if (lang === "en") {
    // Switch to English version
    newPath = window.location.origin + "/en/" + pageName;
  } else {
    // Switch to Chinese version
    newPath = window.location.origin + "/" + pageName;
  }

  // Navigate to the new language version
  window.location.href = newPath;
}

function updateLanguageSwitcherState() {
  const langSwitcher = document.querySelector(".lang-switcher");
  if (!langSwitcher) return;

  const currentLang = window.location.pathname.includes("/en/") ? "en" : "zh";

  document.querySelectorAll(".lang-switcher a").forEach(function (link) {
    const lang = link.getAttribute("data-lang");
    if (lang === currentLang) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
