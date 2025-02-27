<template>
  <v-container ref="containerRef" class="contagem-container">
    <h1 class="animate-text">Transformamos mais de</h1>
    <span class="count-number">{{ count }}</span>
    <h1 class="animate-text">vidas com resultados incríveis!</h1>
    <!-- Canvas para o efeito de confetes -->
    <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect, nextTick } from 'vue';
import { useCountStore } from '../stores/contagem.js';
import confetti from 'canvas-confetti';

// Referências
const confettiCanvas = ref(null);
const containerRef = ref(null); // Referência para o container do componente

// Store
const countStore = useCountStore();

// Valor reativo da contagem
const count = computed(() => countStore.count);

// Método para disparar confetes
const fireConfetti = () => {
  console.log('fireConfetti chamado!'); // Log para depuração
  const canvas = confettiCanvas.value;
  if (!canvas) {
    console.error('Canvas não encontrado!');
    return;
  }
  console.log('Canvas encontrado:', canvas); // Log para depuração
  canvas.confetti =
    canvas.confetti || confetti.create(canvas, { resize: true });

  canvas.confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
  console.log('Confetes disparados com sucesso!');
};

// Função de animação
let animationFrameId = null;
const duration = 2000; // Duração da animação em milissegundos
const endValue = 5000; // Valor final da contagem

const animateCount = (timestamp) => {
  if (!startTime) startTime = timestamp; // Define o tempo inicial no primeiro frame
  const progress = timestamp - startTime;
  const currentValue = Math.min((progress / duration) * endValue, endValue);

  // Atualiza o valor da contagem no store
  countStore.updateCount(Math.floor(currentValue));

  // Verifica se a animação terminou
  if (progress < duration) {
    animationFrameId = requestAnimationFrame(animateCount);
  } else {
    console.log('Contagem concluída!'); // Log para depuração
    countStore.completeCount();
    fireConfetti();
  }
};

// Inicia a animação
let startTime = null;
const startCount = () => {
  console.log('Iniciando contagem...'); // Log para depuração
  startTime = null; // Reseta o tempo inicial
  countStore.startCount();
  animationFrameId = requestAnimationFrame(animateCount);
};

// Para a animação e reseta a contagem
const stopCount = () => {
  console.log('Parando contagem...'); // Log para depuração
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  countStore.resetCount(); // Reseta a contagem
};

// Intersection Observer
let observer = null;
const setupObserver = () => {
  if (observer) {
    observer.disconnect(); // Limpa o observer anterior, se houver
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Componente visível. Iniciando contagem...'); // Log para depuração
          startCount();
        } else {
          console.log('Componente não visível. Parando contagem...'); // Log para depuração
          stopCount();
        }
      });
    },
    { threshold: 0.5 } // Define que o componente deve estar 50% visível para iniciar a contagem
  );

  if (containerRef.value && containerRef.value.$el) {
    observer.observe(containerRef.value.$el); // Observa o container do componente
  } else {
    console.error('ContainerRef não encontrado ou inválido!'); // Log para depuração
  }
};

// Configura o observer quando o containerRef estiver disponível
watchEffect(() => {
  if (containerRef.value) {
    console.log('ContainerRef disponível. Configurando observer...'); // Log para depuração
    setupObserver();
  }
});

// Lifecycle hooks
onMounted(() => {
  console.log('Componente montado.'); // Log para depuração
  nextTick(() => {
    if (containerRef.value) {
      setupObserver(); // Configura o observer após o componente ser renderizado
    } else {
      console.error('ContainerRef ainda não está disponível!'); // Log para depuração
    }
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect(); // Limpa o observer ao desmontar o componente
  }
  stopCount(); // Para a animação ao desmontar o componente
});
</script>

<style scoped>
/* Estilo do container principal */
.contagem-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2rem 1rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: black;
  overflow: hidden;
  font-family: "Inknut Antiqua", serif;
  min-height: 40vh; /* Altura mínima para garantir visibilidade */
  margin: 10vh auto 0;
}

/* Estilo do texto principal */
.animate-text {
  font-size: 1.5rem;
  animation: fadeIn 1.5s ease-in-out;
  margin: 0.5rem 0;
}

/* Estilo do número da contagem */
.count-number {
  font-size: 3rem;
  font-weight: 900;
  color: #00ff26;
  animation: pulse 1.5s infinite;
  margin: 0.5rem 0;
  font-family: 'Arial Narrow', Arial, sans-serif;
}

/* Animação de fadeIn para o texto */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animação de pulso para o número */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Estilo do canvas de confetes */
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999; /* Garante que o canvas esteja acima de outros elementos */
}

/* Responsividade */
@media (max-width: 768px) {
  .contagem-container {
    padding: 1rem;
    min-height: 40vh;
  }

  .animate-text {
    font-size: 1.2rem;
  }

  .count-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .animate-text {
    font-size: 1rem;
  }

  .count-number {
    font-size: 1.5rem;
  }
}
</style>