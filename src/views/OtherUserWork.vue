<template>
    <a-col :offset="3" :span="20">
        <a-row>
            <a-col :span="20">
                <a-page-header title="我的任务" @back="() => {
                    router.back();
                }">
                </a-page-header>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="20" :offset="1">
                <a-card title="任务列表">
                    <template #extra>
                        <a-space>
                            <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="count"
                                @change="(currentPage) => {
                                    handleFetchList(currentPage)
                                }" />
                        </a-space>
                    </template>
                    <a-row v-for="(i, index) in ids" :key="i">
                        <WorkCard :id="i"></WorkCard>
                        <a-divider v-if="index !== ids?.length - 1"></a-divider>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
        <br>
    </a-col>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import WorkCard from "../components/WorkCard.vue"

const router = useRouter()

const count = ref(0)

const ids = ref<String[]>()

onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/3rd/count?id=12", requestOptions)
        .then(response => response.text())
        .then(result => {
            count.value = JSON.parse(result).data
        })
        .catch(error => ElMessage('error', error));
    handleFetchList(1);
})

const handleFetchList = (page: Number) => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/3rd/id/list?id=12&page=" + page, requestOptions)
        .then(response => response.text())
        .then(result => {
            ids.value = JSON.parse(result).data
        })
        .catch(error => ElMessage('error', error));
}

</script>

<style scoped></style>