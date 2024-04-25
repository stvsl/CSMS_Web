<template>
    <a-col :offset="3" :span="20">
        <a-row>
            <a-col :span="20">
                <a-page-header title="我的活动" @back="() => {
                    router.back();
                }">
                </a-page-header>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :offset="3" :span="16">
                <a-row v-for="i in ids">
                    <UserMyActivityCard :id="i"></UserMyActivityCard>
                    <a-divider></a-divider>
                </a-row>
                <el-empty v-if="!ids.length" description="您还没有参加活动，快去参加吧！" />
                <br>
                <el-row>
                    <el-col :span="10" :offset="8">
                        <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="count"
                            @change="(currentPage) => {
                                fetchActivbity(currentPage)
                            }" />
                    </el-col>
                </el-row>
                <br>
            </a-col>
        </a-row>
        <br>
    </a-col>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import UserMyActivityCard from "../usercomponents/UserMyActivityCard.vue";
import { useRouter } from "vue-router";
import useUserStore from "../stores/modules/user";
const user = useUserStore();
const count = ref(0);
onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/activity/user/count?id=" + user.ID, requestOptions)
        .then(response => response.text())
        .then(result => count.value = JSON.parse(result).data)
        .catch(error => console.log('error', error));
    fetchActivbity(1);
});
const router = useRouter();
const ids = ref<String[]>([]);
const fetchActivbity = (page: Number) => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/activity/user/id/list?id=" + user.ID + "&page=" + page, requestOptions)
        .then(response => response.text())
        .then(result => ids.value = JSON.parse(result).data)
        .catch(error => console.log('error', error));
};
</script>