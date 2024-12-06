// stores/alerts.js
import { defineStore } from 'pinia';

export const useAlertsStore = defineStore('alerts', {
  state: () => ({
    allertMessage: '',
  }),
  actions: {
    setMessage(allertMessage) {
      if (this.allertMessage[0]) return;
      this.allertMessage = allertMessage;
      setTimeout(() => {
        this.clearAlert();
      }, 5000);
    },
    clearAlert() {
      this.allertMessage = '';
    },
  },
});
