<template>
  <section class="services" id="servicos" ref="root" aria-label="Nossos serviços">
    <div class="wrap">
      <!-- Header -->
      <header class="head">
        <div class="head__left">
          <p class="kicker" data-anim="kicker">
            <span class="dot" aria-hidden="true"></span>
            Nossos serviços
          </p>

          <h2 class="title" data-anim="title">
            Escritório de advocacia
            <span class="title__line" aria-hidden="true"></span>
          </h2>
        </div>

        <p class="desc" data-anim="desc">
          Somos um escritório de advocacia <strong>full service</strong> em Brasília-DF, comprometido com excelência
          e atuação estratégica em diferentes áreas do direito.
        </p>
      </header>

      <!-- Swiper -->
      <div class="slider" data-anim="slider">
        <swiper
          :slidesPerView="1"
          :spaceBetween="16"
          :pagination="{ clickable: true }"
          :modules="modules"
          :breakpoints="{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 18 },
            1440: { slidesPerView: 4, spaceBetween: 20 }
          }"
          class="mySwiper"
        >
          <swiper-slide v-for="(s, idx) in servicos" :key="s.titulo">
            <article class="card" :data-idx="idx" data-anim="card" tabindex="0" role="group" :aria-label="s.titulo">
              <div class="card__top">
                <div class="icon" aria-hidden="true">
                  <v-icon :icon="s.icon" />
                  <span class="icon__ring"></span>
                </div>

                <span class="chip">{{ s.chip }}</span>
              </div>

              <h3 class="card__title">{{ s.titulo }}</h3>
              <p class="card__desc">{{ s.descricao }}</p>

              <div class="card__footer">
                <button class="link" type="button" @click="onServicoClick(s)">
                  Ver detalhes
                  <span class="chev" aria-hidden="true"></span>
                </button>
              </div>

              <span class="sheen" aria-hidden="true"></span>
            </article>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from "vue";

// Swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const modules = [Pagination];

// GSAP
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const root = ref(null);

const servicos = [
  {
    titulo: "Direito Civil",
    chip: "Contratos • Família",
    icon: "mdi-file-document-outline",
    descricao:
      "Atuação em contratos, responsabilidade civil, direito das coisas, família e sucessões, com estratégia e clareza."
  },
  {
    titulo: "Direito Trabalhista",
    chip: "Empregado • Empresa",
    icon: "mdi-briefcase-outline",
    descricao:
      "Defesa e consultoria para empregadores e empregados: rescisões, acordos, compliance interno e ações judiciais."
  },
  {
    titulo: "Direito Empresarial",
    chip: "Negócios • Compliance",
    icon: "mdi-domain",
    descricao:
      "Estruturação e proteção jurídica da empresa: contratos, governança, due diligence, fusões, aquisições e riscos."
  },
  {
    titulo: "Direito Penal",
    chip: "Defesa técnica",
    icon: "mdi-shield-account-outline",
    descricao:
      "Defesa em processos criminais da investigação ao julgamento, com postura firme e atuação baseada em provas."
  },
  {
    titulo: "Direito Tributário",
    chip: "Planejamento • Defesa",
    icon: "mdi-cash-multiple",
    descricao:
      "Planejamento tributário, revisão fiscal e defesa em execuções: redução de riscos e suporte em autuações."
  },
  {
    titulo: "Direito Ambiental",
    chip: "Licenças • ESG",
    icon: "mdi-leaf-circle-outline",
    descricao:
      "Assessoria ambiental, licenciamento e sustentabilidade: prevenção de passivos e atuação alinhada à legislação."
  }
];

function prefersReduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function onServicoClick(s) {
  // aqui você pode abrir modal / navegar para uma seção específica
  // por enquanto: só exemplo
  console.log("Serviço:", s.titulo);
}

let mm;

