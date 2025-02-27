<template id="home">
  <div>
    <!-- Container Principal -->
    <div class="container" >
      <div class="center">
        <!-- Card "Sobre" -->
        <div class="about-card">
          <div class="aboutTop">
            <div class="icon-text">
              <v-icon color="primary" large>mdi-instagram</v-icon>
              <p>Competência</p>
            </div>
            <div class="vertical-line"></div>
            <div class="icon-text">
              <v-icon color="primary" large>mdi-shield-check</v-icon>
              <p>Segurança</p>
            </div>
          </div>
          <div class="aboutCenter">
            <h1>Excelência em <span style="color: #c8a345;">Direito</span></h1>
            <p>Fale com o nosso time e tenha seus direitos protegidos de forma estratégica, ágil e firme.</p>
          </div>
        </div>

        <!-- Card de Formulário -->
        <div class="glass-card">
          <h2>Converse com um advogado</h2>
          <p>Preencha o formulário abaixo e receba nosso contato personalizado:</p>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <input
                type="text"
                id="name"
                v-model="form.name"
                placeholder="Seu nome completo"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                placeholder="+55"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                id="email"
                v-model="form.email"
                placeholder="seuemail@exemplo.com"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                id="message"
                v-model="form.message"
                placeholder="Digite sua mensagem"
                required
              ></textarea>
            </div>
            <button type="submit">Solicitar especialista</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Cardzada -->
    <div class="cardzada">
      <div class="card-content" >
        <div class="card-item">
          <h2>Referência nacional em direito</h2>
        </div>
        <div class="card-item line" >
          <img src="../assets/icon1.png" alt="" class="icon">
          <h1>Disponibilidade imediata</h1>
          <p>A agilidade e conforto que você precisa em um só lugar;</p>
        </div>
        <div class="card-item">
          <img src="../assets/icon2.png" alt="" class="icon">
          <h1>Advogados experientes</h1>
          <p>Confiança de ter sua ação conduzida pelos melhores profissionais;</p>
        </div>
        <div class="card-item">
          <img src="../assets/icon3.png" alt="" class="icon">
          <h1>Advocacia de referência</h1>
          <p>Você tem a segurança de estar com um escritório de advocacia de grande prestígio no mercado jurídico</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dados do formulário
const form = ref({
  name: "",
  phone: "55+",
  email: "",
  message: "",
});

// Função para lidar com o envio do formulário
const handleSubmit = () => {
  alert(`Formulário enviado:\nNome: ${form.value.name}\nTelefone: ${form.value.phone}\nEmail: ${form.value.email}\nMensagem: ${form.value.message}`);
  form.value = { name: "", phone: "", email: "", message: "" }; // Limpa o formulário
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/teste.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 95vh;
  padding: 20px;
  flex-direction: column;
  border-bottom: 10px solid #c8a345;
  margin-top: 2rem;
  color: white;

}

.center {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  flex-wrap: wrap; /* Permite que os elementos quebrem para a próxima linha */
}

.about-card {
  border-radius: 15px;
  padding: 20px;
  max-width: 600px;
  text-align: center;
  flex: 1;
}

.cardzada {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 90%;
  max-width: 1200px;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.35);
  margin: -10vh auto 0;
  color: black;
  font-size: 1.2rem;
  text-align: center;
  z-index: 10;
  border-radius: 10px;
  padding: 20px;
}

.card-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */
}

.card-item {
  flex: 1;
  text-align: center;
  min-width: 250px; /* Largura mínima para evitar quebras inadequadas */
  padding: 10px;
}
.line{
border-left:solid #c8a345 3px;
}
.card-item h2 {
  font-family: "Inknut Antiqua", serif;
  padding: 10px;
}

.card-item h1 {
  font-family: "Inknut Antiqua", serif;
  font-size: 1.2rem;
}

.card-item p {
  font-size: 1rem;
}

.aboutTop {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Permite que os ícones quebrem para a próxima linha */
}

.icon-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 40px;
  text-align: center;
}

.vertical-line {
  width: 3px;
  height: 100px;
  background: #c8a345;
}

.aboutCenter h1 {
  font-size: 3rem; /* Tamanho menor para telas pequenas */
  color: #fff;
  margin-bottom: 10px;
  font-family: "Inknut Antiqua", serif;
}

.aboutCenter p {
  font-size: 1rem;
  color: #fff;
  line-height: 1.5;
}

.glass-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #fff;
  flex: 1;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: #fff;
  color: #666;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background: #c8a345;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #b38f3a;
}

/* Responsividade */
@media (max-width: 768px) {
  .container{
  margin-top: 4rem;

  }
  .center {
    flex-direction: column;
    gap: 20px;
  }
  .line{
border-top:solid #c8a345 3px;
border-left:none;
}
  .about-card,
  .glass-card {
    max-width: 100%;
  }

  .aboutCenter h1 {
    font-size: 2.5rem; /* Tamanho menor para telas médias */
  }

  .cardzada {
    margin-top: 20px;
  }

  .card-content {
    flex-direction: column;
    gap: 20px;
  }

  .card-item {
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .container{
  margin-top: 4rem;

  }
  .aboutCenter h1 {
    font-size: 2rem; /* Tamanho menor para telas pequenas */
  }
  .line{
border-top:solid #c8a345 3px;
}
  .aboutCenter p {
    font-size: 0.9rem;
  }

  .glass-card {
    padding: 15px;
  }

  .cardzada {
    padding: 15px;
  }
}
</style>