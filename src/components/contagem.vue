<template>
  <section class="impact" ref="root" aria-label="Impacto do escritório">
    <!-- BG -->
    <div class="bg" aria-hidden="true">
      <div class="bg__base"></div>
      <div class="bg__grid"></div>
      <div class="bg__glow bg__glow--a"></div>
      <div class="bg__glow bg__glow--b"></div>
      <div class="bg__noise"></div>
    </div>

    <v-container class="wrap">
      <div class="card" data-anim="card">
        <!-- Canvas confetti (só existe aqui, sem fixed global) -->
        <canvas ref="confettiCanvas" class="confetti" aria-hidden="true"></canvas>

        <div class="kicker" data-anim="kicker">
          <span class="dot" aria-hidden="true"></span>
          Impacto real
          <span class="sep" aria-hidden="true"></span>
          <span class="mini">Resultados • Confiança • Clareza</span>
        </div>

        <h2 class="title" data-anim="t1">
          Transformamos mais de
        </h2>

        <div class="countRow" data-anim="count">
          <span class="count" aria-label="Quantidade de vidas impactadas">
            {{ formattedCount }}
          </span>

          <span class="badge" aria-hidden="true">
            +{{ plusLabel }}
          </span>
        </div>

        <h2 class="title" data-anim="t2">
          vidas com resultados incríveis.
        </h2>

        <p class="sub" data-anim="sub">
          Atendimento estratégico, postura profissional e acompanhamento do início ao fim.
          <span class="muted">Sem promessas irreais — só execução.</span>
        </p>

        <div class="meta" data-anim="meta" aria-label="Diferenciais rápidos">
          <span class="pill"><v-icon icon="mdi-shield-check-outline" /> Sigilo</span>
          <span class="pill"><v-icon icon="mdi-lightning-bolt-outline" /> Agilidade</span>
          <span class="pill"><v-icon icon="mdi-account-tie-outline" /> Estratégia</span>
          <span class="pill ghost"><v-icon icon="mdi-check-decagram-outline" /> Atendimento premium</span>
        </div>

        <div class="ctaRow" data-anim="cta">
          <button class="btn primary" type="button" @click="replay()">
            Ver animação
            <span class="chev" aria-hidden="true"></span>
            <span class="shine" aria-hidden="true"></span>
          </button>

          <button class="btn ghost" type="button" @click="$emit?.('scrollTo', '#contatos')">
            Falar agora
            <v-icon icon="mdi-whatsapp" class="ml-2" />
            <span class="shine" aria-hidden="true"></span>
          </button>
        </div>

        <p class="note" data-anim="note">
          *Número ilustrativo para comunicação institucional. Ajuste o valor final conforme seus dados reais.
        </p>

        <span class="borderGlow" aria-hidden="true"></span>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// confetti (lazy)
let confettiMod = null;

const root = ref(null);
const confettiCanvas = ref(null);

// ===== Config =====
const endValue = 500;          // valor final
const duration = 3500;          // duração do count
const replayOnClick = true;     // replay manual no botão
const runOnceOnView = true;     // roda 1x quando entra na viewport

// ===== State =====
const count = ref(0);
const hasRun = ref(false);
let rafId = null;
let startTs = 0;
let observer = null;

// ===== Helpers =====
function prefersReduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

// easing suave (melhor que linear)
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// formatação BR: 5.000
const formattedCount = computed(() => {
  const v = Math.floor(count.value);
  return new Intl.NumberFormat("pt-BR").format(v);
});

// label pequeno “+”
const plusLabel = computed(() => (endValue >= 1000 ? "0" : ""));

// ===== Confetti =====
async function fireConfetti() {
  if (prefersReduce()) return;

  // lazy import
  if (!confettiMod) {
    try {
      confettiMod = await import("canvas-confetti");
    } catch {
      return;
    }
  }

  const canvas = confettiCanvas.value;
  if (!canvas) return;

  // cria instância por canvas (melhor controle)
  const make = confettiMod.default.create(canvas, { resize: true, useWorker: true });

  // burst duplo (fica “premium”, não infantil)
  make({
    particleCount: 70,
    spread: 70,
    startVelocity: 35,
    scalar: 0.9,
    origin: { y: 0.55 }
  });

  setTimeout(() => {
    make({
      particleCount: 45,
      spread: 55,
      startVelocity: 28,
      scalar: 0.85,
      origin: { y: 0.52 }
    });
  }, 140);
}

