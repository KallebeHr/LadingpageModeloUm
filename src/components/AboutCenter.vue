<template>
  <section class="home" id="home" ref="root" aria-label="Seção inicial">
    <!-- BG -->
    <div class="bg" aria-hidden="true">
      <div class="bg__img"></div>
      <div class="bg__overlay"></div>
      <div class="bg__grid"></div>
      <div class="bg__glow" ref="glowEl"></div>
      <div class="bg__noise"></div>
    </div>

    <div class="wrap">
      <div class="hero">
        <!-- Left -->
        <div class="copy">
          <div class="kicker" data-anim="kicker">
            <span class="pill">
              <span class="dot" aria-hidden="true"></span>
              Atendimento estratégico
            </span>
            <span class="sep" aria-hidden="true"></span>
            <span class="mini">Confidencial • Ágil • Profissional</span>
          </div>

          <!-- Título com palavras (para animar sem plugin pago) -->
          <h1 class="title" data-anim="title">
            <span
             
              class="w"
             
            >
              Excelência em <span class="ws" v-if="i !== titleWords.length - 1">&nbsp;</span>
            </span>
            <span class="gold">  Direito</span>,
            <span class="w end">com foco no que resolve.</span>
          </h1>

          <p class="subtitle" data-anim="subtitle">
            Fale com nosso time e tenha seus direitos protegidos com clareza, firmeza e estratégia —
            do primeiro contato ao resultado.
          </p>

          <div class="trust" data-anim="trust">
            <div class="trust__item" data-hover>
              <v-icon icon="mdi-shield-check" class="trust__icon" />
              <div class="trust__txt">
                <strong>Segurança</strong>
                <span>Informações tratadas com sigilo.</span>
              </div>
              <span class="sheen" aria-hidden="true"></span>
            </div>

            <div class="trust__item" data-hover>
              <v-icon icon="mdi-lightning-bolt-outline" class="trust__icon" />
              <div class="trust__txt">
                <strong>Agilidade</strong>
                <span>Triagem rápida e direcionamento.</span>
              </div>
              <span class="sheen" aria-hidden="true"></span>
            </div>

            <div class="trust__item" data-hover>
              <v-icon icon="mdi-account-tie" class="trust__icon" />
              <div class="trust__txt">
                <strong>Experiência</strong>
                <span>Atuação prática e objetiva.</span>
              </div>
              <span class="sheen" aria-hidden="true"></span>
            </div>
          </div>

          <div class="actions" data-anim="actions">
            <button class="btn primary" type="button" @click="focusFirst()" data-hover>
              Solicitar avaliação
              <span class="chev" aria-hidden="true"></span>
              <span class="btn__shine" aria-hidden="true"></span>
            </button>

            <button class="btn ghost" type="button" @click="openWhatsApp()" data-hover>
              WhatsApp
              <v-icon icon="mdi-whatsapp" class="ml-2" />
              <span class="btn__shine" aria-hidden="true"></span>
            </button>
          </div>

          <p class="note" data-anim="note">
            *Sem compromisso. Resposta em horário comercial.
          </p>
        </div>

        <!-- Right -->
        <aside class="panel" aria-label="Formulário de contato rápido" data-anim="panel" data-hover>
          <div class="panel__head">
            <div class="panel__badge">
              <v-icon icon="mdi-message-text-outline" />
              <span>Contato rápido</span>
            </div>

            <h2 class="panel__title" data-anim="panel-title">Converse com um advogado</h2>
            <p class="panel__desc" data-anim="panel-desc">
              Preencha os dados e a nossa equipe retorna com orientação inicial.
            </p>
          </div>

          <form class="form" @submit.prevent="handleSubmit" novalidate>
            <div class="field" data-anim="field">
              <label for="name">Nome</label>
              <input
                ref="firstInput"
                id="name"
                v-model.trim="form.name"
                type="text"
                autocomplete="name"
                placeholder="Seu nome completo"
                required
              />
              <span class="field__line" aria-hidden="true"></span>
            </div>

            <div class="field" data-anim="field">
              <label for="phone">WhatsApp</label>
              <input
                id="phone"
                v-model="form.phone"
                inputmode="tel"
                autocomplete="tel"
                placeholder="(xx) xxxxx-xxxx"
                required
                @input="maskPhone"
              />
              <span class="field__line" aria-hidden="true"></span>
            </div>

            <div class="field" data-anim="field">
              <label for="email">E-mail</label>
              <input
                id="email"
                v-model.trim="form.email"
                type="email"
                autocomplete="email"
                placeholder="seuemail@exemplo.com"
                required
              />
              <span class="field__line" aria-hidden="true"></span>
            </div>

            <div class="field" data-anim="field">
              <label for="message">Mensagem</label>
              <textarea
                id="message"
                v-model.trim="form.message"
                placeholder="Explique rapidamente seu caso…"
                required
                rows="4"
              ></textarea>
              <span class="field__line" aria-hidden="true"></span>
            </div>

            <button class="submit" type="submit" :disabled="sending" data-anim="submit" data-hover>
              <span v-if="!sending">Solicitar especialista</span>
              <span v-else>Enviando…</span>
              <span class="btn__shine" aria-hidden="true"></span>
            </button>

            <p class="legal" data-anim="legal">
              Ao enviar, você concorda em ser contatado para retorno sobre o atendimento.
            </p>
          </form>
        </aside>
      </div>

      <!-- Proof -->
      <div class="proof" aria-label="Diferenciais do escritório" data-anim="proof">
        <div class="proof__card proof__lead" data-hover>
          <h3>Referência em atendimento jurídico</h3>
          <p>Organização, clareza e foco no resultado.</p>
          <span class="sheen" aria-hidden="true"></span>
        </div>

        <div class="proof__card" data-hover>
          <div class="proof__icon proof__icon--mdi" aria-hidden="true">
            <v-icon icon="mdi-timer-outline" />
            <span class="proof__ring"></span>
          </div>
          <div class="proof__txt">
            <h4>Disponibilidade imediata</h4>
            <p>Triagem rápida e direcionamento do melhor caminho.</p>
          </div>
          <span class="sheen" aria-hidden="true"></span>
        </div>

        <div class="proof__card" data-hover>
          <div class="proof__icon proof__icon--mdi" aria-hidden="true">
            <v-icon icon="mdi-account-tie-outline" />
            <span class="proof__ring"></span>
          </div>
          <div class="proof__txt">
            <h4>Advogados experientes</h4>
            <p>Condução segura com visão estratégica do caso.</p>
          </div>
          <span class="sheen" aria-hidden="true"></span>
        </div>

        <div class="proof__card" data-hover>
          <div class="proof__icon proof__icon--mdi" aria-hidden="true">
            <v-icon icon="mdi-scale-balance" />
            <span class="proof__ring"></span>
          </div>
          <div class="proof__txt">
            <h4>Prestígio e confiança</h4>
            <p>Atuação responsável, comunicação clara e postura profissional do início ao fim.</p>
          </div>
          <span class="sheen" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
