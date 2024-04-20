<template>
  <el-col>
    <el-row>
      <el-col :offset="1">
        <a-page-header title="活动管理" subtitle="查看并管理全部活动" :show-back="false">
          <template #breadcrumb>
            <a-breadcrumb>
              <a-breadcrumb-item>社区活动</a-breadcrumb-item>
              <a-breadcrumb-item>活动管理</a-breadcrumb-item>
            </a-breadcrumb>
          </template>
        </a-page-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="15" :offset="1"> <a-list :bordered="false">
          <a-list-item v-for="idx in activity" :key="idx.Acid">
            <ActiveCard :id="idx.Acid" @fetchPeopleStatus="fetchPeopleStatus" @deleteSomeOne="deleteSomeOne">
            </ActiveCard>
          </a-list-item>
        </a-list>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="count" @change="(currentPage) => {
          handlePageUpdate(currentPage);
        }" />
      </el-col>
    </el-row>
  </el-col>
  <a-modal :visible="deleteConfirmVisible" @ok="handleDeleteActivity" @cancel="deleteConfirmVisible = false" okText="确认"
    cancelText="取消" unmountOnClose>
    <template #title>
      删除活动确认
    </template>
    <div>您确认要删除此活动吗？此操作将无法恢复！</div>
  </a-modal>
</template>

<script lang="ts" setup>
import ActiveCard from '../components/ActiveCard.vue'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import router from '../router/router';

const count = ref(0);

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/anounce/count", requestOptions)
    .then(response => response.text())
    .then(result => count.value = JSON.parse(result).count)
    .catch(error => ElMessage.warning('error', error));
  handlePageUpdate(1);
})

const deleteConfirmVisible = ref(false);
const deleteID = ref(0);
const deleteSomeOne = (id: number) => {
  deleteConfirmVisible.value = true;
  deleteID.value = id;
};

const handleDeleteActivity = () => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/activity/delete?id=" + deleteID.value, requestOptions)
    .then(response => response.text())
    .then(result => {
      if (JSON.parse(result).code == 200) {
        ElMessage.success("删除成功");
        router.go(0);
      } else {
        ElMessage.error("删除失败,请检查网络" + JSON.parse(result).message);
      }
    })
    .catch(error => ElMessage.error('error', error));
};

interface ActivityID {
  Acid: number;
}
const activity = ref<ActivityID[]>([]);

const fetchPeopleStatus = (id: number, count: number) => {
  for (let i = 0; i < activity.value.length; i++) {
    if (activity.value[i].Acid == id) {
      activity.value[i].Acid = count;
      return;
    }
  }
};

const handlePageUpdate = (page: number) => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/activity/id/list?page=" + page, requestOptions)
    .then(response => response.text())
    .then(result => {
      activity.value = JSON.parse(result).data;
    })
    .catch(error => console.log('error', error));
}
</script>

<style scoped></style>