<template>
  <div class="account">
    <div class="container" id="account__details">
      <div class="account__info">
        <p>Користувач: {{ name }}</p>
        <p>Список активних карток</p>
      </div>
      <div class="accont__details" v-if="accounts.length > 0">
        <div class="row">
          <div class="col-4" v-for="(account, index) in accounts" :key="index">
            <div class="card" style="width: 18rem;">
              <img src="../assets/img/cards/white.png" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Карта: {{ getCardType(account.type) }}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Номер карти: {{ account.maskedPan[0] }}</li>
                <li class="list-group-item">Баланс: {{ formatNumber(account.balance) }} {{
                  getStringByNumber(account.currencyCode) }}</li>
                <li class="list-group-item">Кредитний ліміт: {{ formatNumber(account.creditLimit) }} {{
                  getStringByNumber(account.currencyCode) }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Завантаження даних...</p>
      </div>
      <div v-if="error" class="error">
        <p>Error: {{ error }}</p>
      </div>
      <!-- <div class="card__test">
      <div class="main-content">
        <div class="header">
          <span>Article on</span>
          <span>29-June-2023</span>
        </div>
        <p class="heading">Different ways to use CSS in React</p>
        <div class="categories">
          <span>React</span>
          <span>Css</span>
        </div>
      </div>
      <div class="footer">
        by Harsh Gupta
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      accounts: [],
      name: '',
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
        this.name = response.data.name;
      } catch (err) {
        this.error = 'Error fetching client information: ' + err.message;
      }
    },
    getStringByNumber(number) {
      const strings = {
        980: 'UAH',
        840: 'USD',
        978: 'EU',
      };

      return strings[number];
    },
    formatNumber(value) {
      const strValue = value.toString();
      if (strValue.length <= 2) {
        return '0.' + strValue.padStart(2, '0');
      }
      return strValue.slice(0, -2) + '.' + strValue.slice(-2);
    },
    getCardType(type) {
      const types = {
        black: 'Темна',
        white: 'Біла',
      };
      return types[type] || 'єПідтримка';
    },
  },
};
</script>

<style lang="scss">
.account {
  background-color: #eee2dc;

  .container {
    .accont__details {
      border-radius: 32px;
      @include format-text(22px, black);
    }

    .account__info {
      margin-top: 50px;

      p {
        @include format-text(22px, black, none);
        text-align: center;
      }
    }
  }
}
</style>