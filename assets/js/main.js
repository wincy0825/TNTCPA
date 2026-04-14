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
 * Works correctly on both local development and Netlify deployment
 */
function switchLanguage(lang) {
  // Save language preference to localStorage
  localStorage.setItem("preferred-language", lang);

  // Get current pathname
  const currentPath = window.location.pathname;
  
  // Determine if currently on English or Chinese version
  const isEnglish = currentPath.includes("/en/");
  
  // If already on the target language, just update switcher state
  if ((lang === "en" && isEnglish) || (lang === "zh" && !isEnglish)) {
    updateLanguageSwitcherState();
    return;
  }

  // Extract the page name from the current path
  // Handle cases like:
  // - /index.html -> index.html
  // - /services.html -> services.html
  // - /contact.html -> contact.html
  // - /en/index.html -> index.html
  // - /en/services.html -> services.html
  // - /en/contact.html -> contact.html
  // - / -> index.html
  // - /en/ -> index.html
  
  let pathSegments = currentPath.split("/").filter(segment => segment && segment !== "en");
  let pageName = pathSegments[pathSegments.length - 1] || "index.html";
  
  // Ensure pageName has .html extension
  if (pageName && !pageName.endsWith(".html")) {
    pageName = pageName + ".html";
  }
  
  // If pageName is empty or just a domain, default to index.html
  if (!pageName || pageName === ".html") {
    pageName = "index.html";
  }

  // Construct the new path based on target language
  let newPath = "";
  if (lang === "en") {
    // Switch to English version
    newPath = "/en/" + pageName;
  } else {
    // Switch to Chinese version
    newPath = "/" + pageName;
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

  // Determine current language from pathname
  const currentLang = window.location.pathname.includes("/en/") ? "en" : "zh";

  // Update active state for all language switcher links
  document.querySelectorAll(".lang-switcher a").forEach(function (link) {
    const lang = link.getAttribute("data-lang");
    if (lang === currentLang) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
