import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import draggable from 'vuedraggable';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import router from "@/router";

// Define your routes here if you have multiple pages
// const routes = [
//   { path: '/', component: Home },
//   { path: '/about', component: About }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes, // short for `routes: routes`
// })

const app = createApp(App);

app.component('draggable', draggable);
 // app.use(router);

app.mount('#app');
