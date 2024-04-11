<template>
    <el-col>
        <el-row>
            <el-col :offset="1">
                <a-page-header title="账号管理" subtitle="管理居民账号" :show-back="false">
                    <template #breadcrumb>
                        <a-breadcrumb>
                            <a-breadcrumb-item>居民信息</a-breadcrumb-item>
                            <a-breadcrumb-item>账号管理</a-breadcrumb-item>
                        </a-breadcrumb>
                    </template>
                </a-page-header>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="15" :offset="1"> <a-list :bordered="false">
                    <a-list-item v-for="idx in 4" :key="idx">
                        <UserAccountCard></UserAccountCard>
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
</template>

<script lang="ts" setup>
import UserAccountCard from '../components/UserAccountCard.vue'
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