// 等待 DOM 加載完成
document.addEventListener("DOMContentLoaded", function() {
  // ===== 漢堡選單功能（新增）=====
  var hamburger = document.querySelector(".navbar-hamburger");
  var navMenu = document.querySelector(".navbar-nav");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function(e) {
      e.preventDefault();
      navMenu.classList.toggle("open");
    });
  }

  // ===== 以下是你原有的語言切換和 active 連結程式碼 =====
  // 請保留你原本能正常運作的部分，如果沒有，使用下面的基礎版本

  // 標記當前頁面導航為 active
  var currentPage = window.location.pathname.split('/').pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach(function(link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // 語言切換功能（適用於 /TNTCPA/ 子目錄）
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
});
