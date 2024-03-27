<template>
  <div class="topbar">
    <h1 class="title">社区服务系统</h1>
    <div class="search">
      <input type="search" placeholder="搜索一下">
    </div>
    <div class="btns">
      <RouterLink class="button" to="/login">信息</RouterLink>
      <RouterLink class="button" to="/login">活动</RouterLink>
      <RouterLink class="button" to="/login">反馈</RouterLink>
      <RouterLink class="button" to="/login">登录</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.topbar {
  height: 60px;
  backdrop-filter: blur(10px);
  background-color: rgba(207, 206, 206, 0.536);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.title {
  flex-grow: 1;
  color: #333;
  font-size: 24px;
  text-align: left;
  margin-left: 100px;
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