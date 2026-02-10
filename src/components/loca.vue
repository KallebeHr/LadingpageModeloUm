<template>
  <section class="team" id="equipe" ref="root" aria-label="Nossa equipe">
    <!-- BG -->
    <div class="bg" aria-hidden="true">
      <div class="bg__img"></div>
      <div class="bg__overlay"></div>
      <div class="bg__grid"></div>
      <div class="bg__glow"></div>
      <div class="bg__noise"></div>
    </div>

    <div class="wrap">
      <!-- Header -->
      <header class="head">
        <div class="head__left">
          <p class="kicker" data-anim="kicker">
            <span class="dot" aria-hidden="true"></span>
            Nossa equipe
          </p>
          <h2 class="title" data-anim="title">
            Profissionais que unem técnica e estratégia
            <span class="title__line" aria-hidden="true"></span>
          </h2>
        </div>

        <ul class="badges" data-anim="badges" aria-label="Diferenciais da equipe">
          <li class="badge" data-badge>
            <v-icon icon="mdi-lightbulb-alert-outline" class="badge__icon" />
            <span>Inovação e Criatividade</span>
          </li>
          <li class="badge" data-badge>
            <v-icon icon="mdi-account-group-outline" class="badge__icon" />
            <span>Profissionais Especializados</span>
          </li>
          <li class="badge" data-badge>
            <v-icon icon="mdi-flash-outline" class="badge__icon" />
            <span>Atendimento de Excelência</span>
          </li>
          <li class="badge" data-badge>
            <v-icon icon="mdi-message-check-outline" class="badge__icon" />
            <span>Agilidade na Solução</span>
          </li>
        </ul>

      </header>

      <!-- Slider -->
      <div class="slider" data-anim="slider">
        <swiper
          :autoplay="{ delay: 4500, disableOnInteraction: false }"
          :slidesPerView="1"
          :spaceBetween="18"
          :loop="true"
          :pagination="{ clickable: true, type: 'progressbar' }"
          :modules="modules"
          class="mySwiper"
          :breakpoints="{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }"
        >
          <swiper-slide v-for="(a, idx) in advogados" :key="a.nome">
            <article
              class="card"
              :data-idx="idx"
              tabindex="0"
              role="group"
              :aria-label="`Perfil de ${a.nome}`"
              @click="toggleActive(idx)"
              @keydown.enter.prevent="toggleActive(idx)"
              @keydown.space.prevent="toggleActive(idx)"
              :class="{ 'is-active': activeIndex === idx }"
              data-card
            >
              <!-- Image -->
              <div class="media">
                <img :src="a.img" :alt="a.nome" class="img" loading="lazy" />
                <div class="media__shade" aria-hidden="true"></div>

                <!-- Top meta -->
                <div class="meta" aria-hidden="true">
                  <span class="chip">
                    <v-icon icon="mdi-briefcase-outline" />
                    {{ a.area }}
                  </span>
                </div>

                <!-- Bottom name -->
                <div class="namebar">
                  <h3 class="name">{{ a.nome }}</h3>
                  <p class="role">{{ a.titulo }}</p>
                </div>
              </div>

              <!-- Reveal (hover/focus/click) -->
              <div class="reveal" aria-label="Detalhes do profissional">
                <p class="bio">
                  {{ a.descricao }}
                </p>

                <div class="details">
                  <p>
                    <span class="label">Área:</span>
                    <span class="value">{{ a.area }}</span>
                  </p>
                  <p>
                    <span class="label">OAB:</span>
                    <span class="value">{{ a.oab }}</span>
                  </p>
                  <p v-if="a.contato">
                    <span class="label">Contato:</span>
                    <span class="value">{{ a.contato }}</span>
                  </p>
                </div>

                <div class="actions">
                  <button class="btn ghost" type="button" @click.stop="whatsEquipe(a)">
                    WhatsApp
                    <v-icon icon="mdi-whatsapp" class="ml-2" />
                    <span class="shine" aria-hidden="true"></span>
                  </button>

                  <button class="btn primary" type="button" @click.stop="verPerfil(a)">
                    Ver perfil
                    <span class="chev" aria-hidden="true"></span>
                    <span class="shine" aria-hidden="true"></span>
                  </button>
                </div>
              </div>

              <span class="sheen" aria-hidden="true"></span>
            </article>
          </swiper-slide>
        </swiper>

        <p class="hint" data-anim="hint">
          Dica: passe o mouse (desktop) ou toque no card (mobile) para ver mais.
        </p>
        
      </div>
    </div>
    <autoscroll />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

// Swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const modules = [Pagination, Navigation, Autoplay];

// GSAP
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
const activeIndex = ref(null);

// Troque suas imagens (mantive suas imports)
import modelo1 from "@/assets/modelo1.jpg";
import modelo2 from "@/assets/modelo6.jpg";
import modelo3 from "@/assets/modelo3.jpg";
import modelo4 from "@/assets/modelo4.jpg";
import modelo5 from "@/assets/modelo5.jpg";
import modelo6 from "@/assets/modelo2.jpg";
import modelo7 from "@/assets/modelo7.jpg";

const advogados = [
  {
    nome: "Dr. João Silva",
    titulo: "Advogado • Sócio",
    descricao: "Atuação em Direito Civil com foco em contratos, responsabilidade civil e estratégias de negociação.",
    img: modelo1,
    area: "Direito Civil",
    oab: "OAB/ES 345.678",
    contato: "joao.silva@example.com"
  },
  {
    nome: "Dra. Mariana Rocha",
    titulo: "Advogada • Associada",
    descricao: "Atuação consultiva e contenciosa em contratos e litígios, com comunicação clara e objetiva.",
    img: modelo2,
    area: "Direito Civil",
    oab: "OAB/RS 321.654",
    contato: "mariana.rocha@example.com"
  },
  {
    nome: "Dr. André Ribeiro",
    titulo: "Advogado • Associado",
    descricao: "Perfil analítico e estratégico, com foco em soluções rápidas e condução segura de processos.",
    img: modelo3,
    area: "Direito Empresarial",
    oab: "OAB/PR 654.987",
    contato: "andre.ribeiro@example.com"
  },
  {
    nome: "Dra. Bruna Santos",
    titulo: "Advogada • Especialista",
    descricao: "Atuação em demandas ambientais, licenciamento e prevenção de passivos — visão técnica e pragmática.",
    img: modelo4,
    area: "Direito Ambiental",
    oab: "OAB/RJ 987.654",
    contato: "bruna.santos@example.com"
  },
  {
    nome: "Dr. Carlos Mendes",
    titulo: "Advogado • Criminalista",
    descricao: "Defesa em casos de alta complexidade, postura firme e foco em provas e garantias fundamentais.",
    img: modelo5,
    area: "Direito Penal",
    oab: "OAB/MG 555.666",
    contato: "carlos.mendes@example.com"
  },
  {
    nome: "Dr. Diego Souza",
    titulo: "Advogado • Criminalista",
    descricao: "Atuação estratégica desde a fase investigatória, com acompanhamento próximo e orientação transparente.",
    img: modelo6,
    area: "Direito Penal",
    oab: "OAB/GO 567.890",
    contato: "diego.souza@example.com"
  },
  {
    nome: "Dra. Juliana Castro",
    titulo: "Advogada • Associada",
    descricao: "Atuação focada em condução eficiente, clareza no atendimento e organização processual.",
    img: modelo7,
    area: "Direito Tributário",
    oab: "OAB/GO 000.111",
    contato: "juliana.castro@example.com"
  }
];

function prefersReduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function toggleActive(idx) {
  activeIndex.value = activeIndex.value === idx ? null : idx;
}

function whatsEquipe(a) {
  const phone = "5581999999999"; // troque
  const msg = `Olá, vim através do site. Gostaria de atendimento com ${a.nome} (${a.area}).`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
}

