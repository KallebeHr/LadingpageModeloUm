<template>
  <v-footer class="footer" id="contatos" aria-label="Rodapé e contatos">
    <!-- ✅ ref em elemento HTML REAL (corrige querySelector) -->
    <div ref="root" class="rootEl">
      <!-- BG -->
      <div class="bg" aria-hidden="true">
        <div class="bg__base"></div>
        <div class="bg__grid"></div>
        <div class="bg__glow bg__glow--a"></div>
        <div class="bg__glow bg__glow--b"></div>
        <div class="bg__noise"></div>
      </div>

      <v-container class="wrap">
        <!-- Top CTA strip -->
        <div class="topCta" data-anim="topCta">
          <div class="topCta__left">
            <p class="topCta__kicker">
              <span class="dot" aria-hidden="true"></span>
              Pronto pra resolver com clareza?
              <span class="sep" aria-hidden="true"></span>
              <span class="mini">Sigilo • Agilidade • Estratégia</span>
            </p>

            <h3 class="topCta__title">Fale com um advogado agora.</h3>
            <p class="topCta__sub">
              Atendimento profissional, postura firme e orientação inicial sem compromisso.
            </p>
          </div>

          <div class="topCta__right">
            <button class="btn primary" type="button" @click="openWhatsApp()">
              WhatsApp
              <v-icon icon="mdi-whatsapp" class="ml-2" />
              <span class="shine" aria-hidden="true"></span>
            </button>

            <button class="btn ghost" type="button" @click="scrollToTop()">
              Voltar ao topo
              <v-icon icon="mdi-arrow-up" class="ml-2" />
              <span class="shine" aria-hidden="true"></span>
            </button>
          </div>
        </div>

        <v-row class="grid" align="stretch">
          <!-- Coluna 1: Contato -->
          <v-col cols="12" md="4">
            <div class="card" data-anim="card">
              <div class="cardHead">
                <h3 class="cardTitle">Contato</h3>
                <span class="chip">
                  <v-icon icon="mdi-shield-check-outline" />
                  Site seguro
                </span>
              </div>

              <div class="stack">
                <button
                  class="infoRow"
                  type="button"
                  @click="copyText(telefone, 'Telefone copiado!')"
                  aria-label="Copiar telefone"
                >
                  <span class="infoRow__icon" aria-hidden="true">
                    <v-icon icon="mdi-phone-outline" />
                  </span>
                  <span class="infoRow__txt">
                    <strong>Telefone</strong>
                    <span class="muted">{{ telefone }}</span>
                  </span>
                  <span class="infoRow__act" aria-hidden="true">
                    <v-icon icon="mdi-content-copy" />
                  </span>
                </button>

                <button
                  class="infoRow"
                  type="button"
                  @click="copyText(email, 'E-mail copiado!')"
                  aria-label="Copiar e-mail"
                >
                  <span class="infoRow__icon" aria-hidden="true">
                    <v-icon icon="mdi-email-outline" />
                  </span>
                  <span class="infoRow__txt">
                    <strong>E-mail</strong>
                    <span class="muted">{{ email }}</span>
                  </span>
                  <span class="infoRow__act" aria-hidden="true">
                    <v-icon icon="mdi-content-copy" />
                  </span>
                </button>

                <button
                  class="infoRow"
                  type="button"
                  @click="copyText(endereco, 'Endereço copiado!')"
                  aria-label="Copiar endereço"
                >
                  <span class="infoRow__icon" aria-hidden="true">
                    <v-icon icon="mdi-map-marker-outline" />
                  </span>
                  <span class="infoRow__txt">
                    <strong>Endereço</strong>
                    <span class="muted clamp">{{ endereco }}</span>
                  </span>
                  <span class="infoRow__act" aria-hidden="true">
                    <v-icon icon="mdi-content-copy" />
                  </span>
                </button>
              </div>

              <div class="social" aria-label="Redes sociais">
                <a class="socialBtn" href="#" @click.prevent aria-label="Instagram">
                  <v-icon icon="mdi-instagram" />
                </a>
                <a class="socialBtn" href="#" @click.prevent aria-label="LinkedIn">
                  <v-icon icon="mdi-linkedin" />
                </a>
                <a class="socialBtn" href="#" @click.prevent aria-label="Facebook">
                  <v-icon icon="mdi-facebook" />
                </a>
                <a class="socialBtn" href="#" @click.prevent aria-label="YouTube">
                  <v-icon icon="mdi-youtube" />
                </a>
              </div>

              <div class="secure">
                <div class="secureItem">
                  <v-icon icon="mdi-lock-outline" />
                  <span>Navegação criptografada</span>
                </div>
                <div class="secureItem">
                  <v-icon icon="mdi-check-decagram-outline" />
                  <span>Atendimento premium</span>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Coluna 2: Links úteis -->
          <v-col cols="12" md="4">
            <div class="card" data-anim="card">
              <div class="cardHead">
                <h3 class="cardTitle">Links úteis</h3>
                <span class="chip ghost">
                  <v-icon icon="mdi-link-variant" />
                  Acesso rápido
                </span>
              </div>

              <div class="list" aria-label="Links úteis">
                <a
                  v-for="link in usefulLinks"
                  :key="link.text"
                  class="listItem"
                  :href="link.to"
                  @click.prevent
                >
                  <span class="listItem__left">
                    <v-icon icon="mdi-arrow-right" />
                    {{ link.text }}
                  </span>
                  <v-icon icon="mdi-open-in-new" class="listItem__right" />
                </a>
              </div>
            </div>
          </v-col>

          <!-- Coluna 3: Áreas -->
          <v-col cols="12" md="4">
            <div class="card" data-anim="card">
              <div class="cardHead">
                <h3 class="cardTitle">Áreas de atuação</h3>
                <span class="chip ghost">
                  <v-icon icon="mdi-scale-balance" />
                  Full service
                </span>
              </div>

              <div class="tags" aria-label="Áreas de atuação">
                <span v-for="area in practiceAreas" :key="area" class="tag">
                  <v-icon icon="mdi-check" />
                  {{ area }}
                </span>
              </div>

              <div class="miniCta">
                <button class="btn small primary" type="button" @click="openWhatsApp()">
                  Agendar avaliação
                  <span class="shine" aria-hidden="true"></span>
                </button>
                <p class="miniNote">*Sem compromisso. Resposta em horário comercial.</p>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Bottom bar -->
        <div class="bottom" data-anim="bottom" aria-label="Informações legais">
          <div class="bottom__left">
            <p class="copy">©{{ year }} {{ brand }} — Todos os direitos reservados.</p>
            <p class="small">CNPJ {{ cnpj }} | OAB {{ oab }}</p>
            <p class="small">{{ endereco }}</p>
          </div>

          <div class="bottom__right">
            <button class="miniBtn" type="button" @click="copyText(cnpj, 'CNPJ copiado!')">
              <v-icon icon="mdi-content-copy" />
              Copiar CNPJ
            </button>
            <button class="miniBtn" type="button" @click="copyText(oab, 'OAB copiada!')">
              <v-icon icon="mdi-content-copy" />
              Copiar OAB
            </button>
          </div>
        </div>
      </v-container>

      <!-- ✅ Vuetify 3 Snackbar -->
      <v-snackbar
        v-model="snack.show"
        :timeout="2200"
        location="bottom center"
        class="snack"
      >
        <div class="snackRow">
          <v-icon icon="mdi-check-circle-outline" class="mr-2" />
          <span>{{ snack.text }}</span>
        </div>

        <template #actions>
          <v-btn variant="text" @click="snack.show = false">Ok</v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-footer>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const root = ref(null);

