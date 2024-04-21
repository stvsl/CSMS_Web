<template>
  <a-col :offset="3" :span="20">
    <a-row>
      <a-page-header title="全部公告" subtitle="全部历史公告" @back="() => {
        router.back();
      }">
      </a-page-header>
    </a-row>
    <br>
    <a-row>
      <a-col :offset="3" :span="16">
        <a-row v-for="i in data">
          <UserAnounceCard :id="i.valueOf()" :mode="true"></UserAnounceCard>
          <a-divider></a-divider>
        </a-row>
        <br>
        <el-row>
          <el-col :span="10" :offset="8">
            <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="count" @change="(currentPage) => {
              handleFetchAnounce(currentPage)
            }" />
          </el-col>
        </el-row>
        <br>
      </a-col>
    </a-row>
    <br>
  </a-col>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import UserAnounceCard from "../usercomponents/UserAnounceCard.vue";
import { useRouter } from "vue-router";

const count = ref(0)

const data = ref<Number[]>([])

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/anounce/id/count", requestOptions)
    .then(response => response.text())
    .then(result => count.value = JSON.parse(result).count)
    .catch(error => console.log('error', error));
  handleFetchAnounce(1);
});

const router = useRouter();

const handleFetchAnounce = (page: number) => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/anounce/id/all?page=" + page, requestOptions)
    .then(response => response.text())
    .then(result => {
      data.value = JSON.parse(result).data;
    })
    .catch(error => console.log('error', error));
}

</script>
