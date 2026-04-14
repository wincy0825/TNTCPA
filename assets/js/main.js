// ============================================================
// 网站交互脚本：移动端菜单、语言切换（自动适配子路径/根路径）
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // ---------- 1. 移动端汉堡菜单 ----------
  const hamburger = document.querySelector(".navbar-hamburger");
  const navMenu = document.querySelector(".navbar-nav");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("open");
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

  // ---------- 3. 语言切换（自动适配子路径） ----------
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

// 获取基础路径（例如 /ttcpahk/ 或空字符串）
function getBasePath() {
  let path = window.location.pathname;
  // 如果路径中包含 /en/，则基础路径是 /en 之前的部分
  const enIndex = path.indexOf("/en/");
  if (enIndex !== -1) {
    path = path.substring(0, enIndex);
  }
  // 去掉末尾的斜杠
  if (path.endsWith("/")) path = path.slice(0, -1);
  return path;
}

function switchLanguage(lang) {
  localStorage.setItem("preferred-language", lang);
  
  const basePath = getBasePath();          // 例如 "" 或 "/ttcpahk"
  const currentPath = window.location.pathname;
  
  // 获取当前页面文件名
  let pageName = currentPath.split("/").pop();
  if (!pageName || pageName === "" || pageName.includes("?")) {
    pageName = "index.html";
  }
  
  // 判断当前是否在英文页面
  const isEnglish = currentPath.includes("/en/");
  
  // 如果已经在目标语言，只更新高亮状态
  if ((lang === "en" && isEnglish) || (lang === "zh" && !isEnglish)) {
    updateLanguageSwitcherState();
    return;
  }
  
  // 构建新路径
  let newPath;
  if (lang === "en") {
    // 英文路径：basePath + /en/ + pageName
    newPath = basePath + "/en/" + pageName;
  } else {
    // 中文路径：basePath + / + pageName
    newPath = basePath + "/" + pageName;
  }
  
  // 处理根路径的情况：如果 newPath 以 // 开头，去掉一个斜杠
  newPath = newPath.replace(/\/+/g, "/");
  if (newPath === "") newPath = "/";
  
  window.location.href = newPath;
}

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
