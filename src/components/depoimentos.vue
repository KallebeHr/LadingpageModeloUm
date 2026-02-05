<template>
  <section class="testimonials" id="depoimentos" ref="root" aria-label="Depoimentos de clientes">
    <!-- BG premium -->
    <div class="bg" aria-hidden="true">
      <div class="bg__base"></div>
      <div class="bg__grid"></div>
      <div class="bg__glow bg__glow--a"></div>
      <div class="bg__glow bg__glow--b"></div>
      <div class="bg__noise"></div>
    </div>

    <div class="wrap">
      <!-- Header -->
      <header class="head">
        <div class="head__left">
          <p class="kicker" data-anim="kicker">
            <span class="dot" aria-hidden="true"></span>
            Escritório bem avaliado
          </p>

          <h2 class="title" data-anim="title">
            Depoimentos reais, reputação sólida.
            <span class="title__line" aria-hidden="true"></span>
          </h2>

          <p class="subtitle" data-anim="subtitle">
            Uma amostra do padrão de atendimento: clareza, postura e foco no que resolve.
            <span class="muted">Sem exageros, só consistência.</span>
          </p>

          <div class="metaRow" data-anim="meta">
            <span class="pill">
              <v-icon icon="mdi-google" />
              Google Reviews
            </span>
            <span class="pill ghost">
              <v-icon icon="mdi-star" />
              4.9 (média)
            </span>
            <span class="pill ghost">
              <v-icon icon="mdi-shield-check-outline" />
              Atendimento com sigilo
            </span>
          </div>
        </div>

        <div class="head__right" data-anim="social">
          <p class="socialTitle">Redes</p>
          <div class="socialChips" aria-label="Links de redes sociais">
            <a class="chipLink" href="#" @click.prevent>
              <v-icon icon="mdi-instagram" />
              Instagram
            </a>
            <a class="chipLink" href="#" @click.prevent>
              <v-icon icon="mdi-linkedin" />
              LinkedIn
            </a>
            <a class="chipLink" href="#" @click.prevent>
              <v-icon icon="mdi-facebook" />
              Facebook
            </a>
          </div>
        </div>
      </header>

      <!-- Swiper -->
      <div class="carousel" data-anim="carousel" aria-label="Carrossel de depoimentos">
        <swiper
          :slidesPerView="1"
          :spaceBetween="16"
          :navigation="true"
          :pagination="{ clickable: true }"
          :modules="modules"
          :breakpoints="{
            768: { slidesPerView: 2, spaceBetween: 18 },
            1024: { slidesPerView: 3, spaceBetween: 20 }
          }"
          class="mySwiper"
        >
          <swiper-slide v-for="(t, i) in depoimentos" :key="i">
            <article class="card" data-anim="card">
              <div class="cardTop">
                <div class="avatar" aria-hidden="true">
                  <v-icon icon="mdi-account" />
                  <span class="avatar__ring"></span>
                </div>

                <div class="who">
                  <h3 class="name">{{ t.nome }}</h3>
                  <p class="role">{{ t.cargo }}</p>
                </div>

                <div class="badge" :title="t.fonte" aria-label="Fonte do depoimento">
                  <v-icon :icon="t.fonteIcon" />
                </div>
              </div>

              <p class="quote">
                <span class="qMark" aria-hidden="true">“</span>
                {{ t.texto }}
                <span class="qMark" aria-hidden="true">”</span>
              </p>

              <div class="cardBottom">
                <div class="stars" :aria-label="`Avaliação ${t.stars} de 5`">
                  <v-icon
                    v-for="n in 5"
                    :key="n"
                    :icon="n <= t.stars ? 'mdi-star' : 'mdi-star-outline'"
                    class="star"
                  />
                </div>

                <div class="dateRow">
                  <v-icon icon="mdi-calendar-month-outline" />
                  <span>{{ t.data }}</span>
                </div>
              </div>

              <span class="shine" aria-hidden="true"></span>
            </article>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Footer note -->
      <footer class="foot" data-anim="foot">
        <p class="footTxt">
          Quer ver como ficaria com o <strong>seu caso</strong>? A gente faz uma orientação inicial
          <span class="gold">sem compromisso</span>.
        </p>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

// Swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const modules = [Pagination, Navigation];

// GSAP
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const root = ref(null);

