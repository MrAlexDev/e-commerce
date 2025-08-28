<template>
  <div class="cart-container">
    <h2 class="cart-title">Shopping Cart</h2>

    <div v-if="items.length" class="cart-content">
      <button @click="clearAll" class="btn-clear-all">
        🗑️ Clear Cart
      </button>

      <div class="cart-items">
        <div v-for="item in items" :key="item.id" class="cart-item">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.name"
            class="item-image"
          />
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-qty">
              Quantity: <span>{{ item.quantity }}</span>
            </p>
            <p class="item-price">
              {{ item.price }} UAH each
            </p>
          </div>
          <button @click="remove(item.id)" class="btn-remove">
            Delete
          </button>
        </div>
      </div>

      <div class="cart-total">
        Total: <strong>{{ totalPrice }} UAH</strong>
      </div>
    </div>

    <div v-else class="cart-empty">
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/store/cart";
import { computed } from "vue";

export default {
  name: "Cart",
  setup() {
    const cart = useCartStore();
    const items = computed(() => cart.items);
    const totalPrice = computed(() => cart.totalPrice);

    const clearAll = () => {
      cart.clearCart();
    };

    const remove = (id) => cart.removeFromCart(id);

    return { items, totalPrice, remove, clearAll };
  },
};
</script>

<style scoped>
.cart-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.cart-title {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
  text-align: center;
}

.btn-clear-all {
  display: block;
  margin: 0 0 16px auto;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}
.btn-clear-all:hover {
  background-color: #c0392b;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 6px;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
}

.item-name {
  margin: 0 0 4px;
  font-size: 1.1rem;
  color: #2c3e50;
}
.item-qty,
.item-price {
  margin: 2px 0;
  font-size: 0.9rem;
  color: #555;
}

.btn-remove {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.2s;
}
.btn-remove:hover {
  background-color: #c0392b;
}

.cart-total {
  margin-top: 24px;
  text-align: right;
  font-size: 1.2rem;
  color: #333;
}

.cart-empty {
  text-align: center;
  color: #777;
  font-size: 1rem;
}
</style>