const glowEl = ref(null);
const firstInput = ref(null);
const sending = ref(false);

const form = ref({
  name: "",
  phone: "",
  email: "",
  message: "",
});

// ====== TÍTULO POR PALAVRA (sem plugin pago)
const titleWords = computed(() => ["", ""]);

function focusFirst() {
  firstInput.value?.focus();
}

function onlyDigits(v) {
  return (v || "").replace(/\D/g, "");
}
function maskPhone() {
  const d = onlyDigits(form.value.phone).slice(0, 11);
  if (d.length <= 2) { form.value.phone = d ? `(${d}` : ""; return; }

  const ddd = d.slice(0, 2);
  const rest = d.slice(2);

  if (rest.length <= 5) { form.value.phone = `(${ddd}) ${rest}`; return; }
  const p1 = rest.slice(0, 5);
  const p2 = rest.slice(5, 9);
  form.value.phone = `(${ddd}) ${p1}${p2 ? "-" + p2 : ""}`;
}

function openWhatsApp() {
  const phone = "5581999999999"; // troque o número
  const msg = `Olá, vim através do site. Meu nome é ${form.value.name || "—"}. Podemos conversar?`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
}

async function handleSubmit() {
  sending.value = true;
  openWhatsApp();
  setTimeout(() => {
    sending.value = false;
    form.value = { name: "", phone: "", email: "", message: "" };
  }, 600);
}

