<template>
  <header>
    <HeaderComponent />
    <InfoComponent />
  </header>
  <main>
    <ClientDataComponent />
    <CurrencyCalculateComponent />
  </main>
  <footer>
    <FooterComponent/>
  </footer>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import InfoComponent from './components/InfoComponent.vue';
import ClientDataComponent from './components/ClientDataComponent.vue'
import CurrencyCalculateComponent from './components/CurrencyCalculateComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    InfoComponent,
    ClientDataComponent,
    CurrencyCalculateComponent,
    FooterComponent
  }
}
</script>

<style lang="scss">
#app {
  font-family: $font-family;
}

header {
  background-image: url('./assets/img/background.jpg');
  background-size: cover;
}
</style>
