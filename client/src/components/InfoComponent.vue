<template>
  <div class="container">
    <div class="information py-4">
      <div class="information__text">
        <p>
          <b>monobank</b> — роздрібний продукт <a href="https://www.universalbank.com.ua" target="_blank">АТ
            «Універсал Банк»</a>, який виник у рамках співпраці з ІТ-командою mono.
          У рамках monobank випускаються кредитні картки для клієнтів, є можливість розмістити депозити й
          отримати інші послуги, а кращий мобільний застосунок зробить управління фінансами максимально
          зручним. <b>monobank</b> працює тільки на мобільних пристроях.
        </p>
        <div class="information__download">
          <h2>monobank – банк у телефоні</h2>
          <h4>Завантажити додаток</h4>
          <a href="https://apps.apple.com/ua/app/monobank-перший-цифровий-банк/id1287005205?l=uk" target="_blank"><img
              src="../assets/img/appstore_ifactor.png" alt=""></a>
          <a href="https://play.google.com/store/apps/details?id=com.ftband.mono&pli=1" target="_blank"><img
              src="../assets/img/google_ifactor.png" alt=""></a>
        </div>
      </div>
      <div class="information__logo mb-5">
        <img src="../assets/img/mono_iphone.webp" alt="MonoBank Iphone">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoComponent'
}
</script>

<style lang="scss" scoped>
.container .information {
  @include flexed($justify-content: space-between);

  &__text {
    width: 800px;

    p {
      @include format-text($font-xlarge-size, $gray-soft-color);
    }

    a {
      @include format-text($color: rgb(57, 235, 134), $text-decoration: none);
    }
  }

  &__download {
    margin-top: 280px;

    @include media-breakpoint-down(lg) {
      margin-top: 0;
    }

    h2 {
      @include format-text($font-xlarge-size, $white-color);
    }

    h4 {
      @include format-text($font-xlarge-size, $gray-soft-color, $text-transform: uppercase);
    }

    img {
      width: 120px;
      margin-right: 10px;
    }
  }

  &__logo {
    @include media-breakpoint-down(lg) {
      display: none;
    }
  }
}
</style>