function verPerfil(a) {
  // você pode abrir modal, rota /perfil, etc.
  console.log("Ver perfil:", a.nome);
}

let mm;
let cleanupTilt = [];

function bindTilt(scope) {
  const cards = scope.querySelectorAll("[data-card]");

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  cards.forEach((card) => {
    const media = card.querySelector(".media");
    if (!media) return;

    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;

      // tilt bem sutil (premium)
      const rx = clamp((0.5 - py) * 8, -6, 6);
      const ry = clamp((px - 0.5) * 10, -8, 8);

      gsap.to(media, { rotateX: rx, rotateY: ry, duration: 0.25, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(media, { rotateX: 0, rotateY: 0, duration: 0.35, ease: "power2.out" });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("focus", onLeave);

    cleanupTilt.push(() => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("focus", onLeave);
    });
  });
}

onMounted(async () => {
  await nextTick();
  if (!root.value || prefersReduce()) return;

  const scope = root.value;

  const kicker = scope.querySelector('[data-anim="kicker"]');
  const title = scope.querySelector('[data-anim="title"]');
  const badges = scope.querySelectorAll("[data-badge]");
  const slider = scope.querySelector('[data-anim="slider"]');
  const hint = scope.querySelector('[data-anim="hint"]');
  const cards = scope.querySelectorAll("[data-card]");

  // inicial
  gsap.set([kicker, title, slider, hint], { autoAlpha: 0, y: 14, filter: "blur(10px)" });
  gsap.set(badges, { autoAlpha: 0, y: 10, filter: "blur(8px)" });
  gsap.set(cards, { autoAlpha: 0, y: 16, filter: "blur(10px)" });

  mm = gsap.matchMedia();
  mm.add("(min-width: 0px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top 80%",
        once: true
      },
      defaults: { ease: "power2.out" }
    });

    tl.to(kicker, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 0.00)
      .to(title, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, 0.06)
      .to(badges, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.08 }, 0.14)
      .to(slider, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, 0.22)
      .to(cards, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.08 }, 0.28)
      .to(hint, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.35 }, 0.42);

    bindTilt(scope);

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  });
});

