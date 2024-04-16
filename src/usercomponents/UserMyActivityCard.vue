<template>
  <a-list-item @click="pushToActivity" class="list-demo-item" action-layout="vertical">
    <template #actions>
      <a-col>
        <a-row>
          <a-col>
            <a-space>
              <span><icon-user-group />&nbsp;xxx/xxxx</span> &nbsp;
              <span><icon-clock-circle />&nbsp;2024.04.08 - 2024.04.09</span>
            </a-space>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-space>
              <span><icon-location />&nbsp;{{ '活动位置' }}</span>
            </a-space>
          </a-col>
        </a-row>
      </a-col>
    </template>
    <template #extra>
      <div style="display:flex;height: 100%; text-align: right; align-items: center;">
        <el-button type="success" size="large" :icon="Check" circle />
        <el-button type="danger" size="large" :icon="Close" circle />
        <el-button type="primary" loading circle size="large"></el-button>
        <el-button type="warning" :icon="CloseBold">退出活动</el-button>
      </div>
    </template>
    <a-list-item-meta title="活动标题" description="v关于军方击毙iui哦i和口语胡一负于覅u关于工艺i覅与i故意犯规与开发有">
      <template #title>
        <a-typography-text strong>大师的dffgsfsd</a-typography-text>
      </template>
    </a-list-item-meta>
  </a-list-item>
</template>

<script setup lang="ts">
import { Check, Close, CloseBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const pushToActivity = () => {
  router.push({
    name: 'activity',
    params: {
      id: '1',
    },
  });
}
</script>