import { ElMessage } from 'element-plus';
<template>
    <a-list-item class="list-demo-item" action-layout="vertical">
        <template #extra>
            <div class="edit-area">
                <a-space direction="horizontal" align="center">
                    <a-button status="warning" size="small" @click="handleChangeInfo">
                        <template #icon>
                            <icon-edit />
                        </template>修改身份信息</a-button>
                </a-space>
            </div>
        </template>
        <template #actions>
            <div class="data-progress">
                <span>资料完善度</span>&nbsp;&nbsp;
                <a-progress :percent="handleCalcProgress(account)" :style="{ width: '50%' }" />
            </div>
        </template>
        <a-list-item-meta :title="'用户' + account.UID" :description="'姓名: ' + account.Name + '  tel: ' + account.Tel">
            <template #avatar>
                <a-avatar shape="square">
                    <img alt="avatar"
                        :src="account.Avator == '' ?
                            'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp' : account.Avator" />
                </a-avatar>
            </template>
        </a-list-item-meta>
    </a-list-item>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';

const router = useRouter();

const handleChangeInfo = () => {
    router.push({
        name: 'adminidinfo',
        params: {
            id: account.value.UID
        }
    });
};

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

interface Account {
    Avator: string;
    Company: string;
    IDcard: string;
    Location: string;
    Name: string;
    Passwd: string;
    Sex: number;
    Tel: string;
    Type: number;
    UID: number;
};

const account = ref<Account>({
    Avator: '',
    Company: '',
    IDcard: '',
    Location: '',
    Name: '',
    Passwd: '',
    Sex: 0,
    Tel: '',
    Type: 0,
    UID: 0,
});

onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/detail?id=" + props.id, requestOptions)
        .then(response => response.text())
        .then(result => {
            account.value = JSON.parse(result).data;
        })
        .catch(error => ElMessage.error('error', error));
})

const handleCalcProgress = (account: Account) => {
    var count = 0;
    if (account.IDcard == "") {
        count = count + 1;
    }
    if (account.Company == "") {
        count = count + 1;
    }
    if (account.Location == "") {
        count = count + 1;
    }
    if (account.Avator == "") {
        count = count + 1;
    }
    return (4 - count) / 4;
};
</script>

<style scoped>
.edit-area {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
}

.data-progress {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    min-width: 600px;
}
</style>