onUnmounted(() => {
  cleanupTilt.forEach((fn) => fn());
  cleanupTilt = [];
  mm?.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<style scoped>
.team {
  position: relative;
  padding: 78px 0 84px;
  overflow: hidden;
  --gold: #c8a345;
  --line: rgba(255,255,255,0.14);
}

/* BG (mesma linguagem do Home, mas mais sóbria) */
.bg { position: absolute; inset: 0; z-index: 0; }
.bg__img {
  position: absolute; inset: 0;
  background-image: url("../assets/teste2.png");
  background-size: cover;
  background-position: center;
  filter: saturate(1.05) contrast(1.05);
  transform: scale(1.02);
}
.bg__overlay {
  position: absolute; inset: 0;
  background:
    radial-gradient(1100px 500px at 15% 10%, rgba(200,163,69,0.18), transparent 60%),
    linear-gradient(180deg, rgba(2, 6, 23, 0.78), rgba(2, 6, 23, 0.66));
}
.bg__grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
  background-size: 72px 72px;
  opacity: 0.18;
  mask-image: radial-gradient(900px 420px at 25% 0%, black, transparent 70%);
}
.bg__glow {
  position: absolute;
  width: 760px; height: 760px;
  left: -300px; top: -340px;
  background: radial-gradient(circle at 30% 30%, rgba(200,163,69,0.20), transparent 58%);
  filter: blur(18px);
  opacity: 0.85;
}
.bg__noise {
  position: absolute; inset: 0;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

.wrap {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 18px;
  color: #fff;
}

/* head */
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
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
  color: rgba(255,255,255,0.72);
  margin: 0 0 10px;
}
.dot {
  width: 8px; height: 8px;
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

.badges {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 10px;
  padding: 0;
  margin: 0;
}
.badge {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 10px 12px;
  color: rgba(255,255,255,0.86);
  font-weight: 850;
  font-size: 12px;
  letter-spacing: .1px;
  position: relative;
  overflow: hidden;
}
.badge__icon {
  color: var(--gold);
  opacity: 0.95;
}

/* slider */
.slider { margin-top: 18px; }
.mySwiper { width: 100%; padding: 14px 0 34px; }

/* progressbar clean */
:deep(.swiper-pagination-progressbar) {
  background: rgba(255,255,255,0.10);
  height: 4px;
  border-radius: 999px;
  overflow: hidden;
}
:deep(.swiper-pagination-progressbar-fill) {
  background: linear-gradient(90deg, var(--gold), rgba(200,163,69,0.55));
  border-radius: 999px;
}

.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: rgba(255,255,255,0.72);
}

/* card */
.card {
  width: 100%;
  max-width: 340px;
  height: 420px;
  margin: 0 auto;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  outline: none;

  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  box-shadow: 0 26px 90px rgba(2,6,23,0.35);
}

.card:focus-visible {
  box-shadow: 0 0 0 6px rgba(200,163,69,0.22), 0 26px 90px rgba(2,6,23,0.40);
  border-color: rgba(200,163,69,0.45);
}

/* sheen */
.sheen {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
  transform: translateX(-140%);
  transition: transform .7s ease;
  pointer-events: none;
}
.card:hover .sheen,
.card:focus-visible .sheen,
.card.is-active .sheen {
  transform: translateX(140%);
}

/* media tilt container */
.media {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  will-change: transform;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform .5s ease;
}
.card:hover .img,
.card.is-active .img {
  transform: scale(1.08);
}

.media__shade {
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(2,6,23,0.12), rgba(2,6,23,0.65));
}

.meta {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: flex-end;
  z-index: 2;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(0,0,0,0.20);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .2px;
}

.namebar {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 14px 14px;
  z-index: 2;
}
.name {
  margin: 0;
  font-size: 16px;
  font-weight: 950;
  letter-spacing: -0.2px;
}
.role {
  margin: 2px 0 0;
  font-size: 12px;
  color: rgba(255,255,255,0.76);
}

/* reveal layer */
.reveal {
  position: absolute;
  inset: 0;
  z-index: 3;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  opacity: 0;
  transform: translateY(10px);
  transition: opacity .35s ease, transform .35s ease;
  background: radial-gradient(900px 320px at 20% 10%, rgba(200,163,69,0.16), transparent 60%),
              rgba(2,6,23,0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.card:hover .reveal,
.card:focus-visible .reveal,
.card.is-active .reveal {
  opacity: 1;
  transform: translateY(0);
}

.bio {
  margin: 0 0 12px;
  color: rgba(255,255,255,0.86);
  line-height: 1.55;
  font-size: 13px;
}

.details {
  display: grid;
  gap: 6px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
}
.details p {
  margin: 0;
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 10px;
  font-size: 12px;
  color: rgba(255,255,255,0.85);
}
.label { color: rgba(255,255,255,0.70); font-weight: 850; }
.value { color: rgba(255,255,255,0.92); font-weight: 850; }

.actions {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.btn {
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 14px;
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 950;
  letter-spacing: .2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: #fff;
  background: rgba(255,255,255,0.06);
}
.btn.primary {
  background: linear-gradient(90deg, rgba(200,163,69,0.95), rgba(200,163,69,0.72));
  color: #0b1220;
  border-color: rgba(200,163,69,0.55);
}
.btn.ghost { background: rgba(255,255,255,0.06); }

.shine {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
  transform: translateX(-140%);
  transition: transform .6s ease;
  pointer-events: none;
}
.btn:hover .shine { transform: translateX(140%); }

.chev {
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(-45deg);
  margin-left: 10px;
}

/* responsive */
@media (max-width: 1024px) {
  .badges { grid-template-columns: 1fr; }
}
</style>
