<template>
    <el-col>
        <el-row>
            <el-col :offset="1">
                <a-page-header title="活动修改" subtitle="修改活动" :show-back="true" @back="() => {
                    router.back();
                }">
                    <template #breadcrumb>
                        <a-breadcrumb>
                            <a-breadcrumb-item>社区活动</a-breadcrumb-item>
                            <a-breadcrumb-item>活动修改</a-breadcrumb-item>
                        </a-breadcrumb>
                    </template>
                </a-page-header>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16" :offset="1">
                <v-form-render id="Form" :form-json="formJson" :form-data="formData" :option-data="optionData"
                    ref="vFormRef">
                </v-form-render>
                <div style="border: 1px solid #ccc;margin-top: 6px">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                        @onCreated="handleCreated" />
                </div>
                <br />
                <el-button type="primary" @click="submitForm"><el-icon>
                        <Upload />
                    </el-icon><span>&nbsp;确认修改</span></el-button>
                <p />
                <div style="height: 50px">
                </div>
            </el-col>
        </el-row>
    </el-col>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, shallowRef, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Upload, Delete } from '@element-plus/icons-vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();

const formJson = reactive({ "widgetList": [{ "key": 47038, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 13442, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "name", "label": "活动名称", "labelAlign": "", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "showPassword": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input114453" }], "options": { "name": "gridCol59630", "hidden": false, "span": 24, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-59630" }], "options": { "name": "grid6691", "hidden": false, "gutter": 12, "colHeight": null, "customClass": [] }, "id": "grid6691" }, { "key": 47038, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 4081, "type": "date", "icon": "date-field", "formItemFlag": true, "options": { "name": "startDate", "label": "开始日期", "labelAlign": "", "type": "datetime", "defaultValue": null, "placeholder": "", "columnWidth": "200px", "size": "", "autoFullWidth": true, "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "editable": false, "format": "YYYY-MM-DD", "valueFormat": "YYYY-MM-DD", "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "onCreated": "", "onMounted": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "" }, "id": "date69137" }], "options": { "name": "gridCol78113", "hidden": false, "span": 8, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-78113" }, { "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 56085, "type": "time", "icon": "time-field", "formItemFlag": true, "options": { "name": "startTime", "label": "开始时间", "labelAlign": "", "defaultValue": null, "placeholder": "", "columnWidth": "200px", "size": "", "autoFullWidth": true, "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "editable": false, "format": "HH:mm:ss", "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "onCreated": "", "onMounted": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "" }, "id": "time93441" }], "options": { "name": "gridCol39157", "hidden": false, "span": 8, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": "" }, "id": "grid-col-39157" }], "options": { "name": "grid74629", "hidden": false, "gutter": 12, "colHeight": null, "customClass": "" }, "id": "grid74629" }, { "key": 47038, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 4081, "type": "date", "icon": "date-field", "formItemFlag": true, "options": { "name": "stopDate", "label": "结束日期", "labelAlign": "", "type": "datetime", "defaultValue": null, "placeholder": "", "columnWidth": "200px", "size": "", "autoFullWidth": true, "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "editable": false, "format": "YYYY-MM-DD", "valueFormat": "YYYY-MM-DD", "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "onCreated": "", "onMounted": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "" }, "id": "date18130" }], "options": { "name": "gridCol36334", "hidden": false, "span": 8, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": "" }, "id": "grid-col-36334" }, { "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 56085, "type": "time", "icon": "time-field", "formItemFlag": true, "options": { "name": "stopTime", "label": "结束时间", "labelAlign": "", "defaultValue": null, "placeholder": "", "columnWidth": "200px", "size": "", "autoFullWidth": true, "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "editable": false, "format": "HH:mm:ss", "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": "", "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "onCreated": "", "onMounted": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "" }, "id": "time66319" }], "options": { "name": "gridCol19005", "hidden": false, "span": 8, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": "" }, "id": "grid-col-19005" }], "options": { "name": "grid96548", "hidden": false, "gutter": 12, "colHeight": null, "customClass": [] }, "id": "grid96548" }, { "key": 47038, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 89835, "type": "number", "icon": "number-field", "formItemFlag": true, "options": { "name": "maxcount", "label": "人数上限", "labelAlign": "", "defaultValue": 0, "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "disabled": false, "hidden": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "min": -100000000000, "max": 100000000000, "precision": 0, "step": 1, "controlsPosition": "right", "onCreated": "", "onMounted": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "" }, "id": "number74645" }], "options": { "name": "gridCol56607", "hidden": false, "span": 5, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-56607" }, { "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 104443, "type": "alert", "icon": "alert", "formItemFlag": false, "options": { "name": "alert59920", "title": "人数上限设置为0时，代表无上限，用户可随意参与活动。", "type": "info", "description": "", "closable": true, "closeText": "", "center": false, "showIcon": true, "effect": "light", "hidden": false, "onClose": "", "customClass": [], "label": "alert" }, "id": "alert59920" }], "options": { "name": "gridCol107312", "hidden": false, "span": 11, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-107312" }], "options": { "name": "grid34313", "hidden": false, "gutter": 12, "colHeight": null, "customClass": [] }, "id": "grid34313" }, { "key": 47038, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 36644, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "position", "label": "活动位置", "labelAlign": "", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "showPassword": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input41577" }], "options": { "name": "gridCol113586", "hidden": false, "span": 24, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": "" }, "id": "grid-col-113586" }], "options": { "name": "grid52132", "hidden": false, "gutter": 12, "colHeight": null, "customClass": [] }, "id": "grid52132" }, { "key": 47038, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 98780, "type": "textarea", "icon": "textarea-field", "formItemFlag": true, "options": { "name": "detail", "label": "活动介绍", "labelAlign": "", "rows": 4, "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "" }, "id": "textarea112791" }, { "key": 67717, "type": "divider", "icon": "divider", "formItemFlag": false, "options": { "name": "divider81891", "label": "正文内容", "columnWidth": "200px", "direction": "horizontal", "contentPosition": "center", "hidden": false, "customClass": [], "onCreated": "", "onMounted": "" }, "id": "divider81891" }], "options": { "name": "gridCol79610", "hidden": false, "span": 24, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-79610" }], "options": { "name": "grid111266", "hidden": false, "gutter": 12, "colHeight": null, "customClass": [] }, "id": "grid111266" }], "formConfig": { "modelName": "formData", "refName": "vForm", "rulesName": "rules", "labelWidth": 80, "labelPosition": "left", "size": "", "labelAlign": "label-left-align", "cssCode": ".el-table{\n  border: none;\n}", "customClass": [], "functions": "", "layoutType": "PC", "jsonVersion": 3, "onFormCreated": "", "onFormMounted": "", "onFormDataChange": "" } });

