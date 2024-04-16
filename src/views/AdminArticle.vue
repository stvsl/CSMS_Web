<template>
    <el-col>
        <el-row>
            <el-col :offset="1">
                <a-page-header title="文章管理" subtitle="查看并管理全部文章" :show-back="false">
                    <template #breadcrumb>
                        <a-breadcrumb>
                            <a-breadcrumb-item>内容管理</a-breadcrumb-item>
                            <a-breadcrumb-item>文章管理</a-breadcrumb-item>
                        </a-breadcrumb>
                    </template>
                </a-page-header>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="15" :offset="1"> <a-list :bordered="false">
                    <a-list-item v-for="idx in articles" :key="idx.Aid">
                        <ArticleCard :id="idx.Aid"></ArticleCard>
                    </a-list-item>
                </a-list>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10" :offset="7">
                <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="count" @change="(currentPage) => {
                    page = currentPage;
                }" :hide-on-single-page="true" />
            </el-col>
        </el-row>
        <br>
    </el-col>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import ArticleCard from '../components/ArticleCard.vue'
import { onMounted, ref } from 'vue';
const count = ref(0);
const page = ref(1);
interface ArticleID {
    Aid: number;
}
const articles = ref<ArticleID[]>([]);

const getArcticleCount = () => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/article/count", requestOptions)
        .then(response => response.text())
        .then(result => () => {
            count.value = JSON.parse(result).count;
        })
        .catch(error => ElMessage.error('网络错误：', error));
}

const getArticleList = (page: number) => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/article/id/list?page=" + page, requestOptions)
        .then(response => response.text())
        .then(result => articles.value = JSON.parse(result).data)
        .catch(error => ElMessage.error('网络错误：', error));
}
onMounted(() => {
    getArcticleCount();
    getArticleList(page.value);
})

</script>

<style scoped></style>