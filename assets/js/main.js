// 等待 DOM 加載完成
document.addEventListener("DOMContentLoaded", function() {
  // ===== 漢堡選單功能 =====
  var hamburger = document.querySelector(".navbar-hamburger");
  var navMenu = document.querySelector(".navbar-nav");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function(e) {
      e.preventDefault();
      navMenu.classList.toggle("open");
    });
  }

  // ===== 語言切換功能（保留你原本能用的版本）=====
  // 注意：如果你原本的語言切換程式碼與下面不同，請替換成你原本的程式碼
  var langSwitcher = document.querySelector(".lang-switcher");
  if (langSwitcher) {
    langSwitcher.addEventListener("click", function(e) {
      e.preventDefault();
      var target = e.target.closest('a');
      if (!target) return;
      var lang = target.getAttribute("data-lang");
      if (lang === "zh") {
        var newPath = window.location.pathname.replace('/en/', '/tc/');
        window.location.href = newPath;
      } else if (lang === "en") {
        var newPath = window.location.pathname.replace('/tc/', '/en/');
        window.location.href = newPath;
      }
    });
  }

  // ===== 標記當前頁面導航為 active（可選）=====
  var currentPage = window.location.pathname.split('/').pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach(function(link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
