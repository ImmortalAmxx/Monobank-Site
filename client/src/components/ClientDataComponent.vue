<template>
  <div class="account">
    <div class="container" id="account__details">
      <div class="account__info">
        <p>Список активних карток</p>
      </div>
      <div class="accont__details" v-if="accounts.length > 0">
        <div class="row">
          <div class="col-md-6 col-sm-6 col-xl-3 text-center" v-for="(account, index) in accounts" :key="index">
            <div class="account__card_table">
              <div class="card__type py-3">
                <h2>{{ getCardType(account.type) }}</h2>
              </div>
              <div class="card__number py-4">
                <h2>Номер: {{ account.maskedPan[0] }}</h2>
              </div>
              <div class="description pt-2 pb-2">
                <p>Баланс: {{ formatNumber(account.balance) }} {{
                  getStringByNumber(account.currencyCode) }}</p>
                <p>Кредитний ліміт: {{ formatNumber(account.creditLimit) }} {{
                  getStringByNumber(account.currencyCode) }}</p>
              </div>
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
        this.error = 'Неможливо дістати інформацію. Помилка: ' + err.message;
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
      return types[type] || 'є-Підтримка';
    },
  },
};
</script>

<style lang="scss">
.account {
  margin-bottom: 50px;

  .container {
    .account__info {
      margin-top: 50px;

      p {
        @include format-text(22px, black, none, uppercase);
        text-align: center;
      }
    }

    .accont__details {
      @include format-text(22px, black);

      .row .account__card_table {
        border: 1px solid rgb(210 206 206);
        padding: 0;

        .card__type {
          border-bottom: 1px solid rgb(210 206 206);

          h2 {
            font-size: 30px;
            font-weight: bold;
            text-transform: uppercase;
            transition: .4s all ease-in-out;
          }
        }

        .card__number {
          border-bottom: 1px solid rgb(210 206 206);
          transition: .4s all ease-in-out;

          h2 {
            font-size: 20px;
            margin-bottom: 0;
            font-weight: 600;
          }
        }

        .description p {
          margin-bottom: 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>