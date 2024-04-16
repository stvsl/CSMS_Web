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
                <h1>活动标题</h1>
                <h3>活动简介</h3>
                <p>
                    <el-icon>
                        <View />
                    </el-icon>&nbsp;
                    <span>1515</span> &nbsp;&nbsp;
                    <span>XXXX年XX月XX日</span>&nbsp;&nbsp;
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>12122</span>&nbsp;&nbsp;
                    <el-button type="success" size="small">参加此活动</el-button>
                </p>
                <p>
                    <el-icon>
                        <StarFilled />
                    </el-icon>
                    <span>活动位置：{{ "XXX" }}</span>
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

const content = ref("<p>活动正文内容</p>");

</script>

<style scoped></style>