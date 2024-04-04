<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav pl-3 ml-3">
        <router-link class="nav-item nav-link home-btn" to="/">Strona Główna</router-link>
      </div>
      <div class="navbar-nav pl-3 ml-3">
        <router-link class="nav-item nav-link home-btn" to="/books">Książki</router-link>
      </div>
      <div class="navbar-nav pl-3 ml-3">
        <router-link class="nav-item nav-link home-btn" to="/authors">Autorzy</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>

</script>


<style scoped>
.home-btn {
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
  color: white;
}
</style>