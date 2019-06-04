import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/vue',
            name: 'Index',
            component: Index
        },
        {
            path: '/vue/about',
            name: 'About',
            component: About
        }
    ]
})