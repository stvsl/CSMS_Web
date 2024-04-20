<template>
  <a-list-item class="list-demo-item" action-layout="vertical">
    <template #actions>
      <div class="actionsarea">
        <span><icon-schedule />&nbsp;发布时间:{{ formatDate(active.Opentime) }}</span>
        <span><icon-schedule />&nbsp;开始时间:{{ formatDate(active.Starttime) }}</span>
        <span><icon-schedule />&nbsp;结束时间:{{ formatDate(active.Endtime) }}</span>
        <br>
        <span><icon-user />&nbsp;参与人数:{{ count }}/{{ active.Maxcount }}</span>
        <span><icon-eye />&nbsp;浏览量:{{ active.Views }}</span>
        <span><icon-public />&nbsp;活动位置:{{ active.Position }}</span>
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
    <a-list-item-meta v-on:click="ElMessage.info('TODO');" :title="active.Name" :description="active.Detail">
    </a-list-item-meta>
  </a-list-item>

  <a-drawer :width="720" :visible="peopleVisible" @ok="peopleVisible = false" @cancel="peopleVisible = false">
    <template #title>
      当前 "{{ active.Name }}" 活动人员管理
    </template>
    <p>已入选：{{ hasSelectedCount }}人</p>
    <a-list>
      <a-list-item v-for="idx in activityParticipation" :key="idx.UID">
        <a-list-item-meta :title="idx.Name">
          <template #description>
            {{ idx.Tel }}
            <a-tag v-if="idx.Status === 0" color="orange">待审核</a-tag>
            <a-tag v-if="idx.Status === 1" color="green">已通过</a-tag>
            <a-tag v-if="idx.Status === 2" color="red">已拒绝</a-tag>
          </template>
          <template #avatar>
            <a-avatar shape="square">
              <img alt="avatar"
                :src="idx.Avator || 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'" />
            </a-avatar>
          </template>
        </a-list-item-meta>
        <template #actions>
          <a-button v-if="idx.Status === 0" type="outline" shape="round" status="success"
            @click="handleStatus(idx.UID, 1)">
            <template #icon>
              <icon-check />
            </template>通过
          </a-button>
          <a-button v-if="idx.Status === 0" type="outline" shape="round" status="danger"
            @click="handleStatus(idx.UID, 2)">
            <template #icon>
              <icon-close />
            </template>拒绝
          </a-button>
          <a-button v-if="idx.Status === 1 || idx.Status === 2" type="outline" shape="round" status="warning"
            @click="handleStatus(idx.UID, 0)">
            <template #icon>
              <icon-minus-circle />
            </template>撤回
          </a-button>
        </template>
      </a-list-item>
    </a-list>
  </a-drawer>
</template>

<script lang="ts" setup>
import { ref, defineEmits, onMounted, defineProps } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'
const router = useRouter();

const peopleVisible = ref(false);

const props = defineProps({
  id: {
    type: Number,
    default: false,
  },
});

const emit = defineEmits<{
  fetchPeopleStatus: [id: number, n: number]
  deleteSomeOne: [id: number]
}>()

const sendToManagement = () => {
  fetchPeopleStatus();
  peopleVisible.value = true;
};

const sendToDelete = () => {
  emit('deleteSomeOne', props.id);
};

const enterEdit = () => {
  router.push({
    name: 'adminactivityedit',
    params: {
      id: props.id
    }
  })
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

const count = ref(0);

// 已入选人数
const hasSelectedCount = ref(0);

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

interface ActivityParticipation {
  UID: number;
  Name: string;
  Tel: string;
  Status: number;
  Avator: string;
}

const activityParticipation = ref<ActivityParticipation[]>([]);

const fetchPeopleStatus = () => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/activity/status?id=" + props.id, requestOptions)
    .then(response => response.text())
    .then(result => {
      activityParticipation.value = JSON.parse(result).data;
      hasSelectedCount.value = 0;
      for (let i = 0; i < activityParticipation.value.length; i++) {
        if (activityParticipation.value[i].Status === 1) {
          hasSelectedCount.value++;
        }
      }
    })
    .catch(error => console.log('error', error));
}

const handleStatus = (id: number, status: number) => {
  // 保证人数不超过最大值
  var n = 0;
  for (let i = 0; i < activityParticipation.value.length; i++) {
    if (activityParticipation.value[i].Status === 1) {
      n++;
    }
  }
  if (status === 1 && n >= active.value.Maxcount) {
    ElMessage.warning('人数已满,不可继续添加人员');
    return;
  }
  emit('fetchPeopleStatus', id, ++n);

  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": id,
    "status": status
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/activity/peoplestatus", requestOptions)
    .then(response => response.text())
    .then(result => {
      if (JSON.parse(result).code === 200) {
        ElMessage.success('操作成功');
        for (let i = 0; i < activityParticipation.value.length; i++) {
          if (activityParticipation.value[i].UID === id) {
            activityParticipation.value[i].Status = status;
            break;
          }
        }
        hasSelectedCount.value = 0;
        for (let i = 0; i < activityParticipation.value.length; i++) {
          if (activityParticipation.value[i].Status === 1) {
            hasSelectedCount.value++;
          }
        }
      } else {
        ElMessage.error('操作失败');
      }
    })
    .catch(error => ElMessage.warning('error', error));
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