// ===== Dados (troque pelos seus) =====
const brand = "Exemplo & Advogados";
const year = new Date().getFullYear();

const telefone = "0800 123 4567";
const email = "contato@exemplo.com";
const endereco =
  "SCS Quadra 08, Venâncio Shopping, Bloco B-60, 2º Andar, Salas 203 e 204, Brasília - DF, CEP 70.333-900";
const cnpj = "12.345.678/0001-00";
const oab = "OAB/DF 1234/56";

const usefulLinks = [
  { text: "Banco de Talentos", to: "/talentos" },
  { text: "Área do Cliente", to: "/cliente" },
  { text: "Fale Conosco", to: "/contato" },
  { text: "Política de Privacidade", to: "/privacidade" },
  { text: "Termos de Uso", to: "/termos" },
  { text: "Nossos Advogados", to: "/advogados" },
  { text: "O Escritório", to: "/escritorio" },
  { text: "Áreas de Atuação", to: "/areas" }
];

const practiceAreas = [
  "Direito de Família",
  "Inventário e Sucessões",
  "Direito Criminal",
  "Direito Empresarial",
  "Direito Imobiliário",
  "Direito Administrativo",
  "Direito Ambiental"
];

// ===== Snackbar =====
const snack = reactive({ show: false, text: "" });

function prefersReduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Copy com fallback
async function copyText(text, message = "Copiado!") {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  } finally {
    snack.text = message;
    snack.show = true;
  }
}

function openWhatsApp() {
  // troque pelo seu número
  const phone = "5581999999999";
  const msg = "Olá, vim através do site. Gostaria de uma avaliação inicial.";
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

let mm;

onMounted(async () => {
  await nextTick();

  // ✅ agora root é HTMLElement de verdade
  const s = root.value;
  if (!s || prefersReduce()) return;

  const topCta = s.querySelector('[data-anim="topCta"]');
  const cards = s.querySelectorAll('[data-anim="card"]');
  const bottom = s.querySelector('[data-anim="bottom"]');

  gsap.set([topCta, ...cards, bottom].filter(Boolean), {
    autoAlpha: 0,
    y: 14,
    filter: "blur(10px)"
  });

  mm = gsap.matchMedia();
  mm.add("(min-width: 0px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: s, start: "top 80%", once: true },
      defaults: { ease: "power2.out" }
    });

    tl.to(topCta, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, 0)
      .to(cards, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.08 }, 0.12)
      .to(bottom, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 0.32);

    // hover micro (leve)
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -2, duration: 0.18, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.18, ease: "power2.out" });
      });
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
.footer {
  position: relative;
  padding: 86px 0 54px;
  overflow: hidden;

  --gold: #c8a345;
  --line: rgba(255, 255, 255, 0.14);
  --glass: rgba(255, 255, 255, 0.06);
  --txt: rgba(255, 255, 255, 0.92);
  --muted: rgba(255, 255, 255, 0.7);
}

.rootEl {
  position: relative;
  width: 100%;
}

/* container */
.wrap {
  position: relative;
  z-index: 1;
  max-width: 1200px;
}

/* BG */
.bg { position: absolute; inset: 0; z-index: 0; }
.bg__base { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(2, 6, 23, 0.94), rgba(2, 6, 23, 0.82)); }
.bg__grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 72px 72px;
  opacity: 0.16;
  mask-image: radial-gradient(900px 420px at 25% 0%, black, transparent 70%);
}
.bg__glow { position: absolute; width: 760px; height: 760px; filter: blur(18px); opacity: 0.9; }
.bg__glow--a { left: -340px; top: -380px; background: radial-gradient(circle at 30% 30%, rgba(200, 163, 69, 0.22), transparent 58%); }
.bg__glow--b { right: -380px; bottom: -420px; background: radial-gradient(circle at 60% 60%, rgba(200, 163, 69, 0.14), transparent 60%); opacity: 0.75; }
.bg__noise {
  position: absolute; inset: 0;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

/* top CTA */
.topCta {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 14px;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 22px;
  padding: 18px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 26px 90px rgba(2, 6, 23, 0.35);
  margin-bottom: 18px;
}
.topCta__kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 950;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.74);
  margin: 0 0 8px;
  flex-wrap: wrap;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 99px;
  background: var(--gold);
  box-shadow: 0 0 0 6px rgba(200, 163, 69, 0.1);
}
.sep { width: 1px; height: 16px; background: rgba(255, 255, 255, 0.16); }
.mini { letter-spacing: 0.08em; color: rgba(255, 255, 255, 0.7); }

