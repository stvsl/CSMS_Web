<template>
    <a-col :span="22" :offset="1">
        <a-row>
            <a-carousel :autoPlay="true" animation-name="card" show-arrow="never" indicator-position="outer" :style="{
                width: '100%',
                height: '240px',
            }" indicator-type="line">
                <a-carousel-item v-for="image in images" :style="{ width: '60%' }">
                    <router-link :to="'/article/' + 1">
                        <div class="container">
                            <img :src="image">
                            <div class="content">
                                <h2>标题</h2>
                                <span>简介</span>
                            </div>
                        </div>
                    </router-link>
                </a-carousel-item>
            </a-carousel>
        </a-row>
        <a-row>
            <a-col :span="14" :offset="1">
                <a-card title="近期文章" :bordered="true" hoverable>
                    <template #extra>
                        <router-link to="/article/all">更多文章>></router-link>
                    </template>
                    <a-row>
                        <a-col :span="24" v-for="i in 5" :key="i">
                            <UserArcicleCard />
                            <a-divider v-if="i !== 5" />
                        </a-col>
                    </a-row>
                </a-card>
                <br>
            </a-col>
            <a-col :span="7" :offset="1">
                <a-row>
                    <a-col>
                        <a-card title="快捷服务" :bordered="true" hoverable>
                            <a-space :size="10">
                                <el-button type="primary" :icon="Edit" color="#ff8e8f" round @click="() => {
                                    router.push('/user/info')
                                }">
                                    信息完善
                                </el-button>
                                <el-button type="primary" :icon="Promotion" color="#ffc94a" round @click="() => {
                                    router.push('/user/activity')
                                }">
                                    活动中心
                                </el-button>
                                <el-button type="primary" :icon="Avatar" color="#d9ed8f" round @click="() => {
                                    router.push('/user/fix');
                                }">
                                    维修申请
                                </el-button>
                            </a-space>
                        </a-card>
                    </a-col>
                </a-row>
                <br />
                <a-row>
                    <a-col>
                        <a-card title="近期公告" :bordered="true" hoverable>
                            <template #extra>
                                <router-link to="/anounce/all">更多公告>></router-link>
                            </template>
                            <a-row>
                                <a-col :span="24" v-for="i in 5" :key="i">
                                    <UserAnounceCard />
                                    <a-divider v-if="i !== 5" />
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-col>
</template>

<script lang="ts" setup>
import { Edit, Promotion, Avatar } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import UserArcicleCard from '../usercomponents/UserArcicleCard.vue';
import UserAnounceCard from '../usercomponents/UserAnounceCard.vue';
const router = useRouter();

const images = [
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp',
];

</script>

<style scoped>
.arco-card {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
}

.arco-card:hover {
    transform: translateY(-4px) scale(1.01);
}

.container {
    position: relative;
    width: 100%;
}

.container img {
    width: 100%;
    height: 100%;
    display: block;
}

.content {
    position: absolute;
    top: 40%;
    left: 0%;
    width: 100%;
    min-height: 100%;
    padding: 0 20px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}

.content h2 {
    line-height: 0.3;
    color: #fefefe;
    font-size: 2em;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
}

.content span {
    color: #fefefe;
    font-size: 1.2em;
    font-weight: 300;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
}
</style>