import { ElMessage } from 'element-plus';
<template>
    <a-list-item class="list-demo-item" action-layout="vertical">
        <template #extra>
            <div class="edit-area">
                <a-space direction="horizontal" align="center">
                    <a-button status="warning" size="small" @click="handle3rdRight">
                        <template #icon>
                            <icon-close />
                        </template>取消第三方身份授权</a-button>
                    <a-button v-if="false" status="warning" size="small">
                        <template #icon>
                            <icon-eye />
                        </template>查看相关任务日志</a-button>

                    <a-popconfirm content="确定要注销账户吗?这将连带删除该账户关联的普通用户账户，如只是需要取消第三方权限，请点击取消第三方身份授权按钮！！" type="warning"
                        @ok="handle3rdDelete" position="lb">
                        <a-button status="danger" size="small">
                            <template #icon>
                                <icon-delete />
                            </template>注销账户</a-button>
                    </a-popconfirm>
                </a-space>
            </div>
        </template>
        <a-list-item-meta :title="'公司: ' + adata.Company + ' | ' + adata.Name"
            :description="'OID:' + adata.Oid + ' TEL: ' + adata.Tel">
            <template #avatar>
                <a-avatar shape="square">
                    <img alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
                </a-avatar>
            </template>
        </a-list-item-meta>
    </a-list-item>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    id: {
        type: Number,
        default: 0,
        required: true
    }
})

const adata = ref({ "Oid": 0, "Name": "loading...", "Company": "loading...", "Tel": "00000000000", "Sex": 0 });

onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/3rd/detail?id=" + props.id, requestOptions)
        .then(response => response.text())
        .then(result => adata.value = JSON.parse(result).data)
        .catch(error => console.log('error', error));
})

const handle3rdRight = () => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/3rd/cancelRight?id=" + props.id, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).code == 200) {
                ElMessage.success("取消成功");
                router.go(0)
            } else {
                ElMessage.error("取消失败");
            }
        })
        .catch(error => ElMessage.error('error', error));
}

const handle3rdDelete = () => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/account/3rd/delete?id=" + props.id, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).code == 200) {
                ElMessage.success("取消成功");
                router.go(0)
            } else {
                ElMessage.error("取消失败");
            }
        })
        .catch(error => ElMessage.error('error', error));
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