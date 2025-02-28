<template>
  <div class="body" v-if="!isloaded">
    <div class="loading-container">
  <div class="loading-text">
    <span>M</span>
    <span>A</span>
    <span>X</span>
    <span>-</span>
    <span>D</span>
    <span>E</span>
    <span>V</span>
  </div>
  <div class="loading-text-two">
    <span>C</span>
    <span>A</span>
    <span>R</span>
    <span>R</span>
    <span>E</span>
    <span>G</span>
    <span>A</span>
    <span>N</span>
    <span>D</span>
    <span>o</span>
  </div>
   
</div>
  </div>
</template>

<script>
export default {
    data: () => {
      return {
        isloaded: false
      }
    },
    mounted() {
      document.onreadystatechange = () => {
        if (document.readyState == "complete") { 
          this.isloaded = true;
        } 
      }
    },
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
* {
      box-sizing: border-box;
    }

    .body {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Montserrat', sans-serif;
    }

    .loading-container {
      width: 100%;
      max-width: 520px;
      text-align: center;
      color: black;
      position: relative;
      margin: 0 32px;
    }

    .loading-container::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: #fff;
      bottom: 0;
      left: 0;
      border-radius: 10px;
      animation: movingLine 2.4s infinite ease-in-out;
    }

    @keyframes movingLine {
      0% {
        opacity: 0;
        width: 0;
      }
      33.3%, 66% {
        opacity: 0.8;
        width: 100%;
      }
      85% {
        width: 0;
        left: initial;
        right: 0;
        opacity: 1;
      }
      100% {
        opacity: 0;
        width: 0;
      }
    }
    .loading-text-two{
      font-size: 5vw;
      line-height: 64px;
      letter-spacing: 10px;
      margin-bottom: 32px;
      display: flex;
      align-items: end;
      justify-content: space-evenly;
    }
    .loading-text {
      font-size: 5vw;
      line-height: 64px;
      letter-spacing: 10px;
      margin-bottom: 32px;
      display: flex;
      justify-content: space-evenly;
    }

    .loading-text,.loading-text-two span {
      animation: moveLetters 2.4s infinite ease-in-out;
      transform: translateX(0);
      position: relative;
      display: inline-block;
      opacity: 0;
      text-shadow: 0px 2px 10px rgba(46, 74, 81, 0.3); 
      background: none;
    }

    .loading-text,.loading-text-two span:nth-child(1) {
      animation-delay: 0.1s;
    }

    .loading-text,.loading-text-two span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .loading-text,.loading-text-two span:nth-child(3) {
      animation-delay: 0.3s;
    }

    .loading-text,.loading-text-two span:nth-child(4) {
      animation-delay: 0.4s;
    }

    .loading-text,.loading-text-two span:nth-child(5) {
      animation-delay: 0.5s;
    }

    .loading-text,.loading-text-two span:nth-child(6) {
      animation-delay: 0.6s;
    }

    .loading-text,.loading-text-two span:nth-child(7) {
      animation-delay: 0.7s;
    }
    .loading-text,.loading-text-two span:nth-child(8) {
      animation-delay: 0.8s;
    }
    .loading-text,.loading-text-two span:nth-child(9) {
      animation-delay: 0.9s;
    }
    .loading-text,.loading-text-two span:nth-child(10) {
      animation-delay: 1s;
    }


    @keyframes moveLetters {
      0% {
        transform: translateX(-15vw);
        opacity: 0;
      }
      33.3%, 66% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(15vw);
        opacity: 0;
      }
    }

    .socials {
      position: fixed;
      bottom: 16px;
      right: 16px;
      display: flex;
      align-items: center;
    }

    .social-link {
      color: #fff;
      display: flex;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      margin-right: 12px;
    }
</style>