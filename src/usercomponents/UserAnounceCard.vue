import { ElMessage } from 'element-plus';
<template>
  <a-list-item class="list-demo-item" action-layout="vertical">
    <template #actions>
      <span><icon-user />&nbsp;用户名</span>
      <span><icon-eye />&nbsp;111</span>
      <span>时间: XXXX</span>
    </template>
    <a-list-item-meta v-on:click="ElMessage.info('TODO');" title="大师的dffgsfsdfdgd阿森松岛代入感vgxferrt">
    </a-list-item-meta>
  </a-list-item>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
</script>

<style scoped>
.edit-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}
</style>