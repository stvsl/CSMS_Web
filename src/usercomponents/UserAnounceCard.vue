<template>
  <a-list-item class="list-demo-item" action-layout="vertical">
    <template #actions>
      <span><icon-user />&nbsp;{{ anounce.Author }}</span>
      <span><icon-eye />&nbsp;{{ anounce.Pageviews }}</span>
      <span>时间: {{ formatDate(anounce.Updatetime) }}</span>
    </template>
    <a-list-item-meta v-on:click="pushToAnounce" :title="anounce.Title"
      :description="props.mode ? anounce.Introduction : ''">
    </a-list-item-meta>
  </a-list-item>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();

const pushToAnounce = () => {
  router.push({
    path: '/anounce/' + anounce.value.Aid,
  });
};

// 读取父组件传入参数
const props = defineProps({
  mode: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    default: 0
  }
});

interface Anounce {
  Aid: number;
  Title: string;
  Introduction: string;
  Text: string;
  Writetime: string;
  Updatetime: string;
  Author: string;
  Pageviews: number;
  Status: number;
}

const anounce = ref<Anounce>({
  Aid: 0,
  Title: 'loading...',
  Introduction: 'loading...',
  Text: 'loading...',
  Writetime: '',
  Updatetime: '',
  Author: '',
  Pageviews: 0,
  Status: 0
});

const formatDate = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}年${month}月${day}日${hour}:${minute}`;
}

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/anounce/details?id=" + props.id, requestOptions)
    .then(response => response.text())
    .then(result => {
      anounce.value = JSON.parse(result).data;
    })
    .catch(error => ElMessage.error('error', error));
})

</script>

<style scoped>
.edit-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}
</style>