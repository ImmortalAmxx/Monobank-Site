<template>
  <div class="currency-exchange p-4" id="currency">
    <div class="container">
      <div class="currency-exchange__form p-4">
        <h4 class="currency-exchange__title">Розрахувати курси гривні до валюти</h4>
        <form @submit.prevent="calculateCurrency">
          <div class="row g-3">
            <div class="col-md-4">
              <input type="number" step="0.01" class="currency-exchange__input form-control" placeholder="Введіть число"
                v-model="amount" />
            </div>
            <div class="col-md-4">
              <div class="currency-exchange__dropdown dropdown">
                <button class="currency-exchange__dropdown-toggle btn btn-light dropdown-toggle w-100" type="button"
                  id="currencyDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i :class="selectedCurrency.icon"></i>
                  {{ selectedCurrency.label || "Виберіть валюту" }}
                </button>
                <ul class="currency-exchange__dropdown-menu dropdown-menu">
                  <li v-for="currency in filteredCurrencies" :key="currency.code" @click="selectCurrency(currency)"
                    class="currency-exchange__dropdown-item dropdown-item">
                    <i :class="currency.icon"></i>
                    {{ currency.label }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-4">
              <button type="submit" class="btn btn-light w-100">
                Розрахувати
              </button>
            </div>
          </div>
          <div v-if="resultBuy !== null && resultSell !== null" class="currency-exchange__result mt-3">
            <h5>Результат:</h5>
            <h6>Купівля: {{ resultSell.toFixed(2) }}</h6>
            <h6>Продаж: {{ resultBuy.toFixed(2) }}</h6>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      amount: "",
      selectedCurrency: {},
      currencies: [],
      error: null,
      resultBuy: null,
      resultSell: null
    };
  },
  computed: {
    filteredCurrencies() {
      const allowedCurrencies = ["USD", "PLN"];
      return this.currencies.filter((currency) =>
        allowedCurrencies.includes(currency.code)
      );
    },
  },
  methods: {
    async getCurrencyInfo() {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/monobank-currency"
        );
        this.currencies = this.mapCurrencies(data);
      } catch (err) {
        this.error = "Неможливо дістати інформацію. Помилка: " + err.message;
      }
    },

    mapCurrencies(data) {
      const currencyMapping = {
        840: { code: "USD", label: "USD - US Dollar", icon: "fas fa-dollar-sign" },
        985: { code: "PLN", label: "PLN - Polish Zloty", icon: "fas fa-coins" },
      };

      return data
        .map((item) => {
          const currency = currencyMapping[item.currencyCodeA];

          if (currency) {
            if (item.rateBuy)
              currency.rateBuy = item.rateBuy;

            if (item.rateCross) {
              currency.rateBuy = item.rateCross;
              currency.rateSell = item.rateCross;
            }

            if (item.rateSell)
              currency.rateSell = item.rateSell;
          }

          return currency;
        })
        .filter((item) => item);
    },
    selectCurrency(currency) {
      this.selectedCurrency = currency;
    },
    calculateCurrency() {
      if (!this.amount || !this.selectedCurrency.rateBuy) {
        this.resultBuy = null;
        this.resultSell = null;
        alert("Будь ласка, введіть число і виберіть валюту!");
        return;
      }

      this.resultBuy = this.amount * this.selectedCurrency.rateBuy;
      this.resultSell = this.amount * this.selectedCurrency.rateSell;
    },
  },
  mounted() {
    this.getCurrencyInfo();
  },
};
</script>

<style lang="scss" scoped>
.currency-exchange {
  background: $white-color;

  .container {
    @include flexed(center, center);
  }

  &__form {
    background: $dark-gray-color;
    border-radius: 8px;
    box-shadow: $dark-gray-color 0px 5px 15px;
    width: 100%;
    max-width: 600px;

    h4 {
      @include format-text($font-xlarge-size, $white-color, none, uppercase, bold, center);
      margin-bottom: 20px;
    }
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

  &__result {
    h5, h6 {
      @include format-text($font-large-size, $white-color, none, uppercase);
    }
  }
}
</style>

