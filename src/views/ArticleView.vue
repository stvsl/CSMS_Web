<template>
    <a-col>
        <a-row>
            <a-col>
                <a-carousel :style="{
                    width: '100%',
                    height: '350px',
                }">
                    <a-carousel-item>
                        <div class="container">
                            <a-image width="100%" height="100%" fit="cover" :src="article.Contentimg" />
                            <div class="back">
                                <el-button type="danger" color="#e3e3e3" size="large" :icon="ArrowLeftBold" circle
                                    @click="() => {
                                        router.back();
                                    }" />
                            </div>
                            <div class="content">
                                <h1>{{ article.Title }}</h1>
                                <p class="intro">{{ article.Introduction }}</p>
                                <br>
                                <p style="margin-right: 100px; text-align: right;">
                                    <el-icon color="rgb(255, 255, 255)">
                                        <UserFilled />
                                    </el-icon>&nbsp;
                                    <span>{{ article.Author }}</span> &nbsp;&nbsp;
                                    <el-icon color="rgb(255, 255, 255)">
                                        <View />
                                    </el-icon>&nbsp;
                                    <span>{{ article.Pageviews }}</span> &nbsp;&nbsp;
                                    <span>{{ formatDate(article.Updatetime) }}</span>
                                </p>
                            </div>
                        </div>
                    </a-carousel-item>
                </a-carousel>
                <a-row>
                    <a-col :span="20" :offset="2">
                        <div class="v-html-container" v-html="article.Text"></div>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-col>
</template>

<script lang="ts" setup>
import { View, UserFilled, ArrowLeftBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
const router = useRouter()

const aid = ref(router.currentRoute.value.params.id);

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

    fetch("http://127.0.0.1:6521/api/article/details?id=" + aid.value, requestOptions)
        .then(response => response.text())
        .then(result => {
            article.value = JSON.parse(result).data;
            console.log(article.value);
        }
        )
        .catch(error => console.log('error', error));
})
</script>

<style scoped>
.container img {
    width: 100%;
    max-height: 350px;
    clip: true;
}

.back {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100%;
    height: 100%;
}

.content {
    position: absolute;
    top: 35%;
    height: 100%;
    left: 0%;
    width: 100%;
    padding: 0 20px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}

.content h1 {
    line-height: 1;
    color: #fefefe;
    font-size: 3em;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
    text-align: center;
}

.content .intro {
    color: #fefefe;
    font-size: 1.2em;
    font-weight: 300;
    width: 100%;
    text-align: center;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
}

.content span {
    color: #fefefe;
    font-size: 1.2em;
    font-weight: 300;
    width: 100%;
    text-align: center;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
}

/* 设置段落样式 */
.v-html-container p {
    margin-bottom: 1em;
    line-height: 1.6;
}

/* 设置标题样式 */
.v-html-container h1,
.v-html-container h2,
.v-html-container h3,
.v-html-container h4,
.v-html-container h5,
.v-html-container h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: bold;
}

/* 设置列表样式 */
.v-html-container ul,
.v-html-container ol {
    margin-bottom: 1em;
    margin-left: 1.5em;
}

/* 设置链接样式 */
.v-html-container a {
    color: #007bff;
    text-decoration: underline;
}

/* 设置图片样式 */
.v-html-container img {
    max-width: 100%;
    height: auto;
    margin-bottom: 1em;
}

/* 设置引用样式 */
.v-html-container blockquote {
    margin: 0 0 1em;
    padding: 0.5em 1em;
    border-left: 4px solid #007bff;
}

/* 设置代码块样式 */
.v-html-container pre {
    margin: 0 0 1em;
    padding: 1em;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    overflow-x: auto;
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

/* 设置水平线样式 */
.v-html-container hr {
    margin: 1em 0;
    border: 0;
    border-top: 1px solid #dee2e6;
}

/* 设置块级引用样式 */
.v-html-container .blockquote {
    margin: 0 0 1em;
    padding: 0.5em 1em;
    border-left: 4px solid #007bff;
    background-color: #f8f9fa;
}

/* 设置表格样式 */
.v-html-container table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
}

.v-html-container table th,
.v-html-container table td {
    padding: 0.5em 1em;
    border: 1px solid #dee2e6;
}

/* 设置表格头部样式 */
.v-html-container table th {
    background-color: #f8f9fa;
    font-weight: bold;
}
</style>