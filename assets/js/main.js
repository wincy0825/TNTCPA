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
 * Switch language and navigate to the corresponding page
 * Works correctly on domain root, subfolders, GitHub Pages, and Netlify
 */
function switchLanguage(lang) {
  // Save language preference to localStorage
  localStorage.setItem("preferred-language", lang);

  // Get current pathname
  let currentPath = window.location.pathname;

  // Detect base path (e.g., /repository-name/ if not at domain root)
  let basePath = "";
  const match = currentPath.match(/^(\/[^\/]+)\//);
  if (match && !match[1].includes("en") && !match[1].includes(".html")) {
    basePath = match[1];
  }

  // Remove base path from currentPath for processing
  let pathWithoutBase = currentPath;
  if (basePath && currentPath.startsWith(basePath)) {
    pathWithoutBase = currentPath.substring(basePath.length);
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
    newPath = basePath + "/en/" + pageName;
  } else {
    newPath = basePath + "/" + pageName;
  }

  // Navigate to the new language version
  window.location.href = newPath;
}

/**
 * Update the language switcher active state based on current page
 */
function updateLanguageSwitcherState() {
  const langSwitcher = document.querySelector(".lang-switcher");
  if (!langSwitcher) return;

  let currentPath = window.location.pathname;

  // Detect base path
  let basePath = "";
  const match = currentPath.match(/^(\/[^\/]+)\//);
  if (match && !match[1].includes("en") && !match[1].includes(".html")) {
    basePath = match[1];
  }

  let pathWithoutBase = currentPath;
  if (basePath && currentPath.startsWith(basePath)) {
    pathWithoutBase = currentPath.substring(basePath.length);
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
