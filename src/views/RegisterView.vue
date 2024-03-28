<template>
  <div class="panel">
    <div id="left" class="left">
      <h1>社区服务系统</h1>
    </div>
    <div class="right">
      <div class="registerpanel">
        <h1>注册</h1>
        <div class="registerarea">
          <div class="row">
            <input type="text" v-model="name" placeholder="请输入用户名" />
          </div>
          <div class="radiogroup">
            <input type="radio" id="male" name="sex" value="男" v-model="sex" />
            <label for="male">男</label>
            <input type="radio" id="famale" name="sex" value="女" v-model="sex" />
            <label for="famale">女</label>
            <input type="radio" id="null" name="sex" value="保密" v-model="sex" />
            <label for="null">保密</label>
          </div>
          <div class="row">
            <input type="text" v-model="tel" placeholder="请输入电话号码" />
          </div>
          <div class="row">
            <input type="password" v-model="passwd" placeholder="请输入密码" />
          </div>
          <div class="row">
            <input type="password" v-model="confirmpasswd" placeholder="请再次输入密码" />
          </div>
          <div class="row" v-if="confirmpasswd != passwd">两次密码不一致，请检查您的密码</div>
          <div class="row" v-if="registerfail">电话号码已被注册，请换一个电话号码或直接登录</div>
          <div class="row">
            <button @click="handleregister">注册</button>
          </div>
          <div class="row">
            <RouterLink class="link" to="login">已有账号？前往登录</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

const router = useRouter();
const registerfail = ref(false);
const sex = ref('');
const name = ref('');
const tel = ref('');
const passwd = ref('');
const confirmpasswd = ref('');

const handleregister = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "name": name.value,
    "tel": tel.value,
    "sex": sex.value,
    "passwd": passwd.value
  });


  var request = new Request("http://127.0.0.1:6521/api/user/register", {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow' // 设置重定向行为为跟随重定向
  });

  type Response = {
    code: number;
    info: Info;
    msg: string;
    [property: string]: any;
  }

  type Info = {
    Avator: string;
    IDcard: string;
    Location: string;
    Name: string;
    Passwd: string;
    Sex: number;
    Tel: string;
    UID: number;
    [property: string]: any;
  }


  fetch(request)
    .then(response => response.text())
    .then(result => {
      const res = JSON.parse(result) as Response;
      if (res.code == 200) {
        registerfail.value = false;
        ElMessage.success("注册成功");
        // TODO 保存注册信息
        router.push("/");
      } else {
        ElMessage.error("注册失败，电话号码已占用");
        registerfail.value = true;
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
  background: linear-gradient(-15deg, #eaac6a, #e483d8);
  flex-flow: column;
}

.right {
  flex-grow: 1;
  background: linear-gradient(-15deg, #d2e9cf, #c2c1ea);
  display: flex;
}

.registerpanel {
  width: 60%;
  background-color: rgba(255, 255, 255, 0.85);
  margin: auto;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
}

.registerpanel h1 {
  text-align: left;
  font-size: 28px;
  font-weight: 400;
  color: #333;
}

.registerarea {
  display: flex;
  flex-direction: column;
  height: 80%;
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

.radiogroup {
  display: flex;
  align-items: center;
  color: #000000;
}

.radiogroup label {
  margin: 0 10px 0 0;
  font-size: 18px;
}

input[type="radio"] {
  margin: 0 10px;
  border: none;
  box-shadow: none;
  width: 20px;
}
</style>
