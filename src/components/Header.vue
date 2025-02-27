<template>
  <header :class="{ hidden: hidden }" class="navbar">
    <div class="t">
      <img src="../assets/logocente.png" alt="" class="logo">
      <nav>
        <ul v-if="!isMobile">
          <li @click="handleClick('#home')">Home</li>
          <li @click="handleClick('#servicos')">Serviços</li>
          <li @click="handleClick('#equipe')">Nossa equipe</li>
          <li @click="handleClick('#local')">local</li>
          <li @click="handleClick('#depoimentos')">depoimentos</li>
          <li @click="handleClick('#contatos')">contatos</li>
        </ul>
        <v-icon @click.stop="toggleDrawer" v-if="isMobile" style="cursor: pointer;color:black; margin-right:10px;" icon="mdi-menu" />
      </nav>
    </div>
    <v-navigation-drawer v-model="drawer" location="right" class="menuH" temporary>
      <v-card class="headerMenu">
        <v-container class="test">
          <div class="Hnav">         
            <ul class="header-nav">
              <li @click="handleClick('#home')">Home</li>
              <li @click="handleClick('#servicos')">Serviços</li>
              <li @click="handleClick('#equipe')">Nossa equipe</li>
              <li @click="handleClick('#local')">local</li>
              <li @click="handleClick('#depoimentos')">depoimentos</li>
              <li @click="handleClick('#contatos')">contatos</li>
            </ul>
            <p>Entrar em contato</p>
          </div>
        </v-container>
      </v-card>
    </v-navigation-drawer>

  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { useGoTo } from 'vuetify';
import { mdiPhone, mdiEmailOutline, mdiClockTimeEightOutline, mdiLinkedin, mdiInstagram } from '@mdi/js';

const hidden = ref(false); // Controla se o header está visível ou não
let lastScrollTop = 0; // Armazena a última posição do scroll
const isMobile = ref(false); // Verifica se a tela é mobile
const drawer = ref(false); // Controla se o menu mobile está aberto
const goTo = useGoTo();

// Verifica o tamanho da tela para definir se é mobile
const handleWindowSizeChange = () => {
  isMobile.value = window.innerWidth <= 1030;
};

// Lógica para esconder ou mostrar o header ao rolar a página
const handleScroll = () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
    // Rolando para baixo e passou de 50px
    hidden.value = true;
  } else if (currentScrollTop < lastScrollTop) {
    // Rolando para cima
    hidden.value = false;
  }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Evita valores negativos
};

// Abre ou fecha o menu mobile
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

// Navega para uma seção da página
const handleClick = (id) => {
  goTo(id);
  drawer.value = false; // Fecha o menu mobile ao clicar em um item
};

// Adiciona os listeners ao montar o componente
onMounted(() => {
  handleWindowSizeChange();
  window.addEventListener('resize', handleWindowSizeChange);
  window.addEventListener('scroll', handleScroll);
});

// Remove os listeners ao desmontar o componente
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleWindowSizeChange);
});
</script>

<style scoped>
.t {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  color: #979797;
  background: #fffbff;
  z-index: 1000;
  transition: top 0.6s ease-in-out;
}

.hidden {
  top: -8rem; /* Esconde o header movendo-o para cima */
}

.logo {
  height: 4.5rem;
  padding: 10px;
}

header h1 {
  margin: 10px;
  font-size: 2rem;
}

header nav ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}

header nav ul li {
  margin-right: 60px;
  cursor: pointer;
  font-family: "Inknut Antiqua", serif;
  text-align: center;
  transition: 0.4s;
  color: black;
  font-weight: 300;
}

header nav ul li:hover {
  color: #c8a345;
}

.headerAbout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.5rem;
  color: #4d4d4d;
  background: #fffbff;
  box-shadow: inset 0px -8px 20px 2px rgb(0 0 0 / 30%);
}

.v-navigation-drawer__scrim {
  height: 45rem;
}

.headerMenu {
  display: flex;
  justify-content: center;
  height: 100%;
}

.Hnav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  flex-direction: column;
}


.header-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  margin-top: 1rem;
}

.header-nav li {
  font-size: 1rem;
  color: #d8d8d8;
  width: 13rem;
  letter-spacing: 1px;
  font-weight: 900;
  background: #636363;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
}

.icon {
  cursor: pointer;
}

.duvidas {
  display: flex;
  align-items: center;
  text-align: center;
  height: 4rem;
  background: #65746D;
  color: #ffffff;
  margin: 0px;
  padding: 10px;
  cursor: pointer;
}
/* Estilo do menu hamburger */
.menuH {
  background-color: rgba(255, 255, 255, 0.95); /* Fundo semi-transparente */
  backdrop-filter: blur(10px); /* Efeito de desfoque */
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.menuH .headerMenu {
  background-color: transparent; /* Fundo transparente */
}

.menuH .Hnav {
  padding: 20px;
}

.menuH .header-nav li {
  background-color: #c8a345; /* Cor de fundo dos itens */
  color: #fff; /* Cor do texto */
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.menuH .header-nav li:hover {
  background-color: #b38f3a; /* Cor de fundo ao passar o mouse */
  transform: translateX(5px); /* Efeito de deslocamento */
}

.menuH .Hnav p {
  background-color: #65746D; /* Cor de fundo do botão de contato */
  color: #fff; /* Cor do texto */
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menuH .Hnav p:hover {
  background-color: #556b64; /* Cor de fundo ao passar o mouse */
}
/* Dispositivos pequenos (celulares em modo retrato e menores) */
@media (max-width: 600px) {
  .headerAbout-p p {
    display: flex;
    align-items: center;
    margin: 5px;
    height: 100%;
    font-size: .6rem;
  }
}

/* Dispositivos médios (celulares em modo paisagem e tablets em modo retrato) */
@media (min-width: 601px) and (max-width: 768px) {
  .headerAbout-p p {
    display: flex;
    align-items: center;
    margin: 5px;
    height: 100%;
    font-size: .6rem;
  }
}

/* Dispositivos médios a grandes (tablets em modo paisagem e pequenos desktops) */
@media (min-width: 769px) and (max-width: 1024px) {
  .hidden {
    top: -9rem; /* Ajuste conforme necessário para a altura da sua navbar */
  }
}

/* Dispositivos grandes (laptops e desktops) */
@media (min-width: 1025px) and (max-width: 1200px) {
  .hidden {
    top: -10rem; /* Ajuste conforme necessário para a altura da sua navbar */
  }
}

/* Dispositivos extragrandes (desktops grandes) */
@media (min-width: 1201px) {
  .hidden {
    top: -10.5rem; /* Ajuste conforme necessário para a altura da sua navbar */
  }
}
</style>