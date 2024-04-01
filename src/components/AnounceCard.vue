import { ElMessage } from 'element-plus';
<template>
    <a-list-item class="list-demo-item" action-layout="vertical">
        <template #actions>
            <span><icon-user />&nbsp;用户名</span>
            <span><icon-eye />&nbsp;111</span>
            <span>发布时间：XXXX</span>
            <span>更新时间：XXXX</span>
        </template>
        <template #extra>
            <div class="edit-area">
                <a-space direction="horizontal" align="center">
                    <a-button status="warning" size="small">
                        <template #icon>
                            <icon-edit />
                        </template>修改</a-button>
                    <a-button status="danger" size="small">
                        <template #icon>
                            <icon-delete />
                        </template>删除</a-button>
                </a-space>
            </div>
        </template>
        <a-list-item-meta v-on:click="ElMessage.info('TODO');" title="大师的dffgsfsdfdgd阿森松岛代入感vgxferrt"
            description="gsfgtwefswg士大夫二二萨尔燃灯佛而突然大幅缩短如果sder分隔符efwtq4二渗透压二人wrs反而更为恩爱">
        </a-list-item-meta>
    </a-list-item>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
</script>

<style scoped>
.edit-area {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
}
</style>