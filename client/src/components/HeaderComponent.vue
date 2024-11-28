<template>
  <div class="nav">
    <nav class="nav-menu">
      <button class="nav-button">Головна</button>
      <button class="nav-button">Про нас</button>
      <button class="nav-button">Послуги</button>
      <button class="nav-button">Контакти</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style scoped>
.nav {
  background: #f3f3f3;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 0;
  border-radius: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-menu {
  display: flex;
  gap: 10px;
  padding: 15px;
}

.nav-button {
  color: grey;
  border: none;
  padding: 10px 5px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  color: lightblue;
}
</style>
