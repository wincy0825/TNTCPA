// 移动端菜单
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".navbar-hamburger");
  const navMenu = document.querySelector(".navbar-nav");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("open");
    });
  }

  // 导航高亮
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
      const currentUrl = window.location.href;
      const origin = window.location.origin; // 例如 https://xxx.netlify.app
      let newUrl = origin;

      if (lang === "en") {
        // 切换到英文：如果当前不是英文，则跳转到 /en/index.html
        if (!currentUrl.includes("/en/")) {
          newUrl = origin + "/en/index.html";
        } else {
          newUrl = currentUrl; // 已经在英文，不变
        }
      } else {
        // 切换到中文：如果当前是英文，则去掉 /en/
        if (currentUrl.includes("/en/")) {
          newUrl = currentUrl.replace("/en/", "/");
        } else {
          newUrl = currentUrl; // 已经是中文
        }
      }
      if (newUrl !== currentUrl) {
        window.location.href = newUrl;
      }
    });
  }
});