const depoimentos = [
  {
    nome: "Ana M.",
    cargo: "Cliente • Direito Civil",
    texto: "Atendimento muito claro e objetivo. Explicaram o caminho com transparência e foram firmes na condução.",
    stars: 5,
    data: "Jan/2026",
    fonte: "Google Reviews",
    fonteIcon: "mdi-google"
  },
  {
    nome: "Carlos R.",
    cargo: "Cliente • Trabalhista",
    texto: "Resolveram meu caso com agilidade e sem enrolação. Comunicação excelente do início ao fim.",
    stars: 5,
    data: "Dez/2025",
    fonte: "Google Reviews",
    fonteIcon: "mdi-google"
  },
  {
    nome: "Mariana S.",
    cargo: "Cliente • Empresarial",
    texto: "Postura profissional e orientação estratégica. Me senti seguro em cada etapa.",
    stars: 5,
    data: "Nov/2025",
    fonte: "LinkedIn",
    fonteIcon: "mdi-linkedin"
  },
  {
    nome: "Felipe G.",
    cargo: "Cliente • Penal",
    texto: "Atendimento firme, respeitoso e organizado. Passaram segurança sem promessas irreais.",
    stars: 4,
    data: "Out/2025",
    fonte: "Facebook",
    fonteIcon: "mdi-facebook"
  },
  {
    nome: "Juliana P.",
    cargo: "Cliente • Tributário",
    texto: "Objetividade e estratégia. Fizeram o diagnóstico e já direcionaram as melhores opções.",
    stars: 5,
    data: "Set/2025",
    fonte: "Google Reviews",
    fonteIcon: "mdi-google"
  }
];

function prefersReduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let mm;

onMounted(async () => {
  await nextTick();
  if (!root.value || prefersReduce()) return;

  const s = root.value;

  const group1 = [
    s.querySelector('[data-anim="kicker"]'),
    s.querySelector('[data-anim="title"]'),
    s.querySelector('[data-anim="subtitle"]'),
    s.querySelector('[data-anim="meta"]'),
    s.querySelector('[data-anim="social"]')
  ].filter(Boolean);

  const carousel = s.querySelector('[data-anim="carousel"]');
  const foot = s.querySelector('[data-anim="foot"]');

  gsap.set([...group1, carousel, foot], { autoAlpha: 0, y: 14, filter: "blur(10px)" });

  mm = gsap.matchMedia();
  mm.add("(min-width: 0px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: s, start: "top 80%", once: true },
      defaults: { ease: "power2.out" }
    });

    tl.to(group1, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.07 }, 0)
      .to(carousel, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.22)
      .to(foot, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, 0.36);

    // anima cards (stagger leve)
    const cards = s.querySelectorAll(".mySwiper .card");
    gsap.set(cards, { autoAlpha: 0, y: 10, filter: "blur(8px)" });
    tl.to(cards, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.06 }, 0.30);

    // hover micro (sutil)
    cards.forEach((card) => {
      const enter = () => gsap.to(card, { y: -3, duration: 0.18, ease: "power2.out" });
      const leave = () => gsap.to(card, { y: 0, duration: 0.18, ease: "power2.out" });
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);

      // cleanup
      card._gsapCleanup = () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      cards.forEach((c) => c._gsapCleanup?.());
    };
  });
});

onUnmounted(() => {
  mm?.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<style scoped>
.testimonials {
  position: relative;
  padding: 86px 0 78px;
  overflow: hidden;

  --gold: #c8a345;
  --line: rgba(255,255,255,0.14);
  --glass: rgba(255,255,255,0.06);
  --txt: rgba(255,255,255,0.92);
  --muted: rgba(255,255,255,0.72);
}

/* BG premium */
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

/* wrap */
.wrap {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 18px;
  color: #fff;
}

/* header */
.head {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 16px;
  align-items: start;
  margin-bottom: 18px;
}

.kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 850;
  letter-spacing: .22em;
  text-transform: uppercase;
  font-size: 12px;
  color: rgba(255,255,255,0.74);
  margin: 0 0 10px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 99px;
  background: var(--gold);
  box-shadow: 0 0 0 6px rgba(200,163,69,.10);
}

.title {
  margin: 0;
  font-size: clamp(26px, 3vw, 40px);
  font-weight: 950;
  letter-spacing: -0.6px;
  line-height: 1.1;
}
.title__line {
  display: block;
  width: 90px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--gold), transparent);
  margin-top: 12px;
  opacity: 0.95;
}
.subtitle {
  margin: 12px 0 0;
  max-width: 72ch;
  color: rgba(255,255,255,0.80);
  line-height: 1.6;
  font-size: 14px;
}
.muted { color: rgba(255,255,255,0.68); }