// ====== GSAP: animações
let mm;
let killHoverFns = [];

function prefersReduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setInitial(elements) {
  gsap.set(elements, { autoAlpha: 0, y: 12, filter: "blur(8px)" });
}

function bindHovers(scope) {
  // micro-interações com GSAP (bem premium)
  const hoverables = scope.querySelectorAll("[data-hover]");
  hoverables.forEach((el) => {
    const onEnter = () => gsap.to(el, { y: -3, duration: 0.18, ease: "power2.out" });
    const onLeave = () => gsap.to(el, { y: 0, duration: 0.18, ease: "power2.out" });

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    killHoverFns.push(() => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    });
  });
}

function glowParallax() {
  if (!glowEl.value) return () => {};
  const glow = glowEl.value;

  const onMove = (e) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const x = (e.clientX / w - 0.5) * 18;
    const y = (e.clientY / h - 0.5) * 18;
    gsap.to(glow, { x, y, duration: 0.35, ease: "power2.out" });
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  return () => window.removeEventListener("mousemove", onMove);
}

function introTimeline(scope) {
  // grupos
  const kicker = scope.querySelector('[data-anim="kicker"]');
  const titleWordsEls = scope.querySelectorAll(".title .w");
  const gold = scope.querySelector(".title .gold");
  const subtitle = scope.querySelector('[data-anim="subtitle"]');
  const trustItems = scope.querySelectorAll(".trust__item");
  const actions = scope.querySelector('[data-anim="actions"]');
  const note = scope.querySelector('[data-anim="note"]');

  const panel = scope.querySelector('[data-anim="panel"]');
  const fields = scope.querySelectorAll('[data-anim="field"]');
  const submit = scope.querySelector('[data-anim="submit"]');
  const legal = scope.querySelector('[data-anim="legal"]');

  const proof = scope.querySelector(".proof");
  const proofCards = scope.querySelectorAll(".proof__card");

  // estado inicial
  setInitial([kicker, subtitle, actions, note, panel, submit, legal, gold]);
  setInitial([...trustItems, ...fields, ...proofCards]);
  gsap.set(titleWordsEls, { autoAlpha: 0, y: 16, filter: "blur(10px)" });

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  // esquerda
  tl.to(kicker, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, 0.00);

  // título: palavra por palavra + gold “pop”
  tl.to(titleWordsEls, {
    autoAlpha: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.55,
    stagger: 0.04,
    ease: "power3.out",
  }, 0.08);

  tl.to(gold, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, 0.20);
  tl.fromTo(gold, { scale: 0.98 }, { scale: 1, duration: 0.45, ease: "back.out(1.6)" }, 0.22);

  tl.to(subtitle, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, 0.26);

  tl.to(trustItems, {
    autoAlpha: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.5,
    stagger: 0.07,
  }, 0.34);

  tl.to(actions, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 0.46);
  tl.to(note, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.4 }, 0.52);

  // direita (painel com “pop”)
  tl.to(panel, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, 0.18);
  tl.fromTo(panel, { scale: 0.98 }, { scale: 1, duration: 0.55, ease: "back.out(1.4)" }, 0.18);

  tl.to(fields, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.06 }, 0.28);
  tl.to(submit, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 0.48);
  tl.to(legal, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.4 }, 0.54);

  // proof: quando entrar no viewport (mais profissional)
  ScrollTrigger.create({
    trigger: proof,
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.to(proofCards, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
  });

  return tl;
}

onMounted(async () => {
  await nextTick();

  const scope = root.value;
  if (!scope) return;

  // se reduzir movimento, não anima
  if (prefersReduce()) return;

  // matchMedia gsap (organiza melhor e evita vazamento)
  mm = gsap.matchMedia();

  mm.add("(min-width: 0px)", () => {
    bindHovers(scope);

    // animações só depois do primeiro paint (fica mais suave)
    requestAnimationFrame(() => {
      introTimeline(scope);
    });

    // parallax glow
    const killGlow = glowParallax();
    return () => killGlow();
  });
});

