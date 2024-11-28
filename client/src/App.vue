<template>
  <header>
    <HeaderComponent />
    <InfoComponent />
  </header>
  <main>
    <ClientDataComponent />
  </main>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import InfoComponent from './components/InfoComponent.vue';
import ClientDataComponent from './components/ClientDataComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    InfoComponent,
    ClientDataComponent
  }
}
</script>

<style lang="scss">
header {
  background-image: url('./assets/img/background.jpg');
  background-size: cover;
  font-family: $font-family;
}
</style>
