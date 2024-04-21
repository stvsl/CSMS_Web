<template>
    <a-list-item v-on:click="handleClick" class="list-demo-item" action-layout="vertical">
        <template #actions>
            <a-col>
                <a-row>
                    <a-col>
                        <a-space>
                            <span>
                                反馈时间：{{ formatDate(feed.Feedtime) }}
                            </span>
                            <span>
                                更新时间：{{ formatDate(feed.Updatetime) }}
                            </span>
                        </a-space>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col>
                        <a-space>
                            <span>
                                委派人ID： {{ feed.Oid == 0 ? "暂无" : feed.Oid }}
                            </span>
                            <span>
                                委派信息： {{ feed.Processor == "" ? "暂无" : feed.Processor }}
                            </span>
                        </a-space>
                    </a-col>
                </a-row>
            </a-col>
        </template>
        <template #extra>
            <div style="display:flex;height: 100%; text-align: right; align-items: center;">
                <a-space>
                    <el-button v-if="feed.Process == 4" type="success" size="large" :icon="Check" circle />
                    <el-button v-if="feed.Status == 1" type="danger" size="large" :icon="Close" circle />
                    <el-button v-else type="primary" loading circle size="large"></el-button>
                    <span>查看进度>></span>
                </a-space>
            </div>
        </template>
        <a-list-item-meta :title="feed.Name" :description="feed.Detail">
        </a-list-item-meta>
    </a-list-item>
    <a-modal v-model:visible="processvisible" @ok="handleOk" :width="450" :hide-cancel="true" :simple="true">
        <template #title>
            进度
        </template>
        <a-row>
            <a-timeline :style="{ flex: 1 }">
                <a-timeline-item v-if="feed.Process >= 1" dot-type="hollow">已提交</a-timeline-item>
                <a-timeline-item v-if="feed.Process >= 2" dot-type="hollow">已受理</a-timeline-item>
                <a-timeline-item v-if="feed.Process >= 3" dot-type="hollow">已开始处理，处理人：{{ feed.Iod }}</a-timeline-item>
                <a-timeline-item v-if="feed.Process >= 4" dot-type="hollow">处理完成</a-timeline-item>
                <a-timeline-item v-if="feed.Process >= 5" dot-type="hollow">已关闭</a-timeline-item>
            </a-timeline>
        </a-row>
    </a-modal>
</template>

<script lang="ts" setup>
import { Check, Close } from '@element-plus/icons-vue'
import { id } from 'element-plus/es/locales.mjs';
import { ref, onMounted } from 'vue'

const props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
});

interface feed {
    ID: number;
    UID: number;
    Type: number;
    Name: string;
    Feedtime: string;
    Detail: string;
    Process: number;
    Status: number;
    Oid: number;
    Processor: string;
    Updatetime: string;
    Record: string;
}

const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}年${month}月${day}日${hour}:${minute}`;
}

const feed = ref<feed>({
    ID: 0,
    UID: 0,
    Type: 0,
    Name: 'loading...',
    feedtime: 'loading...',
    Detail: 'loading...',
    Process: 0,
    Status: 0,
    Oid: 0,
    Processor: "loading...",
    Updatetime: 'loading...',
    Record: 'loading...'
});

onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/feed/details?id=" + props.id, requestOptions)
        .then(response => response.text())
        .then(result => feed.value = JSON.parse(result).data)
        .catch(error => ElMessage.error('error', error));
});

const processvisible = ref(false);

const handleClick = () => {
    processvisible.value = true;
};
const handleOk = () => {
    processvisible.value = false;
};

</script>