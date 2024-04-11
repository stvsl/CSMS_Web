<template>
  <a-watermark content="系统管理 ID XXXXXXXXXX" style="width: 100%">
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
            <a-button status="warning">
              <template #icon>
                <icon-lock />
              </template>修改密码
            </a-button> &nbsp;
            <a-button status="success">
              <template #icon>
                <icon-edit />
              </template>编辑个人信息
            </a-button> &nbsp;
            <a-button status="danger">
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
</template>

<script lang="ts" setup>

import { reactive } from 'vue'

const data = reactive([{
  key: '1',
  id: 'xxxxx',
  name: 'XXXXX',
  tel: '176XXXXXXX',
  lastlogin: 'XXXX-XXX-XXX'
}]);
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