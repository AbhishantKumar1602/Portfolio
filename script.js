/* CURSOR */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
document.body.style.cursor = "none";
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 4 + "px";
  cursor.style.top = my - 4 + "px";
});
(function animRing() {
  rx += (mx - rx - 16) * 0.15;
  ry += (my - ry - 16) * 0.15;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
})();
document
  .querySelectorAll(
    "a,button,.project-card,.fraud-item,.stack-item,.test-type-card,.agile-card,.qa-skill-row,.live-card,.timeline-item",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(2)";
      ring.style.transform = "scale(1.5)";
      ring.style.borderColor = "var(--green)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      ring.style.transform = "scale(1)";
      ring.style.borderColor = "var(--cyan)";
    });
  });

/* SCROLL REVEAL + SKILL BARS */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add("visible");
          e.target.querySelectorAll(".qa-skill-fill").forEach((bar) => {
            const w = bar.getAttribute("data-width");
            if (w) bar.style.width = w + "%";
          });
        }, i * 60);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* GLITCH HERO */
const heroName = document.querySelector(".hero-name .glitch");
if (heroName) {
  let gt;
  heroName.addEventListener("mouseenter", () => {
    gt = setInterval(() => {
      heroName.style.textShadow = `${Math.random() * 6 - 3}px 0 #ff2d55,${Math.random() * 6 - 3}px 0 #00fff5`;
      setTimeout(() => (heroName.style.textShadow = "none"), 100);
    }, 200);
  });
  heroName.addEventListener("mouseleave", () => {
    clearInterval(gt);
    heroName.style.textShadow = "none";
  });
}

/* ── THEME TOGGLE ─────────────────────────────────────────────────────────── */
(function () {
  const btn = document.getElementById("themeToggle");
  const icon = btn.querySelector(".t-icon");
  const root = document.documentElement;

  // restore saved preference
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    root.classList.add("light");
    icon.textContent = "☀️";
  }

  btn.addEventListener("click", () => {
    // spin animation
    btn.classList.add("spinning");
    setTimeout(() => btn.classList.remove("spinning"), 500);

    const isLight = root.classList.toggle("light");
    icon.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
})();

/* RESUME BUTTON — downloads PDF directly */
// Download is handled via the href + download attributes on the anchor tag
