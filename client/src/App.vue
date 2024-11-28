<template>
  <HeaderComponent />
  <FooterComponent />
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
  body {
    background-image: linear-gradient(242deg, #d99c9d, #8677d9 51%, #6072cc);
    background-size: cover;
  }
</style>
