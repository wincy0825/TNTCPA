// ============================================================
// 网站交互脚本：移动端菜单、语言切换（基于 URL 路径替换）
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
  let currentPath = window.location.pathname;
  // 获取当前页面文件名（例如 index.html, contact.html）
  let pageName = currentPath.split("/").pop();
  if (!pageName || pageName === "" || pageName.includes("?")) {
    pageName = "index.html";
  }

  // 判断当前是否在英文页面（路径中是否包含 /en/）
  const isEnglish = currentPath.includes("/en/");

  // 如果已经在目标语言，只更新按钮状态
  if ((lang === "en" && isEnglish) || (lang === "zh" && !isEnglish)) {
    updateLanguageSwitcherState();
    return;
  }

  let newPath = "";

  if (lang === "en") {
    // 切换到英文：在根路径后插入 /en/
    // 获取当前路径的根部分（去掉最后的文件名和可能的 /en/）
    let rootPath = currentPath;
    // 如果当前已经是中文页面（没有 /en/），直接构造 /en/文件名
    if (!isEnglish) {
      // 移除末尾的文件名，得到目录路径（可能为空或 /）
      let dirPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
      if (dirPath === "") dirPath = "/";
      newPath = dirPath + "/en/" + pageName;
    } else {
      // 理论上不会进来，但保留逻辑
      newPath = currentPath.replace(/\/en\//, "/") + "?error";
    }
    // 处理根路径特殊情况：如果 dirPath 是 "/"，结果会是 "//en/index.html"
    newPath = newPath.replace(/\/\/+/g, "/");
  } else {
    // 切换到中文：移除 /en/ 部分
    if (isEnglish) {
      newPath = currentPath.replace(/\/en\//, "/");
      // 如果替换后变成 /index.html 或 /contact.html 等
    } else {
      // 已经是中文，不跳转（前面已拦截）
      return;
    }
  }

  // 最终清理：确保路径不以双斜杠开头，且不为空
  newPath = newPath.replace(/\/\/+/g, "/");
  if (newPath === "") newPath = "/";

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
