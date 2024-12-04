<template>
  <div class="footer" id="footer">
    <div class="container">
      <footer class="text-center text-white">
        <div class="container pt-4">
          <section class="mb-4">
            <a class="btn btn-link btn-floating btn-lg m-1" href="https://x.com/AmxxImmortal" target="_blank"
              role="button" data-mdb-ripple-color="dark"><i class="fab fa-x-twitter text-light"></i></a>
            <a class="btn btn-link btn-floating btn-lg m-1" href="https://github.com/ImmortalAmxx" target="_blank"
              role="button" data-mdb-ripple-color="dark"><i class="fab fa-github text-light"></i></a>
            <a class="btn btn-link btn-floating btn-lg m-1" href="https://t.me/amxxcoder" target="_blank"
              role="button" data-mdb-ripple-color="dark"><i class="fab fa-telegram text-light"></i></a>
          </section>
        </div>
        <div class="text-center text-light p-3">
          © 2024 Copyright: Stasko Stanislav
        </div>
      </footer>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: $dark-gray-color;
}
</style>