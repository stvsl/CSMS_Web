<template>
    <a-list-item class="list-demo-item" action-layout="vertical">
        <template #actions>
            <span><icon-user />&nbsp;{{ anounce.Author }}</span>
            <span><icon-eye />&nbsp;{{ anounce.Status ? anounce.Pageviews : "null" }}</span>
            <span>发布时间：{{ formatDate(anounce.Writetime) }}</span>
            <span>更新时间：{{ formatDate(anounce.Updatetime) }}</span>
        </template>
        <template #extra>
            <div class="edit-area">
                <a-space direction="horizontal" align="center">
                    <a-button status="warning" size="small" @click="() => {
                        router.push({
                            name: 'adminanounceedit',
                            params: {
                                id: anounce.Aid
                            }
                        });
                    }">
                        <template #icon>
                            <icon-edit />
                        </template>修改</a-button>
                    <a-button status="danger" size="small" @click="deleteVisible = true">
                        <template #icon>
                            <icon-delete />
                        </template>删除</a-button>
                </a-space>
            </div>
        </template>
        <a-list-item-meta v-on:click="() => {
            router.push({
                name: 'anounce',
                params: {
                    id: anounce.Aid
                }
            });
        }" :title="anounce.Title" :description="anounce.Introduction">
        </a-list-item-meta>
    </a-list-item>
    <a-modal v-model:visible="deleteVisible" :on-before-ok="handleDelete" unmountOnClose>
        <template #title>
            删除公告确认
        </template>
        <div>您确定要删除此公告吗？此操作不可撤销！！！
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const deleteVisible = ref(false);

const props = defineProps({
    id: {
        type: Number,
        default: 0
    }
});

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

    fetch("http://127.0.0.1:6521/api/anounce/details?id=" + props.id, requestOptions)
        .then(response => response.text())
        .then(result => {
            anounce.value = JSON.parse(result).data;
        })
        .catch(error => ElMessage.error('error', error));
})

const handleDelete = () => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/anounce/delete?id=" + props.id, requestOptions)
        .then(response => response.text())
        .then(result => {
            deleteVisible.value = false;
            router.go(0);
        }
        )
        .catch(error => ElMessage.error('网络错误！', error));
}

</script>

<style scoped>
.edit-area {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
}
</style>