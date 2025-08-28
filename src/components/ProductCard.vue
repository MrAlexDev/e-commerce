<template>
  <div class="product-card">
    <img
      :src="product.image"
      alt="Product image"
      class="product-image"
    />
    <h3>{{ product.name }}</h3>
    <p>Price: {{ product.price }} UAH</p>
    <p>Category: {{ product.category }}</p>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style>
.product-card {
  border: 1px solid #ddd;
  padding: 10px;
}

.product-card img {
  max-width: 100%;
  height: 100px;
  width: 300px;
  background-color: #e3dbdb;
  object-fit: cover;
  display: flex;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.actions a,
.actions button {
  display: block;
  text-align: center;
  padding: 5px;
  text-decoration: none;
  color: #fff;
  background-color: green;
  border: none;
  cursor: pointer;
}

.actions a:hover,
.actions button:hover {
  opacity: 0.8;
}
</style>
