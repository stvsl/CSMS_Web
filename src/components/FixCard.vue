<template>
    <a-card title="报修编号：XXXX">
        <template #extra>
            <a-button type="text" status="warning" @click="handleProcess">
                处理
            </a-button>
            <a-button type="text" status="danger">
                关闭
            </a-button>
        </template>
        <a-descriptions :column="3">
            <a-descriptions-item label="名称">
                报修名称
            </a-descriptions-item>
            <a-descriptions-item label="来源用户">
                来源用户
            </a-descriptions-item>
            <a-descriptions-item label="创建时间">
                XXXX-XX-XX
            </a-descriptions-item>
            <a-descriptions-item label="更新时间">
                更新时间
            </a-descriptions-item>
            <a-descriptions-item label="委派人">
                委派人
            </a-descriptions-item>
            <a-descriptions-item label="处理人">
                处理人
            </a-descriptions-item>
        </a-descriptions>
        <a-row>
            <a-typography-text style="color:#848E9A">
                报修内容
            </a-typography-text>
        </a-row>
        <a-row>
            <div>映射HTML</div>
        </a-row>
        <a-divider />
        <a-steps v-if="true" :current="1" status="process">
            <a-step title="已提交" />
            <a-step title="正在处理" />
            <a-step title="处理完成" />
        </a-steps>
        <a-steps v-else :current="2" status="error">
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
                    <a-radio :value="1">设置处理人</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-if="processPanelStatus === 1" field="name" label="处理人姓名">
                <a-input v-model="form.name" />
            </a-form-item>
            <a-form-item v-else field="post" label="指定委派人">
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
import { ref, reactive } from 'vue';
const visible = ref(false);
const form = reactive({
    name: '',
    post: ''
});

const handleProcess = () => {
    visible.value = true;
};

const processPanelStatus = ref(0);

const handleBeforeOk = (done) => {
    console.log(form)
    window.setTimeout(() => {
        done()
    }, 3000)
};
const handleCancel = () => {
    visible.value = false;
}
</script>