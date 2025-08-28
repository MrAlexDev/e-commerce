import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  getters: {
    totalPrice: (state) =>
      state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  },
  actions: {
    addToCart(product) {
      const existing = this.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    removeFromCart(id) {
      this.items = this.items.filter((i) => i.id !== id);
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    clearCart() {
      this.items.splice(0, this.items.length);
      localStorage.removeItem('cart');
    },
  },
});
