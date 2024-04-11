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
                <h1>公告标题</h1>
                <h3>公告简介</h3>
                <p>
                    <el-icon>
                        <UserFilled />
                    </el-icon>&nbsp;
                    <span>作者</span> &nbsp;&nbsp;
                    <el-icon>
                        <View />
                    </el-icon>&nbsp;
                    <span>1515</span> &nbsp;&nbsp;
                    <span>XXXX年XX月XX日</span>
                </p>
                <div v-html="content"></div>
            </a-col>
        </a-row>
        <br>

    </a-col>
</template>

<script lang="ts" setup>
import { View, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const content = ref("<p>公告内容</p>");

</script>

<style scoped></style>