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
                    <a-list-item v-for="idx in accountids">
                        <UserAccountCard :id="idx"></UserAccountCard>
                    </a-list-item>
                </a-list>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10" :offset="7">
                <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="count" @change="(currentPage) => {
                    handleFetchAccount(currentPage);
                }" />
            </el-col>
        </el-row>
    </el-col>
</template>

<script lang="ts" setup>
import UserAccountCard from '../components/UserAccountCard.vue'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus';

const count = ref(0)

onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/count", requestOptions)
        .then(response => response.text())
        .then(result => {
            count.value = JSON.parse(result).info;
        })
        .catch(error => console.log('error', error));
    handleFetchAccount(1);
})

const accountids = ref<string[]>([]);

const handleFetchAccount = (page: Number) => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/id/list?page=" + page, requestOptions)
        .then(response => response.text())
        .then(result => {
            accountids.value = JSON.parse(result).data;
        })
        .catch(error => ElMessage.error('error', error));
}
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