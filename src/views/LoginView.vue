<template>
  <div class="body">
    <div class="main">
      <h1 class="title">登录界面</h1>
      <div class="form-group">
        <label for="username">用户名:</label>
        <input type="text" id="username" required>
      </div>
      <div class="form-group">
        <label for="password">密码:</label>
        <input type="password" id="password" required>
      </div>
      <button type="submit" class="btn btn-primary">登录</button>

    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

.body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 40px;
  background-color: #d6e1e1;
  color: #56ae9d;
  text-shadow: 0 8px 10px #a1dbe7;

}

.main {
  position: relative;
  width: 1250px;
  min-width: 1250px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 20px;
  overflow: hidden;
}

@media (max-width: 1200px) {
  .main {
    transform: scale(0.7);
  }
}

@media (max-width: 1000px) {
  .main {
    transform: scale(0.6);
  }
}

@media (max-width: 800px) {
  .main {
    transform: scale(0.5);
  }
}

@media (max-width: 600px) {
  .main {
    transform: scale(0.4);
  }
}



.form-group {
  margin-bottom: 1rem;
  font-size: 50px;
  font-weight: bold;
  text-align: center;


}

.btn-primary {
  background-color: #6bc4e1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

/* 在Login.vue的<style>标签内添加 */
.btn-primary:hover {
  background-color: #89b4e1;
  /* 更深的蓝色 */
  transition: background-color 0.3s ease;
  /* 平滑的过渡效果 */
}
</style>