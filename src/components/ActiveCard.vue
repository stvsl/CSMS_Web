import { ElMessage } from 'element-plus';
<template>
  <a-list-item class="list-demo-item" action-layout="vertical">
    <template #actions>
      <div class="actionsarea">
        <span><icon-schedule />&nbsp;发布时间:XXXX</span>
        <span><icon-schedule />&nbsp;开始时间:XXXX</span>
        <span><icon-schedule />&nbsp;结束时间:XXXX</span>
        <br>
        <span><icon-user />&nbsp;参与人数:XXXX/XXXX</span>
        <span><icon-eye />&nbsp;浏览量:XXXX</span>
        <span><icon-public />&nbsp;活动位置:XXXX</span>
      </div>
    </template>
    <template #extra>
      <a-space direction="vertical">
        <a-button status="success" size="small" @click="sendToManagement">
          <template #icon>
            <icon-idcard />
          </template>人员管理</a-button>
        <a-button status="warning" size="small" @click="enterEdit">
          <template #icon>
            <icon-edit />
          </template>修改活动</a-button>
        <a-button status="danger" size="small" @click="sendToDelete">
          <template #icon>
            <icon-delete />
          </template>删除活动</a-button>
      </a-space>
    </template>
    <a-list-item-meta v-on:click="ElMessage.info('TODO');" title="大师的dffgsfsdfdgd阿森松岛代入感vgxferrt"
      description="gsfgtwefswg士大夫二二萨尔燃灯佛而突然大幅缩短如果sder分隔符efwtq4二渗透压二人wrs反而更为恩爱">
    </a-list-item-meta>
  </a-list-item>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'
const router = useRouter();
const id = ref(25);

const emit = defineEmits<{
  manageSomeOne: [id: number],
  deleteSomeOne: [id: number]
}>()

const sendToManagement = () => {
  emit('manageSomeOne', 12);
};

const sendToDelete = () => {
  emit('deleteSomeOne', 12);
};

const enterEdit = () => {
  router.push({
    name: 'adminactivityedit',
    params: {
      id: id.value
    }
  })
}
</script>

<style scoped>
.actionsarea {
  width: 100%;
}

.actionsarea span {
  margin-right: 20px;
}
</style>