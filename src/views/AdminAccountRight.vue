<template>
    <el-col>
        <el-row>
            <el-col :offset="1">
                <a-page-header title="账户权限" subtitle="管理特殊账号和权限账户" :show-back="false">
                    <template #breadcrumb>
                        <a-breadcrumb>
                            <a-breadcrumb-item>账户权限</a-breadcrumb-item>
                        </a-breadcrumb>
                    </template>
                </a-page-header>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="1" :span="6">
                <a-input-group style="margin-left:   20px">
                    <h2 :style="{ width: '60px' }">添加:</h2>
                    <a-select v-model="stype" :options="['名称', 'UID', '联系电话']" :style="{ width: '120px' }"
                        placeholder="请选择搜索类型" />&nbsp;
                    <a-input v-model="skey" :style="{ width: '300px' }" placeholder="键入以开始搜索" /> &nbsp;
                    <a-button :disabled="stype == '' || skey == ''" @click="handleSearch">
                        <template #icon>
                            <icon-search />
                        </template>搜索</a-button>
                </a-input-group>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="15" :offset="1"> <a-list :bordered="false">
                    <a-list-item v-for="idx in ids" :key="idx">
                        <RightAccountCard :id="idx"></RightAccountCard>
                    </a-list-item>
                </a-list>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10" :offset="7">
                <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="count" @change="(currentPage) => {
                    handleFetchAccountID(currentPage);
                }" />
            </el-col>
        </el-row>
    </el-col>
    <a-drawer :width="500" :visible="dialogvisible" @ok="dialogvisible = false" @cancel="dialogvisible = false"
        unmountOnClose>
        <template #title>
            符合条件的普通用户
        </template>
        <el-empty v-if="searchids.length === 0" description="暂无符合条件的普通用户" :image-size="200" />
        <a-list-item v-for="item in searchids">
            <UserAccountCard :id="String(item)" :mode="true"></UserAccountCard>
        </a-list-item>
    </a-drawer>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import RightAccountCard from '../components/RightAccountCard.vue';
import { ref, onMounted } from 'vue';
import UserAccountCard from "../components/UserAccountCard.vue";

const stype = ref('')
const skey = ref('')

const count = ref(0)
onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/3rd/count", requestOptions)
        .then(response => response.text())
        .then(result => {
            count.value = JSON.parse(result).data;
            handleFetchAccountID(1);
        })
        .catch(error => console.log('error', error));
})

const ids = ref<number[]>([]);

const handleFetchAccountID = (page: number) => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/3rd/id/list?page=" + page, requestOptions)
        .then(response => response.text())
        .then(result => {
            ids.value = JSON.parse(result).data;
        })
        .catch(error => ElMessage.error('error', error));
}

const searchids = ref<string[]>([]);
const dialogvisible = ref<boolean>(false);

const handleSearch = () => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/getbykey?key=" + stype.value + "&value=" + skey.value, requestOptions)
        .then(response => response.text())
        .then(result => {
            searchids.value = JSON.parse(result).data
            dialogvisible.value = true
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