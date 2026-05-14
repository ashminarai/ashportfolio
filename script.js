/* ============================================================
   Ashmina Rai · Portfolio v2
   - Loader fade-out
   - Sticky header (scroll up/down hide)
   - Reveal on scroll (IntersectionObserver)
   - Experience tab switcher + indicator
   - Mobile menu
   - Soft email scramble effect (small touch)
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  // hide loader after fonts + first paint
  const hideLoader = () => loader && loader.classList.add('is-done');
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 2000);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 1900));
    // fallback if 'load' never fires (rare)
    setTimeout(hideLoader, 4000);
  }

  /* ---------- Year stamp ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header behavior (hide on scroll down, show on up) ---------- */
  const header = document.getElementById('header');
  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 50) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    if (y > 100 && y > lastY) header.classList.add('is-hidden');
    else header.classList.remove('is-hidden');

    lastY = y;
    ticking = false;
  };
  document.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    const setMenu = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      menu.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') !== 'true';
      setMenu(open);
    });
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- Experience tabs ---------- */
  const tabs = document.querySelectorAll('.tabs__tab');
  const panels = document.querySelectorAll('.tabs__panel');
  const indicator = document.getElementById('tabsIndicator');
  if (tabs.length && panels.length) {
    const setIndicator = (i) => {
      if (!indicator) return;
      const first = tabs[0];
      if (!first) return;
      const h = first.offsetHeight;
      const w = first.offsetWidth;
      // Detect vertical (>600px) vs horizontal (<600px) layout
      const isMobile = window.matchMedia('(max-width: 600px)').matches;
      if (isMobile) {
        indicator.style.width = w + 'px';
        indicator.style.height = '2px';
        indicator.style.transform = `translateX(${i * w}px)`;
      } else {
        indicator.style.width = '2px';
        indicator.style.height = h + 'px';
        indicator.style.transform = `translateY(${i * h}px)`;
      }
    };

    const activate = (i) => {
      tabs.forEach((t, idx) => {
        const active = idx === i;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      panels.forEach((p, idx) => p.classList.toggle('is-active', idx === i));
      setIndicator(i);
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(i));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const next = (i + 1) % tabs.length;
          tabs[next].focus();
          activate(next);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = (i - 1 + tabs.length) % tabs.length;
          tabs[prev].focus();
          activate(prev);
        }
      });
    });

    // Initial + on resize
    requestAnimationFrame(() => setIndicator(0));
    let rTimer;
    window.addEventListener('resize', () => {
      clearTimeout(rTimer);
      rTimer = setTimeout(() => {
        const activeIdx = Array.from(tabs).findIndex((t) => t.classList.contains('is-active'));
        setIndicator(activeIdx >= 0 ? activeIdx : 0);
      }, 80);
    });
  }

  /* ---------- Smooth scroll for in-page anchors (with offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- "data-section" inline links (jump to experience tabs) ---------- */
  document.querySelectorAll('a[data-section]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.startsWith('#')) {
        // already handled by smooth-scroll
      }
    });
  });

})();
