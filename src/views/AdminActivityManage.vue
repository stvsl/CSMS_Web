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
          <a-list-item v-for="idx in 4" :key="idx">
            <ActiveCard @manageSomeOne="manageSomeOne" @deleteSomeOne="deleteSomeOne"></ActiveCard>
          </a-list-item>
        </a-list>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="1000" />
      </el-col>
    </el-row>
  </el-col>
  <a-drawer :width="720" :visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      当前XXX活动人员管理
    </template>
    <a-list>
      <a-list-item v-for="idx in 4" :key="idx">
        <a-list-item-meta title="姓名" description="联系方式:18888888888">
          <template #avatar>
            <a-avatar shape="square">
              <img alt="avatar"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
            </a-avatar>
          </template>
        </a-list-item-meta>
        <template #actions>
          <a-button type="outline" shape="round" status="success">
            <template #icon>
              <icon-check />
            </template>通过
          </a-button>
          <a-button type="outline" shape="round" status="danger">
            <template #icon>
              <icon-close />
            </template>拒绝
          </a-button>
          <a-button type="outline" shape="round" status="warning">
            <template #icon>
              <icon-minus-circle />
            </template>等待
          </a-button>
        </template>
      </a-list-item>
    </a-list>
  </a-drawer>
  <a-modal :visible="visible" @ok="handleOk" @cancel="handleCancel" okText="Confirm" cancelText="Exit" unmountOnClose>
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you
      press
      the OK button.</div>
  </a-modal>
</template>

<script lang="ts" setup>
import ActiveCard from '../components/ActiveCard.vue'
import { Modal } from '@arco-design/web-vue';
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
}

const manageSomeOne = (id: number) => {
  visible.value = true;
}

const deleteSomeOne = () => {
  visible.value = true;
};
</script>

<style scoped></style>