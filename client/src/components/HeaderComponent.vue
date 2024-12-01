<template>
  <div class="container">
    <div class="navigation">
      <div class="navigation__logo">
        <img src="../assets//img/monobank-svgrepo.svg" alt="Monobank Logo">
      </div>
      <nav class="navigation__menu">
        <a href="#" class="navigation__link">Головна</a>
        <a href="#account__details" class="navigation__link">Інформація по картках</a>
        <a href="#jars__details" class="navigation__link">Активні банки (збіри)</a>
        <a href="#currency" class="navigation__link">Калькулятор валюти</a>
        <a href="#footer" class="navigation__link">Контакти</a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
}
</script>

<style lang="scss" scoped>
.container .navigation {
  @include flexed($justify-content: space-between, $align-items: center);

  margin: 0;
  border-radius: 30px;

  .navigation__logo {
    @include flexed();
    width: 64px;
    height: 64px;
  }

  .navigation__menu {
    @include flexed($justify-content: flex-end, $align-items: center);
    gap: 10px;
    padding: 15px;

    .navigation__link {
      @include format-text($color: $gray-soft-color, $text-decoration: none, $text-transform: uppercase);
      color: $gray-soft-color;
      padding: 10px 5px;
      cursor: pointer;
    }

    .navigation__link:hover {
      color: $neutral-light-color;
    }
  }
}
</style>
