<template>
  <el-col>
    <el-row>
      <el-col :offset="1">
        <a-page-header title="修改身份信息" subtitle="修改身份信息" :show-back="true" @back="() => {
          router.back();
        }">
          <template #breadcrumb>
            <a-breadcrumb>
              <a-breadcrumb-item>居民信息</a-breadcrumb-item>
              <a-breadcrumb-item>身份信息管理</a-breadcrumb-item>
              <a-breadcrumb-item>修改身份信息</a-breadcrumb-item>
            </a-breadcrumb>
          </template>
        </a-page-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="15">
        <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
        </v-form-render>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="14" :span="2">
        <el-button type="primary" size="large" @click="submitForm">
          <template #icon>
            <icon-save />
          </template>保存</el-button>
      </el-col>
    </el-row>
  </el-col>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter();
const id = ref(router.currentRoute.value.params.id);
const formJson = reactive({ "widgetList": [{ "key": 94453, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 102930, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "uid", "label": "用户ID", "labelAlign": "label-center-align", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "", "size": "small", "labelWidth": "", "labelHidden": false, "readonly": false, "disabled": true, "hidden": false, "clearable": false, "showPassword": false, "required": false, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input34952" }, { "key": 102930, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "name", "label": "用户名", "labelAlign": "", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "showPassword": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input93624" }, { "key": 102930, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "tel", "label": "联系电话", "labelAlign": "", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "showPassword": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input92823" }, { "key": 89788, "type": "radio", "icon": "radio-field", "formItemFlag": true, "options": { "name": "sex", "label": "性别", "labelAlign": "", "defaultValue": null, "columnWidth": "200px", "size": "", "displayStyle": "inline", "buttonStyle": true, "border": true, "labelWidth": null, "labelHidden": false, "disabled": false, "hidden": false, "optionItems": [{ "label": "男", "value": "0" }, { "label": "女", "value": "1" }, { "label": "保密", "value": "2" }], "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "onCreated": "", "onMounted": "", "onChange": "", "onValidate": "" }, "id": "radio16411" }, { "key": 102930, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "idcard", "label": "身份证号", "labelAlign": "", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "showPassword": false, "required": false, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input43767" }, { "key": 29783, "type": "textarea", "icon": "textarea-field", "formItemFlag": true, "options": { "name": "location", "label": "居住地址", "labelAlign": "", "rows": 3, "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "required": false, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "" }, "id": "textarea83181" }], "options": { "name": "gridCol44251", "hidden": false, "span": 16, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-44251" }, { "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 102977, "type": "picture-upload", "icon": "picture-upload-field", "formItemFlag": true, "options": { "name": "avator", "label": "头像", "labelAlign": "", "labelWidth": null, "labelHidden": false, "columnWidth": "", "disabled": false, "hidden": false, "required": false, "requiredHint": "", "customRule": "", "customRuleHint": "", "uploadURL": "http://127.0.0.1:6521/api/service/image/upload", "uploadTip": "", "withCredentials": false, "multipleSelect": false, "showFileList": true, "limit": 1, "fileMaxSize": 7, "fileTypes": ["jpg", "jpeg", "png"], "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "onCreated": "", "onMounted": "", "onBeforeUpload": "", "onUploadSuccess": "", "onUploadError": "", "onFileRemove": "", "onValidate": "" }, "id": "pictureupload104199" }], "options": { "name": "gridCol94566", "hidden": false, "span": 7, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-94566" }], "options": { "name": "grid110769", "hidden": false, "gutter": 12, "colHeight": null, "customClass": [] }, "id": "grid110769" }], "formConfig": { "modelName": "formData", "refName": "vForm", "rulesName": "rules", "labelWidth": 80, "labelPosition": "left", "size": "", "labelAlign": "label-left-align", "cssCode": ".el-table{\n  border: none;\n}", "customClass": [], "functions": "", "layoutType": "PC", "jsonVersion": 3, "onFormCreated": "", "onFormMounted": "", "onFormDataChange": "" } })
const formData = reactive({})
const optionData = reactive({})
const vFormRef = ref(null)

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

  fetch("http://127.0.0.1:6521/api/account/detail?id=" + id.value, requestOptions)
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
</script>

<style scoped>
.cardtitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cardtitle h2 {
  margin: 0;
}
</style>