// ============================================================
// 网站交互脚本：移动端菜单、语言切换（基于 pathname 替换）
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
  // 获取当前路径，例如：/index.html 或 /en/index.html 或 /ttcpahk/index.html 或 /ttcpahk/en/index.html
  let currentPath = window.location.pathname;
  
  // 判断是否在英文页面（路径中包含 /en/）
  const isEnglish = currentPath.includes("/en/");
  
  // 如果已经在目标语言，只更新按钮样式
  if ((lang === "en" && isEnglish) || (lang === "zh" && !isEnglish)) {
    updateLanguageSwitcherState();
    return;
  }
  
  let newPath = "";
  
  if (lang === "en") {
    // 切换到英文：在路径中合适的位置插入 /en/
    // 例如：/index.html -> /en/index.html
    // 例如：/ttcpahk/index.html -> /ttcpahk/en/index.html
    // 找到第一个斜杠后的位置（如果路径以 / 开头）
    const firstSlash = currentPath.indexOf("/");
    if (firstSlash === 0) {
      // 路径以 / 开头，我们在根后面插入 en/
      // 需要找到第二个斜杠的位置，但简单起见，在第一个字符后插入 "en/"
      // 但要注意如果路径是 /index.html，插入后应为 /en/index.html
      // 更通用的方法：将路径分成两部分：根路径和剩余部分
      const parts = currentPath.split("/");
      // parts[0] 是空字符串（因为以 / 开头），parts[1] 可能是空或者仓库名
      if (parts.length >= 2 && parts[1] !== "" && parts[1] !== "en") {
        // 有子路径（如 ttcpahk），需要在子路径后面插入 en
        // 例如 ["", "ttcpahk", "index.html"] -> 插入 "en" 后变成 ["", "ttcpahk", "en", "index.html"]
        parts.splice(2, 0, "en");
      } else {
        // 没有子路径，直接在根后面插入 en
        parts.splice(1, 0, "en");
      }
      newPath = parts.join("/");
    } else {
      // 相对路径（理论上不会出现），直接加 en/
      newPath = "en/" + currentPath;
    }
  } else {
    // 切换到中文：移除路径中的 /en/
    newPath = currentPath.replace("/en/", "/");
  }
  
  // 清理多余的斜杠
  newPath = newPath.replace(/\/\/+/g, "/");
  // 确保以 / 开头（相对路径）
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
