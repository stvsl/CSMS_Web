<template>
    <el-col style="margin: 20px;">
        <el-row :gutter="20">
            <el-col :span="12">
                <a-card :bordered="true" hoverable>
                    <div style="height: 380px;width: 700px;">
                        <v-chart :option="option" autoresize />
                    </div>
                </a-card>
            </el-col>
            <el-col :span="6">
                <el-row :gutter="5">
                    <el-col>
                        <a-card title="文章" :bordered="true" hoverable>
                            <template #extra>
                                <router-link to="/admin/article">更多</router-link>
                            </template>
                            <a-row>
                                <a-col :flex="1">
                                    <a-statistic title="文章总数" :value="arcticleancouncOverviewData.articleCount"
                                        :value-from="0" :start="true" animation>
                                        <template #suffix>篇</template>
                                    </a-statistic>
                                </a-col>
                                <a-col :flex="1">
                                    <a-statistic title="已发布" :value="arcticleancouncOverviewData.articlePublish"
                                        :value-from="0" :start="true" animation>
                                        <template #suffix>篇</template>
                                    </a-statistic>
                                </a-col>
                            </a-row>
                            <br />
                            <a-row>
                                <a-col :flex="1">
                                    <a-statistic title="公告总数" :value="arcticleancouncOverviewData.anounceCount"
                                        :value-from="0" :start="true" animation>
                                        <template #suffix>篇</template>
                                    </a-statistic>
                                </a-col>
                                <a-col :flex="1">
                                    <a-statistic title="已发布" :value="arcticleancouncOverviewData.anouncePublish"
                                        :value-from="0" :start="true" animation>
                                        <template #suffix>篇</template>
                                    </a-statistic>
                                </a-col>
                            </a-row>
                        </a-card>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <a-card title="活动" :bordered="true" hoverable>
                            <template #extra>
                                <router-link to="/admin/activity/manage">更多</router-link>
                            </template>
                            <a-row>
                                <a-col :flex="1">
                                    <a-statistic title="活动总数" :value="activeoverviewdata.count" :value-from="0"
                                        :start="true" animation>
                                        <template #suffix>个</template>
                                    </a-statistic>
                                </a-col>
                                <a-col :flex="1">
                                    <a-statistic title="已结束" :value="activeoverviewdata.hasEnd" :value-from="0"
                                        :start="true" animation>
                                        <template #suffix>个</template>
                                    </a-statistic>
                                </a-col>
                                <a-col :flex="1">
                                    <a-statistic title="进行中" :value="activeoverviewdata.inprocess" :value-from="0"
                                        :start="true" animation>
                                        <template #suffix>个</template>
                                    </a-statistic>
                                </a-col>
                            </a-row>
                        </a-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <a-card title="反馈" :bordered="true" hoverable>
                    <template #extra>
                        <router-link to="/admin/feed">更多</router-link>
                    </template>
                    <a-row>
                        <a-col :flex="1">
                            <a-statistic title="反馈总数" :value="feedoverviewdata.TotalFeedbacks" show-group-separator
                                :value-from="0" :start="true" animation>
                            </a-statistic>
                        </a-col>
                        <a-col :flex="1">
                            <a-statistic title="累计已处理" :value="feedoverviewdata.TotalProcessed" :value-from="0"
                                :start="true" animation :value-style="{ color: '#0fbf60' }">
                            </a-statistic>
                        </a-col>
                        <a-col :flex="1">
                            <a-statistic title="未处理"
                                :value="feedoverviewdata.TotalFeedbacks - feedoverviewdata.TotalProcessed"
                                :value-from="0" :start="true" animation :value-style="{ color: '#f5222d' }">
                            </a-statistic>
                        </a-col>
                    </a-row>
                </a-card>
            </el-col>
            <el-col :span="6">
                <a-card title="报修" :bordered="true" hoverable>
                    <template #extra>
                        <router-link to="/admin/fix">更多</router-link>
                    </template>
                    <a-row>
                        <a-col :flex="1">
                            <a-statistic title="报修总数" :value="fixoverviewdata.TotalFeedbacks" show-group-separator
                                :value-from="0" :start="true" animation>
                            </a-statistic>
                        </a-col>
                        <a-col :flex="1">
                            <a-statistic title="累计已处理" :value="fixoverviewdata.TotalProcessed" :value-from="0"
                                :start="true" animation :value-style="{ color: '#0fbf60' }">
                            </a-statistic>
                        </a-col>
                        <a-col :flex="1">
                            <a-statistic title="未处理"
                                :value="fixoverviewdata.TotalFeedbacks - fixoverviewdata.TotalProcessed" :value-from="0"
                                :start="true" animation :value-style="{ color: '#f5222d' }">
                            </a-statistic>
                        </a-col>
                    </a-row>
                </a-card>
            </el-col>
            <el-col :span="6">
                <a-card title="用户" :bordered="true" hoverable>
                    <template #extra>
                        <router-link to="/admin/account">更多</router-link>
                    </template>
                    <a-row>
                        <a-col :flex="1">
                            <a-statistic title="已注册" :value="accountOverviewData.hasRegisterd" show-group-separator
                                :value-from="0" :start="true" animation>
                            </a-statistic>
                        </a-col>
                        <a-col :flex="1">
                            <a-statistic title="第三方账户数" :value="accountOverviewData.otherUserCount" show-group-separator
                                :value-from="0" :start="true" animation>
                            </a-statistic>
                        </a-col>
                    </a-row>
                </a-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="18">
                <a-card :bordered="true">
                    <a-space :size="40">
                        <el-button type="primary" :icon="Edit" color="#ff8e8f" round size="large" @click="() => {
                            router.push('/admin/content')
                        }">
                            新建文章
                        </el-button>
                        <el-button type="primary" :icon="Promotion" color="#ffc94a" round size="large" @click="() => {
                            router.push('/admin/activity/create')
                        }">
                            活动创建
                        </el-button>
                        <el-button type="primary" :icon="Avatar" color="#d9ed8f" round size="large" @click="() => {
                            router.push('/admin/right');
                        }">
                            账户权限
                        </el-button>
                        <el-button type="primary" :icon="Switch" color="#c5fff8" round size="large" @click="() => {
                            router.push('/');
                        }">
                            普通用户视角
                        </el-button>
                    </a-space>
                </a-card>
            </el-col>
        </el-row>
    </el-col>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Edit, Promotion, Avatar, Switch } from '@element-plus/icons-vue'