.topCta__title {
  margin: 0;
  font-weight: 1000;
  letter-spacing: -0.6px;
  font-size: 18px;
  color: rgba(255,255,255,0.92);
}
.topCta__sub {
  margin: 6px 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 13px;
  line-height: 1.6;
}
.topCta__right {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

/* cards */
.grid { margin-top: 6px; }
.card {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 22px;
  padding: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 26px 90px rgba(2, 6, 23, 0.35);
}

.cardHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}
.cardTitle {
  margin: 0;
  font-weight: 1000;
  letter-spacing: -0.4px;
  font-size: 16px;
  color: rgba(255,255,255,0.92);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.18);
  font-weight: 950;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.88);
}
.chip.ghost { background: rgba(255, 255, 255, 0.06); }

/* contact rows */
.stack { display: grid; gap: 10px; }
.infoRow {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.18);
  border-radius: 18px;
  padding: 12px;
  text-align: left;
  display: grid;
  grid-template-columns: 44px 1fr 34px;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.infoRow:hover {
  transform: translateY(-1px);
  border-color: rgba(200, 163, 69, 0.22);
  background: rgba(255, 255, 255, 0.06);
}
.infoRow:focus-visible {
  outline: 0;
  box-shadow: 0 0 0 6px rgba(200, 163, 69, 0.18);
}
.infoRow__icon {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: var(--gold);
}
.infoRow__txt strong { display: block; font-size: 13px; color: rgba(255, 255, 255, 0.92); }
.muted { display: block; margin-top: 2px; font-size: 12px; color: rgba(255, 255, 255, 0.7); }
.clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.infoRow__act { color: rgba(255, 255, 255, 0.82); }

/* social */
.social {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  justify-content: flex-start;
}
.socialBtn {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.socialBtn:hover { transform: translateY(-1px); border-color: rgba(200, 163, 69, 0.22); }

/* secure */
.secure {
  margin-top: 12px;
  display: grid;
  gap: 8px;
}
.secureItem {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.74);
}

/* links list */
.list { display: grid; gap: 10px; }
.listItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.18);
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 900;
  font-size: 13px;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.listItem:hover {
  transform: translateY(-1px);
  border-color: rgba(200, 163, 69, 0.22);
  background: rgba(255, 255, 255, 0.06);
}
.listItem__left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.listItem__right { opacity: 0.9; }

/* tags */
.tags { display: flex; flex-wrap: wrap; gap: 10px; }
.tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.18);
  color: rgba(255, 255, 255, 0.88);
  font-weight: 900;
  font-size: 12px;
}

/* mini cta */
.miniCta { margin-top: 14px; }
.miniNote { margin: 8px 0 0; font-size: 12px; color: rgba(255, 255, 255, 0.64); }

/* buttons */
.btn {
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 12px 14px;
  cursor: pointer;
  font-weight: 1000;
  letter-spacing: 0.2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.btn:hover { transform: translateY(-1px); }
.btn.primary {
  background: linear-gradient(90deg, rgba(200, 163, 69, 0.95), rgba(200, 163, 69, 0.72));
  color: #0b1220;
  border-color: rgba(200, 163, 69, 0.55);
}
.btn.ghost { background: rgba(0, 0, 0, 0.18); }
.btn.small { width: 100%; }

.shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent);
  transform: translateX(-140%);
  transition: transform 0.7s ease;
  pointer-events: none;
}
.btn:hover .shine { transform: translateX(140%); }

/* bottom */
.bottom {
  margin-top: 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.18);
  border-radius: 22px;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.copy { margin: 0; font-weight: 950; color: rgba(255, 255, 255, 0.88); }
.small { margin: 4px 0 0; font-size: 12px; color: rgba(255, 255, 255, 0.7); }
.bottom__right { display: flex; flex-wrap: wrap; gap: 10px; }

.miniBtn {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.88);
  border-radius: 999px;
  padding: 9px 12px;
  font-weight: 950;
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.miniBtn:hover { transform: translateY(-1px); border-color: rgba(200, 163, 69, 0.22); }
.miniBtn:focus-visible { outline: 0; box-shadow: 0 0 0 6px rgba(200, 163, 69, 0.18); }

/* snackbar */
.snackRow { display: inline-flex; align-items: center; }

/* responsive */
@media (max-width: 960px) {
  .topCta { grid-template-columns: 1fr; }
  .topCta__right { justify-content: flex-start; }
  .social { justify-content: center; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .btn,
  .infoRow,
  .socialBtn,
  .listItem,
  .miniBtn {
    transition: none !important;
  }
}
</style>
