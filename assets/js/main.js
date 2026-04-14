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

/**
 * Get the base path of the site (e.g., /TNTCPA/ or empty string)
 * Works for both domain root and GitHub Pages project pages
 */
function getBasePath() {
  const path = window.location.pathname;
  // Match pattern like /TNTCPA/ or /anything/
  const match = path.match(/^\/[^\/]+\//);
  if (match && !match[0].includes("en") && !match[0].includes(".html")) {
    return match[0];
  }
  return "/";
}

/**
 * Switch language and navigate to the corresponding page
 */
function switchLanguage(lang) {
  localStorage.setItem("preferred-language", lang);

  const basePath = getBasePath();
  let currentPath = window.location.pathname;

  // Remove basePath from currentPath for processing
  let pathWithoutBase = currentPath;
  if (basePath !== "/" && currentPath.startsWith(basePath)) {
    pathWithoutBase = currentPath.substring(basePath.length - 1);
  }

  // Determine if currently on English version
  const isEnglish = pathWithoutBase.startsWith("/en/");

  // If already on target language, just update UI
  if ((lang === "en" && isEnglish) || (lang === "zh" && !isEnglish)) {
    updateLanguageSwitcherState();
    return;
  }

  // Extract page name
  let pageName = "index.html";
  if (pathWithoutBase !== "/" && pathWithoutBase !== "") {
    let parts = pathWithoutBase.split("/").filter(p => p && p !== "en");
    let lastPart = parts.pop();
    if (lastPart && lastPart.endsWith(".html")) {
      pageName = lastPart;
    } else if (lastPart && !lastPart.includes(".")) {
      pageName = lastPart + ".html";
    }
  }

  // Build new path
  let newPath;
  if (lang === "en") {
    newPath = basePath + "en/" + pageName;
  } else {
    newPath = basePath + pageName;
  }

  // Ensure double slashes don't occur
  newPath = newPath.replace(/\/\//g, "/");
  window.location.href = newPath;
}

/**
 * Update the language switcher active state based on current page
 */
function updateLanguageSwitcherState() {
  const langSwitcher = document.querySelector(".lang-switcher");
  if (!langSwitcher) return;

  const basePath = getBasePath();
  let currentPath = window.location.pathname;

  let pathWithoutBase = currentPath;
  if (basePath !== "/" && currentPath.startsWith(basePath)) {
    pathWithoutBase = currentPath.substring(basePath.length - 1);
  }

  const currentLang = pathWithoutBase.startsWith("/en/") ? "en" : "zh";

  document.querySelectorAll(".lang-switcher a").forEach(function (link) {
    const lang = link.getAttribute("data-lang");
    if (lang === currentLang) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
