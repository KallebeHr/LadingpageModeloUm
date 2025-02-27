<template >
  <div class="container" id="servicos">
    <div class="headerTop">
      <div class="tittle">
        <p>NOSSOS SERVIÇOS</p>
        <h1>Escritório de advocacia</h1>
      </div>
      <p class="tittle-end">
        Somos um escritório de advocacia "full service" em Brasília-DF, e estamos comprometidos com a excelência na atuação em diferentes áreas do direito.
      </p>
    </div>

    <!-- Swiper Container -->
    <swiper
      :slidesPerView="1"
      :spaceBetween="20"
      :pagination="{ clickable: true }"
      :modules="modules"
      :breakpoints="{
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
        1440: { slidesPerView: 4, spaceBetween: 40 }
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="servico in servicos" :key="servico.titulo">
        <div class="card">
          <h2>{{ servico.titulo }}</h2>
          <p>{{ servico.descricao }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
// Importe os componentes do Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
// Importe os módulos necessários do Swiper
import { Pagination } from 'swiper/modules';
// Importe o CSS do Swiper
import 'swiper/css';
import 'swiper/css/pagination';

// Defina os módulos que serão usados
const modules = [Pagination];

// Dados dos serviços
const servicos = [
  {
    titulo: "Direito Civil",
    descricao: "Atuamos em questões relacionadas a contratos, responsabilidade civil, direito das coisas, família e sucessões."
  },
  {
    titulo: "Direito Trabalhista",
    descricao: "Defendemos os interesses de empregadores e empregados em questões trabalhistas, incluindo rescisões, acordos e ações judiciais."
  },
  {
    titulo: "Direito Empresarial",
    descricao: "Oferecemos consultoria e assessoria jurídica para empresas, abrangendo contratos, fusões, aquisições e compliance."
  },
  {
    titulo: "Direito Penal",
    descricao: "Atuamos na defesa de clientes em processos criminais, desde a fase investigatória até o julgamento."
  },
  {
    titulo: "Direito Tributário",
    descricao: "Prestamos assessoria em questões fiscais e tributárias, incluindo planejamento tributário e defesa em execuções fiscais."
  },
  {
    titulo: "Direito Ambiental",
    descricao: "Atuamos em questões relacionadas à legislação ambiental, licenciamento e sustentabilidade."
  }
];
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  color: black;
  padding: 20px;
}

.headerTop {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  width: 90%;
  max-width: 1200px;
  flex-wrap: wrap;
}

.tittle h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-family: "Inknut Antiqua", serif;

}

.tittle p {
  font-size: 1.2rem;
  color: #c8a345;
  font-weight: bold;
  font-family: "Inknut Antiqua", serif;

}

.tittle-end {
  width: 25rem;
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

.mySwiper {
  width: 100%;
  max-width: 1200px;
  padding: 20px 0;
}

.card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(200, 163, 69, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 85%;
  min-height: 14rem; 
  overflow: hidden;
  margin: 10px;
  border-top: #c8a345 2px solid;
  border-bottom: #c8a345 5px solid;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.card p {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

/* Responsividade */
@media (max-width: 768px) {
  .headerTop {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .tittle-end {
    width: 100%;
    margin-top: 1rem;
  }

  .card {
    padding: 1rem; /* Menos padding em telas menores */
    max-width: 85%;
    min-height: 8rem; 
  }

  .card h2 {
    font-size: 1.2rem; /* Tamanho menor para o título */
  }

  .card p {
    font-size: 0.9rem; /* Tamanho menor para o texto */
  }
}

@media (max-width: 480px) {
  .tittle h1 {
    font-size: 2rem;
  }

  .tittle p {
    font-size: 1rem;
  }

  .tittle-end {
    font-size: 0.9rem;
  }

  .card {
    margin: 5px; /* Menos margem em telas muito pequenas */
  }
}
</style>