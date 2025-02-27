<template>
    <div>
      <!-- Botão flutuante -->
      <button
        class="whatsapp-button"
        @click="togglePopup"
      >
        <v-icon>mdi-whatsapp</v-icon>
      </button>
  
      <!-- Popup com formulário -->
      <v-dialog v-model="isPopupOpen" max-width="400" persistent>
        <v-card>
          <v-card-title class="headline">
            Entrar em contato pelo WhatsApp
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="sendWhatsAppMessage">
              <!-- Campo Nome -->
              <v-text-field
                v-model="form.name"
                label="Nome"
                required
                outlined
                dense
              ></v-text-field>
  
              <!-- Campo Telefone -->
              <v-text-field
                v-model="form.phone"
                label="+55"
                required
                outlined
                dense
                type="tel"
              ></v-text-field>
  
              <!-- Campo Mensagem -->
              <v-textarea
                v-model="form.message"
                label="Mensagem"
                required
                outlined
                dense
                :counter="1000"
                :rules="messageRules"
              ></v-textarea>
  
              <!-- Contador de caracteres -->
              <div class="text-caption text-right">
                Caracteres restantes: {{ remainingCharacters }}
              </div>
  
              <!-- Botão Enviar -->
              <v-btn
                type="submit"
                color="green"
                dark
                block
                class="mt-4"
              >
                Enviar WhatsApp
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closePopup">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isPopupOpen: false, // Controla a visibilidade do popup
        form: {
          name: '',
          phone: '',
          message: '',
        },
        messageRules: [
          (v) => v.length <= 1000 || 'A mensagem deve ter no máximo 1000 caracteres.',
        ],
      };
    },
    computed: {
      // Calcula os caracteres restantes
      remainingCharacters() {
        return 1000 - this.form.message.length;
      },
    },
    methods: {
      // Abre/fecha o popup
      togglePopup() {
        this.isPopupOpen = !this.isPopupOpen;
      },
      closePopup() {
        this.isPopupOpen = false;
      },
      // Envia a mensagem pelo WhatsApp
      sendWhatsAppMessage() {
        const phoneNumber = `55${this.form.phone.replace(/\D/g, '')}`; // Remove caracteres não numéricos
        const message = `Nome: ${this.form.name}\nMensagem: ${this.form.message}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        this.closePopup(); // Fecha o popup após enviar
      },
    },
  };
  </script>
  
  <style scoped>
  .whatsapp-button {
    position: fixed; /* Alterado para fixed para garantir que fique no canto */
    bottom: 20px; /* Distância do fundo */
    right: 20px; /* Distância da direita */
    background-color: #25d366; /* Cor do WhatsApp */
    color: white;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para destacar */
    z-index: 1000; /* Garante que o botão fique acima de outros elementos */
    transition: opacity 0.3s ease;
  }
  
  .whatsapp-button:hover {
    opacity: 0.9; /* Efeito de hover */
  }
  </style>