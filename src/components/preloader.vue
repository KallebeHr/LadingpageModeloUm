<template>
  <div class='container'>
<div class="textWrapper">
  <p class="text">Dr. <span class="highlight">Seu Nome</span></p>
  <div class="invertbox"></div>
</div>
<img src="/LogoPNG.png" class="logoName" alt="">
</div>
</template>

<script setup>
</script>

<style scoped>
.container{
    display:flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: black;
    }
    /* From Uiverse.io by Subaashbala */ 
/* From Uiverse.io by Uncannypotato69 */ 
.textWrapper {
  height: fit-content;
  min-width: 3rem;
  width: fit-content;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.25ch;
  position: relative;
  z-index: 0;
  color: white
}
.logoName{
  width: 10rem;
}
.highlight{
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem); /* Fonte levemente reduzida */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 0.5rem; /* Margem reduzida */
  text-shadow: 0 4px 15px rgba(0,0,0,0.5);
  color: rgb(255, 0, 0);

}
.invertbox {
  position: absolute;
  height: 100%;
  aspect-ratio: 1/1;
  left: 0;
  top: 0;
  border-radius: 20%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: invert(10%);
  animation: move 2s ease-in-out infinite;
  color:  rgb(255, 0, 0);

}
.text {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem); /* Fonte levemente reduzida */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 0.5rem; /* Margem reduzida */
  text-shadow: 0 4px 15px rgba(0,0,0,0.5);
  color: aliceblue;
}
@keyframes move {
  50% {
    left: calc(100% - 3rem);
  }
}

</style>