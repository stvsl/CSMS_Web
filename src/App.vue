<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import BottomBar from './components/BottomBar.vue'
</script>

<template>
  <TopBar></TopBar>
  <router-view></router-view>
  <BottomBar></BottomBar>
</template>

<style scoped>
.head {
  height: 60px;
  background-color: blue;
}

.c2 {
  height: 80vh;
  background-color: rgb(255, 255, 255);
}
</style>
