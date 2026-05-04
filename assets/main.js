/* ============================================================
   What Is Your Evidence — site interactions
   ============================================================ */

(function () {
  'use strict';

  // Mobile nav toggle ----------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      // Close on link click
      nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Reveal-on-scroll ---------------------------------------
    var revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealEls.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // Featured carousel --------------------------------------
    var track = document.querySelector('.featured__track');
    var prevBtn = document.querySelector('[data-featured-prev]');
    var nextBtn = document.querySelector('[data-featured-next]');
    if (track && prevBtn && nextBtn) {
      function step() {
        var firstItem = track.querySelector('.featured__item');
        if (!firstItem) return 320;
        var style = getComputedStyle(track);
        var gap = parseInt(style.columnGap || style.gap || '0', 10) || 20;
        return firstItem.getBoundingClientRect().width + gap;
      }
      function updateButtons() {
        var max = track.scrollWidth - track.clientWidth - 2;
        prevBtn.disabled = track.scrollLeft <= 2;
        nextBtn.disabled = track.scrollLeft >= max;
      }
      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -step(), behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: step(), behavior: 'smooth' });
      });
      track.addEventListener('scroll', updateButtons, { passive: true });
      window.addEventListener('resize', updateButtons);
      updateButtons();

      // Auto-advance gently every 6s, pause on interaction
      var auto = null;
      var interacted = false;
      function start() {
        if (auto || interacted) return;
        auto = setInterval(function () {
          var max = track.scrollWidth - track.clientWidth - 2;
          if (track.scrollLeft >= max) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            track.scrollBy({ left: step(), behavior: 'smooth' });
          }
        }, 6000);
      }
      function stop() { clearInterval(auto); auto = null; }
      track.addEventListener('mouseenter', stop);
      track.addEventListener('touchstart', function () { interacted = true; stop(); }, { passive: true });
      track.addEventListener('wheel', function () { interacted = true; stop(); }, { passive: true });
      [prevBtn, nextBtn].forEach(function (b) { b.addEventListener('click', function () { interacted = true; stop(); }); });
      start();
    }

    // Variants tab logic --------------------------------------
    var tabBtns = document.querySelectorAll('[data-tab]');
    if (tabBtns.length) {
      tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.getAttribute('data-tab');
          tabBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
          document.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
            panel.classList.toggle('is-active', panel.getAttribute('data-tab-panel') === key);
          });
        });
      });
    }
  });
})();
