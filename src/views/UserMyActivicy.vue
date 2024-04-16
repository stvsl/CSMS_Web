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
                <a-row v-for="i in 10" :key="i">
                    <UserMyActivityCard></UserMyActivityCard>
                    <a-divider></a-divider>
                </a-row>
                <br>
                <el-row>
                    <el-col :span="10" :offset="8">
                        <el-pagination :page-size="10" background layout="prev, pager, next, jumper" :total="1000" />
                    </el-col>
                </el-row>
                <br>
            </a-col>
        </a-row>
        <br>
    </a-col>
</template>

<script lang="ts" setup>
import UserMyActivityCard from "../usercomponents/UserMyActivityCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

</script>