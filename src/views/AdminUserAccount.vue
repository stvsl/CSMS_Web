<template>
    <el-col>
        <el-row>
            <el-col :span="15" :offset="1">
                <a-page-header title="账号管理" subtitle="管理居民账号" :show-back="false">
                    <template #breadcrumb>
                        <a-breadcrumb>
                            <a-breadcrumb-item>居民信息</a-breadcrumb-item>
                            <a-breadcrumb-item>账号管理</a-breadcrumb-item>
                        </a-breadcrumb>
                    </template>
                    <template #extra>
                        <a-button type="primary" @click="visible = true">添加账号</a-button>
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
    <a-drawer :width="340" :height="350" :visible="visible" :placement="'bottom'" @ok="() => { handleAddAccount() }"
        @cancel="() => { visible = false }" unmountOnClose>
        <template #title>
            添加用户账号
        </template>
        <a-row>
            <a-col :span="7" :offset="2">
                <a-form :model="form" :style="{ width: '600px' }">
                    <a-form-item field="name" label="姓名">
                        <a-input v-model="form.name" allow-clear placeholder="请输入姓名..." />
                    </a-form-item>
                    <a-form-item field="tel" label="电话号码">
                        <a-input v-model="form.tel" allow-clear placeholder="请输入电话号码..." />
                    </a-form-item>
                    <a-form-item field="idcard" label="身份证号">
                        <a-input v-model="form.idcard" allow-clear placeholder="请输入身份证号..."></a-input>
                    </a-form-item>
                    <a-form-item field="password" label="密码">
                        <a-input-password v-model="form.passwd" v-model:visibility="visible"
                            placeholder="请输入密码..."></a-input-password>
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
    </a-drawer>

</template>

<script lang="ts" setup>
import UserAccountCard from '../components/UserAccountCard.vue'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
const count = ref(0)

const visible = ref(false)

const form = ref({
    name: '',
    tel: '',
    idcard: '',
    passwd: ''
});

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

const handleAddAccount = () => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(form.value);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/add", requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).code == 200) {
                ElMessage.success("添加成功");
                visible.value = false;
                router.go(0);
            } else {
                ElMessage.error("添加失败");
            }
        })
        .catch(error => ElMessage.error('error', error));
}
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