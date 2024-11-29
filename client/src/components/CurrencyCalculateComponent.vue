<template>
  <div class="currency-exchange" id="currency">
    <div class="container">
      <div class="currency-exchange__form">
        <h1 class="currency-exchange__title">Розрахувати курси гривні до валюту</h1>
        <form @submit.prevent="calculateCurrency">
          <div class="row g-3">
            <div class="col-md-4">
              <input type="number" step="0.01" class="currency-exchange__input form-control" placeholder="Введіть число"
                v-model="amount" />
            </div>
            <div class="col-md-4">
              <div class="currency-exchange__dropdown dropdown">
                <button class="currency-exchange__dropdown-toggle btn btn-outline-secondary dropdown-toggle w-100"
                  type="button" id="currencyDropdown" data-bs-toggle="dropdown" aria-expanded="false">
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
              <button type="submit" class="btn btn-primary btn-block w-100">
                Розрахувати
              </button>
            </div>
          </div>
        </form>
        <div v-if="result !== null" class="currency-exchange__result mt-3">
          <h2>Результат: {{ result.toFixed(2) }}</h2>
        </div>
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
      result: null
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
        const response = await axios.get(
          "http://localhost:5000/api/monobank-currency"
        );
        this.currencies = this.mapCurrencies(response.data);
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
            if(item.rateBuy)
              currency.rateBuy = item.rateBuy;

            if(item.rateCross)
              currency.rateBuy = item.rateCross;
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
        this.result = null;
        alert("Будь ласка, введіть число і виберіть валюту!");
        return;
      }

      this.result = this.amount * this.selectedCurrency.rateBuy;
    },
  },
  mounted() {
    this.getCurrencyInfo();
  },
};
</script>

<style lang="scss" scoped>
.currency-exchange {
  background-color: #d4d3d2;
  padding: 50px 0;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__form {
    background: #fff;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;

    &__title {
      text-transform: uppercase;
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }

    &__input {
      padding: 15px;
    }

    &__dropdown {
      &-toggle {
        padding: 15px;
      }

      &-menu {
        .currency-exchange__dropdown-item {
          display: flex;
          align-items: center;

          i {
            margin-right: 10px;
          }
        }
      }
    }

    &__submit {
      background-color: #0056b3;
      color: #fff;
      border: none;

      &:hover {
        background-color: #004085;
      }
    }
  }
}
</style>
