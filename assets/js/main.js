// ============================================================
// 网站交互脚本：移动端菜单、语言切换（支持子路径）、当前页高亮
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // ---------- 1. 移动端汉堡菜单 ----------
  const hamburger = document.querySelector(".navbar-hamburger");
  const navMenu = document.querySelector(".navbar-nav");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      // 可选：改变汉堡图标样式（旋转效果）
      hamburger.classList.toggle("active");
    });
  }

  // ---------- 2. 当前导航链接高亮 ----------
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // ---------- 3. 语言切换（支持 GitHub Pages 子路径） ----------
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

  // 初始化语言切换器的激活状态
  updateLanguageSwitcherState();
});

// ============================================================
// 语言切换核心函数（兼容子路径，如 /ttcpahk/）
// ============================================================
function switchLanguage(lang) {
  // 保存用户偏好（可选）
  localStorage.setItem("preferred-language", lang);

  // 获取当前完整路径，例如：/ttcpahk/index.html 或 /ttcpahk/en/contact.html
  let currentPath = window.location.pathname;

  // 提取基础路径（即仓库名，如 /ttcpahk）
  // 规则：取路径第一段（如果存在且不是 "en"），作为 basePath
  let basePath = "";
  const segments = currentPath.split("/").filter(seg => seg !== "");
  if (segments.length > 0 && segments[0] !== "en") {
    basePath = "/" + segments[0];
  } else if (segments.length > 0 && segments[0] === "en") {
    // 如果当前在英文页面，仓库名可能是第二段（例如 ttcpahk）
    basePath = segments.length > 1 ? "/" + segments[1] : "";
  }
  // 如果仓库名是空（比如部署在根域名），basePath 保持空字符串

  // 获取当前页面文件名，例如 index.html, contact.html
  let pageName = currentPath.split("/").pop();
  if (!pageName || pageName === "" || pageName.includes("?")) {
    pageName = "index.html";
  }

  // 判断当前是否在英文页面
  const isEnglish = currentPath.includes("/en/");

  // 如果已经在目标语言，只更新高亮状态，不跳转
  if ((lang === "en" && isEnglish) || (lang === "zh" && !isEnglish)) {
    updateLanguageSwitcherState();
    return;
  }

  // 构建新路径
  let newPath = "";
  if (lang === "en") {
    // 切换到英文：基础路径 + /en/ + 页面名
    newPath = basePath + "/en/" + pageName;
  } else {
    // 切换到中文：基础路径 + / + 页面名
    newPath = basePath + "/" + pageName;
  }

  // 清理多余的斜杠（例如 // 变成 /）
  newPath = newPath.replace(/\/+/g, "/");

  // 执行跳转
  window.location.href = newPath;
}

// 更新语言切换按钮的激活样式
function updateLanguageSwitcherState() {
  const langSwitcher = document.querySelector(".lang-switcher");
  if (!langSwitcher) return;

  const currentPath = window.location.pathname;
  const isEnglish = currentPath.includes("/en/");
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
