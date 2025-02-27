import { defineStore } from 'pinia';

export const useCountStore = defineStore('count', {
  state: () => ({
    count: 0, // Valor atual da contagem
    isCounting: false, // Indica se a contagem está ativa
  }),
  actions: {
    // Inicia a contagem
    startCount() {
      this.isCounting = true;
      this.count = 0;
    },
    // Atualiza o valor da contagem
    updateCount(value) {
      this.count = value;
    },
    // Finaliza a contagem
    completeCount() {
      this.isCounting = false;
    },
    // Reseta a contagem
    resetCount() {
      this.count = 0;
      this.isCounting = false;
    },
  },
});