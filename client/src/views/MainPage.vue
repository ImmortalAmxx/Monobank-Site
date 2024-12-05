<template>
    <div id="main-page">
      <header>
        <HeaderComponent />
        <InfoComponent />
      </header>
      <main>
        <ClientDataComponent />
        <CurrencyCalculateComponent />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  </template>
  
  <script>
  import HeaderComponent from '../components/HeaderComponent.vue';
  import InfoComponent from '../components/InfoComponent.vue';
  import ClientDataComponent from '../components/ClientDataComponent.vue';
  import CurrencyCalculateComponent from '../components/CurrencyCalculateComponent.vue';
  import FooterComponent from '../components/FooterComponent.vue';
  
  export default {
    name: 'MainPage',
    components: {
      HeaderComponent,
      InfoComponent,
      ClientDataComponent,
      CurrencyCalculateComponent,
      FooterComponent,
    },
  };
  </script>
  
  <style scoped>
  header {
    background-image: url('../assets/img/background.jpg');
    background-size: cover;
  }
  </style>
  