onMounted(async () => {
  await nextTick();
  if (!root.value || prefersReduce()) return;

  const scope = root.value;

  // estado inicial
  const kicker = scope.querySelector('[data-anim="kicker"]');
  const title = scope.querySelector('[data-anim="title"]');
  const desc = scope.querySelector('[data-anim="desc"]');
  const slider = scope.querySelector('[data-anim="slider"]');
  const cards = scope.querySelectorAll('[data-anim="card"]');

  gsap.set([kicker, title, desc, slider], { autoAlpha: 0, y: 14, filter: "blur(10px)" });
  gsap.set(cards, { autoAlpha: 0, y: 18, filter: "blur(10px)" });

  mm = gsap.matchMedia();

  mm.add("(min-width: 0px)", () => {
    // Entrada da seção (mais profissional: anima quando chega nela)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top 80%",
        end: "bottom 60%",
        once: true
      },
      defaults: { ease: "power2.out" }
    });

    tl.to(kicker, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 0.00)
      .to(title, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, 0.06)
      .to(desc, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, 0.14)
      .to(slider, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 0.22)
      .to(cards, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.08 }, 0.26);

    // Hover micro: “lift” + sombra elegante
    cards.forEach((card) => {
      const onEnter = () => gsap.to(card, { y: -4, duration: 0.18, ease: "power2.out" });
      const onLeave = () => gsap.to(card, { y: 0, duration: 0.18, ease: "power2.out" });

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      // foco via teclado (tab)
      card.addEventListener("focus", onEnter);
      card.addEventListener("blur", onLeave);

      // cleanup
      ScrollTrigger.addEventListener("refreshInit", () => {});
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });
});

onUnmounted(() => {
  mm?.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<style scoped>
.services {
  position: relative;
  padding: 64px 0 70px;
  background: #ffffff;
  color: #0b1220;
  --gold: #c8a345;
  --line: rgba(2, 6, 23, 0.10);
  overflow: hidden;
}

.services::before {
  content: "";
  position: absolute;
  inset: -200px 0 auto 0;
  height: 420px;
  background: radial-gradient(900px 240px at 20% 0%, rgba(200, 163, 69, 0.14), transparent 60%);
  pointer-events: none;
}

.wrap {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 18px;
}

/* header */
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 850;
  letter-spacing: .22em;
  text-transform: uppercase;
  font-size: 12px;
  color: rgba(2, 6, 23, 0.65);
  margin: 0 0 8px;
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
  position: relative;
}

.title__line {
  display: block;
  width: 90px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--gold), transparent);
  margin-top: 10px;
  opacity: 0.9;
}

.desc {
  max-width: 56ch;
  margin: 0;
  color: rgba(2, 6, 23, 0.68);
  line-height: 1.6;
  font-size: 14px;
}

/* slider */
.slider {
  margin-top: 10px;
}

.mySwiper {
  width: 100%;
  padding: 16px 0 30px;
}

/* swiper pagination (mais clean) */
:deep(.swiper-pagination-bullet) {
  width: 7px;
  height: 7px;
  opacity: 0.35;
  background: rgba(2, 6, 23, 0.55);
}
:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: var(--gold);
}

/* card */
.card {
  border: 1px solid rgba(2, 6, 23, 0.12);
  background: linear-gradient(180deg, #ffffff, #fbfbfb);
  border-radius: 18px;
  padding: 16px;
  min-height: 210px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(2, 6, 23, 0.08);
  transition: border-color .2s ease, background .2s ease;
  outline: none;
}

.card:focus-visible {
  box-shadow: 0 0 0 6px rgba(200,163,69,0.22), 0 18px 45px rgba(2,6,23,0.10);
  border-color: rgba(200,163,69,0.45);
}

.card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

/* icon */
.icon {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: rgba(200, 163, 69, 0.08);
  border: 1px solid rgba(200,163,69,0.25);
}

.icon :deep(.v-icon) {
  font-size: 22px;
  color: var(--gold);
}

.icon__ring {
  position: absolute;
  inset: -12px;
  border-radius: 22px;
  background: radial-gradient(circle at 35% 35%, rgba(200,163,69,0.18), transparent 60%);
  filter: blur(10px);
  opacity: 0.9;
  pointer-events: none;
  transition: transform .25s ease, opacity .25s ease;
}

.card:hover .icon__ring {
  transform: scale(1.03);
  opacity: 1;
}

/* chip */
.chip {
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(2, 6, 23, 0.12);
  background: rgba(255,255,255,0.9);
  color: rgba(2, 6, 23, 0.72);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: .2px;
}

/* text */
.card__title {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 950;
  letter-spacing: -0.2px;
  color: #0b1220;
}

.card__desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: rgba(2, 6, 23, 0.68);
}

/* footer */
.card__footer {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px dashed rgba(2, 6, 23, 0.14);
}

.link {
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  font-weight: 950;
  color: rgba(2, 6, 23, 0.82);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  letter-spacing: .2px;
}

.chev {
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: .9;
}

/* sheen hover */
.sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent);
  transform: translateX(-140%);
  transition: transform .6s ease;
  pointer-events: none;
}
.card:hover .sheen {
  transform: translateX(140%);
}

/* responsivo */
@media (max-width: 768px) {
  .head {
    align-items: flex-start;
    text-align: left;
  }
  .desc {
    max-width: 100%;
  }
}
</style>
