/* ============================================================
   Baldita — koncepcija. Sąveika ir animacijos.
   Viskas be išorinių bibliotekų; animuojamos tik transform,
   opacity ir clip-path savybės, kad naršyklė galėtų dirbti
   kompozitoriaus lygmenyje.
   ============================================================ */
(function () {
  'use strict';

  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = mq.matches;
  mq.addEventListener && mq.addEventListener('change', function (e) { reduced = e.matches; });

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ----------------------------------------------------------
     1. Antraštė: fonas atsiranda tik nuslinkus nuo viršaus
     ---------------------------------------------------------- */
  var hdr = $('#hdr');
  function onScrollHdr() {
    if (!hdr) return;
    hdr.classList.toggle('is-stuck', window.scrollY > 24);
  }
  onScrollHdr();

  /* ----------------------------------------------------------
     2. Mobilusis meniu
     Uždarytas meniu turi dingti ir iš tab tvarkos — todėl CSS
     naudoja visibility su uždelsimu, o čia tvarkomas fokusas.
     ---------------------------------------------------------- */
  var burger = $('#burger'), mnav = $('#mnav'), mnavX = $('#mnavX');

  function menuItems() { return $$('a, button', mnav); }

  function stagger(open) {
    var items = $$('a', mnav);
    items.forEach(function (a, i) {
      a.style.transitionDelay = open && !reduced ? (0.06 + i * 0.045).toFixed(3) + 's' : '0s';
    });
  }

  function setMenu(open, returnFocus) {
    if (!mnav || !burger) return;
    mnav.classList.toggle('open', open);
    mnav.setAttribute('aria-hidden', open ? 'false' : 'true');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Uždaryti meniu' : 'Atidaryti meniu');
    document.body.style.overflow = open ? 'hidden' : '';
    stagger(open);
    if (open) {
      setTimeout(function () { mnavX && mnavX.focus(); }, 60);
    } else if (returnFocus !== false) {
      // Fokusas grįžta į mygtuką, kuris meniu atidarė — bet ne tada,
      // kai meniu užsidaro paspaudus nuorodą (ten fokusas eina toliau).
      burger.focus();
    }
  }

  burger && burger.addEventListener('click', function () {
    setMenu(!mnav.classList.contains('open'));
  });
  mnavX && mnavX.addEventListener('click', function () { setMenu(false); });
  mnav && $$('a', mnav).forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false, false); });
  });

  /* ----------------------------------------------------------
     3. Galerija — sugeneruojama iš duomenų, kad HTML liktų švarus
     ---------------------------------------------------------- */
  /* Tvarka parinkta taip, kad trijuose stulpeliuose gulsčios ir
     stačios nuotraukos kaitaliotųsi — tada stulpeliai baigiasi
     maždaug viename lygyje. */
  var GAL = [
    { f: 'gal-13', w: 1100, h: 825, cat: 'Virtuvės baldai', cap: 'Balta virtuvė be rankenėlių su ilga darbo zona.', alt: 'Balta virtuvė be rankenėlių su ilgu stalviršiu palei langą.' },
    { f: 'gal-07', w: 512, h: 682, cat: 'Spintos', cap: 'Baltų modulių sienelė su ąžuolo darbo stalu.', alt: 'Baltų kvadratinių modulių spinta ir ąžuolo darbo stalas prie lango.' },
    { f: 'gal-06', w: 1100, h: 825, cat: 'Miegamasis', cap: 'Miegamojo zona su baltais įmontuotais baldais.', alt: 'Miegamasis su lova, sieniniais šviestuvais ir baltais įmontuotais baldais.' },
    { f: 'gal-01', w: 576, h: 768, cat: 'Virtuvės baldai', cap: 'Klasikinio stiliaus virtuvė žaliais frontais.', alt: 'Klasikinio stiliaus virtuvė su žaliomis apatinėmis ir baltomis viršutinėmis spintelėmis.' },
    { f: 'gal-10', w: 900, h: 1200, cat: 'Spintos', cap: 'Balta spinta per visą sieną.', alt: 'Balta spinta be rankenėlių per visą kambario sieną.' },
    { f: 'gal-03', w: 931, h: 698, cat: 'Virtuvės baldai', cap: 'Šviesi virtuvė su valgomojo zona ir lentynomis.', alt: 'Šviesi virtuvė su apvaliu valgomojo stalu, baltomis kėdėmis ir atviromis lentynomis.' },
    { f: 'gal-05', w: 900, h: 1200, cat: 'Vonios baldai', cap: 'Pakabinama vonios spintelė su veidrodžiu.', alt: 'Pakabinama balta vonios spintelė su šviesiu stalviršiu ir stačiakampiu veidrodžiu.' },
    { f: 'gal-08', w: 960, h: 720, cat: 'Vaikų kambarys', cap: 'Vaikų kambario baldai su darbo ir žaidimų zonomis.', alt: 'Vaikų kambarys su baltomis spintomis, žaliais akcentais ir darbo stalu.' },
    { f: 'gal-04', w: 912, h: 684, cat: 'Virtuvės baldai', cap: 'Smaragdinė virtuvė su marmuro faktūros sienele.', alt: 'Tamsiai žalia virtuvė su marmuro faktūros sienele, stiklinėmis viršutinėmis spintelėmis ir mediniu stalu.' },
    { f: 'gal-09', w: 900, h: 1200, cat: 'Virtuvės baldai', cap: 'Kreminės spalvos virtuvė su tamsia sienele.', alt: 'Kreminės spalvos blizgi virtuvė su tamsiai ruda sienele ir aukštais moduliais.' },
    { f: 'gal-12', w: 988, h: 741, cat: 'Spintos', cap: 'Spinta stumdomomis veidrodinėmis durimis.', alt: 'Spinta stumdomomis veidrodinėmis durimis miegamajame.' },
    { f: 'gal-02', w: 900, h: 1200, cat: 'Virtuvės baldai', cap: 'Balta virtuvė su medžio stalviršiu.', alt: 'Balta virtuvė be rankenėlių su medžio stalviršiu, orkaite ir kaitlente.' }
  ];

  var galBox = $('#gal');
  if (galBox) {
    var html = '';
    for (var i = 0; i < GAL.length; i++) {
      var g = GAL[i];
      html += '<button type="button" class="frame' + (i >= 6 ? ' is-extra' : '') +
        '" data-lb="' + (6 + i) + '">' +
        '<img src="assets/' + g.f + '.webp" width="' + g.w + '" height="' + g.h + '"' +
        ' loading="lazy" decoding="async" alt="' + g.alt + '"></button>';
    }
    galBox.innerHTML = html;

    // Mygtukas reikalingas tik ten, kur .is-extra tikrai paslėpti (mobilus).
    var galMore = $('#galMore'), galMoreBtn = $('#galMoreBtn');
    function syncGalMore() {
      if (!galMore) return;
      var extra = galBox.querySelector('.is-extra');
      var hiddenNow = extra && getComputedStyle(extra).display === 'none';
      galMore.hidden = !hiddenNow;
    }
    galMoreBtn && galMoreBtn.addEventListener('click', function () {
      galBox.classList.add('is-open');
      galMore.hidden = true;
      sweep();
    });
    syncGalMore();
    window.addEventListener('resize', syncGalMore);
  }

  /* ----------------------------------------------------------
     4. Lightbox — darbai ir galerija viename sąraše
     ---------------------------------------------------------- */
  var WORKS = [
    { f: 'darbas-02', cat: 'Virtuvės baldai', cap: 'Virtuvė su sala ir aukštais moduliais.' },
    { f: 'darbas-03', cat: 'Spintos', cap: 'Spinta per visą miegamojo sieną.' },
    { f: 'darbas-05', cat: 'Prieškambaris', cap: 'Prieškambario baldų komplektas.' },
    { f: 'darbas-06', cat: 'Virtuvės baldai', cap: 'Virtuvė atviro plano erdvėje.' },
    { f: 'darbas-07', cat: 'Svetainės baldai', cap: 'Svetainės sienelė su niša televizoriui.' },
    { f: 'darbas-04', cat: 'Virtuvės baldai', cap: 'Šviesi virtuvė su sala.' }
  ];

  var ITEMS = WORKS.map(function (w) { return { f: w.f, cat: w.cat, cap: w.cap }; })
    .concat(GAL.map(function (g) { return { f: g.f, cat: g.cat, cap: g.cap }; }));

  var lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbCat = $('#lbCat');
  var lbX = $('#lbX'), lbPrev = $('#lbPrev'), lbNext = $('#lbNext');
  var lbIndex = 0, lbOpener = null;

  function lbShow(n) {
    if (!ITEMS.length) return;
    lbIndex = (n + ITEMS.length) % ITEMS.length;
    var it = ITEMS[lbIndex];
    var src = document.querySelector('[data-lb="' + lbIndex + '"] img');
    lbImg.src = 'assets/' + it.f + '.webp';
    lbImg.alt = src ? src.alt : it.cap;
    lbCat.textContent = it.cat;
    lbCap.textContent = it.cap;
  }

  function lbOpen(n, opener) {
    if (!lb) return;
    lbOpener = opener || null;
    lbShow(n);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { lbX && lbX.focus(); }, 50);
  }

  function lbClose() {
    if (!lb) return;
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lbOpener) { lbOpener.focus(); lbOpener = null; }
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-lb]') : null;
    if (btn) {
      e.preventDefault();
      lbOpen(parseInt(btn.getAttribute('data-lb'), 10) || 0, btn);
    }
  });

  lbX && lbX.addEventListener('click', lbClose);
  lbPrev && lbPrev.addEventListener('click', function () { lbShow(lbIndex - 1); });
  lbNext && lbNext.addEventListener('click', function () { lbShow(lbIndex + 1); });
  lb && lb.addEventListener('click', function (e) {
    // paspaudimas šalia nuotraukos uždaro peržiūrą
    if (e.target === lb) lbClose();
  });

  /* ----------------------------------------------------------
     5. Klaviatūra: Esc uždaro, rodyklės verčia, Tab lieka viduje
     ---------------------------------------------------------- */
  document.addEventListener('keydown', function (e) {
    var menuOpen = mnav && mnav.classList.contains('open');
    var boxOpen = lb && lb.classList.contains('open');

    if (e.key === 'Escape') {
      if (boxOpen) { lbClose(); return; }
      if (menuOpen) { setMenu(false); return; }
    }
    if (boxOpen) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); lbShow(lbIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); lbShow(lbIndex + 1); }
      if (e.key === 'Tab') {
        var f = [lbX, lbPrev, lbNext];
        var idx = f.indexOf(document.activeElement);
        e.preventDefault();
        var next = e.shiftKey ? idx - 1 : idx + 1;
        if (next < 0) next = f.length - 1;
        if (next >= f.length) next = 0;
        f[next].focus();
      }
      return;
    }
    if (menuOpen && e.key === 'Tab') {
      var items = menuItems();
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ----------------------------------------------------------
     6. Atsiradimas slenkant
     Apatinės ribos sąmoningai nėra: viskas, kas jau praėjo
     lango liniją, arba matoma, arba jau praslinkta.
     ---------------------------------------------------------- */
  var rvs = $$('[data-rv]');
  var sweep = function () {};
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    rvs.forEach(function (el) { io.observe(el); });

    // apsauginis šlavimas — jei naršyklė praleido greitą slinkimą
    sweep = function () {
      rvs.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.98) {
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    };
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep);
    window.addEventListener('load', sweep);
    // Tingiai kraunamos nuotraukos keičia puslapio aukštį jau po slinkimo,
    // todėl pirmas kelias sekundes šluojame periodiškai.
    var t0 = Date.now();
    (function tick() {
      sweep();
      if (Date.now() - t0 < 5000) setTimeout(tick, 400);
    })();
  } else {
    rvs.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ----------------------------------------------------------
     7. Proceso juosta — pildosi kartu su slinkimu
     ---------------------------------------------------------- */
  var steps = $('#steps'), bar = $('#stepsBar');
  var stepEls = $$('.step');

  function updateSteps() {
    if (!steps || !bar) return;
    var r = steps.getBoundingClientRect();
    var mid = window.innerHeight * 0.55;
    var p = (mid - r.top) / r.height;
    p = Math.max(0, Math.min(1, p));
    bar.style.transform = 'scaleY(' + p.toFixed(4) + ')';

    stepEls.forEach(function (s) {
      var sr = s.getBoundingClientRect();
      s.classList.toggle('is-on', sr.top < mid);
    });
  }

  /* ----------------------------------------------------------
     8. Vienintelis autorinis judesys — labai subtilus hero gylis.
     ---------------------------------------------------------- */
  var heroFrame = $('.hero__fig .frame');
  var heroImg = heroFrame ? $('img', heroFrame) : null;
  if (heroImg) heroImg.style.willChange = 'transform';

  function parallax() {
    if (!heroImg) return;
    if (reduced) { heroImg.style.transform = ''; return; }
    var r = heroFrame.getBoundingClientRect();
    if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
    // -1 .. 1 pagal rėmelio centro padėtį ekrane
    var t = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
    t = Math.max(-1, Math.min(1, t));
    heroImg.style.transform = 'scale(1.035) translate3d(0,' + (t * -1.35).toFixed(2) + '%,0)';
  }
  parallax();

  /* ----------------------------------------------------------
     9. Aktyvi meniu nuoroda pagal matomą skyrių
     ---------------------------------------------------------- */
  var navLinks = $$('.nav a[href^="#"]');
  var navTargets = navLinks.map(function (a) {
    return document.getElementById(a.getAttribute('href').slice(1));
  });

  function spy() {
    if (!navLinks.length) return;
    var line = window.innerHeight * 0.32;
    var active = -1;
    // Paskutinis skyrius, kurio viršus jau praėjo liniją. Taip veikia
    // ir puslapio apačioje, kur paskutinis skyrius nebeuždengia linijos.
    for (var i = 0; i < navTargets.length; i++) {
      var t = navTargets[i];
      if (t && t.getBoundingClientRect().top <= line) active = i;
    }
    navLinks.forEach(function (a, i) {
      if (i === active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  /* ----------------------------------------------------------
     10. Vienas rAF ciklas visiems slinkimo skaičiavimams
     ---------------------------------------------------------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      onScrollHdr();
      updateSteps();
      parallax();
      sweep();
      spy();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateSteps();

  /* ----------------------------------------------------------
     9. Forma — patikra naršyklėje, be jokio backend'o
     ---------------------------------------------------------- */
  var form = $('#form'), done = $('#formDone');

  function setError(input, msgId, msg) {
    var box = msgId ? $('#' + msgId) : null;
    if (box) box.textContent = msg || '';
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      if (msgId) input.setAttribute('aria-describedby', msgId);
    } else {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }

  function looksLikeContact(v) {
    var s = v.replace(/\s+/g, '');
    var digits = s.replace(/[^0-9]/g, '');
    var hasMail = s.indexOf('@') > 0 && s.indexOf('.', s.indexOf('@')) > s.indexOf('@') + 1;
    return hasMail || digits.length >= 8;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#f-name'), contact = $('#f-contact'), msg = $('#f-msg');
      var bad = null;

      if (!name.value.trim()) { setError(name, 'e-name', 'Įrašykite vardą.'); bad = bad || name; }
      else setError(name, 'e-name', '');

      if (!contact.value.trim()) {
        setError(contact, 'e-contact', 'Įrašykite telefoną arba el. paštą.');
        bad = bad || contact;
      } else if (!looksLikeContact(contact.value)) {
        setError(contact, 'e-contact', 'Patikrinkite kontaktus — reikia telefono numerio arba el. pašto.');
        bad = bad || contact;
      } else setError(contact, 'e-contact', '');

      if (msg.value.trim().length < 10) {
        setError(msg, 'e-msg', 'Trumpai aprašykite projektą (bent 10 simbolių).');
        bad = bad || msg;
      } else setError(msg, 'e-msg', '');

      if (bad) { bad.focus(); return; }

      form.hidden = true;
      if (done) {
        done.hidden = false;
        done.setAttribute('tabindex', '-1');
        done.focus();
      }
    });

    $$('#form input, #form textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        if (el.getAttribute('aria-invalid') === 'true') {
          var id = el.getAttribute('aria-describedby');
          setError(el, id, '');
        }
      });
    });
  }

  /* ----------------------------------------------------------
     10. Pradinė hero animacija
     ---------------------------------------------------------- */
  requestAnimationFrame(function () {
    document.body.classList.add('is-loaded');
  });
})();