// ===== Count animation =====
function stop() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  startTs = 0;
}

function animate(ts) {
  if (!startTs) startTs = ts;

  const p = clamp01((ts - startTs) / duration);
  const eased = easeOutCubic(p);
  const current = Math.round(eased * endValue);

  // atualiza só se mudou (evita render desnecessário)
  if (current !== count.value) count.value = current;

  if (p < 1) {
    rafId = requestAnimationFrame(animate);
  } else {
    count.value = endValue;
    stop();
    fireConfetti();
    pulseCountOnce();
  }
}

function start() {
  stop();
  count.value = 0;
  rafId = requestAnimationFrame(animate);
}

function replay() {
  if (!replayOnClick) return;
  start();
}

// micro punch no número ao completar
function pulseCountOnce() {
  if (prefersReduce() || !root.value) return;
  const el = root.value.querySelector(".count");
  if (!el) return;

  gsap.fromTo(
    el,
    { scale: 1, filter: "drop-shadow(0 0 0 rgba(200,163,69,0))" },
    { scale: 1.05, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out",
      filter: "drop-shadow(0 14px 34px rgba(200,163,69,0.22))"
    }
  );
}

// ===== Entry animations (GSAP) =====
let mm;

function setupAnimations() {
  if (!root.value || prefersReduce()) return;

  const s = root.value;
  const els = [
    s.querySelector('[data-anim="card"]'),
    s.querySelector('[data-anim="kicker"]'),
    s.querySelector('[data-anim="t1"]'),
    s.querySelector('[data-anim="count"]'),
    s.querySelector('[data-anim="t2"]'),
    s.querySelector('[data-anim="sub"]'),
    s.querySelector('[data-anim="meta"]'),
    s.querySelector('[data-anim="cta"]'),
    s.querySelector('[data-anim="note"]')
  ].filter(Boolean);

  gsap.set(els, { autoAlpha: 0, y: 14, filter: "blur(10px)" });

  mm = gsap.matchMedia();
  mm.add("(min-width: 0px)", () => {
    gsap.timeline({
      scrollTrigger: { trigger: s, start: "top 80%", once: true },
      defaults: { ease: "power2.out" }
    })
      .to(els[0], { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, 0)
      .to(els.slice(1), { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.06 }, 0.10);

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  });
}

// ===== Observer =====
function setupObserver() {
  if (!root.value) return;

  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;

      // quando entra
      if (entry.isIntersecting) {
        if (runOnceOnView && hasRun.value) return;
        hasRun.value = true;
        start();
      }
    },
    { threshold: 0.45 }
  );

  observer.observe(root.value);
}

onMounted(async () => {
  await nextTick();
  setupAnimations();
  setupObserver();
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
  mm?.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());
  stop();
});
</script>

<style scoped>
.impact {
  position: relative;
  padding: 86px 0;
  overflow: hidden;

  --gold: #c8a345;
  --line: rgba(255,255,255,0.14);
  --glass: rgba(255,255,255,0.06);
  --txt: rgba(255,255,255,0.92);
  --muted: rgba(255,255,255,0.72);
}

/* BG */
.bg { position: absolute; inset: 0; z-index: 0; }
.bg__base { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(2,6,23,0.92), rgba(2,6,23,0.78)); }
.bg__grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
  background-size: 72px 72px;
  opacity: 0.16;
  mask-image: radial-gradient(900px 420px at 25% 0%, black, transparent 70%);
}
.bg__glow { position: absolute; width: 760px; height: 760px; filter: blur(18px); opacity: 0.9; }
.bg__glow--a { left: -340px; top: -380px; background: radial-gradient(circle at 30% 30%, rgba(200,163,69,0.22), transparent 58%); }
.bg__glow--b { right: -380px; bottom: -420px; background: radial-gradient(circle at 60% 60%, rgba(200,163,69,0.14), transparent 60%); opacity: 0.75; }
.bg__noise {
  position: absolute; inset: 0;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

/* layout */
.wrap { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 18px; }

/* card */
.card {
  position: relative;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.06);
  border-radius: 26px;
  padding: 22px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 26px 90px rgba(2,6,23,0.35);
  overflow: hidden;
  text-align: center;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(760px 240px at 50% 0%, rgba(200,163,69,.16), transparent 60%);
  pointer-events: none;
}

