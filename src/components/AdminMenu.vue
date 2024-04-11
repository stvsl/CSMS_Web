<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :value="false">expand</el-radio-button>
    <el-radio-button :value="true">collapse</el-radio-button>
  </el-radio-group> -->
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened :router="true">
    <el-menu-item index="/admin/overview">
      <el-icon>
        <View />
      </el-icon>
      <template #title>整体概况</template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <Document />
        </el-icon>
        <span>内容管理</span>
      </template>
      <el-menu-item index="/admin/content">新建内容</el-menu-item>
      <el-menu-item index="/admin/article">文章管理</el-menu-item>
      <el-menu-item index="/admin/announcement">公告管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <Flag />
        </el-icon>
        <span>社区活动</span>
      </template>
      <el-menu-item index="/admin/activity/create">活动创建</el-menu-item>
      <el-menu-item index="/admin/activity/manage">活动管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon>
          <ChatDotRound />
        </el-icon>
        <span>反馈与报修</span>
      </template>
      <el-menu-item index="/admin/feedixprocess">进度跟进</el-menu-item>
      <el-menu-item-group>
        <template #title><span class="groupname">用户反馈</span></template>
        <el-menu-item index="/admin/feed">反馈管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span class="groupname">用户报修</span></template>
        <el-menu-item index="/admin/fix">报修管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon>
          <Avatar />
        </el-icon>
        <span>居民信息</span>
      </template>
      <el-menu-item index="/admin/account">账号管理</el-menu-item>
      <el-menu-item index="/admin/idinfo">身份信息管理</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/admin/right">
      <el-icon>
        <CreditCard />
      </el-icon>
      <template #title>账户权限</template>
    </el-menu-item>
    <el-menu-item index="/admin/setting">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>系统设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Flag,
  Setting,
  Avatar,
  ChatDotRound,
  CreditCard,
  View,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}

.groupname {
  text-align: left;
  margin-left: -40px;
}

.el-menu {
  height: 100%;
}
</style>