import { ref, onBeforeMount } from "vue";
import { use } from "echarts/core";
import { RadarChart } from "echarts/charts";
import { TitleComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { ComposeOption } from "echarts/core";
import type { RadarSeriesOption } from "echarts/charts";
import type {
    TitleComponentOption,
    LegendComponentOption
} from "echarts/components";
import { ElMessage } from 'element-plus';

const router = useRouter();

use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

type EChartsOption = ComposeOption<
    | TitleComponentOption
    | LegendComponentOption
    | RadarSeriesOption
>;

const option = ref({
    title: {
        text: '整体概况'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        top: 'bottom',
        data: ['反馈情况', '报修情况']
    },
    radar: {
        indicator: [
            { name: '总数', max: 10000 },
            { name: '已完成', max: 16000 },
            { name: '未完成', max: 30000 },
            { name: '进行中', max: 38000 },
            { name: '平均时长', max: 52000 },
            { name: '关闭周期', max: 25000 }
        ]
    },
    backgroundColor: {
        type: 'radial',
        x: 10,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [{
            offset: 0.2,
            color: 'rgba(0, 255, 255, 0.1)'
        }, {
            offset: 0.8,
            color: 'rgba(250, 250, 255, 0.1)'
        }]
    },
    series: [
        {
            name: '反馈与报修',
            type: 'radar',
            data: [
                {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                    name: '反馈情况'
                },
                {
                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                    name: '报修情况'
                }
            ]
        }
    ]
} as EChartsOption);

interface FeedOverviewData {
    CompletionRate: number;
    InProgress: number;
    TotalFeedbacks: number;
    TotalPending: number;
    TotalProcessed: number;
    TotalRepairs: number;
}

interface FixOverviewData {
    CompletionRate: number;
    InProgress: number;
    TotalFeedbacks: number;
    TotalPending: number;
    TotalProcessed: number;
    TotalRepairs: number;
}

interface ActiveOverviewData {
    count: number;
    hasEnd: number;
    inprocess: number;
}

interface ArctileAncouncOverviewData {
    anounceCount: number;
    anouncePublish: number;
    articleCount: number;
    articlePublish: number;
}

interface AccountOverviewData {
    hasRegisterd: number;
    otherUserCount: number;
}

const feedoverviewdata = ref<FeedOverviewData>({
    CompletionRate: 0,
    InProgress: 0,
    TotalFeedbacks: 0,
    TotalPending: 0,
    TotalProcessed: 0,
    TotalRepairs: 0
} as FeedOverviewData);

const fixoverviewdata = ref<FixOverviewData>({
    CompletionRate: 0,
    InProgress: 0,
    TotalFeedbacks: 0,
    TotalPending: 0,
    TotalProcessed: 0,
    TotalRepairs: 0
} as FixOverviewData);

const activeoverviewdata = ref<ActiveOverviewData>({
    count: 0,
    hasEnd: 0,
    inprocess: 0
} as ActiveOverviewData);

const arcticleancouncOverviewData = ref<ArctileAncouncOverviewData>({
    anounceCount: 0,
    anouncePublish: 0,
    articleCount: 0,
    articlePublish: 0
} as ArctileAncouncOverviewData);

const accountOverviewData = ref<AccountOverviewData>({
    hasRegisterd: 0,
    otherUserCount: 0
} as AccountOverviewData)

onBeforeMount(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/feed/admin/overview", requestOptions)
        .then(response => response.text())
        .then(result => {
            feedoverviewdata.value = JSON.parse(result).data
        })
        .catch(error => ElMessage.error('error', error));

    fetch("http://127.0.0.1:6521/api/fix/admin/overview", requestOptions)
        .then(response => response.text())
        .then(result => {
            fixoverviewdata.value = JSON.parse(result).data
        })
        .catch(error => ElMessage.error('error', error));

    fetch("http://127.0.0.1:6521/api/activity/admin/overview", requestOptions)
        .then(response => response.text())
        .then(result => {
            activeoverviewdata.value = JSON.parse(result).data
        })
        .catch(error => ElMessage.error('error', error));
    fetch("http://127.0.0.1:6521/api/articleanounce/admin/overview", requestOptions)
        .then(response => response.text())
        .then(result => {
            arcticleancouncOverviewData.value = JSON.parse(result).data
        })
        .catch(error => ElMessage.error('error', error));
    fetch("http://127.0.0.1:6521/api/account/admin/overview", requestOptions)
        .then(response => response.text())
        .then(result => {
            accountOverviewData.value = JSON.parse(result).data
        })
        .catch(error => ElMessage.error('error', error));
});


</script>
<style>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.main {
    min-height: 350px;
}

.arco-card {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
}

.arco-card:hover {
    transform: translateY(-4px) scale(1.01);
}
</style>