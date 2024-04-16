<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useUserStore from "./stores/modules/user"
import TopBar from './components/TopBar.vue'
import BottomBar from './components/BottomBar.vue'
import AdminMenu from './components/AdminMenu.vue'
import { ElMessage } from "element-plus";

const showtop = ref(true);
const showbottom = ref(true);
const showaside = ref(false);
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  if (userStore.loginStatus() == 1) {
  } else if (userStore.loginStatus() == 2) {
  } else {

  }
})

watch(() => route.path, (newPath) => {
  if (newPath === '/login' || newPath == "/register") {
    showtop.value = false;
    showbottom.value = false;
    showaside.value = false;
  } else {
    showtop.value = true;
    showbottom.value = true;
    if (userStore.loginStatus() == 1) {
      // 判断当前newPath是否包含admin字样
      if (newPath.includes("admin")) {
        showaside.value = true;
      } else {
        showaside.value = false;
      }
    } else if (userStore.loginStatus() == 2) {
      showaside.value = false;
    } else {
      showaside.value = false;
      if (newPath != "/") {
        ElMessage({
          message: "您暂未登录，请先登录",
          type: "error",
        });
        router.push("/login");
      } else {
        ElMessage({
          message: "您暂未登录，如需使用更多功能请现登录",
          type: "error",
        });
      }
    }
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
