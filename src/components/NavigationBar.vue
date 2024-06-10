<template>
  <div class="wrapper-nav">
    <header>
      <router-link class="logo-container" :to="{ name: 'home' }">
        <img class="digifi-logo" src="https://www.digifi.io/_next/static/media/logo-blue-white.527540db.svg"
          alt="Company Logo" />
      </router-link>

      <nav class="routes-container" v-if="navState === 'desk'">
        <ul>
          <li>
            <router-link :to="{ name: 'home' }">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'dashboard' }">Dashboard </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'register' }">Register/SignUp</router-link>
          </li>
          <li>
            <button @click="store.logout" v-if="!!store.userId">
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <nav class="routes-mobile-container" v-else>
        <button class="nav-btn" @click="toggleMenuNav">
          <img src="../assets/icons8-hamburger.svg" alt="burger icon">
        </button>

        <ul v-if="navStatusMobile" :class="triggerMenuAni" class="mobile-menu-nav-list">
          <li>
            <router-link :to="{ name: 'home' }">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'dashboard' }">Dashboard </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'register' }">Register/SignUp</router-link>
          </li>
          <li>
            <button @click="store.logout" v-if="!!store.userId">
              Logout
            </button>
          </li>

          <BaseButton @click="toggleMenuNav">Exit</BaseButton>

        </ul>

      </nav>

    </header>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import BaseButton from './Modal/BaseButton.vue';

import { useAuthStore } from '@/store/authStore';

const store = useAuthStore()

const navStatusMobile = ref(false)
const navState = ref('desk')

function toggleMenuNav() {
  navStatusMobile.value = !navStatusMobile.value
}

function getWindowWidth() {
  if (window.innerWidth <= 700) {
    navState.value = 'mobile'
  } else {
    navState.value = 'desk'
  }
}

const triggerMenuAni = computed(() => {
  return navStatusMobile.value ? 'active' : ''
})



onMounted(() => {
  window.addEventListener("resize", () => { getWindowWidth() });
})



</script>

<style scoped lang="less">
@keyframes left-animation {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.wrapper-nav {
  display: flex;
  justify-content: start;
  align-items: start;

  header {
    background: rgb(15, 35, 66);
    height: 80px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo-container {
      .digifi-logo {
        width: 200px;
        height: 40px;
      }
    }

    .routes-container {
      padding: 2em;

      ul {
        margin: 0;
        display: flex;
        gap: 4.1em;

        li {
          list-style-type: none;

          a,
          button {
            color: #ffff;
            text-decoration: none;
            font-size: 1.6rem;
            text-transform: uppercase;
            position: relative;
          }

          button {
            background-color: transparent;
            border: none;
            color: #ffff;
          }

          a::before {
            content: "";
            position: absolute;
            width: 0%;
            height: 1px;
            border-bottom: 2px solid grey;
            bottom: -4px;
            transition: width 0.3s;
          }

          a:hover::before {
            width: 35%;
          }

          .router-link-exact-active {
            position: relative;
            color: #3dd68c;
            font-weight: bold;
          }

          .router-link-exact-active::before {
            content: "";
            position: absolute;
            width: 35%;
            height: 1px;
            border-bottom: 2px solid black;
            bottom: -4px;
          }
        }
      }
    }

    .routes-mobile-container {
      padding: 2em;

      .nav-btn {
        cursor: pointer;
        background-color: transparent;
        border: none;
      }

      .mobile-menu-nav-list {
        margin: 0;
        display: block;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        max-width: 100%;
        padding: 2.4em;
        transform: translateX(-100%);
        transition: all 3s;
        background-color: #ffff;
        z-index: 9999;

        li {
          list-style-type: none;
          margin: 2em;

          a {
            color: #000;
            text-decoration: none;
            font-size: 1.6rem;
            text-transform: uppercase;
            position: relative;
          }

          a::before {
            content: "";
            position: absolute;
            width: 0%;
            height: 1px;
            border-bottom: 2px solid grey;
            bottom: -4px;
            transition: width 0.3s;
          }

          a:hover::before {
            width: 35%;
          }

          .router-link-exact-active {
            position: relative;
            color: #3dd68c;
            font-weight: bold;
          }

          .router-link-exact-active::before {
            content: "";
            position: absolute;
            width: 35%;
            height: 1px;
            border-bottom: 2px solid black;
            bottom: -4px;
          }
        }
      }

      .active {
        transform: translateX(0%);
        transition: all 3s;
      }
    }
  }
}
</style>
