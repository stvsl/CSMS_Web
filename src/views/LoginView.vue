<template>
  <div class="panel">
    <div id="left" class="left">
      <h1>社区服务系统</h1>
    </div>
    <div class="right">
      <div class="loginpanel">
        <h1>登录</h1>
        <div class="loginarea">
          <div class="row">
            <input type="text" v-model="id" placeholder="请输入用户名/电话号码" />
          </div>
          <div class="row">
            <input type="password" v-model="passwd" placeholder="请输入密码" />
          </div>
          <div class="row" v-if="loginfail">用户名或密码错误，请重试</div>
          <div class="row">
            <button @click="handleLogin">登录</button>
          </div>
          <div class="row">
            <RouterLink class="link" to="register">没有账号？前往注册</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const loginfail = ref(false);
const id = ref('');
const passwd = ref('');

const handleLogin = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": id.value,
    "passwd": passwd.value
  });

  var request = new Request("http://127.0.0.1:6521/api/admin/login", {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow' // 设置重定向行为为跟随重定向
  });

  fetch(request)
    .then(response => response.text())
    .then(result => {
      const res = JSON.parse(result) as { code: string };
      if (res.code == "200") {
        loginfail.value = false;
        // TODO 保存登录状态
        router.push("/");
      } else {
        loginfail.value = true;
      }
    })
    .catch(error => console.log('error', error));
}

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
  color: #fff;
  display: flex;
  background: linear-gradient(-15deg, #1d3576, #3e286e);
  flex-flow: column;
}

.right {
  flex-grow: 1;
  background: linear-gradient(-15deg, #b1b1b1, #f9f9ff);
  display: flex;
}

.loginpanel {
  width: 60%;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.85);
  margin: auto;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
}

.loginpanel h1 {
  text-align: left;
  font-size: 28px;
  font-weight: 400;
  color: #333;
}

.loginarea {
  display: flex;
  flex-direction: column;
  height: 70%;
}

.row {
  display: flex;
  margin: 10px 0;
  color: #ff4500;
}

input {
  width: calc(100% - 20px);
  height: 45px;
  border: none;
  background-color: rgba(255, 255, 255, 0.95);
  font-size: 18px;
  padding: 0 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
}

input:focus {
  outline: none;
}

button {
  width: 100%;
  background-color: #ff69b4;
  border: none;
  border-radius: 25px;
  height: 45px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  transition: background-color 0.25s, color 0.25s, transform 0.25s;
  cursor: pointer;
}

button:hover {
  background-color: #d6346c;
}

button:active {
  transform: scale(0.95);
}

.link {
  text-align: center;
  width: 100%;
  color: #4b0082;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
}
</style>
