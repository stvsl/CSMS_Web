<template>
  <a-list-item class="list-demo-item" action-layout="vertical">
    <template #extra>
      <div class="edit-area">
        <a-space direction="horizontal" align="center">
          <a-button v-if="!props.mode" status="warning" size="small" @click="handleChangePasswd">
            <template #icon>
              <icon-lock />
            </template>修改密码</a-button>
          <a-button v-if="!props.mode" status="warning" size="small" @click="handleChangeInfo">
            <template #icon>
              <icon-edit />
            </template>修改身份信息</a-button>
          <a-popconfirm v-if="!props.mode" content="确认注销此用户账户吗？" type="error" @ok="handleDelete">
            <a-button status="danger" size="small">
              <template #icon>
                <icon-delete />
              </template>注销</a-button>
          </a-popconfirm>
          <a-button status="warning" size="small" @click="upvisible = true">
            <template #icon>
              <icon-reset />
            </template>提升到第三方用户</a-button>
        </a-space>
      </div>
    </template>
    <a-list-item-meta :title="'用户' + account.UID" :description="'姓名: ' + account.Name + '  tel: ' + account.Tel">
      <template #avatar>
        <a-avatar shape="square">
          <img alt="avatar"
            :src="account.Avator == '' ?
              'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp' : account.Avator" />
        </a-avatar>
      </template>
    </a-list-item-meta>
  </a-list-item>
  <a-modal v-model:visible="visible" title="密码修改" @cancel="handleCancel" @before-ok="handleBeforeOk">
    <a-form :model="form">
      <a-form-item field="passwd1" label="请输入新密码">
        <a-input v-model="form.passwd" />
      </a-form-item>
      <a-form-item field="passwd2" label="再次确认密码">
        <a-input v-model="form.passwd2" />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-modal v-model:visible="upvisible" title="公司信息填入" @cancel="upvisible = false" @before-ok="handleRight">
    <a-input v-model="company" placeholder="请输入公司信息" />
  </a-modal>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const upvisible = ref(false);
const company = ref('');
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  mode: {
    type: Boolean,
    required: false,
    default: false
  }
});

const visible = ref(false);
const form = reactive({
  passwd: '',
  passwd2: ''
});

const handleChangeInfo = () => {
  router.push({
    name: 'adminidinfo',
    params: {
      id: props.id
    }
  });
};

const handleChangePasswd = () => {
  visible.value = true;
};
const handleBeforeOk = (done) => {
  if (!form.passwd) {
    ElMessage.error('密码不能为空');
    return false;
  }
  if (form.passwd.length < 6) {
    ElMessage.error('密码长度不能小于6位');
    return false;
  }
  if (!form.passwd2) {
    ElMessage.error('请确认密码');
    return false;
  }
  if (form.passwd !== form.passwd2) {
    ElMessage.error('两次输入密码不一致');
    return false;
  }
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": props.id,
    "passwd": form.passwd
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/account/update/passwd", requestOptions)
    .then(response => response.text())
    .then(result => {
      if (JSON.parse(result).code == 200) {
        ElMessage.success('修改成功');
      }
    })
    .catch(error => ElMessage.warning('error', error));
  done()
};

const handleCancel = () => {
  visible.value = false;
}

interface Account {
  Avator: string;
  Company: string;
  IDcard: string;
  Location: string;
  Name: string;
  Passwd: string;
  Sex: number;
  Tel: string;
  Type: number;
  UID: number;
};

const account = ref<Account>({
  Avator: '',
  Company: '',
  IDcard: '',
  Location: '',
  Name: '',
  Passwd: '',
  Sex: 0,
  Tel: '',
  Type: 0,
  UID: 0,
});

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/account/detail?id=" + props.id, requestOptions)
    .then(response => response.text())
    .then(result => {
      account.value = JSON.parse(result).data;
    })
    .catch(error => ElMessage.error('error', error));
})

const handleDelete = () => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/account/delete?id=" + props.id, requestOptions)
    .then(response => response.text())
    .then(result => {
      if (JSON.parse(result).code == 200) {
        ElMessage.success("删除成功")
        router.go(0)
      }
    })
    .catch(error => ElMessage.error('error', error));
}

const handleRight = () => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/account/3rd/register?id=" + props.id + "&company=" + company.value, requestOptions)
    .then(response => response.text())
    .then(result => {
      if (JSON.parse(result).code == 200) {
        ElMessage.success("账户升级成功");
        setTimeout(() => {
          router.go(0);
        }, 1000);
      } else {
        ElMessage.error("账户升级失败");
      }
    })
    .catch(error => ElMessage.error('error', error));
};
</script>

<style scoped>
.edit-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}
</style>