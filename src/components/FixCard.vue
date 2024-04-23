<template>
    <a-card :title="'报修编号：' + fix.ID">
        <template #extra>
            <a-button v-if="fix.Status === 0 && fix.Process == 1" type="text" status="success"
                @click="handleProcessUpdate(2)">
                采纳
            </a-button>
            <a-button v-if="fix.Status === 0 && fix.Process > 1" type="text" status="warning" @click="handleProcess">
                处理
            </a-button>
            <a-button v-if="fix.Status === 0" type="text" status="danger" @click="handleStatusUpdate(1)">
                直接关闭
            </a-button>
            <a-button v-else type="text" status="success" @click="handleStatusUpdate(0)">
                重新打开
            </a-button>
        </template>
        <a-descriptions :column="3">
            <a-descriptions-item label="名称">
                {{ fix.Name }}
            </a-descriptions-item>
            <a-descriptions-item label="来源用户UID">
                {{ fix.UID }}
            </a-descriptions-item>
            <a-descriptions-item label="创建时间">
                {{ formatDate(fix.Feedtime) }}
            </a-descriptions-item>
            <a-descriptions-item label="更新时间">
                {{ formatDate(fix.Updatetime) }}
            </a-descriptions-item>
            <a-descriptions-item label="委派人ID">
                {{ fix.Oid == 0 ? "暂无" : fix.Oid }}
            </a-descriptions-item>
            <a-descriptions-item label="委派信息">
                {{ fix.Processor == "" ? "暂无" : fix.Processor }}
            </a-descriptions-item>
        </a-descriptions>
        <a-row>
            <a-typography-text style="color:#848E9A">
                报修内容
            </a-typography-text>
        </a-row>
        <a-row>
            <div> {{ fix.Detail }} </div>
        </a-row>
        <a-divider />
        <a-steps v-if="fix.Status === 0" :current="fix.Process" status="process">
            <a-step title="已提交" />
            <a-step title="已采纳" />
            <a-step title="正在处理" />
            <a-step title="处理完成" />
        </a-steps>
        <a-steps v-else :current="fix.Process" status="error">
            <a-step title="已提交" />
            <a-step title="已关闭" />
        </a-steps>
    </a-card>
    <a-modal v-model:visible="visible" :title="processPanelStatus === 0 ? '选择委派人' : '设置处理人'" @cancel="handleCancel"
        @before-ok="handleBeforeOk">
        <a-form :model="form">
            <a-form-item>
                <a-radio-group v-model="processPanelStatus" type="button">
                    <a-radio :value="0" :default-checked="true">指定委派人</a-radio>
                    <a-radio :value="1">手动填入相关处理信息</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-if="processPanelStatus === 1" field="name" label="相关信息">
                <textarea v-model="form.name" :max-length="60" auto-size allow-clear
                    style="width: 100%;height: 100px" />
            </a-form-item>
            <a-form-item v-else field="id" label="指定委派人">
                <el-select v-model="form.post" filterable remote reserve-keyword placeholder="请输入委派人OID"
                    :remote-method="remoteMethod" :loading="loading" style="width: 240px">
                    <el-option v-for="item in options" :label="item" :value="item" />
                    <template #loading>
                        <svg class="circular" viewBox="0 0 50 50">
                            <circle class="path" cx="25" cy="25" r="20" fill="none" />
                        </svg>
                    </template>
                </el-select>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted } from 'vue';
import router from '../router/router';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const options = ref<Number[]>([])

const loading = ref(false);

const remoteMethod = (query: string) => {
    loading.value = true;
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/3rd/id/fetchlist?key=" + query, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).code == 200) {
                options.value = JSON.parse(result).data;
                setTimeout(() => {
                    loading.value = false;
                }, 500);
            }
        })
        .catch(error => ElMessage.error('error', error));
}

const visible = ref(false);
const form = reactive({
    name: '',
    post: ''
});

interface fix {
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

const fix = ref<fix>({
    ID: 0,
    UID: 0,
    Type: 0,
    Name: 'loading...',
    fixtime: 'loading...',
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

    fetch("http://127.0.0.1:6521/api/fix/details?id=" + props.id, requestOptions)
        .then(response => response.text())
        .then(result => fix.value = JSON.parse(result).data)
        .catch(error => ElMessage.error('error', error));
});

const handleProcess = () => {
    visible.value = true;
};

const processPanelStatus = ref(0);

const handleBeforeOk = (done) => {
    if (form.name == '' && form.id == '') {
        ElMessage.error("请填写相关信息");
        done()
        return;
    } else {
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify({
                "mode": processPanelStatus.value,
                "name": form.name,
                "id": form.post
            })
        };

        fetch("http://127.0.0.1:6521/api/fix/do?id=" + props.id, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (JSON.parse(result).code === 200) {
                    ElMessage.success("操作成功");
                    var myHeaders = new Headers();
                    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        redirect: 'follow'
                    };

                    fetch("http://127.0.0.1:6521/api/fix/details?id=" + props.id, requestOptions)
                        .then(response => response.text())
                        .then(result => fix.value = JSON.parse(result).data)
                        .catch(error => ElMessage.error('error', error));
                } else {
                    ElMessage.error("操作失败");
                }
            })
            .catch(error => ElMessage.error('error', error));
    }
    done();
};
const handleCancel = () => {
    visible.value = false;
}

const handleProcessUpdate = (status: number) => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/fix/process?id=" + props.id + "&status=" + status, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).code === 200) {
                fix.value.Process = status;
                ElMessage.success("操作成功");
            } else {
                ElMessage.error("操作失败");
            }
        })
        .catch(error => ElMessage.error('error', error));
}

const handleStatusUpdate = (status: number) => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("http://127.0.0.1:6521/api/fix/status?id=" + props.id + "&status=" + status, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).code === 200) {
                fix.value.Status = status;
                ElMessage.success("操作成功");
            } else {
                ElMessage.error("操作失败");
            }
        })
        .catch(error => ElMessage.error('error', error));
}
</script>

<style scoped>
.demo-basic {
    padding: 10px;
    width: 300px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.circular {
    display: inline;
    height: 30px;
    width: 30px;
    animation: loading-rotate 2s linear infinite;
}

.path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: var(--el-color-primary);
    stroke-linecap: round;
}

.loading-path .dot1 {
    transform: translate(3.75px, 3.75px);
    fill: var(--el-color-primary);
    animation: custom-spin-move 1s infinite linear alternate;
    opacity: 0.3;
}

.loading-path .dot2 {
    transform: translate(calc(100% - 3.75px), 3.75px);
    fill: var(--el-color-primary);
    animation: custom-spin-move 1s infinite linear alternate;
    opacity: 0.3;
    animation-delay: 0.4s;
}

.loading-path .dot3 {
    transform: translate(3.75px, calc(100% - 3.75px));
    fill: var(--el-color-primary);
    animation: custom-spin-move 1s infinite linear alternate;
    opacity: 0.3;
    animation-delay: 1.2s;
}

.loading-path .dot4 {
    transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
    fill: var(--el-color-primary);
    animation: custom-spin-move 1s infinite linear alternate;
    opacity: 0.3;
    animation-delay: 0.8s;
}

@keyframes loading-rotate {
    to {
        transform: rotate(360deg);
    }
}

@keyframes loading-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40px;
    }

    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120px;
    }
}

@keyframes custom-spin-move {
    to {
        opacity: 1;
    }
}
</style>