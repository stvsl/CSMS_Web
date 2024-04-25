<template>
    <a-col :offset="3" :span="20">
        <a-row>
            <a-page-header title="活动详情" @back="() => {
                router.back();
            }">
            </a-page-header>
        </a-row>
        <a-row>
            <a-col :offset="3" :span="15">
                <h1>{{ active.Name }}</h1>
                <h3>{{ active.Detail }}</h3>
                <p>
                    <el-icon>
                        <View />
                    </el-icon>&nbsp;
                    <span>{{ active.Views }}</span> &nbsp;&nbsp;
                    <span>{{ formatDate(active.Starttime) }} - {{ formatDate(active.Endtime) }}</span>&nbsp;&nbsp;
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>{{ active.Maxcount }}</span>&nbsp;&nbsp;
                    <el-button v-if="!hasjoin" type="success" size="small" @click="handleJoin">参加此活动</el-button>
                    <el-button v-else type="success" size="small" disabled>您已参加此活动</el-button>
                </p>
                <p>
                    <el-icon>
                        <StarFilled />
                    </el-icon>
                    <span>活动位置：{{ active.Position }}</span>
                </p>
                <div v-html="active.Text"></div>
            </a-col>
        </a-row>
        <br>

    </a-col>
</template>

<script lang="ts" setup>
import { View, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import useUserStore from '../stores/modules/user';
import { ElMessage } from 'element-plus';
const user = useUserStore();
const router = useRouter();
const id = ref(router.currentRoute.value.params.id);

const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}年${month}月${day}日${hour}:${minute}`;
}

interface Active {
    Acid: number;
    Name: string;
    Starttime: string;
    Opentime: string;
    Endtime: string;
    Detail: string;
    Text: string;
    Views: number;
    Maxcount: number;
    Position: string;
}

const active = ref<Active>({
    Acid: 0,
    Name: 'loading...',
    Starttime: 'loading...',
    Opentime: 'loading...',
    Endtime: 'loading...',
    Detail: 'loading...',
    Text: 'loading...',
    Views: 0,
    Maxcount: 0,
    Position: 'loading...'
});

const hasjoin = ref(false);

onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/activity/details?id=" + id.value, requestOptions)
        .then(response => response.text())
        .then(result => {
            active.value = JSON.parse(result).data;
            count.value = JSON.parse(result).count;
        })
        .catch(error => console.log('error', error));

    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/activity/hasjoin?id=" + user.ID + "&acid=" + id.value, requestOptions)
        .then(response => response.text())
        .then(result => hasjoin.value = JSON.parse(result).data)
        .catch(error => ElMessage.error('error', error));
})

const handleJoin = () => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/activity/join?id=" + user.ID + "&acid=" + id.value, requestOptions)
        .then(response => response.text())
        .then(result => {
            ElMessage.success("参与成功")
            router.go(0)
        })
        .catch(error => ElMessage.error('error', error));
}

</script>

<style scoped></style>