<template>
  <div class="account py-4" id="account__details">
    <div class="container">
      <div class="account__header">
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
                      <image href="https://i.imgur.com/xfU6GaE.png" width="288" height="180"
                        preserveAspectRatio="xMidYMid slice" />
                    </pattern>
                  </defs>
                  <rect width="288" height="180" rx="15" ry="15" fill="url(#backgroundPattern)" />
                  <text x="63" y="65" font-size="16" fill="#222222" font-weight="bold">{{
                    getNameCardByType(account.type) }} </text>
                  <text x="63" y="82" font-size="16" fill="#222222" font-weight="bold">{{ account.maskedPan[0] }}</text>
                  <text x="20" y="125" font-size="14" fill="#222222">Баланс: </text>
                  <text x="20" y="140" font-size="14" fill="#222222" font-weight="bold">
                    {{ formatNumber(account.balance) }} {{ getStringByNumber(account.currencyCode) }}
                  </text>
                  <text x="170" y="125" font-size="14" fill="#222222">Кредитний ліміт:</text>
                  <text x="170" y="140" font-size="14" fill="#222222" font-weight="bold">
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
  <div class="statement py-4">
    <div class="container">
      <div class="statement__header">
        <p>
          Виписка по картках
        </p>
      </div>
      <div class="statement-cards">
        <div class="statement-cards__slider">
          <swiper :slidesPerView="5" :spaceBetween="20" :pagination="{
            clickable: true,
          }" :modules="modules" class="mySwiper">
            <swiper-slide v-for="(card, index) in cards" :key="index">
              <div class="card">
                <h3>{{ card.name }}</h3>
                <p>{{ card.balance }} UAH</p>
                <p>Card Number: {{ card.number }}</p>
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
import { Pagination } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      accounts: [],
      jars: [],
      error: null,
      cards: [
        { name: "Card 1", balance: 1000, number: "1234 5678 9101 1121" },
        { name: "Card 2", balance: 2000, number: "1234 5678 9101 1122" },
        { name: "Card 3", balance: 3000, number: "1234 5678 9101 1123" },
        { name: "Card 4", balance: 4000, number: "1234 5678 9101 1124" },
        { name: "Card 5", balance: 5000, number: "1234 5678 9101 1125" },
      ],
      modules: [Pagination],
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

.statement {
  background-color: $dark-gray-color;

  &__header {
    p {
      @include format-text($font-xlarge-size, $white-color, none, uppercase, bold);
      text-align: center;
    }
  }

  &-cards__slider {
    width: 100%;
    max-width: 1000px;
    margin: auto;

    .card {
      h3 {
        margin: 15px;
        @include format-text($font-xlarge-size, $dark-gray-color, none, uppercase, bold, center);
      }

      p {
        @include format-text($font-base-size, $dark-gray-color, none, uppercase);
        margin: 5px 10px;
      }
    }
  }
}
</style>
