<template>
  <nav class="navbar navbar-expand-md navbar-light">
    <div class="container container-fluid">
      <img src="../assets/img/monobank-svgrepo.svg" alt="">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#accounts">Інформація по картках</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#jars">Активні збіри</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#statement">Виписка по картках</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#currency">Калькулятор валют</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#footer">Контакти</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderComponent',
}
</script>

<style lang="scss" scoped>
img {
  width: 64px;
  height: 64px;
}

.navbar-toggler {
  color: $gray-soft-color;
}

.nav-link {
  @include format-text($font-base-size, $gray-soft-color, none, uppercase);

  &:hover {
    color: $neutral-light-color;
  }
}
</style>
