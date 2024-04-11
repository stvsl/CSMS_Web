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
                <a-progress :percent="0.2" :style="{ width: '50%' }" />
            </div>
        </template>
        <a-list-item-meta v-on:click="ElMessage.info('TODO');" title="用户XXXXXX"
            description="姓名: XXXXXX &nbsp;&nbsp;&nbsp; tel: 176XXXXXXXX">
            <template #avatar>
                <a-avatar shape="square">
                    <img alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
                </a-avatar>
            </template>
        </a-list-item-meta>
    </a-list-item>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const handleChangeInfo = () => {
    router.push({
        name: 'adminidinfo',
        params: {
            id: '123'
        }
    });
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