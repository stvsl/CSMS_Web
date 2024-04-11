import { ElMessage } from 'element-plus';
<template>
    <a-list-item class="list-demo-item" action-layout="vertical">
        <template #extra>
            <div class="edit-area">
                <a-space direction="horizontal" align="center">
                    <a-button status="warning" size="small">
                        <template #icon>
                            <icon-close />
                        </template>取消第三方身份授权</a-button>
                    <a-button status="warning" size="small">
                        <template #icon>
                            <icon-eye />
                        </template>查看相关任务日志</a-button>
                    <a-button status="danger" size="small">
                        <template #icon>
                            <icon-delete />
                        </template>注销账户</a-button>
                </a-space>
            </div>
        </template>
        <a-list-item-meta v-on:click="ElMessage.info('TODO');" title="XXXX公司XXXXXXTELXXXXX">
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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
.edit-area {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
}
</style>