const formData = reactive({})
const optionData = reactive({})
const vFormRef = ref(null)
const clearDialogVisible = ref(false)

const editorRef = shallowRef()

const acid = ref(router.currentRoute.value.params.id);

// 内容 HTML
const valueHtml = ref('')

interface FormActive {
    name: string,
    startDate: string,
    startTime: string,
    stopDate: string,
    stopTime: string,
    maxcount: number,
    position: string,
    detail: string
}
// 模拟 ajax 异步获取内容
onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/activity/details?id=" + acid.value, requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result).data;
            const active = <FormActive>{
                name: data.Name,
                startTime: data.Starttime,
                startDate: data.Starttime,
                stopTime: data.Endtime,
                stopDate: data.Endtime,
                detail: data.Detail,
                maxcount: data.Maxcount,
                position: data.Position
            }
            vFormRef.value.setFormData(active);
            valueHtml.value = data.Text;
        })
        .catch(error => ElMessage.warning('error', error));
})

const toolbarConfig = {
    excludeKeys: ['insertVideo'],
}
const editorConfig = {                       // JS 语法
    MENU_CONF: {},
    placeholder: '请输入正文内容...'
}
editorConfig.MENU_CONF['uploadImage'] = {
    server: 'http://127.0.0.1:6521/api/service/content/upload',
    maxFileSize: 20 * 1024 * 1024, // 1M
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}


const submitForm = () => {
    vFormRef.value.getFormData().then(formData => {
        // Form Validation OK
        var raw = JSON.stringify({
            'acid': Number(acid.value),
            'data': formData, 'content': valueHtml.value
        });
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:6521/api/activity/update", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res = JSON.parse(result)
                if (res.code == 200) {
                    ElMessage.success('修改成功')
                    router.back();
                } else {
                    ElMessage.error('修改失败,请检查网络')
                }
            })
            .catch(error => console.log('error', error));
    }).catch(error => {
        // Form Validation failed
        ElMessage.error(error)
    })
}
</script>