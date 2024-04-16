<template>
    <a-list-item v-on:click="handleClick" class="list-demo-item" action-layout="vertical">
        <template #actions>
            <a-col>
                <a-row>
                    <a-col>
                        <a-space>
                            <span>
                                反馈时间：{{ "121212" }}
                            </span>
                            <span>
                                更新时间：{{ "121212" }}
                            </span>
                        </a-space>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col>
                        <a-space>
                            <span>
                                委派人：{{ "121212" }}
                            </span>
                            <span>
                                处理人：{{ "121212" }}
                            </span>
                        </a-space>
                    </a-col>
                </a-row>
            </a-col>
        </template>
        <template #extra>
            <div style="display:flex;height: 100%; text-align: right; align-items: center;">
                <a-space>
                    <el-button type="success" size="large" :icon="Check" circle />
                    <el-button type="danger" size="large" :icon="Close" circle />
                    <el-button type="primary" loading circle size="large"></el-button>
                    <span>查看进度>></span>
                </a-space>
            </div>
        </template>
        <a-list-item-meta title="反馈名称"
            description="v关于军方击毙iui哦i和口语胡一负于覅u关于工艺i覅与i故意犯规与开发有v关于军方击毙iui哦i和口语胡一负于覅u关于工艺i覅与i故意犯规与开发有">
        </a-list-item-meta>
    </a-list-item>
    <a-modal v-model:visible="processvisible" @ok="handleOk" :width="450" :hide-cancel="true" :simple="true">
        <template #title>
            进度
        </template>
        <a-row>
            <a-timeline :style="{ flex: 1 }">
                <a-timeline-item dot-type="hollow">已提交</a-timeline-item>
                <a-timeline-item dot-type="hollow">已受理</a-timeline-item>
                <a-timeline-item dot-type="hollow">已开始处理，处理人：XXX</a-timeline-item>
                <a-timeline-item dot-type="hollow">处理完成</a-timeline-item>
                <a-timeline-item dot-type="hollow">已关闭</a-timeline-item>
            </a-timeline>
        </a-row>
    </a-modal>
</template>

<script setup lang="ts">
import { Check, Close } from '@element-plus/icons-vue'
import { ref } from 'vue'

const processvisible = ref(false);

const handleClick = () => {
    processvisible.value = true;
};
const handleOk = () => {
    processvisible.value = false;
};

</script>