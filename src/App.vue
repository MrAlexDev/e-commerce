<template>
  <div id="app">

    <Header />

    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    
  </div>
  
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: { Header },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Domine:wght@400..700&display=swap");

#app {
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Domine", serif;
}
</style>
