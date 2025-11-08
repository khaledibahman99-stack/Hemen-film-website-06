// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMobile = document.querySelector(".nav-mobile");

if (hamburger && navMobile) {
  hamburger.addEventListener("click", () => {
    navMobile.classList.toggle("active");
    const spans = hamburger.querySelectorAll("span");
    if (navMobile.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(7px, 7px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

// Language switcher — fully functional with block/inline handling
const langButtons = document.querySelectorAll(".lang-btn");
const langElements = document.querySelectorAll("[data-lang]");

function setLanguage(lang) {
  // Update active button
  langButtons.forEach(btn => {
    if (btn.getAttribute("data-lang-code") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
// Highlight active nav item
const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "index";
document.querySelectorAll(".lang-link").forEach(link => {
  const href = link.getAttribute("href").replace(".html", "");
  if (href === `/${currentPage}` || (currentPage === "index" && href === "/index")) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
  
  // Show only elements for selected language
  langElements.forEach(el => {
    if (el.getAttribute("data-lang") === lang) {
      // Detect if element is block or inline
      const isBlock = getComputedStyle(el).display.includes("block");
      el.style.display = isBlock ? "block" : "inline";
    } else {
      el.style.display = "none";
    }
  });

  // Update Wikipedia links dynamically
  const wikiLinks = document.querySelectorAll('.wiki-link');
  wikiLinks.forEach(link => {
    const url = link.getAttribute(`data-wiki-${lang}`);
    if (url) link.href = url;
  });

  // Update HTML direction for RTL languages
  if (lang === "fa" || lang === "ku") {
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.dir = "ltr";
  }

  // Save to localStorage
  localStorage.setItem("language", lang);
  document.documentElement.lang = lang;
}

// Load saved language or default to English
const savedLang = localStorage.getItem("language") || "en";
setLanguage(savedLang);

// Add click listeners
langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang-code");
    setLanguage(lang);
  });
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll(".nav-mobile a");
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navMobile && navMobile.classList.contains("active")) {
      hamburger.click();
    }
  });
});