onUnmounted(() => {
  killHoverFns.forEach((fn) => fn());
  killHoverFns = [];

  ScrollTrigger.getAll().forEach((t) => t.kill());
  mm?.revert();
});
</script>

<style scoped>
.home {
  position: relative;
  min-height: calc(100vh - 10px);
  padding-top: 92px;
  padding-bottom: 56px;
  overflow: hidden;
  --line: rgba(255, 255, 255, 0.14);
  --gold: #c8a345;
}

/* BG */
.bg { position: absolute; inset: 0; z-index: 0; }
.bg__img {
  position: absolute; inset: 0;
  background-image: url("../assets/teste.png");
  background-size: cover;
  background-position: center;
  filter: saturate(1.06) contrast(1.06);
  transform: scale(1.02);
}
.bg__overlay {
  position: absolute; inset: 0;
  background:
    radial-gradient(1200px 600px at 20% 15%, rgba(200, 163, 69, 0.22), transparent 55%),
    linear-gradient(180deg, rgba(2, 6, 23, 0.82), rgba(2, 6, 23, 0.70));
}
.bg__grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.25;
  mask-image: radial-gradient(800px 400px at 20% 10%, black, transparent 70%);
}
.bg__glow {
  position: absolute;
  width: 680px;
  height: 680px;
  left: -220px;
  top: -260px;
  background: radial-gradient(circle at 30% 30%, rgba(200, 163, 69, 0.22), transparent 55%);
  filter: blur(18px);
  opacity: 0.95;
  will-change: transform;
}
.bg__noise {
  position: absolute; inset: 0;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

/* layout */
.wrap {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 18px;
  color: #fff;
}
.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 24px;
  align-items: start;
}
.copy { padding: 14px 6px; }

/* kicker */
.kicker { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
.pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.06);
  font-weight: 650;
  letter-spacing: .2px;
  font-size: 12px;
  position: relative;
  overflow: hidden;
}
.dot {
  width: 8px; height: 8px; border-radius: 99px;
  background: var(--gold);
  box-shadow: 0 0 0 6px rgba(200,163,69,.12);
}
.sep { width: 1px; height: 18px; background: rgba(255,255,255,0.18); }
.mini { font-size: 12px; color: rgba(255,255,255,0.78); }

/* title */
.title {
  margin: 0 0 12px;
  font-weight: 900;
  letter-spacing: -0.7px;
  line-height: 1.06;
  font-size: clamp(30px, 3.6vw, 54px);
}
.title .w { display: inline-block; }
.title .gold {
  color: var(--gold);
  text-shadow: 0 16px 40px rgba(200,163,69,.18);
  display: inline-block;
}
.title .end { display: inline-block; }
.subtitle {
  margin: 0 0 18px;
  max-width: 56ch;
  color: rgba(255,255,255,0.82);
  line-height: 1.55;
  font-size: 15px;
}

/* trust */
.trust { display: grid; grid-template-columns: 1fr; gap: 12px; margin: 18px 0; }
.trust__item {
  display: flex; align-items: flex-start; gap: 12px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 12px;
  position: relative;
  overflow: hidden;
}
.trust__icon { color: var(--gold); opacity: .95; }
.trust__txt strong { display: block; font-size: 13px; letter-spacing: .2px; }
.trust__txt span { display: block; margin-top: 2px; font-size: 12px; color: rgba(255,255,255,0.78); }

/* sheen overlay */
.sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.10), transparent);
  transform: translateX(-120%);
  transition: transform .6s ease;
  pointer-events: none;
}
[data-hover]:hover .sheen { transform: translateX(120%); }

/* actions */
.actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 14px; }
.btn {
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 16px;
  padding: 12px 14px;
  cursor: pointer;
  font-weight: 900;
  letter-spacing: .2px;
  display: inline-flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.btn__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
  transform: translateX(-120%);
  transition: transform .55s ease;
  pointer-events: none;
}
[data-hover]:hover .btn__shine { transform: translateX(120%); }

