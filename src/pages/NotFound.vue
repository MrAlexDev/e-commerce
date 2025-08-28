<template>
  <div class="not-found">
    <h2>404 — Page Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h2 {
  font-size: 36px;
  margin-bottom: 20px;
}
</style>
