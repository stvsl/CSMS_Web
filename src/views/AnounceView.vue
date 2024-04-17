<template>
    <a-col :offset="3" :span="20">
        <a-row>
            <a-page-header title="公告详情" @back="() => {
                router.back();
            }">
            </a-page-header>
        </a-row>
        <a-row>
            <a-col :offset="3" :span="15">
                <h1>{{ anounce.Title }}</h1>
                <h3>{{ anounce.Introduction }}</h3>
                <p>
                    <el-icon>
                        <UserFilled />
                    </el-icon>&nbsp;
                    <span>{{ anounce.Author }}</span> &nbsp;&nbsp;
                    <el-icon>
                        <View />
                    </el-icon>&nbsp;
                    <span>{{ anounce.Pageviews }}</span> &nbsp;&nbsp;
                    <span>{{ formatDate(anounce.Updatetime) }}</span>
                </p>
                <div v-html="anounce.Text"></div>
            </a-col>
        </a-row>
        <br>

    </a-col>
</template>

<script lang="ts" setup>
import { View, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
const router = useRouter();

const aid = ref(router.currentRoute.value.params.id);

interface Anounce {
    Aid: number;
    Title: string;
    Introduction: string;
    Text: string;
    Writetime: string;
    Updatetime: string;
    Author: string;
    Pageviews: number;
    Status: number;
}

const anounce = ref<Anounce>({
    Aid: 0,
    Title: 'loading...',
    Introduction: 'loading...',
    Text: 'loading...',
    Writetime: '',
    Updatetime: '',
    Author: '',
    Pageviews: 0,
    Status: 0
});

const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}年${month}月${day}日${hour}:${minute}`;
}

onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/anounce/details?id=" + aid.value, requestOptions)
        .then(response => response.text())
        .then(result => {
            anounce.value = JSON.parse(result).data;
        })
        .catch(error => ElMessage.error('error', error));
})

</script>

<style scoped></style>