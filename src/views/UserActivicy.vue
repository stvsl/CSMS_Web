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
        <a-row v-for="i in 10" :key="i">
          <UserActivityCard></UserActivityCard>
          <a-divider></a-divider>
        </a-row>
        <br>
        <el-row>
          <el-col :span="10" :offset="8">
            <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="1000" />
          </el-col>
        </el-row>
        <br>
      </a-col>
    </a-row>
    <br>
  </a-col>
</template>

<script lang="ts" setup>
import UserActivityCard from "../usercomponents/UserActivityCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const gotoMyActivity = () => {
  router.push("/user/myactivity");
};

</script>
