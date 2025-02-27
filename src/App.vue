<template>
  <v-app class="containers">
    <WhatsAppButton />
    <Header />
    <AboutCenter />
    <Sections />
    <Loca />
    <Encontrar />
    <Depoimentos />
    <Contagem />
    <ContatoFooter/>
  </v-app>
</template>

<script setup>
import AboutCenter from './components/AboutCenter.vue';
import Contagem from './components/contagem.vue';
import Depoimentos from './components/depoimentos.vue';
import Encontrar from './components/encontrar.vue';
import Entre from './components/entre.vue';
import Header from './components/Header.vue';
import Loca from './components/loca.vue';
import Sections from './components/sections.vue';
import { ref, onMounted } from 'vue';
import ContatoFooter from './components/ContatoFooter.vue';
import WhatsAppButton from './components/WhatsAppButton.vue';

// Estado para controlar a visibilidade dos componentes
const isLoaded = ref(false);

onMounted(() => {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      setTimeout(() => {
        isLoaded.value = true;
  }, 3000);
         }
  };
});
</script>

<style scoped>
.containers {
  background-color: rgb(243, 243, 243);
}
</style>