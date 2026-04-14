// ============================================================
// 网站交互脚本：移动端菜单、语言切换（修复路径重复问题）
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // 移动端汉堡菜单
  const hamburger = document.querySelector(".navbar-hamburger");
  const navMenu = document.querySelector(".navbar-nav");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("open");
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
      if (!target) return;
      const lang = target.getAttribute("data-lang");

      const origin = window.location.origin;      // 例如 https://xxx.netlify.app
      let path = window.location.pathname;        // 例如 /index.html 或 /en/index.html
      
      // 获取当前页面文件名（最后一个斜杠之后的部分）
      let fileName = path.split("/").pop();
      if (!fileName || fileName === "") {
        fileName = "index.html";
      }

      const isEnglish = path.includes("/en/");
      let newUrl = origin;

      if (lang === "en" && !isEnglish) {
        // 中文 → 英文：添加 /en/ 前缀
        newUrl = origin + "/en/" + fileName;
      } 
      else if (lang === "zh" && isEnglish) {
        // 英文 → 中文：移除 /en/ 前缀
        let newPath = path.replace("/en/", "/");
        // 确保路径以 / 开头
        if (!newPath.startsWith("/")) newPath = "/" + newPath;
        // 如果清理后只剩下根路径，补上 index.html
        if (newPath === "/") newPath = "/index.html";
        newUrl = origin + newPath;
      } 
      else {
        // 已经在目标语言，不跳转
        newUrl = window.location.href;
      }

      // 避免重复跳转到相同地址
      if (newUrl !== window.location.href) {
        window.location.href = newUrl;
      }
    });
  }
});
