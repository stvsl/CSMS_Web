<template>
  <a-list-item @click="pushToActivity" class="list-demo-item" action-layout="vertical">
    <template #actions>
      <a-col>
        <a-row>
          <a-col>
            <a-space>
              <span><icon-user-group />&nbsp;{{ active.Maxcount }}</span> &nbsp;
              <span><icon-clock-circle />&nbsp;{{ formatDate(active.Starttime) }} - {{ formatDate(active.Endtime)
                }}</span>
            </a-space>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-space>
              <span><icon-location />&nbsp;{{ active.Position }}</span>
            </a-space>
          </a-col>
        </a-row>
      </a-col>
    </template>
    <template #extra>
      <div style="display:flex;height: 100%; text-align: right; align-items: center;">
        <span>查看详情>></span>
      </div>
    </template>
    <a-list-item-meta :description="active.Detail">
      <template #title>
        <a-typography-text strong>{{ active.Name }}</a-typography-text>
      </template>
    </a-list-item-meta>
  </a-list-item>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    default: false,
  },
});

const router = useRouter();
const pushToActivity = () => {
  router.push({
    name: 'activity',
    params: {
      id: active.value.Acid,
    },
  });
}

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
})
</script>