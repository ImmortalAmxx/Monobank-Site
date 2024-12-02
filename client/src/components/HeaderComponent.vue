<template>
  <div class="container">
    <div class="navigation">
      <div class="navigation__logo">
        <img src="../assets//img/monobank-svgrepo.svg" alt="Monobank Logo">
      </div>
      <nav class="navigation__menu">
        <a href="#" class="navigation__link px-1">Головна</a>
        <a href="#accounts" class="navigation__link px-1">Інформація по картках</a>
        <a href="#jars" class="navigation__link px-1">Активні банки (збіри)</a>
        <a href="#statement" class="navigation__link px-1">Виписка по картках</a>
        <a href="#currency" class="navigation__link px-1">Калькулятор валюти</a>
        <a href="#footer" class="navigation__link px-1">Контакти</a>
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

  &__logo {
    @include flexed();
    width: 64px;
    height: 64px;
  }

  &__menu {
    @include flexed($justify-content: flex-end, $align-items: center);
    gap: 10px;
  }

  &__link {
    @include format-text($color: $gray-soft-color, $text-decoration: none, $text-transform: uppercase);
    cursor: pointer;

    &:hover {
      color: $neutral-light-color;
    }
  }
}
</style>
