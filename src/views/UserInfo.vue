<template>
    <a-col :offset="3" :span="20">
        <a-row>
            <a-col :span="20">
                <a-page-header title="个人信息完善" @back="() => {
                    router.back();
                }">
                </a-page-header>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="20" :offset="1">
                <a-card title="您的个人信息">
                    <template #extra>
                        <a-space>
                            <a-button type="primary" @click="submitForm">保存</a-button>
                            <el-popconfirm width="220" confirm-button-text="确定" cancel-button-text="取消"
                                :icon="InfoFilled" icon-color="#626AEF" title="确认要重置吗？" @confirm="resetForm()">
                                <template #reference>
                                    <a-button status="danger">重置</a-button>
                                </template>
                            </el-popconfirm>
                        </a-space>
                    </template>
                    <br>
                    <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
                    </v-form-render>
                    <br>
                    <div class="data-progress">
                        <span>资料完善度</span>&nbsp;&nbsp;
                        <a-progress :percent="calcProgress(account)" :style="{ width: '60%' }" />
                    </div>
                    <br>
                </a-card>
            </a-col>
        </a-row>
        <br>
    </a-col>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import useUserStore from "../stores/modules/user"
import { InfoFilled } from '@element-plus/icons-vue'

const userStore = useUserStore();
const router = useRouter();

import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const formJson = reactive({ "widgetList": [{ "key": 94453, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 102930, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "uid", "label": "用户ID", "labelAlign": "label-center-align", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "", "size": "small", "labelWidth": "", "labelHidden": false, "readonly": false, "disabled": true, "hidden": false, "clearable": false, "showPassword": false, "required": false, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input34952" }, { "key": 102930, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "name", "label": "用户名", "labelAlign": "", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "showPassword": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input93624" }, { "key": 102930, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "tel", "label": "联系电话", "labelAlign": "", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "showPassword": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input92823" }, { "key": 89788, "type": "radio", "icon": "radio-field", "formItemFlag": true, "options": { "name": "sex", "label": "性别", "labelAlign": "", "defaultValue": null, "columnWidth": "200px", "size": "", "displayStyle": "inline", "buttonStyle": true, "border": true, "labelWidth": null, "labelHidden": false, "disabled": false, "hidden": false, "optionItems": [{ "label": "男", "value": "0" }, { "label": "女", "value": "1" }, { "label": "保密", "value": "2" }], "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "onCreated": "", "onMounted": "", "onChange": "", "onValidate": "" }, "id": "radio16411" }, { "key": 102930, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "idcard", "label": "身份证号", "labelAlign": "", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "showPassword": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input43767" }, { "key": 29783, "type": "textarea", "icon": "textarea-field", "formItemFlag": true, "options": { "name": "location", "label": "居住地址", "labelAlign": "", "rows": 3, "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "" }, "id": "textarea83181" }], "options": { "name": "gridCol44251", "hidden": false, "span": 16, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-44251" }, { "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 102977, "type": "picture-upload", "icon": "picture-upload-field", "formItemFlag": true, "options": { "name": "avator", "label": "头像", "labelAlign": "", "labelWidth": null, "labelHidden": false, "columnWidth": "", "disabled": false, "hidden": false, "required": true, "requiredHint": "", "customRule": "", "customRuleHint": "", "uploadURL": "http://127.0.0.1:6521/api/service/image/upload", "uploadTip": "", "withCredentials": false, "multipleSelect": false, "showFileList": true, "limit": 1, "fileMaxSize": 7, "fileTypes": ["jpg", "jpeg", "png"], "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "onCreated": "", "onMounted": "", "onBeforeUpload": "", "onUploadSuccess": "", "onUploadError": "", "onFileRemove": "", "onValidate": "" }, "id": "pictureupload104199" }], "options": { "name": "gridCol94566", "hidden": false, "span": 7, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-94566" }], "options": { "name": "grid110769", "hidden": false, "gutter": 12, "colHeight": null, "customClass": [] }, "id": "grid110769" }], "formConfig": { "modelName": "formData", "refName": "vForm", "rulesName": "rules", "labelWidth": 80, "labelPosition": "left", "size": "", "labelAlign": "label-left-align", "cssCode": ".el-table{\n  border: none;\n}", "customClass": [], "functions": "", "layoutType": "PC", "jsonVersion": 3, "onFormCreated": "", "onFormMounted": "", "onFormDataChange": "" } })
const formData = reactive({})
const optionData = reactive({})
const vFormRef = ref<any>(null)

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

interface FormAccount {
    avator: {
        name: string;
        url: string;
    }[];
    company: string;
    idcard: string;
    location: string;
    name: string;
    passwd: string;
    sex: number;
    tel: string;
    type: number;
    uid: number;
}

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

    fetch("http://127.0.0.1:6521/api/account/detail?id=" + userStore.ID, requestOptions)
        .then(response => response.text())
        .then(result => {
            account.value = JSON.parse(result).data;
            const formaccount = <FormAccount>{
                company: account.value.Company,
                idcard: account.value.IDcard,
                location: account.value.Location,
                name: account.value.Name,
                passwd: account.value.Passwd,
                sex: account.value.Sex,
                tel: account.value.Tel,
                uid: account.value.UID,
            }
            if (account.value.Avator != "") {
                formaccount.avator = [{
                    name: account.value.Avator,
                    url: account.value.Avator,
                }]
            }
            vFormRef.value.setFormData(formaccount);
        })
        .catch(error => ElMessage.error('error', error));
})

const calcProgress = (account: Account) => {
    let count = 0;
    if (account.Name == "") {
        count++;
    }
    if (account.Tel == "") {
        count++;
    }
    if (account.Sex == 3) {
        count++;
    }
    if (account.Avator == "") {
        count++;
    }
    if (account.IDcard == "") {
        count++;
    }
    return (5 - count) / 5;
};

const resetForm = () => {
    const formaccount = <FormAccount>{
        company: account.value.Company,
        idcard: account.value.IDcard,
        location: account.value.Location,
        name: account.value.Name,
        passwd: account.value.Passwd,
        sex: account.value.Sex,
        tel: account.value.Tel,
        uid: account.value.UID,
    }
    if (account.value.Avator != "") {
        formaccount.avator = [{
            name: account.value.Avator,
            url: account.value.Avator,
        }]
    }
    vFormRef.value.setFormData(formaccount);
};

const submitForm = () => {
    vFormRef.value.getFormData().then(formData => {
        const formdata = <FormAccount>{
            idcard: formData.idcard,
            location: formData.location,
            name: formData.name,
            sex: Number(formData.sex),
            tel: formData.tel,
            uid: formData.uid,
            avator: formData.avator,
        }
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(formdata);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:6521/api/account/update/info", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (JSON.parse(result).code == 200) {
                    ElMessage.success('修改成功');
                    router.back();
                }
            })
            .catch(error => ElMessage.error('error', error));

    }).catch(error => {
        ElMessage.error(error)
    })
}
</script>

<style scoped>
.data-progress {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    min-width: 600px;
    margin-left: 10px;
}
</style>