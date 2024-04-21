<template>
  <a-col :offset="3" :span="20">
    <a-row>
      <a-page-header title="全部文章" subtitle="全部历史文章" @back="() => {
        router.back();
      }">
      </a-page-header>
    </a-row>
    <br>
    <a-row>
      <a-col :offset="3" :span="16">
        <a-row v-for="i in data">
          <UserArcicleCard :id="i.valueOf()"></UserArcicleCard>
          <a-divider></a-divider>
        </a-row>
        <br>
        <el-row>
          <el-col :span="10" :offset="8">
            <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="count" @change="(currentPage) => {
              handleFetchArticle(currentPage);
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
import UserArcicleCard from "../usercomponents/UserArcicleCard.vue";
import { useRouter } from "vue-router";

const count = ref(0);

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/article/id/count", requestOptions)
    .then(response => response.text())
    .then(result => count.value = JSON.parse(result).count)
    .catch(error => console.log('error', error));
  handleFetchArticle(1);
});

const router = useRouter();

const data = ref<number[]>([]);
const handleFetchArticle = (page: number) => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/article/id/all?page=1", requestOptions)
    .then(response => response.text())
    .then(result => data.value = JSON.parse(result).data)
    .catch(error => console.log('error', error));
};

</script>
