import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueAwesomePaginate from "vue-awesome-paginate";

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(VueAwesomePaginate).mount('#app')
