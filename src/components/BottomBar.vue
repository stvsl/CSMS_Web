<template>
  <div class="bottombar">
    <h1 class="bottom">社区服务系统</h1>
    <div class="footerbox">
      <p>2024复州城社区服务系统</p>
      <p>地址--------</p>
      <p>邮箱：2849674510@qq.com</p>
    </div>
    <div class="footerbox">
      <p>辽什么号</p>
      <p>版权所有：虚生花</p>
      <p>电话：+86 13164573302</p>
    </div>
    <div class="footerbox">
      <p>关于我们</p>
      <p>加入我们</p>
      <p>联系我们</p>
    </div>
  </div>

</template>
<script setup lang="ts">
</script>
<style scoped>
.bottombar {
  height: 150px;
  backdrop-filter: blur(10px);
  background-color: rgba(121, 112, 112, 0.536);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  margin: 0;
}

.bottom {
  flex-grow: 1;
  color: #333;
  font-size: 35px;
  text-align: left;
  margin-left: 40px;

}

.bottom h1 {
  margin: auto;
  /* 文字居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.footerbox {
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  margin: auto;
  color: #b63838(0, 0%, 100%, .8);
  flex-grow: 1;
}

.p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

}
</style>