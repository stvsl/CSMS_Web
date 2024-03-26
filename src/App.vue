<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import BottomBar from './components/BottomBar.vue'
</script>

<template>
  <TopBar></TopBar>
  <div class="c2"></div>
  <BottomBar></BottomBar>
</template>

<style scoped>
.head {
  height: 60px;
  background-color: blue;
}
.c2{
  height: 80%;
  background-color: rgb(255, 255, 255);
}

</style>
