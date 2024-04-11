import { ElMessage } from 'element-plus';
<template>
  <a-list-item class="list-demo-item" action-layout="vertical">
    <template #actions>
      <span><icon-user />&nbsp;用户名</span>
      <span><icon-eye />&nbsp;111</span>
      <span>时间: XXXX</span>
    </template>
    <a-list-item-meta v-on:click="pushToAnounce" title="大师的dffgsfsdfdgd阿森松岛代入感vgxferrt"
      :description="props.mode ? '这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介' : ''">
    </a-list-item-meta>
  </a-list-item>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const pushToAnounce = () => {
  router.push({
    path: '/anounce/' + 1,
  });
};

// 读取父组件传入参数
const props = defineProps({
  mode: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.edit-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}
</style>