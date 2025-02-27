<template>
  <div class="container" id="local">
    <div class="left">
      <h1>Onde nos encontrar</h1>
      <v-icon icon="mdi-map-marker-circle" class="icon"></v-icon>
      <p>
        Sede principal - Exemplo local<br />
        TAC Quadra 01, Villa Shopping, Bloco B-10, 6º Andar, Salas 313 e 284, Brasília - DF<br />
        CEP: 70.333-900
      </p>
    </div>
    <div class="right">
      <div id="map"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'; // Importe o onMounted
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importe o CSS do Leaflet

onMounted(() => {
  // Criar o mapa
  const map = L.map('map').setView([-15.7942, -47.8825], 13); // Coordenadas de Brasília

  // Adicionar a camada de tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Ícone personalizado
  const greenIcon = L.icon({
    iconUrl: './IMG/livro-de-direito.png', // Caminho do ícone
    iconSize: [32, 32], // Tamanho do ícone
    iconAnchor: [16, 32], // Ponto de ancoragem do ícone
    popupAnchor: [0, -32] // Onde o popup deve aparecer
  });

  // Adicionar um círculo
  const circle = L.circle([-15.7942, -47.8825], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 100 // Raio em metros
  }).addTo(map);
  circle.bindPopup("Uma referência marcada.");
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: black;
  padding: 20px;
  gap: 20px; /* Espaço entre as colunas */
}

.left h1 {
  font-family: "Inknut Antiqua", serif;
  font-size: 2rem; /* Tamanho maior para o título */
  margin-bottom: 1rem; /* Espaçamento abaixo do título */
}

.left {
  text-align: center;
  width: 20rem;
}

.left p {
  margin: 10px;
  line-height: 1.5;
  font-size: 1rem; /* Tamanho da fonte ajustado */
}

.right {
  width: 70%;
}

.icon {
  font-size: 2.5rem;
  color: #C8A345; /* Cor do ícone */
}

#map {
  height: 400px; /* Altura fixa para o mapa */
  width: 100%; /* Largura total */
  border-radius: 10px; /* Bordas arredondadas */
  box-shadow: 0 4px 8px rgba(200, 163, 69, 0.5); /* Sombra */
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
    gap: 10px; /* Espaço menor entre as colunas */
  }

  .left {
    width: 100%; /* Ocupa toda a largura */
    margin-bottom: 1rem; /* Espaçamento abaixo do texto */
  }

  .right {
    width: 90%; /* Ocupa 90% da largura em dispositivos móveis */
  }

  #map {
    height: 300px; /* Altura menor para dispositivos móveis */
  }
}

@media (max-width: 480px) {
  .left h1 {
    font-size: 1.5rem; /* Tamanho menor para o título em telas muito pequenas */
  }

  .left p {
    font-size: 0.9rem; /* Tamanho menor para o texto em telas muito pequenas */
  }

  #map {
    height: 250px; /* Altura ainda menor para telas muito pequenas */
  }
}
</style>