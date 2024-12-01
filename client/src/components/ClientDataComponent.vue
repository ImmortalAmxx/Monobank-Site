<template>
  <div class="account py-4">
    <div class="container">
      <div class="account__header" id="account__details">
        <p>Список активних карток</p>
      </div>
      <div class="account__content" v-if="accounts.length > 0">
        <div class="row">
          <div class="col-md-6 col-sm-6 col-xl-3 text-center" v-for="(account, index) in accounts" :key="index">
            <div class="account__card">
              <div class="account__card-image py-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 180">
                  <defs>
                    <pattern id="backgroundPattern" patternUnits="userSpaceOnUse" width="288" height="180">
                      <image :href="getCardPhoto(account.type)" width="288" height="180"
                        preserveAspectRatio="xMidYMid slice" />
                    </pattern>
                  </defs>
                  <rect width="288" height="180" rx="15" ry="15" fill="url(#backgroundPattern)" />
                  <text x="63" y="90" font-size="18" fill="white" font-weight="bold">{{ account.maskedPan[0] }}</text>
                  <text x="20" y="125" font-size="14" fill="white">Баланс: </text>
                  <text x="20" y="140" font-size="14" fill="white" font-weight="bold">
                    {{ formatNumber(account.balance) }} {{ getStringByNumber(account.currencyCode) }}
                  </text>
                  <text x="170" y="125" font-size="14" fill="white">Кредитний ліміт:</text>
                  <text x="170" y="140" font-size="14" fill="white" font-weight="bold">
                    {{ formatNumber(account.creditLimit) }} {{ getStringByNumber(account.currencyCode) }}
                  </text>
                </svg>
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
  <div class="jars py-4">
    <div class="container">
      <div class="jars__header" id="jars__details">
        <p>Список активних банок</p>
      </div>
      <div class="jars__content" v-if="jars.length > 0">
        <div class="row">
          <div class="col-md-6 col-sm-6 col-xl-3 text-center" v-for="(jar, index) in jars" :key="index">
            <div class="jars__card">
              <div class="jars__card-header py-3">
                <h2>{{ jar.title }}</h2>
              </div>
              <div class="jars__card-body py-4">
                <h2 v-if="jar.description.length > 0">Описа банки: {{ jar.description }}</h2>
                <h2 v-else>Описа банки: Відсутній</h2>
              </div>
              <div class="jars__card-footer pt-2 pb-2">
                <p>Баланс: {{ formatNumber(jar.balance) }} {{ getStringByNumber(jar.currencyCode) }}</p>
                <p v-if="jar.goal != null">
                  Потрібно: {{ formatNumber(jar.goal) }} {{ getStringByNumber(jar.currencyCode) }}
                </p>
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
      jars: [],
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
        this.jars = response.data.jars;
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
    getCardPhoto(type) {
      const types = {
        black: 'https://i.imgur.com/f1jptj7.png',
        white: 'https://i.imgur.com/a5StyYt.png',
      };
      return types[type] || 'https://i.imgur.com/EKXBgdD.png';
    },
  },
};
</script>

<style lang="scss">
.account {
  background-color: #ffcc90;

  &__header {
    p {
      @include format-text($font-xlarge-size, $black-color, none, uppercase);
      text-align: center;
    }
  }

  &__content {
    .row {
      @include flexed($justify-content: center);
    }
  }
}

.account__card {
  &-image {
    svg {
      width: 100%;
    }
  }
}

.jars {
  &__header {
    p {
      @include format-text($font-xlarge-size, $black-color, none, uppercase);
      text-align: center;
    }
  }

  &__content {
    .row {
      @include flexed($justify-content: center);

      .jars__card {
        border: 1px solid rgb(210 206 206);
        padding: 0;

        &-header {
          border-bottom: 1px solid rgb(210 206 206);

          h2 {
            font-size: $font-large-size;
            font-weight: bold;
            text-transform: uppercase;
            transition: 0.4s all ease-in-out;
          }
        }

        &-body {
          border-bottom: 1px solid rgb(210 206 206);
          transition: 0.4s all ease-in-out;

          h2 {
            font-size: $font-large-size;
            margin-bottom: 0;
            font-weight: 600;
          }
        }

        &-footer {
          p {
            margin-bottom: 0;
            font-size: $font-base-size;
          }
        }
      }
    }
  }
}
</style>

