<template>
  <div class="wrapper">
    <navigation-bar></navigation-bar>
    <div class="container-view">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavigationBar from "./components/NavigationBar.vue";

import { useAuthStore } from './store/authStore'

const store = useAuthStore()

store.tryLogin()

</script>

<style>
html {
  font-size: 62.5%;

}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Poppins';

}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>


<style scoped>
.container-view {
  max-width: 1200px;
  margin: 0 auto;
}
</style>