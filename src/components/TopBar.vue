<template>
  <a-affix :offsetTop="0" @change="onChange">
    <a-col>
      <a-row class="topbar">
        <a-col :span="4" class="height100">
          <router-link to="/" class="height100">
            <span class="title">社区服务系统</span>
          </router-link>
        </a-col>
        <a-col class="height100" :offset="4" :span="8">
          <a-input-search :style="{ width: '100%' }" :size="isTop ? 'large' : 'medium'" placeholder="开始搜索吧！" />
        </a-col>
        <a-col class="btns height100" :span="4">
          <RouterLink class="button" to="/user/activity">活动</RouterLink>
          <RouterLink class="button" to="/user/feed">反馈</RouterLink>
          <RouterLink v-if="userStore.status == 0" class="button" to="/login">登录</RouterLink>
          <a-popconfirm v-else content="您确定要退出登录吗?" @ok="exitLogin">
            <a-button type="text" class="button">Hi ! {{ userStore.Name }}</a-button>
          </a-popconfirm>
        </a-col>
      </a-row>
    </a-col>
  </a-affix>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../stores/modules/user';

const router = useRouter();
const userStore = useUserStore();
const isTop = ref(true);
const onChange = (fixed: boolean) => {
  if (fixed) {
    isTop.value = false;
  } else {
    isTop.value = true;
  }
};
const exitLogin = () => {
  userStore.logout();
  router.push('/');
};
</script>

<style scoped>
.topbar {
  height: v-bind(isTop ? '60px' : '45px');
  backdrop-filter: blur(10px);
  background-color: rgb(207, 206, 206);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.title {
  color: #333;
  font-size: 24px;
  margin-left: v-bind(isTop ? '70px' : '20px');
  transition: 0.3s;
}

.search {
  height: 65%;
  flex-grow: 1;
  background-color: #fff;
  border-radius: 5px;
  margin: auto 0;
  margin-left: 10%;
  backdrop-filter: blur(10px);
}

.height100 {
  display: flex;
  height: 100%;
  align-items: center;
}

.search input {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  padding: 0 10px;
  background: url(https://img.icons8.com/ios-filled/50/000000/search--v1.png) no-repeat right 10px center;
  background-size: 25px;
}

.search input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.search input::-webkit-search-cancel-button {
  display: none;
}

.btns {
  flex-grow: 1;

  display: flex;
  margin-right: 20px;
  justify-content: right;
  gap: 10px;
}

.btns .button {
  margin: auto 0;
  text-align: center;
  font-size: 18px;
  padding: 0 10px;
  color: #000;
  line-height: 100%;
}
</style>