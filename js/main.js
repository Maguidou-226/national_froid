/* ============================================================
   National Froid GNF — Interactions (sans dépendance)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  var announceBar = document.querySelector('.announce-bar');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      if (announceBar) {
        announceBar.style.display = open ? 'none' : 'block';
      }
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        if (announceBar) {
          announceBar.style.display = 'block';
        }
      });
    });
  }

  /* ---------- Apparition au scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Image cassée -> garde le dégradé de secours ---------- */
  document.querySelectorAll('.media img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });

  /* ---------- Formulaire (FormSubmit) : redirection vers merci.html ---------- */
  document.querySelectorAll('form [name="_next"]').forEach(function (field) {
    var base = window.location.href.replace(/[^\/]*$/, '');
    field.value = base + 'merci.html';
  });

  /* ---------- Année ---------- */
  var y = document.querySelector('[data-year]');
  if (y) { y.textContent = new Date().getFullYear(); }

  /* ---------- Navigation active au défilement (scrollspy) ---------- */
  var anchorLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-anchor'));
  if (anchorLinks.length && 'IntersectionObserver' in window) {
    var sectionMap = {};
    var observed = [];
    anchorLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        var sec = document.querySelector(id);
        if (sec) { sectionMap[sec.id] = link; observed.push(sec); }
      }
    });

    function setActive(id) {
      anchorLinks.forEach(function (l) {
        if (l.getAttribute('href') === '#' + id) { l.setAttribute('aria-current', 'page'); }
        else { l.removeAttribute('aria-current'); }
      });
    }

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && sectionMap[e.target.id]) { setActive(e.target.id); }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    observed.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Barre de progression de lecture ---------- */
  var progress = document.querySelector('.scroll-progress span');
  var toTop = document.querySelector('.to-top');
  var ticking = false;
  function onScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? (scrollTop / h) * 100 : 0;
      progress.style.width = pct + '%';
    }
    if (toTop) { toTop.classList.toggle('show', scrollTop > 600); }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
