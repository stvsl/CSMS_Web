<template>
  <a-watermark :content="'系统管理 ID' + userStore.ID" style="width: 100%">
    <el-col>
      <el-row>
        <el-col :offset="1">
          <a-page-header title="系统设置" subtitle="设置系统管理员" :show-back="false">
            <template #breadcrumb>
              <a-breadcrumb>
                <a-breadcrumb-item>系统设置</a-breadcrumb-item>
              </a-breadcrumb>
            </template>
          </a-page-header>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="6">
          <a-input-group style="margin-left: 20px">
            <h2 :style="{ width: '110px' }">操作面板:</h2>
            <a-button status="warning" @click="passvisible = true">
              <template #icon>
                <icon-lock />
              </template>修改密码
            </a-button> &nbsp;
            <a-button status="success" @click="infovisible = true">
              <template #icon>
                <icon-edit />
              </template>编辑个人信息
            </a-button> &nbsp;
            <a-button status="danger" v-if="false">
              <template #icon>
                <icon-delete />
              </template>注销本账号
            </a-button>
          </a-input-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1" :span="6">
          <a-input-group style="margin-left: 20px">
            <h2 :style="{ width: '200px' }">其它管理员账户信息:</h2>
          </a-input-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :span="18">
          <a-table :data="data">
            <template #columns>
              <a-table-column title="ID" data-index="id"></a-table-column>
              <a-table-column title="姓名" data-index="name"></a-table-column>
              <a-table-column title="联系方式" data-index="tel"></a-table-column>
              <a-table-column title="上次登录时间" data-index="lastlogin"></a-table-column>
              <a-table-column title="操作">
                <template #cell="{ record }">
                  <a-button @click="$modal.info({ title: '', content: record.name })"
                    status="danger">同意并请求注销</a-button>&nbsp;
                  <a-button status="danger"
                    @click="$modal.info({ title: 'Name', content: record.name })">同意并请求重置密码</a-button>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </el-col>
      </el-row>
    </el-col>
  </a-watermark>

  <a-modal v-model:visible="passvisible" title="重置密码" @cancel="passvisible = false" @before-ok="handlePasswd">
    <a-form :model="none">
      <a-form-item label="请输入密码">
        <a-input-password v-model="passwd1" />
      </a-form-item>
      <a-form-item label="请确认密码">
        <a-input-password v-model="passwd2" />
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal v-model:visible="infovisible" title="更新身份信息" @cancel="passvisible = false" @before-ok="handleInfo">
    <a-form :model="form">
      <a-form-item field="name" label="姓名">
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item field="tel" label="电话号码">
        <a-input v-model="form.tel"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>

import { reactive, ref, onMounted } from 'vue'
import useUserStore from '../stores/modules/user';
import { ElMessage } from 'element-plus';
const userStore = useUserStore();
const data = reactive([{
  key: '1',
  id: 'xxxxx',
  name: 'XXXXX',
  tel: '176XXXXXXX',
  lastlogin: 'XXXX-XXX-XXX'
}]);

const passvisible = ref(false);
const infovisible = ref(false);

const none = ref({
  none: '',
});

const passwd1 = ref('');
const passwd2 = ref('');

const form = reactive({
  name: '',
  tel: ''
});

const handlePasswd = () => {
  if (passwd1.value === passwd2.value && passwd1.value !== '' && passwd1.value.length > 8) {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/admin/passwd?id=" + userStore.ID + "&passwd=" + passwd1.value, requestOptions)
      .then(response => response.text())
      .then(result => {
        if (JSON.parse(result).code === 200) {
          ElMessage.success('密码修改成功');
          passvisible.value = false;
          userStore.Passwd = passwd1.value;
        } else {
          ElMessage.error('密码修改失败');
        }
      })
      .catch(error => ElMessage.error('error', error));
  } else {
    ElMessage.error('两次密码输入不一致或新密码长度不足');
  }
};

const handleInfo = () => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/admin/update?id=" + userStore.ID + "&tel=" + form.tel + "&name=" + form.name, requestOptions)
    .then(response => response.text())
    .then(result => {
      if (JSON.parse(result).code === 200) {
        ElMessage.success('信息修改成功');
        infovisible.value = false;
        userStore.Tel = form.tel;
        userStore.Name = form.name;
      } else {
        ElMessage.error('信息修改失败');
      }
    })
    .catch(error => console.log('error', error));
};
const count = ref(0);
onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/user/count", requestOptions)
    .then(response => response.text())
    .then(result => {
      count.value = JSON.parse(result).data - 1;
    })
    .catch(error => console.log('error', error));
});

</script>

<style scoped>
.cardtitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cardtitle h2 {
  margin: 0;
}
</style>