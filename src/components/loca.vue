<template>
  <div class="container">
    <div class="header" id="equipe">
      <div class="header-left">
        <h2>Nossa equipe</h2>
      </div>
      <div class="header-right">
        <ul>
          <li><v-icon icon="mdi-lightbulb-alert-outline" class="icon"></v-icon> Inovação e Criatividade</li>
          <li><v-icon icon="mdi-account-group-outline" class="icon"></v-icon> Profissionais Especializados</li>
          <li><v-icon icon="mdi-flash-outline" class="icon"></v-icon> Atendimento de Excelência</li>
          <li><v-icon icon="mdi-message-check-outline" class="icon"></v-icon> Agilidade na Solução</li>
        </ul>
      </div>
    </div>
    <swiper
      :autoplay="{
        delay: 4500,
        disableOnInteraction: false,
      }"
      :slidesPerView="1"
      :spaceBetween="30"
      :loop="true"
      :pagination="{ clickable: true, type: 'progressbar' }"
      :modules="modules"
      class="mySwiper"
      :breakpoints="{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }"
    >
      <swiper-slide v-for="advogado in advogados" :key="advogado.nome">
        <div class="card">
          <!-- Imagem do advogado sempre visível -->
          <div class="card-img">
            <img :src="advogado.img" :alt="advogado.nome" class="advogado-img">
          </div>

          <!-- Nome inicial visível -->
          <div class="card-overlay">
            <h2>{{ advogado.nome }}</h2>
          </div>

          <!-- Informações aparecem ao passar o mouse -->
          <div class="card-hover">
            <h2>{{ advogado.nome }}</h2>
            <p class="descricao">{{ advogado.descricao }}</p>
            <div class="card-details">
              <p><strong>Área de Atuação:</strong> {{ advogado.area }}</p>
              <p><strong>CREF:</strong> {{ advogado.cref }}</p>
              <p><strong>Contato:</strong> {{ advogado.contato }}</p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { mdiLightbulbAlertOutline } from '@mdi/js'; // Importando o ícone

// Definindo a variável reativa para o ícone
const path = mdiLightbulbAlertOutline;

// Importando as imagens
import modelo1 from '@/assets/modelo1.jpg';
import modelo2 from '@/assets/modelo6.jpg';
import modelo3 from '@/assets/modelo3.jpg';
import modelo4 from '@/assets/modelo4.jpg';
import modelo5 from '@/assets/modelo5.jpg';
import modelo6 from '@/assets/modelo2.jpg';
import modelo7 from '@/assets/modelo7.jpg';

const modules = [Pagination, Navigation, Autoplay];

const advogados = [
  {
    nome: "Dr. João Silva",
    descricao: "Especialista em Direito Civil com vasta experiência em contratos e litígios.",
    img: modelo1,
    area: "Direito Civil",
    cref: "OAB/ES 345.678",
    contato: "joao.silva@example.com"
  },
  {
    nome: "Dra. Mariana Rocha",
    descricao: "Especialista em Direito Civil com vasta experiência em contratos e litígios.",
    img: modelo2,
    area: "Direito Civil",
    cref: 'OAB/RS 321.654',
    contato: "joao.silva@example.com"
  },
  {
    nome: "Dr. André Ribeiro",
    descricao: "Especialista em Direito Civil com vasta experiência em contratos e litígios.",
    img: modelo3,
    area: "Direito Civil",
    cref: "OAB/PR 654.987",
    contato: "joao.silva@example.com"
  },
  {
    nome: "Dr. Bruno Santos",
    descricao: "Advogada com foco em Direito Ambiental e Sustentabilidade.",
    img: modelo4,
    area: "Direito Ambiental",
    cref: "OAB/RJ 987.654",
    contato: "maria.oliveira@example.com"
  },
  {
    nome: "Dr. Carlos Mendes",
    descricao: "Defensor experiente em Direito Penal, atuando em casos de alta complexidade.",
    img: modelo5,
    area: "Direito Penal",
    cref: "OAB/MG 555.666",
    contato: "carlos.mendes@example.com"
  },
  {
    nome: "Dr. Diego Souza",
    descricao: "Defensor experiente em Direito Penal, atuando em casos de alta complexidade.",
    img: modelo6,
    area: "Direito Penal",
    cref: "OAB/GO 567.890",
    contato: "carlos.mendes@example.com"
  },
  {
    nome: "Dra. Juliana Castro",
    descricao: "Defensor experiente em Direito Penal, atuando em casos de alta complexidade.",
    img: modelo7,
    area: "Direito Penal",
    cref: "OAB/GO 000.111",
    contato: "carlos.mendes@example.com"
  }
];
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
  background-image: url('../assets/teste2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0 20px;
}

.header {
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha em telas pequenas */
}

.header-left {
  border-bottom: #C8A345 solid 5px;
  width: 15rem;
  font-family: "Inknut Antiqua", serif;
  font-size: larger;
  font-weight: 800;
  text-align: center; /* Centraliza o texto */
  margin-bottom: 1rem; /* Adiciona espaço abaixo do título */
}

.header-left h2 {
  font-size: 1.7rem;
  color: #ffffff;
}

.header-right ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha em telas pequenas */
  justify-content: center;
  padding: 0;
}

.header-right ul li {
  margin: 10px;
  background-color: rgb(233, 233, 233);
  padding: 10px;
  border-radius: 10px;
  border-left: #C8A345 solid 2px;
  border-right: #C8A345 solid 2px;
  box-shadow: 0 4px 6px #c8a34551;
  font-weight: 700;
  color: #312813;
  text-align: center;
}

.icon {
  text-align: center;
  margin: 10px;
}

.mySwiper {
  width: 100%;
  padding: 30px 0;
  margin-top: 2rem;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 320px;
  height: 400px;
  text-align: center;
  overflow: hidden;
  border-top: 3px solid #C8A345;
  margin: 0 auto; /* Centraliza o card */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

.card-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.advogado-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Nome inicial visível */
.card-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
  transition: opacity 0.3s ease;
}

/* Informações aparecem ao passar o mouse */
.card-hover {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.card:hover .card-hover {
  opacity: 1;
}

.card h2 {
  font-size: 1.4rem;
  color: #C8A345;
  margin-bottom: 0.5rem;
  font-family: "Inknut Antiqua", serif;
}

.descricao {
  font-size: 1rem;
  color: black;
  margin-bottom: 1rem;
}

.card-details {
  text-align: left;
}

.card-details p {
  font-size: 0.9rem;
  color: black;
  margin-bottom: 0.5rem;
}

.card-details p strong {
  color: #C8A345;
}

/* Responsividade */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: center;
  }

  .header-right ul {
    flex-direction: column;
    align-items: center;
  }

  .header-right ul li {
    width: 80%;
    margin: 5px 0;
  }

  .mySwiper {
    width: 90%;
  }
}

@media (max-width: 480px) {
  .mySwiper {
    width: 100%;
  }

  .card {
    width: 100%;
  }
}
</style>