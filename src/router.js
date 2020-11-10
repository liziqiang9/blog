import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import VArticle from './views/VArticle.vue'
const routerHistory = createWebHistory()

export const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: process.env.VUE_APP_ROOT_URL,
            name: 'home',
            component: Home
        },
        {
            path: process.env.VUE_APP_ROOT_URL + '/tag',
            name: 'tag',
            component: Home
        },
        {
            path: process.env.VUE_APP_ROOT_URL + "/:article+",
            name: "article",
            component: VArticle
        },
    ]
})



