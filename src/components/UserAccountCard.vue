import { ElMessage } from 'element-plus';
<template>
  <a-list-item class="list-demo-item" action-layout="vertical">
    <template #extra>
      <div class="edit-area">
        <a-space direction="horizontal" align="center">
          <a-button status="warning" size="small" @click="handleChangePasswd">
            <template #icon>
              <icon-lock />
            </template>修改密码</a-button>
          <a-button status="warning" size="small" @click="handleChangeInfo">
            <template #icon>
              <icon-edit />
            </template>修改身份信息</a-button>
          <a-popconfirm content="确认注销此用户账户吗？" type="error">
            <a-button status="danger" size="small">
              <template #icon>
                <icon-delete />
              </template>注销</a-button>
          </a-popconfirm>

        </a-space>
      </div>
    </template>
    <a-list-item-meta v-on:click="ElMessage.info('TODO');" title="用户XXXXXX"
      description="姓名: XXXXXX &nbsp;&nbsp;&nbsp; tel: 176XXXXXXXX">
      <template #avatar>
        <a-avatar shape="square">
          <img alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
        </a-avatar>
      </template>
    </a-list-item-meta>
  </a-list-item>
  <a-modal v-model:visible="visible" title="Modal Form" @cancel="handleCancel" @before-ok="handleBeforeOk">
    <a-form :model="form">
      <a-form-item field="passwd1" label="请输入新密码">
        <a-input v-model="form.passwd" />
      </a-form-item>
      <a-form-item field="passwd2" label="再次确认密码">
        <a-input v-model="form.passwd2" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const visible = ref(false);
const form = reactive({
  passwd: '',
  passwd2: ''
});

const handleChangeInfo = () => {
  router.push({
    name: 'adminidinfo',
    params: {
      id: '123'
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
  window.setTimeout(() => {
    done()
    // TODO; 提交表单
  }, 3000)
};
const handleCancel = () => {
  visible.value = false;
}
</script>

<style scoped>
.edit-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}
</style>