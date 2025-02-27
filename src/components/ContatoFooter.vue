<template>
  <v-footer class="footer" id="contatos">
    <v-container>
      <v-row>
        <!-- Coluna 1: Contatos e Redes Sociais -->
        <v-col cols="12" md="4" class="text-center text-md-left">
          <h3 class="footer-title">Contato</h3>
          <p class="footer-text">Telefone: 0800 123 4567</p>
          <p class="footer-text">Email: contato@exemplo.com</p>
          <div class="social-icons">
            <v-icon class="icon" color="white">mdi-instagram</v-icon>
            <v-icon class="icon" color="white">mdi-linkedin</v-icon>
            <v-icon class="icon" color="white">mdi-facebook</v-icon>
            <v-icon class="icon" color="white">mdi-youtube</v-icon>
          </div>
          <p class="footer-text mt-4">Site 100% seguro</p>
          <p class="footer-text">Navegação criptografada</p>
        </v-col>

        <!-- Coluna 2: Links Úteis -->
        <v-col cols="12" md="4" class="text-center">
          <h3 class="footer-title">Links Úteis</h3>
          <v-list class="footer-list">
            <v-list-item v-for="link in usefulLinks" :key="link.text" :to="link.to" class="footer-item">
              {{ link.text }}
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Coluna 3: Áreas de Atuação -->
        <v-col cols="12" md="4" class="text-center text-md-right">
          <h3 class="footer-title">Áreas de Atuação</h3>
          <v-list class="footer-list">
            <v-list-item v-for="area in practiceAreas" :key="area" class="footer-item">
              {{ area }}
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <!-- Rodapé Inferior -->
      <v-row class="mt-4">
        <v-col cols="12" class="text-center">
          <p class="footer-text">
            ©2025 Exemplo & Advogados - Todos os Direitos Reservados.
          </p>
          <p class="footer-text">
            CNPJ 12.345.678/0001-00 | OAB/DF 1234/56
          </p>
          <p class="footer-text">
            SCS Quadra 08, Venâncio Shopping, Bloco B-60, 2º Andar, Salas 203 e 204, Brasília - DF CEP: 70.333-900
          </p>
          <p class="footer-text">
            Tel: +55 (61) 1234-5678
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      usefulLinks: [
        { text: 'Banco de Talentos', to: '/talentos' },
        { text: 'Área do Cliente', to: '/cliente' },
        { text: 'Fale Conosco', to: '/contato' },
        { text: 'Política de Privacidade', to: '/privacidade' },
        { text: 'Termos de Uso', to: '/termos' },
        { text: 'Nossos Advogados', to: '/advogados' },
        { text: 'O Escritório', to: '/escritorio' },
        { text: 'Áreas de Atuação', to: '/areas' },
      ],
      practiceAreas: [
        'Advogado de Família',
        'Advogado de Inventário',
        'Advogado Criminal',
        'Advogado Empresarial',
        'Advogado Imobiliário',
        'Advogado Administrativo',
        'Advogado Ambiental',

      ],
    };
  },
};
</script>

<style scoped>
.footer {
  background: black;
  color: white;
  padding: 40px 0;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.footer-text {
  font-size: 1rem;
  margin: 5px 0;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.icon {
  cursor: pointer;
  transition: color 0.3s ease;
}

.icon:hover {
  color: #c8a345; /* Cor ao passar o mouse */
}

.footer-list {
  background: transparent;
  padding: 0;
}

.footer-item {
  color: white;
  cursor: pointer;
  transition: color 0.3s ease;
}

.footer-item:hover {
  color: #c8a345; /* Cor ao passar o mouse */
}

/* Responsividade */
@media (max-width: 768px) {
  .footer-title {
    font-size: 1.3rem;
  }

  .footer-text {
    font-size: 0.9rem;
  }

  .footer-item {
    font-size: 0.9rem;
  }
}
</style>