import { createRouter, createWebHistory } from 'vue-router'


import Main from '../components/pages/Main.vue'
import Article from '../components/Article.vue'
import Posts from '../components/pages/Posts.vue'
import NotFound from '../components/pages/NotFound.vue'

const routes = [
    { path: '/', component: Main },
    { path: '/articles/:slug', component: Article, props: true },
    { path: '/posts', component: Posts, props: true },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound',
        component: NotFound 
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})