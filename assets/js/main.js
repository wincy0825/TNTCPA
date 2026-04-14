/// Mobile hamburger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".navbar-hamburger");
  const nav = document.querySelector(".navbar-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // Mark active nav link based on current page (considering base path)
  const currentPath = window.location.pathname;
  // Extract the part after /TNTCPA/ (or just use the full path)
  let currentPage = currentPath.split('/').pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href && (href === currentPage || href === currentPath || href.endsWith(currentPage))) {
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
 * Works with subdirectory base path /TNTCPA/
 */
function switchLanguage(lang) {
  localStorage.setItem("preferred-language", lang);

  const basePath = '/TNTCPA';
  let currentPath = window.location.pathname;

  // Remove basePath from currentPath if present
  let relativePath = currentPath.replace(basePath, '');
  if (relativePath === '') relativePath = '/tc/index.html'; // fallback

  // Determine current language and target page
  let targetPath = '';
  if (lang === 'en') {
    targetPath = relativePath.replace('/tc/', '/en/');
  } else {
    targetPath = relativePath.replace('/en/', '/tc/');
  }

  // If no language prefix in path, assume we are at root or default to index
  if (!targetPath.includes('/en/') && !targetPath.includes('/tc/')) {
    targetPath = lang === 'en' ? '/en/index.html' : '/tc/index.html';
  }

  // Ensure the path starts with basePath
  let newUrl = basePath + targetPath;
  window.location.href = newUrl;
}

/**
 * Update the language switcher active state based on current page
 */
function updateLanguageSwitcherState() {
  const currentPath = window.location.pathname;
  const currentLang = currentPath.includes('/en/') ? 'en' : 'zh';

  document.querySelectorAll(".lang-switcher a").forEach(function (link) {
    const lang = link.getAttribute("data-lang");
    if (lang === currentLang) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