.btn.primary {
  background: linear-gradient(90deg, rgba(200,163,69,0.95), rgba(200,163,69,0.72));
  color: #0b1220;
  border-color: rgba(200,163,69,0.55);
  box-shadow: 0 18px 50px rgba(200,163,69,.18);
}
.btn.ghost { background: rgba(255,255,255,0.06); color: #fff; }

.chev {
  width: 10px; height: 10px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(-45deg);
  margin-left: 10px;
}

.note { margin: 12px 0 0; font-size: 12px; color: rgba(255,255,255,0.70); }

/* panel */
.panel {
  border: 1px solid rgba(255,255,255,0.16);
  background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06));
  border-radius: 22px;
  padding: 18px;
  box-shadow: 0 24px 80px rgba(2, 6, 23, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;
}
.panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(600px 200px at 80% 10%, rgba(200,163,69,.14), transparent 60%);
  pointer-events: none;
}
.panel__badge {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(0,0,0,0.18);
  font-weight: 800;
  font-size: 12px;
  letter-spacing: .2px;
}
.panel__title { margin: 12px 0 6px; font-size: 18px; font-weight: 950; }
.panel__desc { margin: 0 0 14px; font-size: 12.5px; color: rgba(255,255,255,0.78); }

.form { display: grid; gap: 12px; position: relative; z-index: 1; }
.field { position: relative; }
.field label { display: block; font-size: 12px; font-weight: 800; color: rgba(255,255,255,0.80); margin-bottom: 6px; }
.field input, .field textarea {
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.92);
  color: #111827;
  padding: 12px;
  outline: none;
  transition: box-shadow .2s ease, transform .2s ease;
}
.field input:focus, .field textarea:focus {
  box-shadow: 0 0 0 6px rgba(200,163,69,0.18);
  transform: translateY(-1px);
}
.field textarea { resize: vertical; min-height: 120px; }
.field__line {
  position: absolute;
  left: 10px; right: 10px; bottom: -6px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(200,163,69,.9), transparent);
  opacity: 0;
  transform: scaleX(.7);
  transition: opacity .25s ease, transform .25s ease;
}
.field:focus-within .field__line { opacity: 1; transform: scaleX(1); }

.submit {
  width: 100%;
  border: 0;
  border-radius: 16px;
  padding: 12px 14px;
  font-weight: 950;
  cursor: pointer;
  color: #0b1220;
  background: linear-gradient(90deg, rgba(200,163,69,0.95), rgba(200,163,69,0.72));
  position: relative;
  overflow: hidden;
}
.legal { margin: 6px 0 0; font-size: 11px; color: rgba(255,255,255,0.68); }

/* proof */
.proof {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1.05fr 1fr 1fr 1fr;
  gap: 12px;
}
.proof__card {
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 14px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}
.proof__lead h3 { margin: 0 0 6px; font-weight: 950; font-size: 14px; }
.proof__lead p { margin: 0; color: rgba(255,255,255,0.78); font-size: 12.5px; }

.proof__icon--mdi {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.07);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.25);
  margin-bottom: 8px;
}
.proof__icon--mdi :deep(.v-icon) {
  font-size: 22px;
  color: var(--gold);
  filter: drop-shadow(0 6px 18px rgba(200,163,69,0.25));
}
.proof__ring {
  position: absolute;
  inset: -10px;
  border-radius: 20px;
  background: radial-gradient(circle at 35% 35%, rgba(200,163,69,0.22), transparent 55%);
  filter: blur(10px);
  opacity: 0.9;
  pointer-events: none;
  transition: opacity .25s ease, transform .25s ease;
}
.proof__card:hover .proof__ring { opacity: 1; transform: scale(1.02); }
.proof__txt h4 { margin: 0 0 4px; font-size: 13px; font-weight: 950; }
.proof__txt p { margin: 0; font-size: 12px; color: rgba(255,255,255,0.78); }

/* responsive */
@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; }
  .panel { order: 2; }
  .proof { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .proof { grid-template-columns: 1fr; }
}

/* reduce motion */
@media (prefers-reduced-motion: reduce) {
  * { scroll-behavior: auto !important; }
}
</style>
