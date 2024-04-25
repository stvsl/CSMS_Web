<template>
  <a-list-item @click="pushToActivity" class="list-demo-item" action-layout="vertical">
    <template #actions>
      <a-col>
        <a-row>
          <a-col>
            <a-space>
              <span><icon-user-group />&nbsp;{{ count }}/{{ active.Maxcount }}</span> &nbsp;
              <span><icon-schedule />&nbsp;活动时间:{{ formatDate(active.Starttime) + "-" + formatDate(active.Endtime)
                }}</span>
            </a-space>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-space>
              <span><icon-location />&nbsp;{{ '活动位置' + active.Position }}</span>
            </a-space>
          </a-col>
        </a-row>
      </a-col>
    </template>
    <template #extra>
      <div style="display:flex;height: 100%; text-align: right; align-items: center;">
        <el-button v-if="status == 1" type="success" size="large" :icon="Check" circle />
        <el-button v-if="status == 2" type="danger" size="large" :icon="Close" circle />
        <el-button v-if="status == 0" type="primary" loading circle size="large"></el-button>
        <span>&nbsp;&nbsp;{{ status == 0 ? '处理中' : status == 1 ? '已录取' : '已拒绝' }}&nbsp;&nbsp;</span>
        <el-button type="warning" :icon="CloseBold" @click="handleExitActivity">退出活动</el-button>
      </div>
    </template>
    <a-list-item-meta :description="active.Detail">
      <template #title>
        <a-typography-text strong>{{ active.Name }}</a-typography-text>
      </template>
    </a-list-item-meta>
  </a-list-item>
</template>

<script setup lang="ts">
import { Check, Close, CloseBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { ref, onMounted, defineProps } from 'vue';
import { ElMessage } from 'element-plus';
import useUserStore from '../stores/modules/user';
const user = useUserStore();
const router = useRouter();
const status = ref(0);
const pushToActivity = () => {
  router.push({
    name: 'activity',
    params: {
      id: '1',
    },
  });
}

const props = defineProps({
  id: {
    type: Number,
    default: false,
  },
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

interface Active {
  Acid: number;
  Name: string;
  Starttime: string;
  Opentime: string;
  Endtime: string;
  Detail: string;
  Text: string;
  Views: number;
  Maxcount: number;
  Position: string;
}

const count = ref(0);

const active = ref<Active>({
  Acid: 0,
  Name: 'loading...',
  Starttime: 'loading...',
  Opentime: 'loading...',
  Endtime: 'loading...',
  Detail: 'loading...',
  Text: 'loading...',
  Views: 0,
  Maxcount: 0,
  Position: 'loading...'
});

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/activity/details?id=" + props.id, requestOptions)
    .then(response => response.text())
    .then(result => {
      active.value = JSON.parse(result).data;
      count.value = JSON.parse(result).count;
    })
    .catch(error => console.log('error', error));
  fetch("http://127.0.0.1:6521/api/activity/user/status?id=" + user.ID + "&acid=" + props.id, requestOptions)
    .then(response => response.text())
    .then(result => status.value = JSON.parse(result).data)
    .catch(error => ElMessage.error('error', error));
})

const handleExitActivity = () => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/activity/exit?id=" + user.ID + "&acid=" + props.id, requestOptions)
    .then(response => response.text())
    .then(result => {
      if (JSON.parse(result).code == 200) {
        ElMessage.success("退出成功")
        router.go(0)
      } else {
        ElMessage.error("退出失败")
      }
    })
    .catch(error => ElMessage.error('error', error));
}

</script>