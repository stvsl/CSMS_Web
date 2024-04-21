<template>
    <a-card :title="'反馈编号：' + feed.ID">
        <template #extra>
            <a-button v-if="feed.Status === 0 && feed.Process == 1" type="text" status="success"
                @click="handleProcessUpdate(2)">
                采纳
            </a-button>
            <a-button v-if="feed.Status === 0 && feed.Process > 1" type="text" status="warning" @click="handleProcess">
                处理
            </a-button>
            <a-button v-if="feed.Status === 0" type="text" status="danger" @click="handleStatusUpdate(1)">
                直接关闭
            </a-button>
            <a-button v-else type="text" status="success" @click="handleStatusUpdate(0)">
                重新打开
            </a-button>
        </template>
        <a-descriptions :column="3">
            <a-descriptions-item label="名称">
                {{ feed.Name }}
            </a-descriptions-item>
            <a-descriptions-item label="来源用户UID">
                {{ feed.UID }}
            </a-descriptions-item>
            <a-descriptions-item label="创建时间">
                {{ formatDate(feed.Feedtime) }}
            </a-descriptions-item>
            <a-descriptions-item label="更新时间">
                {{ formatDate(feed.Updatetime) }}
            </a-descriptions-item>
            <a-descriptions-item label="委派人ID">
                {{ feed.Oid == 0 ? "暂无" : feed.Oid }}
            </a-descriptions-item>
            <a-descriptions-item label="委派信息">
                {{ feed.Processor == "" ? "暂无" : feed.Processor }}
            </a-descriptions-item>
        </a-descriptions>
        <a-row>
            <a-typography-text style="color:#848E9A">
                反馈内容
            </a-typography-text>
        </a-row>
        <a-row>
            <div> {{ feed.Detail }} </div>
        </a-row>
        <a-divider />
        <a-steps v-if="feed.Status === 0" :current="feed.Process" status="process">
            <a-step title="已提交" />
            <a-step title="已采纳" />
            <a-step title="正在处理" />
            <a-step title="处理完成" />
        </a-steps>
        <a-steps v-else :current="feed.Process" status="error">
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
                <a-select v-model="form.post">
                    <a-option value="post1">Post1</a-option>
                    <a-option value="post2">Post2</a-option>
                    <a-option value="post3">Post3</a-option>
                    <a-option value="post4">Post4</a-option>
                </a-select>
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

const visible = ref(false);
const form = reactive({
    name: '',
    id: ''
});

interface Feed {
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

const feed = ref<Feed>({
    ID: 0,
    UID: 0,
    Type: 0,
    Name: 'loading...',
    Feedtime: 'loading...',
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
                "id": form.id
            })
        };

        fetch("http://127.0.0.1:6521/api/feed/do?id=" + props.id, requestOptions)
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

                    fetch("http://127.0.0.1:6521/api/feed/details?id=" + props.id, requestOptions)
                        .then(response => response.text())
                        .then(result => feed.value = JSON.parse(result).data)
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

    fetch("http://127.0.0.1:6521/api/feed/process?id=" + props.id + "&status=" + status, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).code === 200) {
                feed.value.Process = status;
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
    fetch("http://127.0.0.1:6521/api/feed/status?id=" + props.id + "&status=" + status, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).code === 200) {
                feed.value.Status = status;
                ElMessage.success("操作成功");
            } else {
                ElMessage.error("操作失败");
            }
        })
        .catch(error => ElMessage.error('error', error));
}
</script>