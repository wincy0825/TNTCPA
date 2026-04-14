// 移动端菜单 + 导航高亮（无语言切换）
document.addEventListener("DOMContentLoaded", function () {
  // 汉堡菜单
  const hamburger = document.querySelector(".navbar-hamburger");
  const navMenu = document.querySelector(".navbar-nav");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("open");
    });
  }

  // 当前导航高亮
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});
