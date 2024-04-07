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
          <a-list-item v-for="idx in 5" :key="idx">
            <FeedBackCard></FeedBackCard>
          </a-list-item>
        </a-list>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="1000" />
      </el-col>
    </el-row>
    <el-row>
      <div style="height: 100px;"></div>
    </el-row>
  </el-col>
</template>

<script lang="ts" setup>
import FeedBackCard from '../components/FeedBackCard.vue'
</script>

<style scoped></style>