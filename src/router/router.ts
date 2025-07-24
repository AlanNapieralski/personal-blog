import { createRouter, createWebHistory } from 'vue-router'


import Main from '../components/Main.vue'
import Article from '../components/Article.vue'


const routes = [
    { path: '/', component: Main },
    { path: '/articles/:slug', component: Article, props: true },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})