// 等待 DOM 加載完成
document.addEventListener("DOMContentLoaded", function() {
  // ===== 漢堡選單功能 =====
  var hamburger = document.querySelector(".navbar-hamburger");
  var navMenu = document.querySelector(".navbar-nav");
  
  if (hamburger && navMenu) {
    // 點擊漢堡切換選單顯示/隱藏
    hamburger.addEventListener("click", function(e) {
      e.preventDefault();
      navMenu.classList.toggle("open");
    });

    // 點擊選單內的連結後自動關閉選單
    navMenu.addEventListener("click", function(e) {
      if (e.target.tagName === 'A') {
        navMenu.classList.remove("open");
      }
    });
  }

  // ===== 手機版：將語言切換按鈕複製到選單內部 =====
  function setupMobileLangSwitcher() {
    var originalLangSwitcher = document.querySelector(".lang-switcher");
    var mobileContainer = document.querySelector(".navbar-nav");
    if (!originalLangSwitcher || !mobileContainer) return;

    // 檢查是否已存在複製版，避免重複
    if (document.querySelector(".navbar-nav .lang-switcher-mobile")) return;

    // 複製語言切換器的內容
    var clonedSwitcher = originalLangSwitcher.cloneNode(true);
    clonedSwitcher.classList.add("lang-switcher-mobile");
    // 清除原有 class，避免樣式衝突
    clonedSwitcher.classList.remove("lang-switcher");
    // 加入到選單底部
    mobileContainer.appendChild(clonedSwitcher);

    // 為複製版內的連結綁定語言切換事件
    clonedSwitcher.querySelectorAll("a").forEach(function(link) {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        var lang = link.getAttribute("data-lang");
        if (lang === "zh") {
          var newPath = window.location.pathname.replace('/en/', '/tc/');
          window.location.href = newPath;
        } else if (lang === "en") {
          var newPath = window.location.pathname.replace('/tc/', '/en/');
          window.location.href = newPath;
        }
      });
    });
  }

  // 只在手機螢幕寬度下執行（小於等於 768px）
  if (window.innerWidth <= 768) {
    setupMobileLangSwitcher();
  }

  // 當視窗大小改變時，動態處理（例如旋轉螢幕）
  window.addEventListener("resize", function() {
    if (window.innerWidth <= 768) {
      setupMobileLangSwitcher();
    } else {
      // 如果螢幕變大，移除複製的語言切換器（避免重複）
      var mobileCopy = document.querySelector(".navbar-nav .lang-switcher-mobile");
      if (mobileCopy) mobileCopy.remove();
    }
  });

  // ===== 語言切換功能（適用於桌面版原來的按鈕）=====
  var originalLangLinks = document.querySelectorAll(".lang-switcher a");
  originalLangLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      var lang = link.getAttribute("data-lang");
      if (lang === "zh") {
        var newPath = window.location.pathname.replace('/en/', '/tc/');
        window.location.href = newPath;
      } else if (lang === "en") {
        var newPath = window.location.pathname.replace('/tc/', '/en/');
        window.location.href = newPath;
      }
    });
  });

  // ===== 標記當前頁面導航為 active =====
  var currentPage = window.location.pathname.split('/').pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach(function(link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
