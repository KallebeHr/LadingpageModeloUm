<template>
  <section class="loc" id="local" ref="root" aria-label="Localização do escritório">
    <!-- Snackbar Vuetify -->
    <v-snackbar
      v-model="snack.show"
      :timeout="2200"
      location="bottom center"
      rounded="xl"
      class="snackbar"
    >
      <div class="snackRow">
        <v-icon :icon="snack.icon" class="mr-2" />
        <span>{{ snack.text }}</span>
      </div>

      <template #actions>
        <v-btn variant="text" @click="snack.show = false">Fechar</v-btn>
      </template>
    </v-snackbar>

    <!-- BG premium -->
    <div class="bg" aria-hidden="true">
      <div class="bg__base"></div>
      <div class="bg__grid"></div>
      <div class="bg__glow bg__glow--a"></div>
      <div class="bg__glow bg__glow--b"></div>
      <div class="bg__noise"></div>
    </div>

    <div class="wrap">
      <header class="head">
        <p class="kicker" data-anim="kicker">
          <span class="dot" aria-hidden="true"></span>
          Onde nos encontrar
        </p>

        <h2 class="title" data-anim="title">
          Localização e rota no mapa
          <span class="title__line" aria-hidden="true"></span>
        </h2>

        <p class="subtitle" data-anim="subtitle">
          Copie o endereço, centralize no ponto ou trace a rota direto aqui.
          <span class="muted">Sem poluição visual.</span>
        </p>
      </header>

      <div class="grid">
        <!-- LEFT -->
        <aside class="card" data-anim="card" aria-label="Endereço e ações">
          <div class="card__top">
            <div class="pin" aria-hidden="true">
              <v-icon icon="mdi-map-marker-radius" />
              <span class="pin__ring"></span>
            </div>

            <div class="card__meta">
              <h3 class="card__title">Sede principal</h3>
              <p class="card__place">Brasília • DF</p>
            </div>
          </div>

          <div class="addr" data-anim="addr">
            <p class="addr__line">
              TAC Quadra 01, Villa Shopping, Bloco B-10, 6º Andar, Salas 313 e 284
            </p>
            <p class="addr__line">
              Brasília - DF • <strong>CEP:</strong> 70.333-900
            </p>
          </div>

          <div class="chips" data-anim="chips" aria-label="Informações rápidas">
            <span class="chip"><v-icon icon="mdi-shield-check-outline" /> Atendimento com sigilo</span>
            <span class="chip"><v-icon icon="mdi-navigation-variant-outline" /> Rota no mapa</span>
            <span class="chip"><v-icon icon="mdi-clock-outline" /> Horário comercial</span>
          </div>

          <div class="actions" data-anim="actions">
            <button class="btn primary" type="button" @click="traceRouteInMap()">
              Traçar rota aqui
              <span class="chev" aria-hidden="true"></span>
              <span class="shine" aria-hidden="true"></span>
            </button>

            <div class="row2">
              <button class="btn ghost" type="button" @click="recenter()">
                Centralizar
                <v-icon icon="mdi-crosshairs-gps" class="ml-2" />
                <span class="shine" aria-hidden="true"></span>
              </button>

              <button class="btn ghost" type="button" @click="copyAddress()">
                Copiar
                <v-icon icon="mdi-content-copy" class="ml-2" />
                <span class="shine" aria-hidden="true"></span>
              </button>
            </div>

            <div class="row2">
              <button class="btn ghost" type="button" @click="openGoogleMaps()">
                Google Maps
                <v-icon icon="mdi-open-in-new" class="ml-2" />
                <span class="shine" aria-hidden="true"></span>
              </button>

              <button v-if="routingActive" class="btn danger" type="button" @click="clearRoute()">
                Limpar
                <v-icon icon="mdi-close" class="ml-2" />
                <span class="shine" aria-hidden="true"></span>
              </button>
            </div>
          </div>

          <div class="status" data-anim="status" aria-live="polite">
            <div class="status__dot" :class="{ on: routingActive }" aria-hidden="true"></div>
            <p class="status__text">
              <span v-if="!routingActive">Rota não traçada.</span>
              <span v-else>Rota ativa no mapa.</span>
            </p>
          </div>

          <p class="note" data-anim="note">
            *Se o GPS não estiver disponível, abrimos o trajeto no Google Maps automaticamente.
          </p>
        </aside>

        <!-- RIGHT -->
        <div class="mapWrap" data-anim="map">
          <div class="mapHead">
            <div class="mapHead__left">
              <p class="mapKicker">Mapa</p>
              <p class="mapTiny">Arraste e aproxime.</p>
            </div>

            <div class="mapHead__right">
              <button class="miniBtn" type="button" @click="toggleScrollZoom()">
                <v-icon :icon="scrollZoomEnabled ? 'mdi-mouse' : 'mdi-mouse-off'" />
                {{ scrollZoomEnabled ? "Scroll zoom ON" : "Scroll zoom OFF" }}
              </button>
            </div>
          </div>

          <div class="map" ref="mapEl" aria-label="Mapa do escritório"></div>

          <div class="mapFooter">
            <span class="pill">
              <span class="pill__dot" aria-hidden="true"></span>
              Ponto marcado
            </span>

            <span class="pill ghost">
              <v-icon :icon="routingActive ? 'mdi-route' : 'mdi-information-outline'" />
              {{ routingActive ? "Rota ativa" : "Clique em “Traçar rota aqui”" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Routing Machine
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// GSAP
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const root = ref(null);
const mapEl = ref(null);

const coords = { lat: -15.7942, lng: -47.8825 };
const zoom = 14;

const addressText =
  "TAC Quadra 01, Villa Shopping, Bloco B-10, 6º Andar, Salas 313 e 284, Brasília - DF, CEP 70.333-900";

let map = null;
let marker = null;
let routingControl = null;

const routingActive = ref(false);
const scrollZoomEnabled = ref(false);

// Snackbar Vuetify
const snack = ref({ show: false, text: "", icon: "mdi-check-circle-outline" });
function toast(text, icon = "mdi-check-circle-outline") {
  snack.value = { show: true, text, icon };
}

function prefersReduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function openGoogleMaps() {
  const dest = `${coords.lat},${coords.lng}`;
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${dest}`,
    "_blank",
    "noopener,noreferrer"
  );
}

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(addressText);
    toast("Endereço copiado!", "mdi-content-copy");
  } catch {
    toast("Não consegui copiar automaticamente.", "mdi-alert-circle-outline");
  }
}

function recenter() {
  if (!map) return;
  map.setView([coords.lat, coords.lng], zoom, { animate: true });
  marker?.openPopup();
}

function toggleScrollZoom() {
  if (!map) return;
  scrollZoomEnabled.value = !scrollZoomEnabled.value;
  scrollZoomEnabled.value ? map.scrollWheelZoom.enable() : map.scrollWheelZoom.disable();
}

function clearRoute(silent = false) {
  if (!map) return;

  if (routingControl) {
    map.removeControl(routingControl);
    routingControl = null;
  }
  routingActive.value = false;

  if (!silent) toast("Rota removida.", "mdi-close-circle-outline");
}

function getUserPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("Geolocation não suportado"));
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: false, timeout: 5000 }
    );
  });
}

async function traceRouteInMap() {
  if (!map) return;

  // refaz leve
  if (routingControl) clearRoute(true);

  let origin = null;
  try {
    origin = await getUserPosition();
  } catch {
    toast("GPS indisponível. Abrindo no Google Maps…", "mdi-map-marker-alert-outline");
    openGoogleMaps();
    return;
  }

  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(origin.lat, origin.lng),
      L.latLng(coords.lat, coords.lng)
    ],
    routeWhileDragging: true,
    addWaypoints: false,
    fitSelectedRoutes: true,
    show: false,
    lineOptions: {
      addWaypoints: false,
      styles: [
        { color: "#c8a345", opacity: 0.95, weight: 5 },
        { color: "rgba(255,255,255,0.18)", opacity: 0.9, weight: 10 }
      ]
    },
    createMarker: function (i, wp) {
      const html = `
        <div class="routePin ${i === 0 ? "origin" : "dest"}">
          <div class="routePin__core"></div>
          <div class="routePin__ring"></div>
        </div>
      `;
      return L.marker(wp.latLng, {
        icon: L.divIcon({
          className: "routePinWrap",
          html,
          iconSize: [44, 44],
          iconAnchor: [22, 36]
        })
      });
    }
  }).addTo(map);

  routingActive.value = true;
  toast("Rota traçada no mapa.", "mdi-route");
  marker?.openPopup();
}

function initMap() {
  if (!mapEl.value) return;

  map = L.map(mapEl.value, {
    zoomControl: false,
    scrollWheelZoom: false
  }).setView([coords.lat, coords.lng], zoom);

  // tiles dark (leve e consistente)
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 20,
    attribution: "&copy; OpenStreetMap &copy; CARTO"
  }).addTo(map);

  L.control.zoom({ position: "bottomright" }).addTo(map);

  const markerHtml = `
    <div class="pinMarker">
      <div class="pinMarker__pulse"></div>
      <div class="pinMarker__core"></div>
      <div class="pinMarker__halo"></div>
    </div>
  `;

  const icon = L.divIcon({
    className: "pinMarkerWrap",
    html: markerHtml,
    iconSize: [44, 44],
    iconAnchor: [22, 36]
  });

  marker = L.marker([coords.lat, coords.lng], { icon }).addTo(map);
  marker.bindPopup(`<strong>Sede principal</strong><br/>${addressText}`);

  L.circle([coords.lat, coords.lng], {
    color: "#c8a345",
    weight: 1,
    fillColor: "#c8a345",
    fillOpacity: 0.12,
    radius: 220
  }).addTo(map);

  setTimeout(() => map?.invalidateSize(), 220);
}

let mm;

onMounted(async () => {
  await nextTick();

  // animações de entrada (1 timeline só)
  if (root.value && !prefersReduce()) {
    const s = root.value;

    const group1 = [
      s.querySelector('[data-anim="kicker"]'),
      s.querySelector('[data-anim="title"]'),
      s.querySelector('[data-anim="subtitle"]')
    ].filter(Boolean);

    const group2 = [
      s.querySelector('[data-anim="card"]'),
      s.querySelector('[data-anim="map"]')
    ].filter(Boolean);

    const group3 = [
      s.querySelector('[data-anim="addr"]'),
      s.querySelector('[data-anim="chips"]'),
      s.querySelector('[data-anim="actions"]'),
      s.querySelector('[data-anim="status"]'),
      s.querySelector('[data-anim="note"]')
    ].filter(Boolean);

    gsap.set([...group1, ...group2, ...group3], { autoAlpha: 0, y: 12, filter: "blur(10px)" });

    mm = gsap.matchMedia();
    mm.add("(min-width: 0px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: s, start: "top 80%", once: true },
        defaults: { ease: "power2.out" }
      });

      tl.to(group1, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.07 }, 0)
        .to(group2, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.08 }, 0.18)
        .to(group3, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45, stagger: 0.06 }, 0.28);

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }

  initMap();
});

onUnmounted(() => {
  mm?.revert();
  ScrollTrigger.getAll().forEach((t) => t.kill());

  clearRoute(true);
  if (map) {
    map.remove();
    map = null;
    marker = null;
  }
});
</script>

<style scoped>
/* Snackbar */
.snackbar :deep(.v-overlay__content) { backdrop-filter: blur(10px); }
.snackRow { display: inline-flex; align-items: center; gap: 8px; font-weight: 800; }

/* Seção dark */
.loc {
  position: relative;
  padding: 78px 0 86px;
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
  position: absolute; inset: 0; opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

/* wrap */
.wrap { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 18px; color: #fff; }

/* head */
.head { margin-bottom: 18px; }
.kicker {
  display: inline-flex; align-items: center; gap: 10px;
  font-weight: 850; letter-spacing: .22em; text-transform: uppercase;
  font-size: 12px; color: rgba(255,255,255,0.74); margin: 0 0 10px;
}
.dot { width: 8px; height: 8px; border-radius: 99px; background: var(--gold); box-shadow: 0 0 0 6px rgba(200,163,69,.10); }
.title { margin: 0; font-size: clamp(26px, 3vw, 40px); font-weight: 950; letter-spacing: -0.6px; line-height: 1.1; }
.title__line { display: block; width: 90px; height: 3px; border-radius: 999px; background: linear-gradient(90deg, var(--gold), transparent); margin-top: 12px; opacity: 0.95; }
.subtitle { margin: 12px 0 0; max-width: 72ch; color: rgba(255,255,255,0.80); line-height: 1.6; font-size: 14px; }
.muted { color: rgba(255,255,255,0.68); }

/* grid */
.grid { display: grid; grid-template-columns: 0.95fr 1.15fr; gap: 16px; align-items: stretch; }

/* card */
.card {
  border: 1px solid var(--line);
  background: var(--glass);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 26px 90px rgba(2,6,23,0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow: hidden;
  position: relative;
}
.card::before {
  content: "";
  position: absolute; inset: 0;
  background: radial-gradient(600px 200px at 80% 10%, rgba(200,163,69,.14), transparent 60%);
  pointer-events: none;
}
.card__top { display: flex; align-items: center; gap: 12px; }
.pin {
  position: relative; width: 44px; height: 44px;
  border-radius: 16px; display: grid; place-items: center;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.08);
}
.pin :deep(.v-icon) { font-size: 22px; color: var(--gold); }
.pin__ring {
  position: absolute; inset: -12px; border-radius: 22px;
  background: radial-gradient(circle at 35% 35%, rgba(200,163,69,0.20), transparent 60%);
  filter: blur(10px); opacity: 0.9; pointer-events: none;
}
.card__title { margin: 0; font-weight: 950; letter-spacing: -.2px; color: var(--txt); }
.card__place { margin: 2px 0 0; color: rgba(255,255,255,0.72); font-size: 12px; }

.addr {
  margin-top: 14px;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.18);
}
.addr__line { margin: 0; color: rgba(255,255,255,0.86); line-height: 1.55; font-size: 13px; }
.addr__line + .addr__line { margin-top: 6px; }

.chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
.chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 10px; border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.88);
  font-size: 12px;
  font-weight: 850;
}

/* actions */
.actions { margin-top: 14px; display: grid; gap: 10px; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
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
.btn.danger {
  background: rgba(255, 60, 60, 0.12);
  border-color: rgba(255, 60, 60, 0.22);
}
.shine {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
  transform: translateX(-140%);
  transition: transform .6s ease;
  pointer-events: none;
}
.btn:hover .shine { transform: translateX(140%); }
.chev {
  width: 10px; height: 10px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(-45deg);
}
.status {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.18);
}
.status__dot { width: 10px; height: 10px; border-radius: 99px; background: rgba(255,255,255,0.22); }
.status__dot.on { background: var(--gold); box-shadow: 0 0 0 6px rgba(200,163,69,0.10); }
.status__text { margin: 0; font-size: 12px; color: rgba(255,255,255,0.78); }
.note { margin: 12px 0 0; font-size: 12px; color: rgba(255,255,255,0.70); }

/* mapWrap */
.mapWrap {
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  border-radius: 20px;
  padding: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 26px 90px rgba(2,6,23,0.35);
}
.mapHead { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
.mapKicker { margin: 0; font-weight: 950; letter-spacing: -.2px; }
.mapTiny { margin: 4px 0 0; font-size: 12px; color: rgba(255,255,255,0.72); }
.miniBtn {
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.9);
  border-radius: 999px;
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 900;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.map { width: 100%; height: 420px; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.14); }
.mapFooter { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between; }
.pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 12px; border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.18);
  font-weight: 900; font-size: 12px;
  color: rgba(255,255,255,0.86);
}
.pill__dot { width: 8px; height: 8px; border-radius: 99px; background: var(--gold); box-shadow: 0 0 0 6px rgba(200,163,69,.10); }
.pill.ghost { background: rgba(255,255,255,0.06); }

/* Leaflet */
:deep(.leaflet-control-zoom a) {
  background: rgba(2,6,23,0.65) !important;
  color: #fff !important;
  border: 1px solid rgba(255,255,255,0.14) !important;
}
:deep(.leaflet-popup-content-wrapper) {
  background: rgba(2,6,23,0.86);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 14px;
}
:deep(.leaflet-popup-tip) { background: rgba(2,6,23,0.86); }
:deep(.leaflet-routing-container) { display: none !important; }

/* Marker principal */
:deep(.pinMarkerWrap) { background: transparent; border: 0; }
:deep(.pinMarker) { position: relative; width: 44px; height: 44px; }
:deep(.pinMarker__core) {
  position: absolute; left: 50%; top: 50%;
  width: 12px; height: 12px;
  transform: translate(-50%, -50%);
  border-radius: 99px;
  background: var(--gold);
  box-shadow: 0 12px 36px rgba(200,163,69,.35);
}
:deep(.pinMarker__halo) {
  position: absolute; left: 50%; top: 50%;
  width: 22px; height: 22px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  border: 2px solid rgba(200,163,69,0.65);
  opacity: 0.95;
}
:deep(.pinMarker__pulse) {
  position: absolute; left: 50%; top: 50%;
  width: 22px; height: 22px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: rgba(200,163,69,0.18);
  animation: pulse 1.6s ease-out infinite;
}
@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.65; }
  100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
}

/* Route pins */
:deep(.routePinWrap) { background: transparent; border: 0; }
:deep(.routePin) { position: relative; width: 44px; height: 44px; }
:deep(.routePin__core) {
  position: absolute; left: 50%; top: 50%;
  width: 10px; height: 10px;
  transform: translate(-50%, -50%);
  border-radius: 99px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(2,6,23,0.45);
}
:deep(.routePin.dest .routePin__core) { background: var(--gold); }
:deep(.routePin__ring) {
  position: absolute; left: 50%; top: 50%;
  width: 24px; height: 24px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  border: 2px solid rgba(255,255,255,0.35);
}
:deep(.routePin.dest .routePin__ring) { border-color: rgba(200,163,69,0.65); }

/* responsive */
@media (max-width: 980px) {
  .grid { grid-template-columns: 1fr; }
  .map { height: 360px; }
}
@media (max-width: 520px) {
  .map { height: 300px; }
  .row2 { grid-template-columns: 1fr; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .btn { transition: none !important; }
}
</style>
