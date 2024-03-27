<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import TopBar from './components/TopBar.vue'
import BottomBar from './components/BottomBar.vue'

const showbar = ref(true);
const route = useRoute();

watch(() => route.path, (newPath) => {
  if (newPath === '/login' || newPath == "/register") {
    showbar.value = false;
  } else {
    showbar.value = true;
  }
});
</script>

<template>
  <TopBar v-if="showbar"></TopBar>
  <router-view></router-view>
  <BottomBar v-if="showbar"></BottomBar>
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
