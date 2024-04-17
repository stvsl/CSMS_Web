<template>
    <a-list-item class="list-demo-item" action-layout="vertical">
        <template #actions>
            <span><icon-user />&nbsp;{{ article?.Author }}</span>
            <span><icon-eye />&nbsp;{{ article?.Status ? article?.Pageviews : "null" }}</span>
            <span>发布时间：{{ formatDate(article?.Writetime) }}</span>
            <span>更新时间：{{ formatDate(article?.Updatetime) }}</span>
        </template>
        <template #extra>
            <div className="image-area">
                <a-space direction="vertical">
                    <a-button status="success" @click="handleView">
                        <template #icon>
                            <icon-eye />
                        </template>查看</a-button>
                    <a-button status="warning" @click="router.push(`/admin/article/edit/` + article?.Aid)">
                        <template #icon>
                            <icon-edit />
                        </template>修改</a-button>
                    <a-button status="danger" @click="deleteVisible = true">
                        <template #icon>
                            <icon-delete />
                        </template>删除</a-button>
                </a-space>
            </div>
        </template>
        <a-list-item-meta :title="article?.Title" :description="article?.Introduction">
            <template #avatar>
                <a-image width="100" :src="article?.Coverimg" />
            </template>
        </a-list-item-meta>
    </a-list-item>
    <a-modal v-model:visible="deleteVisible" :on-before-ok="handleDelete" unmountOnClose>
        <template #title>
            删除文章确认
        </template>
        <div>您确定要删除此文章吗？此操作不可撤销！！！
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const deleteVisible = ref(false);
const handleView = () => {
    router.push(`/article/${props.id}`);
};
const props = defineProps({
    id: {
        type: Number,
        default: false,
    },
});

interface Article {
    Aid: number;
    Coverimg: string;
    Contentimg: string;
    Title: string;
    Introduction: string;
    Text: string;
    Writetime: string;
    Updatetime: string;
    Author: string;
    Pageviews: number;
    Status: number;
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

const article = ref<Article>({
    Aid: 0,
    Coverimg: "",
    Contentimg: "",
    Title: "loading...",
    Introduction: "loading...",
    Text: "",
    Writetime: "",
    Updatetime: "",
    Author: "",
    Pageviews: 0,
    Status: 0,
});
onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/article/details?id=" + props.id, requestOptions)
        .then(response => response.text())
        .then(result => {
            article.value = JSON.parse(result).data;
            console.log(article.value);
        }
        )
        .catch(error => console.log('error', error));
})

const handleDelete = () => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/article/delete?id=" + props.id, requestOptions)
        .then(response => response.text())
        .then(result => {
            deleteVisible.value = false;
            router.go(0);
        }
        )
        .catch(error => ElMessage.error('网络错误！', error));
}
</script>