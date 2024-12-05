<template>
  <div class="authorization">

    <div class="d-flex justify-content-center align-items-center vh-100">
      <form @submit.prevent="setClientApiKey">
        <div class="mb-3">
          <label for="api-key" class="form-label">Api key</label>
          <input type="text" class="form-control" id="api-key" v-model="apiKey">
        </div>
        <a href="https://api.monobank.ua/index.html" target="_blank" class="btn btn-primary w-60 me-1">Отримати api ключ</a>
        <button type="submit" class="btn btn-primary w-40">Увійти</button>
      </form>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'AuthorizationPage',

  data() {
    return {
      apiKey: '',
    };
  },
  methods: {
    async setClientApiKey() {
      if (this.apiKey) {
        try {
          await axios.post('http://localhost:5000/api/set-token', {
            apiKey: this.apiKey,
          });

          console.log('Авторизація успішна!');
          this.$router.push('/main');
        } catch (error) {
          console.error('Помилка авторизації:', error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.authorization {
  background: linear-gradient(15deg, rgba(249, 0, 241, 1) 0%, rgba(220, 15, 110, 1) 47%, rgba(131, 32, 195, 1) 100%);

  form {
    background: white;
    padding: 20px;
    border-radius: $border-radius;
    font-family: $font-family;

    label.form-label {
      @include format-text($font-base-size, $dark-gray-color, none, uppercase, bold);
    }
  }
}
</style>