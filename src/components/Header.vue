<template>
  <header class="app-header">
    <h1>Vue Firebase Shop</h1>
     <nav class="nav-tabs">
      <!-- TAB «Catalog» -->
      <router-link
        to="/"
        class="nav-tab"
        :class="{ 'nav-tab--active': $route.name === 'Home' }"
      >
        {{ $route.name === 'Cart' ? 'Go Back to Catalog' : 'Catalog' }}
      </router-link>

      <!-- TAB «Cart» -->
      <router-link
        to="/cart"
        class="nav-tab nav-tab--cart"
        :class="{ 'nav-tab--active': $route.name === 'Cart' }"
      >
        🛒 <span v-if="totalQuantity" class="badge">{{ totalQuantity }}</span>
      </router-link>
    </nav>
  </header>
</template>

<script>
import { useCartStore } from '../store/cart'
export default {
  name: 'Header',
  computed: {
    // берем из this.$route
    catalogText() {
      return this.$route.name === 'Cart'
        ? 'Go Back to Catalog'
        : 'Catalog'
    },
    totalQuantity() {
      const cart = useCartStore()
      return cart.items.reduce((sum, i) => sum + i.quantity, 0)
    }
  }
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

nav a {
  margin: 0 20px;
  text-decoration: none;
}

nav a:last-child {
  margin-right: 0; 
}

.nav-tab {
  position: relative;
  padding: 8px 12px;
  font-size: 1.1rem;
  color: #555;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-tab:hover {
  color: #000;
}

.cart-link {
  position: relative;
}
.cart-link:hover {
  color:red;
}

.badge {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  vertical-align: top;
}

.nav-tab.nav-tab--cart {
  align-items: center;
  gap: 6px;
}

.nav-tab--active {
  color: #4caf50 !important;
}

.nav-tab--active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: #4caf50;
  border-radius: 2px 2px 0 0;
}
</style>