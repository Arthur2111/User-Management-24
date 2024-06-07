<template>
  <div class="home">
    <TheBanner></TheBanner>
  </div>
</template>

<script setup>
import TheBanner from '../components/HomeComponents/TheBanner.vue'
// @ is an alias to /src
import { ref } from "vue";
import { useUserStore } from "../store/userStore.js";

const store = useUserStore();
const userName = store.name;
</script>

<style scoped lang="less">
.home {
  
}
</style>
