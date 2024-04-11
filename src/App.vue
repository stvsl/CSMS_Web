<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import TopBar from './components/TopBar.vue'
import BottomBar from './components/BottomBar.vue'
import AdminMenu from './components/AdminMenu.vue'

const showtop = ref(true);
const showbottom = ref(true);
const showaside = ref(false);
const route = useRoute();

watch(() => route.path, (newPath) => {
  if (newPath === '/login' || newPath == "/register") {
    showtop.value = false;
    showbottom.value = false;
    showaside.value = false;
  } else {
    showtop.value = true;
    showbottom.value = true;
    showaside.value = false;
  }
});
</script>

<template>
  <TopBar v-if="showtop"></TopBar>
  <el-container>
    <el-aside v-if="showaside" width="300px" height="100%">
      <AdminMenu></AdminMenu>
    </el-aside>
    <router-view></router-view>
  </el-container>
  <BottomBar v-if="showbottom"></BottomBar>
  <el-backtop :right="100" :bottom="160" />
</template>

<style scoped>
.head {
  height: 60px;
  background-color: blue;
}

.el-container {
  min-height: 100vh;
}
</style>
