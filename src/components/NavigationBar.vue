<template>
  <div class="wrapper-nav">
    <header>
      <router-link class="logo-container" :to="{ name: 'home' }">
        <img
          class="digifi-logo"
          src="https://www.digifi.io/_next/static/media/logo-blue-white.527540db.svg"
          alt="Company Logo"
        />
      </router-link>

      <nav class="routes-container">
        <ul>
          <li>
            <router-link :to="{ name: 'home' }">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'dashboard' }">Dashboard </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'register' }"
              >Register/SignUp</router-link
            >
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script setup></script>

<style scoped lang="less">
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
          a {
            color: #ffff;
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
    }
  }
}
</style>
