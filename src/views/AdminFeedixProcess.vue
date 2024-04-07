<template>
  <el-col>
    <el-row>
      <el-col :offset="1">
        <a-page-header title="进度跟进" subtitle="跟进反馈和报修进度" :show-back="false">
          <template #breadcrumb>
            <a-breadcrumb>
              <a-breadcrumb-item>反馈与报修</a-breadcrumb-item>
              <a-breadcrumb-item>进度跟进</a-breadcrumb-item>
            </a-breadcrumb>
          </template>
        </a-page-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <a-space size="large">
          <a-statistic title="New Users" :value="125670" show-group-separator>
            <template #suffix>
              <icon-arrow-rise />
            </template>
          </a-statistic>
          <a-statistic title="User Growth Rate" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">
            <template #prefix>
              <icon-arrow-rise />
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </a-space>
      </el-col>
    </el-row>
  </el-col>
</template>

<script lang="ts" setup>
</script>

<style scoped></style>