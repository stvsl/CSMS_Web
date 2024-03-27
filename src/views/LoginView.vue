<template>
  <div class="panel">
    <div class="left">
      <h1>
        社区服务系统
      </h1>
    </div>
    <div class="right">
      <div class="loginpanel"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.panel {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.left {
  flex-grow: 3;
  justify-content: center;
  align-items: center;
  color: grey;
  display: flex;
  flex-flow: column;
}

.right {
  flex-grow: 1;
  background-color: rgb(210, 255, 242);
  display: flex;
}

.loginpanel {
  width: 400px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.31);
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>