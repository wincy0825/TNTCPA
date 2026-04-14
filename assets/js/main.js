// ============================================================
// 网站交互脚本：移动端菜单、语言切换（基于 pathname 替换，可靠版）
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
  let path = window.location.pathname; // 例如 /, /index.html, /en/index.html, /ttcpahk/index.html, /ttcpahk/en/index.html
  
  // 如果路径为空或只有斜杠，补充默认文件名
  if (path === "" || path === "/") {
    path = "/index.html";
  }
  
  // 判断是否在英文页面
  const isEnglish = path.includes("/en/");
  
  // 如果已经在目标语言，只更新按钮样式
  if ((lang === "en" && isEnglish) || (lang === "zh" && !isEnglish)) {
    updateLanguageSwitcherState();
    return;
  }
  
  let newPath = "";
  
  if (lang === "en") {
    // 切换到英文：在路径的第一个斜杠后（或第一个目录后）插入 en/
    // 将路径按 / 分割成数组
    let parts = path.split("/");
    // parts[0] 通常是空字符串（因为路径以 / 开头）
    // 找到第一个非空的段（可能是仓库名或直接就是文件名）
    let insertIndex = 1;
    // 如果第一个非空段不是 en 也不是文件名（即不是 .html 结尾），则认为是子路径（如 ttcpahk），需要在它后面插入 en
    if (parts.length > 2 && parts[1] !== "" && !parts[1].endsWith(".html") && parts[1] !== "en") {
      insertIndex = 2;
    }
    // 插入 "en"
    parts.splice(insertIndex, 0, "en");
    newPath = parts.join("/");
  } else {
    // 切换到中文：移除路径中的 /en/ 段
    newPath = path.replace("/en/", "/");
  }
  
  // 清理多余的斜杠
  newPath = newPath.replace(/\/\/+/g, "/");
  // 确保以 / 开头
  if (!newPath.startsWith("/")) {
    newPath = "/" + newPath;
  }
  
  // 跳转
  window.location.href = newPath;
}

function updateLanguageSwitcherState() {
  const langSwitcher = document.querySelector(".lang-switcher");
  if (!langSwitcher) return;
  const isEnglish = window.location.pathname.includes("/en/");
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
