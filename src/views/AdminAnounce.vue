<template>
    <el-col>
        <el-row>
            <el-col :offset="1">
                <a-page-header title="公告管理" subtitle="查看并管理全部公告" :show-back="false">
                    <template #breadcrumb>
                        <a-breadcrumb>
                            <a-breadcrumb-item>内容管理</a-breadcrumb-item>
                            <a-breadcrumb-item>公告管理</a-breadcrumb-item>
                        </a-breadcrumb>
                    </template>
                </a-page-header>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="15" :offset="1"> <a-list :bordered="false">
                    <a-list-item v-for="idx in anounces" :key="idx.Aid">
                        <AnounceCard :id="idx.Aid"></AnounceCard>
                    </a-list-item>
                </a-list>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10" :offset="7">
                <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="anouncecount"
                    @change="(currentPage) => { handleAnounceItem(currentPage) }" />
            </el-col>
        </el-row>
        <br>
    </el-col>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import AnounceCard from '../components/AnounceCard.vue'
import { ElMessage } from 'element-plus';
import router from '../router/router';

const anouncecount = ref(0)


interface AnounceID {
    Aid: number;
}
const anounces = ref<AnounceID[]>([]);

onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/anounce/count", requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).code == 200) {
                anouncecount.value = JSON.parse(result).count
            } else {
                ElMessage.error("获取公告数量失败");
                router.go(0);
            }
        })
        .catch(error => console.log('error', error));
    handleAnounceItem(1);
}
)

const handleAnounceItem = (page: number) => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/anounce/id/list?page=" + page, requestOptions)
        .then(response => response.text())
        .then(result => {
            anounces.value = JSON.parse(result).data
        })
        .catch(error => ElMessage.error('error', error));
}

</script>

<style scoped></style>