.borderGlow {
  position: absolute;
  inset: -2px;
  border-radius: 28px;
  background: radial-gradient(circle at 50% 0%, rgba(200,163,69,0.22), transparent 55%);
  filter: blur(14px);
  opacity: 0.9;
  pointer-events: none;
}

/* confetti */
.confetti {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.95;
}

/* kicker */
.kicker {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.18);
  font-weight: 950;
  letter-spacing: .22em;
  text-transform: uppercase;
  font-size: 12px;
  color: rgba(255,255,255,0.78);
  margin-bottom: 12px;
}
.dot {
  width: 8px; height: 8px;
  border-radius: 99px;
  background: var(--gold);
  box-shadow: 0 0 0 6px rgba(200,163,69,.10);
}
.sep { width: 1px; height: 16px; background: rgba(255,255,255,0.16); }
.mini { letter-spacing: 0.12em; color: rgba(255,255,255,0.70); }

/* titles */
.title {
  position: relative;
  z-index: 1;
  margin: 8px 0;
  font-size: clamp(20px, 2.4vw, 34px);
  font-weight: 950;
  letter-spacing: -0.6px;
  color: rgba(255,255,255,0.92);
}

/* count */
.countRow {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  margin: 10px 0 8px;
}

.count {
  font-size: clamp(40px, 5.2vw, 72px);
  font-weight: 1000;
  letter-spacing: -1px;
  color: rgba(255,255,255,0.96);
  background: linear-gradient(90deg, rgba(200,163,69,0.98), rgba(255,255,255,0.92));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 18px 46px rgba(200,163,69,0.18));
}

.badge {
  font-size: 12px;
  font-weight: 950;
  color: rgba(255,255,255,0.90);
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.18);
}

/* subtitle */
.sub {
  position: relative;
  z-index: 1;
  margin: 10px auto 0;
  max-width: 78ch;
  color: rgba(255,255,255,0.80);
  line-height: 1.7;
  font-size: 14px;
}
.muted { color: rgba(255,255,255,0.68); }

/* pills */
.meta {
  position: relative;
  z-index: 1;
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  font-weight: 950;
  font-size: 12px;
  color: rgba(255,255,255,0.88);
}
.pill.ghost { background: rgba(0,0,0,0.18); }

/* CTA */
.ctaRow {
  position: relative;
  z-index: 1;
  margin-top: 18px;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.btn {
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 16px;
  padding: 12px 14px;
  cursor: pointer;
  font-weight: 950;
  letter-spacing: .2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  background: rgba(255,255,255,0.06);
  color: #fff;
  transition: transform .2s ease, border-color .2s ease, background .2s ease;
}
.btn:hover { transform: translateY(-1px); }
.btn.primary {
  background: linear-gradient(90deg, rgba(200,163,69,0.95), rgba(200,163,69,0.72));
  color: #0b1220;
  border-color: rgba(200,163,69,0.55);
}
.btn.ghost { background: rgba(255,255,255,0.06); }

.shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
  transform: translateX(-140%);
  transition: transform .7s ease;
  pointer-events: none;
}
.btn:hover .shine { transform: translateX(140%); }

.chev {
  width: 10px; height: 10px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(-45deg);
}

/* note */
.note {
  position: relative;
  z-index: 1;
  margin: 14px 0 0;
  font-size: 12px;
  color: rgba(255,255,255,0.64);
}

/* responsive */
@media (max-width: 560px) {
  .card { padding: 16px; border-radius: 22px; }
  .kicker { font-size: 11px; letter-spacing: .18em; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .btn { transition: none !important; }
}
</style>
