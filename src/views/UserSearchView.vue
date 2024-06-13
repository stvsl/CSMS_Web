<template>
  <a-col :offset="3" :span="20">
    <a-row>
      <a-page-header
        title="搜索"
        subtitle="搜索结果"
        @back="
          () => {
            router.back();
          }
        "
      >
      </a-page-header>
    </a-row>
    <br />
    <a-row>
      <a-col :offset="3" :span="16">
        <a-row v-for="i in arctileids">
          <UserAcicleCard :id="i"></UserAcicleCard>
          <a-divider></a-divider>
        </a-row>
        <br />
        <el-row>
          <el-col :span="10" :offset="8"> </el-col>
        </el-row>
        <br />
      </a-col>
    </a-row>
    <a-row>
      <a-col :offset="3" :span="16">
        <a-row v-for="i in anounceids">
          <UserAnounceCard :id="i"></UserAnounceCard>
          <a-divider></a-divider>
        </a-row>
        <br />
        <el-row>
          <el-col :span="10" :offset="8"> </el-col>
        </el-row>
        <br />
      </a-col>
    </a-row>
    <a-row>
      <a-col :offset="3" :span="16">
        <a-row v-for="i in activeids">
          <UserActivityCard :id="i"></UserActivityCard>
          <a-divider></a-divider>
        </a-row>
        <br />
        <el-row>
          <el-col :span="10" :offset="8"> </el-col>
        </el-row>
        <br />
      </a-col>
    </a-row>
    <br />
  </a-col>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserAcicleCard from "../usercomponents/UserArcicleCard.vue";
import UserAnounceCard from "../usercomponents/UserAnounceCard.vue";
import UserActivityCard from "../usercomponents/UserActivityCard.vue";
import { onMounted } from "vue";
import { ElMessage } from "element-plus";

const router = useRouter();
const route = useRoute();
const key = route.query.key;
const arctileids = ref();
const anounceids = ref();
const activeids = ref();
onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:6521/api/user/search?key=" + key, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      let data = JSON.parse(result).data;
      arctileids.value = data.article;
      anounceids.value = data.anounce;
      activeids.value = data.active;
    })
    .catch((error) => ElMessage.error("error", error));
});
</script>
