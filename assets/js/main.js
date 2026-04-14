// ============================================================
// 网站交互脚本：移动端菜单、语言切换（基于 URL 路径替换，通用版）
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // 移动端汉堡菜单
  const hamburger = document.querySelector(".navbar-hamburger");
  const navMenu = document.querySelector(".navbar-nav");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      hamburger.classList.toggle("active");
    });
  }

  // 当前导航链接高亮
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // 语言切换
  const langSwitcher = document.querySelector(".lang-switcher");
  if (langSwitcher) {
    langSwitcher.addEventListener("click", function (e) {
      e.preventDefault();
      const target = e.target.closest("[data-lang]");
      if (target) {
        const lang = target.getAttribute("data-lang");
        switchLanguage(lang);
      }
    });
  }

  updateLanguageSwitcherState();
});

function switchLanguage(lang) {
  // 获取当前完整 URL（路径部分）
  let currentUrl = window.location.href;
  let newUrl = currentUrl;

  // 判断当前是否在英文页面（URL 中是否包含 /en/）
  const isEnglish = currentUrl.includes("/en/");

  // 如果已经在目标语言，只更新按钮样式
  if ((lang === "en" && isEnglish) || (lang === "zh" && !isEnglish)) {
    updateLanguageSwitcherState();
    return;
  }

  if (lang === "en") {
    // 切换到英文：在域名后的第一个斜杠后插入 "en/"
    // 例如：https://xxx.netlify.app/ -> https://xxx.netlify.app/en/
    // 注意：如果已经是 /en/ 则不会执行到这里
    const parts = currentUrl.split("/");
    // 找到协议后的第一个空字符串位置（即域名后）
    let insertIndex = 3; // 例如 ["https:", "", "xxx.netlify.app", ...]
    // 但更简单的方法：在域名后、路径前插入 en/
    const domainEndIndex = currentUrl.indexOf("/", 8); // 从第8个字符开始找第一个斜杠
    if (domainEndIndex !== -1) {
      newUrl = currentUrl.slice(0, domainEndIndex + 1) + "en/" + currentUrl.slice(domainEndIndex + 1);
    } else {
      // 如果没有路径（只有域名），直接加 /en/
      newUrl = currentUrl + "/en/";
    }
  } else {
    // 切换到中文：移除 /en/
    newUrl = currentUrl.replace("/en/", "/");
  }

  // 避免出现双斜杠
  newUrl = newUrl.replace(/\/\//g, "/");
  // 跳转
  window.location.href = newUrl;
}

function updateLanguageSwitcherState() {
  const langSwitcher = document.querySelector(".lang-switcher");
  if (!langSwitcher) return;
  const isEnglish = window.location.href.includes("/en/");
  const currentLang = isEnglish ? "en" : "zh";
  document.querySelectorAll(".lang-switcher a").forEach(function (link) {
    const lang = link.getAttribute("data-lang");
    if (lang === currentLang) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
