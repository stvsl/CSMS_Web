<template>
  <el-col>
    <el-row>
      <el-col :offset="1">
        <a-page-header title="反馈管理" subtitle="管理用户反馈信息" :show-back="false">
          <template #breadcrumb>
            <a-breadcrumb>
              <a-breadcrumb-item>反馈与报修</a-breadcrumb-item>
              <a-breadcrumb-item>用户反馈</a-breadcrumb-item>
              <a-breadcrumb-item>反馈管理</a-breadcrumb-item>
            </a-breadcrumb>
          </template>
        </a-page-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="15" :offset="1"> <a-list :bordered="false">
          <a-list-item v-for="idx in data">
            <FeedBackCard :id="idx.valueOf()"></FeedBackCard>
          </a-list-item>
        </a-list>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="count" @change="(currentPage) => {
          handleFetchFeedback(currentPage);
        }" />
      </el-col>
    </el-row>
    <el-row>
      <div style="height: 100px;"></div>
    </el-row>
  </el-col>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import FeedBackCard from '../components/FeedBackCard.vue'

const count = ref(0);

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/feed/count", requestOptions)
    .then(response => response.text())
    .then(result => count.value = JSON.parse(result).data)
    .catch(error => console.log('error', error));
  handleFetchFeedback(1);
});

const data = ref<number[]>([]);

const handleFetchFeedback = (page: number) => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/feed/id/list?page=" + page, requestOptions)
    .then(response => response.text())
    .then(result => data.value = JSON.parse(result).data)
    .catch(error => console.log('error', error));
}
</script>

<style scoped></style>