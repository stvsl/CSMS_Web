<template>
  <el-col>
    <el-row>
      <el-col :offset="1">
        <a-page-header title="身份信息管理" subtitle="管理居民身份信息" :show-back="false">
          <template #breadcrumb>
            <a-breadcrumb>
              <a-breadcrumb-item>居民信息</a-breadcrumb-item>
              <a-breadcrumb-item>身份信息管理</a-breadcrumb-item>
            </a-breadcrumb>
          </template>
        </a-page-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="1" :span="6">
        <a-input-group style="margin-left:   20px">
          <h2 :style="{ width: '60px' }">查找:</h2>
          <a-select :options="['名称', 'UID', '联系电话']" :style="{ width: '120px' }" placeholder="请选择搜索类型" />&nbsp;
          <a-input :style="{ width: '300px' }" placeholder="键入以开始搜索" /> &nbsp;
          <a-button>
            <template #icon>
              <icon-search />
            </template>搜索</a-button>
        </a-input-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="15" :offset="1"> <a-list :bordered="false">
          <a-list-item v-for="idx in 4" :key="idx">
            <UserInfoCard></UserInfoCard>
          </a-list-item>
        </a-list>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="1000" />
      </el-col>
    </el-row>
  </el-col>
</template>

<script lang="ts" setup>
import UserInfoCard from '../components/UserInfoCard.vue'
</script>

<style scoped>
.cardtitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cardtitle h2 {
  margin: 0;
}
</style>