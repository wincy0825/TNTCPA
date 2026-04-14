// Mobile hamburger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".navbar-hamburger");
  const nav = document.querySelector(".navbar-nav");

  // 漢堡選單點擊事件（同時支援 click 和 touchstart）
  if (hamburger && nav) {
    const toggleMenu = function(e) {
      e.preventDefault();
      e.stopPropagation();
      nav.classList.toggle("open");
      // 可選：改變漢堡圖示外觀（例如旋轉）
      hamburger.classList.toggle("active");
    };
    hamburger.addEventListener("click", toggleMenu);
    hamburger.addEventListener("touchstart", toggleMenu); // 加強行動裝置

    // 點擊選單內的任何連結後自動關閉選單（行動裝置友好）
    nav.querySelectorAll("a").forEach(function(link) {
      link.addEventListener("click", function() {
        nav.classList.remove("open");
        if (hamburger) hamburger.classList.remove("active");
      });
    });
  }

  // 標記當前頁面對應的導航連結為 active 狀態
  const currentPath = window.location.pathname;
  let currentPage = currentPath.split('/').pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href && (href === currentPage || href.endsWith(currentPage))) {
      link.classList.add("active");
    }
  });

  // 語言切換功能
  const langSwitcher = document.querySelector(".lang-switcher");
  if (langSwitcher) {
    langSwitcher.addEventListener("click", function (e) {
      e.preventDefault();
      const targetLink = e.target.closest('a');
      if (!targetLink) return;
      const targetLang = targetLink.getAttribute("data-lang");
      if (targetLang) {
        switchLanguage(targetLang);
      }
    });
  }

  // 初始化語言切換器的 active 狀態
  updateLanguageSwitcherState();
});

/**
 * 切換語言並導航到對應頁面
 * 適用於子目錄結構 /TNTCPA/
 */
function switchLanguage(lang) {
  // 儲存使用者偏好
  localStorage.setItem("preferred-language", lang);

  const basePath = '/TNTCPA';
  let currentPath = window.location.pathname;

  // 移除 basePath 以獲得相對路徑
  let relativePath = currentPath.replace(basePath, '');
  if (relativePath === '' || relativePath === '/') {
    relativePath = '/tc/index.html';
  }

  let targetPath = '';
  if (lang === 'en') {
    targetPath = relativePath.replace('/tc/', '/en/');
  } else {
    targetPath = relativePath.replace('/en/', '/tc/');
  }

  // 如果路徑中沒有語言前綴（備用）
  if (!targetPath.includes('/en/') && !targetPath.includes('/tc/')) {
    targetPath = lang === 'en' ? '/en/index.html' : '/tc/index.html';
  }

  // 導航到目標頁面
  window.location.href = basePath + targetPath;
}

/**
 * 更新語言切換按鈕的 active 狀態
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
