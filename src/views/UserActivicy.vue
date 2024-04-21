<template>
  <a-col :offset="3" :span="20">
    <a-row>
      <a-col :span="20">
        <a-page-header title="近期活动" @back="() => {
          router.back();
        }">
          <template #extra>
            <div style="height: 100%; display: flex; justify-content: flex-end;">
              <a-link @click="gotoMyActivity" status="warning"><icon-message />我的活动</a-link>
            </div>
          </template>
        </a-page-header>
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :offset="3" :span="16">
        <a-row v-for="i in datas">
          <UserActivityCard :id="i.valueOf()"></UserActivityCard>
          <a-divider></a-divider>
        </a-row>
        <br>
      </a-col>
    </a-row>
    <br>
  </a-col>
</template>

<script lang="ts" setup>
import UserActivityCard from "../usercomponents/UserActivityCard.vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from 'vue'

const router = useRouter();

const gotoMyActivity = () => {
  router.push("/user/myactivity");
};

const datas = ref<string[]>([])

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/activity/recent/ids", requestOptions)
    .then(response => response.text())
    .then(result => datas.value = JSON.parse(result).data)
    .catch(error => console.log('error', error));
});
</script>
