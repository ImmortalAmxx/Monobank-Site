<template>
  <div>
    <h1>Client Accounts</h1>
    <div class="accont__details" v-if="accounts.length > 0">
      <div v-for="(account, index) in accounts" :key="index">
        <p>Номер карти: {{ account.maskedPan[0] }}</p>
        <p>Баланс: {{ account.balance }}</p>
        <p>Кредитний ліміт: {{ account.creditLimit }}</p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div v-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      accounts: [],
      error: null,
    };
  },
  created() {
    this.getClientInfo();
  },
  methods: {
    async getClientInfo() {
      try {
        const response = await axios.get('http://localhost:5000/api/monobank-client-info');
        this.accounts = response.data.accounts;
      } catch (err) {
        this.error = 'Error fetching client information: ' + err.message;
      }
    },
  },
};
</script>

<style scoped>
.accont__details {
  background-color: white;
  border-radius: 32px;
  font-size: 12px;
  color: black;
}
</style>