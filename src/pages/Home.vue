<template>
  <div>
    <Toast :toasts="toasts" />

       <Form
        v-show="showForm"
        :form="form"
        :errors="errors"
        @submit="addProduct"
      />
   
    <Filters
      v-if="products.length"
      v-model:search="search"
      v-model:priceMin="priceMin"
      v-model:priceMax="priceMax"
      :categories="categories"
      v-model:selectedCategory="selectedCategory"
      :maxPrice="maxPrice"
    />

    <div class="product-list">
      <div v-for="p in filteredProducts" :key="p.id">
        <ProductCard :product="p">
          <template #actions>
            <button @click="handleAddToCart(p)">🛒</button>
            <button @click="openInfo(p)">📄</button>
          </template>
        </ProductCard>
      </div>
    </div>

    <ShowInfo
      :show="infoVisible"
      :product="selectedProduct"
      @close="closeInfo"
      @updated="onUpdated"
      @deleted="onDeleted"
    />
  </div>
</template>

<script>
import { products as productsApi } from "@/services/api";
import Toast from "@/components/Toast.vue";
import Form from "@/components/Form.vue";
import Filters from "@/components/Filters.vue";
import ProductCard from "@/components/ProductCard.vue";
import ShowInfo from "@/components/ShowInfo.vue";
import { useCartStore } from "@/store/cart";
import { useNotification } from "@/composables/useNotification";
import { useToasts } from "@/composables/useToasts";

const DB_URL = process.env.VUE_APP_FIREBASE_DB_URL;

export default {
  name: "Home",
  components: { Toast, Form, Filters, ProductCard, ShowInfo },
  setup() {
    const { notify } = useNotification();
    const { toasts, push } = useToasts();
    return { notify, toasts, push };
  },
  data() {
    return {
      products: [],
      search: "",
      priceMin: 0,
      priceMax: 1000,
      selectedCategory: "All",
      showForm: true,
      form: { name: "", price: null, category: "", description: "", image: "" },
      errors: { name: "", price: "", category: "", description: "" },
      infoVisible: false,
      selectedProduct: null,
      // toasts берутся из composable
      cart: null,
    };
  },
  computed: {
    categories() {
      return [...new Set(this.products.map((p) => p.category))];
    },
    maxPrice() {
      return this.products.length
        ? Math.max(...this.products.map((p) => p.price))
        : 1000;
    },
    filteredProducts() {
      return this.products.filter(
        (p) =>
          p.name.toLowerCase().includes(this.search.toLowerCase()) &&
          p.price >= this.priceMin &&
          p.price <= this.priceMax &&
          (this.selectedCategory === "All" ||
            p.category === this.selectedCategory)
      );
    },
  },
  created() {
    this.cart = useCartStore();
  },
  mounted() {
    this.fetchProducts();
    this.priceMin = 0;
    this.priceMax = this.maxPrice;
  },
  methods: {
    async fetchProducts() {
      const res = await productsApi.list();
      const raw = res.data || {};
      this.products = Object.keys(raw).map((id) => ({ id, ...raw[id] }));
      this.priceMax = this.maxPrice;
    },
    validateForm() {
      this.errors = { name: "", price: "", category: "", description: "" };
      let valid = true;
      if (!this.form.name) {
        this.errors.name = "Required";
        valid = false;
      }
      if (this.form.price == null) {
        this.errors.price = "Required";
        valid = false;
      }
      if (!this.form.category) {
        this.errors.category = "Required";
        valid = false;
      }
      if (!this.form.description) {
        this.errors.description = "Required";
        valid = false;
      }
      return valid;
    },
    async addProduct(formData) {
      this.form = { ...formData };
      if (!this.validateForm()) return;
      const res = await productsApi.create(this.form);
      this.products.push({ id: res.data.name, ...this.form });
      this.form = {
        name: "",
        price: null,
        category: "",
        description: "",
        image: "",
      };
      this.errors = { name: "", price: "", category: "", description: "" };
      this.priceMax = this.maxPrice;
    },
    handleAddToCart(prod) {
      this.cart.addToCart(prod);
      this.notify("Added to Cart", {
        body: prod.name,
        icon: prod.image || "/placeholder.png",
      });
      this.push(`${prod.name} added`, 'success');
    },
    openInfo(p) {
      this.selectedProduct = p;
      this.infoVisible = true;
    },
    onUpdated(updated) {
      const i = this.products.findIndex((p) => p.id === updated.id);
      if (i > -1) this.products.splice(i, 1, updated);
    },
    onDeleted(id) {
      this.products = this.products.filter((p) => p.id !== id);
    },
    closeInfo() {
      this.infoVisible = false;
      this.selectedProduct = null;
    },
  },
};
</script>

<style scoped>
/* Toast, form and filters styles are moved to respective components */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>