/* meta row */
.metaRow {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.18);
  font-weight: 900;
  font-size: 12px;
  color: rgba(255,255,255,0.86);
}
.pill.ghost { background: rgba(255,255,255,0.06); }

/* social */
.head__right {
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 14px;
  backdrop-filter: blur(12px);
}
.socialTitle {
  margin: 0 0 10px;
  font-weight: 950;
  letter-spacing: -.2px;
}
.socialChips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.chipLink {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.18);
  color: rgba(255,255,255,0.90);
  font-weight: 900;
  font-size: 12px;
  text-decoration: none;
  transition: transform .2s ease, border-color .2s ease, background .2s ease;
}
.chipLink:hover {
  transform: translateY(-1px);
  border-color: rgba(200,163,69,0.25);
  background: rgba(255,255,255,0.06);
}
.socialHint {
  margin: 10px 0 0;
  font-size: 12px;
  color: rgba(255,255,255,0.65);
}

/* carousel */
.carousel {
  margin-top: 12px;
}
.mySwiper { padding: 10px 2px 28px; }

/* card */
.card {
  position: relative;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 26px 90px rgba(2,6,23,0.35);
  overflow: hidden;
  min-height: 220px;
}
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(600px 220px at 80% 10%, rgba(200,163,69,.14), transparent 60%);
  pointer-events: none;
}
.shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
  transform: translateX(-140%);
  transition: transform .7s ease;
  pointer-events: none;
}
.card:hover .shine { transform: translateX(140%); }

.cardTop {
  display: grid;
  grid-template-columns: 44px 1fr 40px;
  gap: 12px;
  align-items: center;
  position: relative;
  z-index: 1;
}
.avatar {
  position: relative;
  width: 44px; height: 44px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(0,0,0,0.18);
}
.avatar :deep(.v-icon) { color: var(--gold); opacity: .95; }
.avatar__ring {
  position: absolute;
  inset: -12px;
  border-radius: 22px;
  background: radial-gradient(circle at 35% 35%, rgba(200,163,69,0.20), transparent 60%);
  filter: blur(10px);
  opacity: 0.9;
  pointer-events: none;
}
.who { min-width: 0; }
.name {
  margin: 0;
  font-weight: 950;
  letter-spacing: -.2px;
  font-size: 14px;
  color: rgba(255,255,255,0.92);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.role {
  margin: 3px 0 0;
  font-size: 12px;
  color: rgba(255,255,255,0.66);
}
.badge {
  width: 40px; height: 40px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.86);
}

.quote {
  position: relative;
  z-index: 1;
  margin: 14px 0 0;
  color: rgba(255,255,255,0.82);
  line-height: 1.65;
  font-size: 13px;
}
.qMark {
  color: rgba(200,163,69,0.85);
  font-weight: 950;
}

.cardBottom {
  position: relative;
  z-index: 1;
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.stars {
  display: inline-flex;
  gap: 2px;
}
.star {
  font-size: 18px;
  color: var(--gold);
  opacity: 0.95;
}
.dateRow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255,255,255,0.70);
}

/* swiper arrows + bullets */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: rgba(0,0,0,0.28);
  border: 1px solid rgba(255,255,255,0.14);
  backdrop-filter: blur(10px);
}
:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
  font-size: 14px;
  color: rgba(255,255,255,0.9);
}
:deep(.swiper-pagination-bullet) {
  background: rgba(255,255,255,0.35);
  opacity: 1;
}
:deep(.swiper-pagination-bullet-active) {
  background: rgba(200,163,69,0.95);
}

/* footer */
.foot {
  margin-top: 18px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.18);
  border-radius: 18px;
  padding: 14px;
}
.footTxt {
  margin: 0;
  color: rgba(255,255,255,0.82);
  line-height: 1.6;
  font-size: 13px;
}
.gold { color: var(--gold); font-weight: 950; }

/* responsive */
@media (max-width: 980px) {
  .head { grid-template-columns: 1fr; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .chipLink, .card { transition: none !important; }
}
</style>
