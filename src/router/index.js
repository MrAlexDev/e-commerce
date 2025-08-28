import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Cart from '../pages/Cart.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  { path: '/', redirect: '/shop' },
  { path: '/shop', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: Cart },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router