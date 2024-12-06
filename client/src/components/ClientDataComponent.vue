<template>
  <div class="account py-4">
    <div class="container" id="accounts">
      <div class="account__header">
        <p>Список активних карток</p>
      </div>
      <div class="account__content" v-if="accounts.length > 0">
        <swiper :slidesPerView="4" :spaceBetween="20" class="mySwiper">
          <swiper-slide v-for="(account, index) in accounts" :key="index">
            <div class="account__card">
              <div class="account__card-image py-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 180">
                  <defs>
                    <pattern id="backgroundPattern" patternUnits="userSpaceOnUse" width="288" height="180">
                      <image href="https://i.imgur.com/xfU6GaE.png" width="288" height="180"
                        preserveAspectRatio="xMidYMid slice" />
                    </pattern>
                  </defs>
                  <rect width="288" height="180" rx="15" ry="15" fill="url(#backgroundPattern)" />
                  <text x="65" y="65" font-size="16" fill="#222222" font-weight="bold">{{
                    getNameCardByType(account.type) }} </text>
                  <text x="65" y="82" font-size="17" fill="#222222" font-weight="bold">{{
                    formatCurdNumber(account.maskedPan[0]) }}</text>
                  <text x="20" y="125" font-size="14" fill="#222222">Баланс: </text>
                  <text x="20" y="140" font-size="14" fill="#222222" font-weight="bold">
                    {{ formatNumber(account.balance) }} {{ getCurrencyName(account.currencyCode) }}
                  </text>
                  <text x="170" y="125" font-size="14" fill="#222222">Кредитний ліміт:</text>
                  <text x="170" y="140" font-size="14" fill="#222222" font-weight="bold">
                    {{ formatNumber(account.creditLimit) }} {{ getCurrencyName(account.currencyCode) }}
                  </text>
                </svg>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="information-white" v-else>
        <p>Завантаження даних...</p>
      </div>
    </div>
  </div>
  <div class="jars py-4">
    <div class="container">
      <div class="jars__header" id="jars">
        <p>Список активних банок</p>
      </div>
      <div class="jars__content" v-if="jars.length > 0">
        <div class="row">
          <div class="col-md-6 col-sm-6 col-xl-3 text-center" v-for="(jar, index) in jars" :key="index">
            <div class="jars__card px-3 py-4">
              <div class="jars__card-header">
                <h2>{{ jar.title }}</h2>
              </div>
              <div class="jars__card-body py-3 mb-0">
                <h2 v-if="jar.description.length > 0">Описа банки: {{ jar.description }}</h2>
                <h2 v-else>Описа банки: Відсутній</h2>
              </div>
              <div class="jars__card-footer pt-2">
                <p class="mb-0">Баланс: {{ formatNumber(jar.balance) }} {{ getCurrencyName(jar.currencyCode) }}</p>
                <div v-if="jar.goal != null">
                  <p class="mb-0">Потрібно: {{ formatNumber(jar.goal) }} {{ getCurrencyName(jar.currencyCode) }}</p>
                  <p class="mb-0">Залишилось зібрати: {{ formatNumber(jar.goal - jar.balance) }} {{
                    getCurrencyName(jar.currencyCode)
                  }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="information-black" v-else>
        <p class="information-black">Завантаження даних...</p>
      </div>
    </div>
  </div>
  <div class="statement py-4" v-if="accounts.length > 0">
    <div class="container" id="statement">
      <div class="statement-form p-3">
        <div class="statement__header">
          <p>
            Виписка по картках
          </p>
        </div>
        <form @submit.prevent="getStatementsInfo(selectCardData[0].cardId)">
          <div class="row g-3">
            <div class="col-6">
              <div class="statement-form__dropdown dropdown">
                <button class="statement-form__dropdown-toggle btn btn-light dropdown-toggle w-100" type="button"
                  id="currencyDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ getNameCardByType(selectCardData[0]?.selectId.type) || "Виберіть карту" }}
                </button>
                <ul class="currency-exchange__dropdown-menu dropdown-menu">
                  <li v-for="(account, index) in accounts" :key="index" @click="selectCard(account)"
                    class="currency-exchange__dropdown-item dropdown-item">
                    {{ getNameCardByType(account.type) }} ({{ getCurrencyName(account.currencyCode) }})
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-6">
              <button type="submit" class="btn btn-light w-100">
                Отримати виписку
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="statement-cards" v-if="statements.length > 0">
        <div class="statement-cards__slider">
          <swiper :spaceBetween="20" :breakpoints="breakpoints">
            <swiper-slide v-for="(statement, index) in statements" :key="index">
              <div class="card p-3">
                <h3 class="mb-4">Транзакція №: {{ index + 1 }}</h3>
                <p class="mx-2 my-0">Опис: {{ statement.description }}</p>
                <p class="mx-2 my-0">Дата: {{ getDate(statement.time) }}</p>
                <p class="mx-2 my-0">Кошти: {{ formatNumber(statement.amount) }} {{
                  getCurrencyName(statement.currencyCode) }} </p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useAlertsStore } from '@/stores/alerts';

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      accounts: [],
      jars: [],
      statements: [],
      selectCardData: [],
      breakpoints: {
        576: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
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
        console.log(err);

        const alertsStore = useAlertsStore();

        switch(err.response.status) {
          case 429: {
            alertsStore.setMessage('Забагато запитів, оновіть сторінку через декілька секунд!'); 
            break;
          }
          case 400, 403:  {
            alertsStore.setMessage('Ви вказали невірний API ключ!'); 
            this.$router.push('/');
            break; 
          }
        }

        alert(alertsStore.allertMessage);
      }
    },

    async getStatementsInfo(card) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/monobank-statement`, {
          params: {
            accountId: card,
            from: Date.now() - (30 * 86400000),
            to: Date.now()
          }
        });

        this.statements = response.data;

        if (this.statements.length < 1) {
          const alertsStore = useAlertsStore();
          alertsStore.setMessage("Виписка по даній картці не знайдена");

          alert(alertsStore.allertMessage);
        }
      } catch (err) {
        console.log(err);

        const alertsStore = useAlertsStore();

        switch(err.response.status) {
          case 429: {
            alertsStore.setMessage('Забагато запитів, оновіть сторінку через декілька секунд!'); 
            break;
          }
          case 400, 403:  {
            alertsStore.setMessage('Ви вказали невірний API ключ!');
            this.$router.push('/'); 
            break; 
          }
        }

        alert(alertsStore.allertMessage);
      }
    },

    getCurrencyName(number) {
      const strings = {
        980: 'UAH',
        840: 'USD',
        978: 'EU',
      };

      return strings[number];
    },

    getNameCardByType(type) {
      const strings = {
        "black": 'Темна',
        "white": 'Біла',
        "eAid": 'єПідтримка',
        "madeInUkraine": 'Кешбек'
      };

      return strings[type];
    },

    formatNumber(value) {
      const strValue = value.toString();
      if (strValue.length <= 2) {
        return '0.' + strValue.padStart(2, '0');
      }
      return strValue.slice(0, -2) + '.' + strValue.slice(-2);
    },

    formatCurdNumber(value) {
      for (let i = 0; i < value.length; i++) {
        if (i % 5 === 0) {
          value = value.slice(0, i) + ' ' + value.slice(i);
        }
      }

      return value;
    },

    selectCard(card) {
      this.selectCardData = [{
        selectId: card,
        cardId: card.id
      }];
    },

    getDate(timestamp) {
      const date = new Date(timestamp * 1000);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleDateString('uk-UA', options);
    }
  },
};
</script>


<style lang="scss">
.account {
  background-color: $dark-gray-color;

  &__header {
    p {
      @include format-text($font-xlarge-size, $white-color, none, uppercase, bold);
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
      @include format-text($font-xlarge-size, $black-color, none, uppercase, bold, center);
    }
  }

  &__content {
    .row {
      @include flexed($justify-content: center);

      .jars__card {
        background-color: $dark-gray-color;
        box-shadow: $dark-gray-color 0px 5px 15px;
        border-radius: $border-radius;

        @include media-breakpoint-down(sm) {
          margin-bottom: 15px;
        }

        &-header {
          h2 {
            @include format-text($font-large-size, $white-color, none, uppercase, bold);

            @include media-breakpoint-down(md) {
              font-size: 16px;
            }
          }
        }

        &-body {
          h2 {
            @include format-text($font-large-size, $white-color);

            @include media-breakpoint-down(md) {
              font-size: 15px;
            }
          }
        }

        &-footer {
          p {
            @include format-text($font-base-size, $white-color);

            @include media-breakpoint-down(md) {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}

.statement {
  background-color: $dark-gray-color;

  &__header {
    p {
      @include format-text($font-xlarge-size, $dark-gray-color, none, uppercase, bold, center);
    }
  }

  &-cards__slider {
    width: 100%;
    max-width: 1000px;
    margin: auto;

    .card {
      h3 {
        @include format-text($font-xlarge-size, $dark-gray-color, none, uppercase, bold, center);
      }

      p {
        @include format-text($font-base-size, $dark-gray-color, none, uppercase);
      }
    }
  }

  &-form {
    background: $white-color;
    border-radius: $border-radius;
    box-shadow: $white-color 0px 5px 15px;
    width: 100%;
    max-width: 500px;
  }

  &__dropdown {
    &-menu {
      .currency-exchange__dropdown-item {
        @include flexed($align-items: center);

        i {
          margin-right: 10px;
        }
      }
    }
  }

  &__submit {
    background-color: $deep-blue-color;
    color: $white-color;
    border: none;

    &:hover {
      background-color: $dark-blue-color;
    }
  }

  .statement-cards {
    margin-top: 20px;
    overflow: hidden;
  }

  #statement {
    @include flexed(center, center, wrap);
  }
}
</style>
