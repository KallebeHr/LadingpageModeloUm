<template>
  <div class="container" id="depoimentos">
    <div class="header">
      <div class="header-text">
        <h4>ESCRITÓRIO BEM AVALIADO</h4>
        <p>Temos uma reputação nacional por fornecer serviços jurídicos excepcionais.</p>
      </div>
      <div class="social-links">
        <ul>
          <li><v-icon class="icon" large>mdi-instagram</v-icon> Instagram</li>
          <li><v-icon class="icon" large>mdi-linkedin</v-icon> Linkedin</li>
          <li><v-icon class="icon" large>mdi-facebook</v-icon> Facebook</li>
        </ul>
      </div>
    </div>
    <div class="comentarios">
      <!-- Swiper Container -->
      <swiper
        :slidesPerView="1"
        :spaceBetween="20"
        :navigation="{ clickable: true }"
        :pagination="{ clickable: true }"
        :modules="modules"
        :breakpoints="{
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 }
        }"
        class="mySwiper"
      >
        <swiper-slide v-for="(servico, index) in servicos" :key="index">
          <div class="card">
            <div class="titulo">
              <img src="../assets/perfil.png" class="img-logo" alt="Perfil">
              <div class="nome">
                <h3>Max Dev</h3>
                <p>Dev - Programmer</p>
              </div>
              <img src="../assets/google.png" class="img-logo-google" alt="Google">
            </div>
            <p class="texto">"Excelente atendimento, ótimos advogados! Foram certeiros no que eu precisava."</p>
            <img src="../assets/estrela.png" class="icon-estrela" alt="Estrelas">
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
// Importe os componentes do Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
// Importe os módulos necessários do Swiper
import { Pagination, Navigation } from 'swiper/modules';
// Importe o CSS do Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Defina os módulos que serão usados
const modules = [Pagination, Navigation];

// Dados de exemplo para os serviços
const servicos = Array(10).fill({ titulo: 'Serviço' }); // Exemplo de dados
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  margin-top: 4rem;
  flex-direction: column;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.header-text h4 {
  color: #c8a345;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.header-text p {
  font-size: 1.2rem;
  max-width: 25rem;
  color: #555;
}

.social-links ul {
  list-style: none;
  display: flex;
  padding: 0;
  gap: 1rem;
}

.social-links ul li {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #333;
}

.social-links ul li .icon {
  margin-right: 0.5rem;
  color: #c8a345;
}

.comentarios {
  width: 100%;
  padding: 20px;
}

.mySwiper {
  width: 100%;
  padding: 20px 0;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 25rem;
  margin: 0 auto;
}

.titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.img-logo {
  width: 50px;
  height: 45px;
  border-radius: 50%;
}

.img-logo-google {
  width: 55px;
  height: 40px;
  border-radius: 50%;
}

.nome {
  text-align: center;
  flex-grow: 1;
  margin: 0 10px;
}

.nome h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.nome p {
  margin: 0;
  font-size: 0.9rem;
  color: #777;
}

.texto {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
}

.icon-estrela {
  width: 10rem;
  border-radius: 10px;
  margin: 10px auto;
  display: block;
}

/* Responsividade */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
  }

  .header-text p {
    font-size: 1rem;
    max-width: 100%;
  }

  .social-links ul {
    flex-direction: column;
    gap: 0.5rem;
  }

  .card {
    width: 90%;
  }
}

@media (max-width: 480px) {
  .header-text h4 {
    font-size: 1.2rem;
  }

  .header-text p {
    font-size: 0.9rem;
  }

  .nome h3 {
    font-size: 1rem;
  }

  .nome p {
    font-size: 0.8rem;
  }

  .texto {
    font-size: 0.9rem;
  }

  .icon-estrela {
    width: 8rem;
  }
}
</style>