<template>
    <a-col :offset="3" :span="20">
        <a-row>
            <a-col :span="20">
                <a-page-header title="活动中心" @back="() => {
                    router.back();
                }">
                    <template #extra>
                        <div style="height: 100%; display: flex; justify-content: flex-end;">
                            <el-button type="primary" size="large" @click="gotoMyActivity">我的活动</el-button>
                        </div>
                    </template>
                </a-page-header>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :offset="1">
                <h2>近期活动</h2>
            </a-col>
        </a-row>
        <a-row>
            <a-col :offset="3" :span="15">
                <a-row v-for="i in 10" :key="i">
                    <UserActivityCard :mode="true"></UserActivityCard>
                    <a-divider></a-divider>
                </a-row>
                <br>
            </a-col>
        </a-row>
        <br>
    </a-col>
</template>

<script lang="ts" setup>
import UserActivityCard from "../usercomponents/UserActivityCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const gotoMyActivity = () => {
    router.push("/user/myactivity");
};

</script>

<style scoped></style>