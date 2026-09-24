/* Motion layer for the one-page portfolio, built on the GSAP copy shipped in
   /gsap. It takes over every entrance the theme used to hand to WOW.js, so
   the whole page moves with one set of easings, and adds the intro, the hero
   scene, scroll-linked effects and the pointer effects.

   Loaded after js/i18n.js, so the copy it splits into words is already in the
   visitor's language. Everything is progressive: the hidden "from" states are
   only ever set here, so without GSAP, or with reduced motion requested, the
   page simply renders as it is. */
(function () {
    "use strict";

    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    var $ = window.jQuery;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function all(selector, scope) {
        return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    }

    // WOW.js would run its own animate.css reveals on top of these. Stripping
    // the class before the theme calls new WOW().init() on window.load leaves
    // those elements plain and visible, which is also the no-motion fallback.
    // The theme puts `transition: all` on many of them, which would let their
    // WOW visibility:hidden linger for half a second - long enough for GSAP
    // to read "hidden" as the state to reveal to - so transitions are
    // suspended across the swap.
    var wows = all(".wow");
    wows.forEach(function (el) {
        el.style.transition = "none";
        el.classList.remove("wow");
    });
    void document.body.offsetHeight;
    wows.forEach(function (el) {
        el.style.transition = "";
    });

    var preloader = document.getElementById("preloader");
    var introName = preloader && preloader.querySelector(".intro-name");

    // The marquee is built either way; without motion it is a static band.
    var marquees = all(".marquee").map(buildMarquee);

    if (!gsap || !ScrollTrigger || reduce) {
        if (introName) introName.style.visibility = "visible";
        return;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.out", duration: 0.9 });

    /* ------------------------------------------------------------------
     * helpers
     * ------------------------------------------------------------------ */

    // Wraps every word under `el` in a clipping mask, keeping inline markup
    // such as the coloured name. Returns the inner word spans. i18n.js swaps
    // the innerHTML wholesale on a language change, so the wrappers never
    // leak into another language.
    function splitWords(el) {
        var words = [];
        (function walk(node) {
            var children = Array.prototype.slice.call(node.childNodes);
            children.forEach(function (child) {
                if (child.nodeType === 3) {
                    var parts = child.textContent.split(/(\s+)/);
                    var frag = document.createDocumentFragment();
                    parts.forEach(function (part) {
                        if (!part) return;
                        if (/^\s+$/.test(part)) {
                            frag.appendChild(document.createTextNode(" "));
                            return;
                        }
                        var mask = document.createElement("span");
                        var word = document.createElement("span");
                        mask.className = "m-mask";
                        word.className = "m-word";
                        word.textContent = part;
                        mask.appendChild(word);
                        frag.appendChild(mask);
                        words.push(word);
                    });
                    node.replaceChild(frag, child);
                } else if (child.nodeType === 1 && child.tagName !== "BR") {
                    walk(child);
                }
            });
        })(el);
        return words;
    }

    // CSS transitions (the theme sets `transition: all` widely) would smear
    // every frame GSAP writes, so they are switched off on a tween's targets
    // while it runs.
    function guard(vars) {
        vars.onStart = function () {
            this.targets().forEach(function (t) { t.classList.add("m-busy"); });
        };
        var done = vars.onComplete;
        vars.onComplete = function () {
            this.targets().forEach(function (t) { t.classList.remove("m-busy"); });
            if (done) done.call(this);
        };
        return vars;
    }

    function reveal(targets, vars, trigger, start) {
        targets = gsap.utils.toArray(targets);
        if (!targets.length) return null;
        guard(vars);
        vars.scrollTrigger = {
            trigger: trigger || targets[0],
            start: start || "top 86%",
            once: true
        };
        return gsap.from(targets, vars);
    }

    /* ------------------------------------------------------------------
     * intro: the name rises letter by letter, then the curtain lifts
     * ------------------------------------------------------------------ */

    var introChars = [];
    if (introName) {
        all("[data-intro-word]", introName).forEach(function (word) {
            var text = word.textContent;
            word.textContent = "";
            text.split("").forEach(function (c) {
                var mask = document.createElement("span");
                var ch = document.createElement("span");
                mask.className = "intro-mask";
                ch.className = "intro-char";
                ch.textContent = c;
                mask.appendChild(ch);
                word.appendChild(mask);
                introChars.push(ch);
            });
        });
        gsap.set(introChars, { yPercent: 115 });
        introName.style.visibility = "visible";
    }

    var introIn = gsap.timeline()
        .to(introChars, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.035 })
        .from(".intro-bar span", { scaleX: 0, duration: 1.1, ease: "power2.inOut" }, 0.1);

    /* ------------------------------------------------------------------
     * hero entrance, prepared now (so nothing flashes when the curtain
     * lifts) and played by the intro
     * ------------------------------------------------------------------ */

    var hero = document.getElementById("hero");
    var greeting = hero.querySelector("[data-i18n='hero.greeting']");
    var greetingWords = greeting ? splitWords(greeting) : [];
    var chips = all(".hero-chip .chip-body", hero);

    var heroIn = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1.1 } })
        .from("header #logo, #mainmenu > li, #lang-switch, #menu-btn", guard({
            y: -24, autoAlpha: 0, stagger: 0.05, duration: 0.8, clearProps: "transform,opacity,visibility"
        }), 0)
        .from(greetingWords, { yPercent: 115, stagger: 0.06 }, 0.05)
        .from(".typed-title", { x: -30, autoAlpha: 0, duration: 0.9 }, 0.45)
        .from("#hero [data-i18n='hero.intro']", { y: 30, autoAlpha: 0 }, 0.55)
        .from("#hero .list_location li", { y: 30, autoAlpha: 0, stagger: 0.1 }, 0.65)
        .from(".hero-cta .btn-main", guard({
            scale: 0.6, autoAlpha: 0, ease: "back.out(2)", duration: 0.8, clearProps: "transform"
        }), 0.85)
        .from(".hero-blob", { scale: 0.2, rotate: -60, autoAlpha: 0, duration: 1.6 }, 0.1)
        .from(".hero-visual > img", {
            clipPath: "inset(100% 0% 0% 0%)", yPercent: 8, scale: 1.06, duration: 1.4
        }, 0.15)
        .from(".hero-ring", { scale: 0.85, autoAlpha: 0, duration: 1.2 }, 0.5)
        .from(chips, {
            scale: 0, autoAlpha: 0, ease: "back.out(2.2)", duration: 0.8,
            stagger: { each: 0.12, from: "random" }
        }, 0.9)
        .from(".float-text", { x: -40, autoAlpha: 0, duration: 0.9 }, 0.9)
        .from(".mouse-icon-click", { y: -20, autoAlpha: 0, duration: 0.8 }, 1.2)
        .add(startHeroLoops, 1.5);

    var curtainDone = false;

    function liftCurtain() {
        if (curtainDone) return;
        curtainDone = true;
        // designesia.js queues $('#preloader').delay(200).fadeOut(300) on the
        // same load event; this runs after it and cancels it in favour of the
        // curtain.
        if ($) $(preloader).stop(true).css({ display: "flex", opacity: 1 });

        var wait = Math.max(0, introIn.duration() - introIn.time());
        gsap.timeline({
            delay: wait + 0.15,
            onComplete: function () {
                preloader.style.display = "none";
                ScrollTrigger.refresh();
            }
        })
            .to(introChars, { yPercent: -115, duration: 0.55, ease: "power3.in", stagger: 0.018 })
            .to(".intro-bar", { scaleX: 0, transformOrigin: "right center", duration: 0.45, ease: "power3.in" }, 0)
            .to(preloader, { yPercent: -100, duration: 1, ease: "expo.inOut" }, 0.35)
            .call(function () { heroIn.play(); }, null, 0.85);
    }

    function onLoad() {
        setTimeout(liftCurtain, 0);
    }

    if (preloader) {
        if (document.readyState === "complete") onLoad();
        else window.addEventListener("load", onLoad);
        // Should anything throw on the way, never leave the page covered.
        setTimeout(function () {
            if (!curtainDone) {
                curtainDone = true;
                preloader.style.display = "none";
                heroIn.progress(1);
            }
        }, 9000);
    } else {
        heroIn.play();
    }

    /* ------------------------------------------------------------------
     * hero scene: idle loops, new followers, parallax
     * ------------------------------------------------------------------ */

    var followBox = hero.querySelector(".hero-follows");
    var followColors = ["#CB7C6F", "#e8a598", "#b8604f", "#f3b8a8"];
    var followTimer = null;
    var heroVisible = true;

    function spawnFollower(burst) {
        if (!followBox) return;
        var h = document.createElement("i");
        h.className = "fa fa-user-plus hero-follow";
        h.style.color = gsap.utils.random(followColors);
        followBox.appendChild(h);
        var rise = gsap.utils.random(140, 230) * (burst ? 1.2 : 1);
        var drift = gsap.utils.random(-45, 45);
        gsap.timeline({ onComplete: function () { h.remove(); } })
            .fromTo(h, { scale: 0.2, autoAlpha: 1 },
                { scale: gsap.utils.random(0.7, 1.35), duration: 0.5, ease: "back.out(3)" }, 0)
            .to(h, { y: -rise, duration: gsap.utils.random(2, 2.8), ease: "sine.out" }, 0)
            .to(h, { x: drift, rotate: drift / 2, duration: 0.7, ease: "sine.inOut", repeat: 3, yoyo: true }, 0)
            .to(h, { autoAlpha: 0, duration: 0.7 }, "-=1.2");
    }

    function followLoop() {
        if (heroVisible && !document.hidden) spawnFollower(false);
        followTimer = gsap.delayedCall(gsap.utils.random(0.9, 1.8), followLoop);
    }

    function startHeroLoops() {
        all(".hero-chip .chip-float", hero).forEach(function (el, i) {
            gsap.to(el, {
                y: i % 2 ? 10 : -10,
                rotate: i % 2 ? -2 : 2,
                duration: gsap.utils.random(2.4, 3.4),
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.2
            });
        });
        if (!followTimer) followLoop();
    }

    var followChip = hero.querySelector(".chip-follow");
    if (followChip) {
        followChip.addEventListener("click", function () {
            gsap.fromTo(followChip.querySelector(".chip-body"), { scale: 0.8, rotate: -20 },
                { scale: 1, rotate: 0, duration: 0.7, ease: "elastic.out(1.2, 0.4)" });
            for (var i = 0; i < 7; i++) gsap.delayedCall(i * 0.06, spawnFollower, [true]);
        });
    }

    ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        onToggle: function (self) { heroVisible = self.isActive; }
    });

    // Scroll: the copy drifts up and fades as the portrait sinks back. Only
    // side by side - on a phone the portrait sits under the copy, so fading
    // the copy would dim it (and the CV button) while it is still being read.
    gsap.matchMedia().add("(min-width: 768px)", function () {
        gsap.to("#hero .col-md-5", {
            yPercent: -12, autoAlpha: 0.2, ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
        });
    });
    gsap.to(".hero-visual", {
        yPercent: 10, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
    });

    // Pointer: each chip sits at its own depth.
    if (finePointer) {
        var layers = all(".hero-chip, .hero-ring, .hero-blob", hero).map(function (el) {
            var depth = parseFloat(el.getAttribute("data-depth")) || 0.4;
            return {
                depth: depth,
                x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
                y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" })
            };
        });
        hero.addEventListener("mousemove", function (e) {
            var nx = e.clientX / window.innerWidth - 0.5;
            var ny = e.clientY / window.innerHeight - 0.5;
            layers.forEach(function (l) {
                l.x(nx * 60 * l.depth);
                l.y(ny * 60 * l.depth);
            });
        });
        hero.addEventListener("mouseleave", function () {
            layers.forEach(function (l) { l.x(0); l.y(0); });
        });
    }

    /* ------------------------------------------------------------------
     * section headings: words rise out of a mask, the rule draws out
     * ------------------------------------------------------------------ */

    all("section:not(#hero) h2, #video-trigger-area h3").forEach(function (h) {
        var words = splitWords(h);
        var tl = gsap.timeline({ scrollTrigger: { trigger: h, start: "top 88%", once: true } })
            .from(words, { yPercent: 115, duration: 1, ease: "expo.out", stagger: 0.07 });
        var rule = h.nextElementSibling;
        if (rule && rule.classList.contains("space-border")) {
            tl.from(rule, { scaleX: 0, duration: 1, ease: "expo.inOut" }, 0.15);
        }
    });

    /* ------------------------------------------------------------------
     * services
     * ------------------------------------------------------------------ */

    var serviceCols = all("#section-services .row.g-0 > div");
    reveal(serviceCols, { y: 70, autoAlpha: 0, stagger: 0.15, duration: 1.1, ease: "expo.out" });
    reveal(all("#section-services .de_3d-box i"), {
        scale: 0, rotate: -40, ease: "back.out(2.5)", duration: 0.8, stagger: 0.15, delay: 0.35,
        clearProps: "transform"
    }, serviceCols[0]);

    all("#section-services .de_3d-box").forEach(function (box) {
        box.addEventListener("mousemove", function (e) {
            var r = box.getBoundingClientRect();
            box.style.setProperty("--mx", (e.clientX - r.left) + "px");
            box.style.setProperty("--my", (e.clientY - r.top) + "px");
        });
    });

    /* ------------------------------------------------------------------
     * video teaser
     * ------------------------------------------------------------------ */

    reveal(all("#video-trigger-area > p, #video-trigger-area > a"), {
        y: 30, autoAlpha: 0, stagger: 0.15, clearProps: "transform"
    }, "#video-trigger-area");

    /* ------------------------------------------------------------------
     * portfolio: each card wipes open while its image settles
     * ------------------------------------------------------------------ */

    var portfolio = document.querySelector("#section-portfolio #gallery");
    reveal("#section-portfolio [data-i18n='portfolio.intro']", { y: 20, autoAlpha: 0 });

    if (portfolio) {
        var cards = all(".card-image-1", portfolio);
        gsap.set(cards, { clipPath: "inset(100% 0% 0% 0% round 8px)" });
        gsap.set(all("img", portfolio), { scale: 1.35 });
        gsap.set(all(".d-text", portfolio), { autoAlpha: 0, y: 20 });

        ScrollTrigger.batch(cards, {
            start: "top 90%",
            once: true,
            onEnter: function (batch) {
                gsap.timeline()
                    .to(batch, guard({
                        clipPath: "inset(0% 0% 0% 0% round 8px)", duration: 1.3, ease: "power2.inOut", stagger: 0.12,
                        clearProps: "clipPath"
                    }))
                    .to(batch.map(function (c) { return c.querySelector("img"); }), guard({
                        scale: 1, duration: 1.6, ease: "expo.out", stagger: 0.12, clearProps: "transform"
                    }), 0.1)
                    .to(batch.map(function (c) { return c.querySelector(".d-text"); }), guard({
                        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, clearProps: "transform"
                    }), 0.6);
            }
        });

        // Isotope settles the masonry after the images load, and the phone
        // "show more" uncrops it; either way the trigger positions move.
        var refreshSoon = gsap.delayedCall(0.2, function () { ScrollTrigger.refresh(); }).pause();
        if ($) $(portfolio).on("layoutComplete", function () { refreshSoon.restart(true); });
        var more = document.getElementById("gallery-more-btn");
        if (more) more.addEventListener("click", function () { refreshSoon.restart(true); });
    }

    /* ------------------------------------------------------------------
     * résumé: the timeline fills as it scrolls past
     * ------------------------------------------------------------------ */

    all("#section-resume .s_border").forEach(function (h) {
        reveal(h, { x: -30, autoAlpha: 0 });
    });

    all("#section-resume .d_timeline-item").forEach(function (item) {
        var tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 85%", once: true } });
        tl.from(item.querySelector(".d_timeline-title"), { x: -40, autoAlpha: 0, ease: "expo.out" })
            .from(all("img", item), { y: 24, scale: 0.92, autoAlpha: 0, ease: "expo.out" }, 0.15)
            .from(item.querySelector(".d_timeline-text"), { y: 30, autoAlpha: 0 }, 0.25);
    });

    all("#section-resume .d_timeline").forEach(function (list) {
        var items = all(".d_timeline-item", list);
        if (items.length < 2) return;
        var last = items[items.length - 1];
        var line = document.createElement("span");
        line.className = "tl-progress";
        list.insertBefore(line, list.firstChild);

        function size() { line.style.height = last.offsetTop + "px"; }
        size();
        ScrollTrigger.addEventListener("refreshInit", size);

        gsap.to(line, {
            scaleY: 1, ease: "none",
            scrollTrigger: {
                trigger: list, start: "top 65%",
                endTrigger: last, end: "top 65%",
                scrub: 0.6
            }
        });
    });

    /* ------------------------------------------------------------------
     * about
     * ------------------------------------------------------------------ */

    var aboutImg = document.querySelector("#section-about .about-photo img");
    if (aboutImg) {
        gsap.timeline({ scrollTrigger: { trigger: aboutImg, start: "top 80%", once: true } })
            .from(aboutImg.parentNode, { clipPath: "inset(0% 100% 0% 0%)", duration: 1.4, ease: "expo.inOut" })
            .from(aboutImg, { scale: 1.3, duration: 1.8, ease: "expo.out" }, 0.2);
        gsap.fromTo(aboutImg, { yPercent: -4 }, {
            yPercent: 4, ease: "none",
            scrollTrigger: { trigger: aboutImg.parentNode, start: "top bottom", end: "bottom top", scrub: true }
        });
    }
    reveal("#section-about [data-i18n='about.text']", { y: 30, autoAlpha: 0 });
    reveal(all("#section-about .d-skills-bar .item"), {
        y: 40, scale: 0.7, autoAlpha: 0, ease: "back.out(1.8)", duration: 0.8,
        stagger: { each: 0.07, grid: "auto", from: "start" }
    }, "#section-about .d-skills-bar", "top 88%");

    /* ------------------------------------------------------------------
     * marquee: steady drift, pushed along by scroll speed
     * ------------------------------------------------------------------ */

    marquees.forEach(function (m) {
        var dir = m.el.classList.contains("marquee--outline") ? -1 : 1;
        var loop = gsap.to(m.groups, { xPercent: -100, duration: 38, ease: "none", repeat: -1 });
        // Start deep into the repeat so the loop can also run backwards.
        loop.totalTime(loop.duration() * 50);
        loop.timeScale(dir);
        m.loop = loop;
        m.dir = dir;
    });

    if (marquees.length) {
        ScrollTrigger.create({
            trigger: "#section-marquee",
            start: "top bottom",
            end: "bottom top",
            onUpdate: function (self) {
                var boost = gsap.utils.clamp(-6, 6, self.getVelocity() / 250);
                marquees.forEach(function (m) {
                    var speed = m.dir * (1 + Math.abs(boost)) * (self.direction || 1);
                    gsap.to(m.loop, { timeScale: speed, duration: 0.2, overwrite: true });
                    gsap.to(m.loop, { timeScale: m.dir * (self.direction || 1), duration: 1.2, delay: 0.25 });
                });
            }
        });
        reveal("#section-marquee .marquee--solid", { xPercent: -30, autoAlpha: 0, duration: 1.4, ease: "expo.out" },
            "#section-marquee", "top 90%");
        reveal("#section-marquee .marquee--outline", { xPercent: 30, autoAlpha: 0, duration: 1.4, ease: "expo.out" },
            "#section-marquee", "top 90%");
    }

    /* ------------------------------------------------------------------
     * contact
     * ------------------------------------------------------------------ */

    reveal(all("#section-contact .col-md-4"), {
        y: 50, autoAlpha: 0, stagger: 0.15, duration: 1.1, ease: "expo.out"
    }, "#section-contact .row.text-center");

    /* ------------------------------------------------------------------
     * scroll progress
     * ------------------------------------------------------------------ */

    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    gsap.to(bar, {
        scaleX: 1, ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 }
    });

    /* ------------------------------------------------------------------
     * pointer: cursor ring and magnetic buttons (mouse only)
     * ------------------------------------------------------------------ */

    if (finePointer) {
        var ring = document.createElement("div");
        ring.className = "cursor-ring";
        ring.setAttribute("aria-hidden", "true");
        ring.innerHTML = '<i class="fa fa-instagram"></i>';
        document.body.appendChild(ring);

        var ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
        var ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

        window.addEventListener("mousemove", function (e) {
            ringX(e.clientX);
            ringY(e.clientY);
            ring.classList.add("is-visible");
        });
        document.addEventListener("mouseleave", function () { ring.classList.remove("is-visible"); });
        document.addEventListener("mousedown", function () { ring.classList.add("is-down"); });
        document.addEventListener("mouseup", function () { ring.classList.remove("is-down"); });
        document.addEventListener("mouseover", function (e) {
            var t = e.target;
            var onCard = t.closest && t.closest("#section-portfolio .item");
            ring.classList.toggle("is-view", !!onCard);
            ring.classList.toggle("is-hover", !onCard && !!(t.closest &&
                t.closest("a, button, .chip-follow, .lang-btn, #menu-btn, .d-skills-bar .item")));
        });

        all(".hero-cta .btn-main, #playVideoLink, #gallery-more-btn").forEach(function (btn) {
            var mx = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power3.out" });
            var my = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power3.out" });
            btn.addEventListener("mousemove", function (e) {
                var r = btn.getBoundingClientRect();
                mx((e.clientX - r.left - r.width / 2) * 0.35);
                my((e.clientY - r.top - r.height / 2) * 0.45);
            });
            btn.addEventListener("mouseleave", function () {
                gsap.to(btn, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.35)", overwrite: true });
            });
        });
    }

    /* ------------------------------------------------------------------
     * language change: new copy means new heights
     * ------------------------------------------------------------------ */

    document.addEventListener("languagechange", function () {
        gsap.delayedCall(0.1, function () { ScrollTrigger.refresh(); });
    });

    /* ------------------------------------------------------------------
     * marquee builder (shared by the static fallback above)
     * ------------------------------------------------------------------ */

    function buildMarquee(el) {
        var track = el.querySelector(".marquee-track");
        var first = track.querySelector(".marquee-group");
        // Enough copies to cover the widest screens while one scrolls out.
        // The copies keep their data-i18n keys so i18n.js retranslates them.
        for (var i = 0; i < 2; i++) {
            var copy = first.cloneNode(true);
            copy.setAttribute("aria-hidden", "true");
            track.appendChild(copy);
        }
        return { el: el, groups: all(".marquee-group", track) };
    }
})();
