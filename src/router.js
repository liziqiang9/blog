import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import VArticle from './views/VArticle.vue'
const routerHistory = createWebHistory()

export const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/tag',
            name: 'tag',
            component: Home
        },
        {
            path: "/article/:name",
            name: "article",
            component: VArticle
          },
    ]
})



