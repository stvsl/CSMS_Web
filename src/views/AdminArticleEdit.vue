<template>
    <el-col>
        <el-row>
            <el-col :offset="1">
                <a-page-header title="内容编辑" subtitle="编辑文章" :show-back="true" @back="() => {
                    router.back();
                }">
                    <template #breadcrumb>
                        <a-breadcrumb>
                            <a-breadcrumb-item>内容管理</a-breadcrumb-item>
                            <a-breadcrumb-item>文章管理</a-breadcrumb-item>
                            <a-breadcrumb-item>内容编辑</a-breadcrumb-item>
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
                    </el-icon><span>&nbsp;保存更改</span></el-button>
                <el-button v-if="article.Status == 1" type="danger" @click="handleMakeVisible(false)"><el-icon>
                        <CircleClose />
                    </el-icon><span>&nbsp;关闭此文章访问</span></el-button>
                <el-button v-if="article.Status == 0" type="success" @click="handleMakeVisible(true)"><el-icon>
                        <CircleCheck />
                    </el-icon><span>&nbsp;重新打开此文章访问</span></el-button>
                <p />
                <a-space>
                    <el-text class="mx-1">尊重他人： 社区是一个多样性和包容性的空间。请尊重他人的观点、观念和创作，避免使用攻击性、冒犯性或歧视性的言论。</el-text>
                </a-space>
                <a-space>
                    <el-text class="mx-1">原创内容： 我们鼓励原创内容的发布，但同时也欢迎转发和分享他人的作品，前提是获得了相应的授权和许可。</el-text>
                </a-space>
                <a-space>
                    <el-text class="mx-1">质量和准确性： 请确保你的作品具有良好的质量和准确的信息。使用可靠的来源和数据来支持你的观点，并注意拼写和语法错误。</el-text>
                </a-space>
                <a-space>
                    <el-text class="mx-1">文明交流： 社区是一个互相学习和交流的场所。请以文明、友善和建设性的态度参与讨论，并尊重他人的意见和建议。</el-text>
                </a-space>
                <a-space>
                    <el-text class="mx-1"> 合适的内容： 请确保你的作品符合社区的主题和定位。避免发布与社区无关的内容，如广告、垃圾信息等。</el-text>
                </a-space>
                <a-space>
                    <el-text class="mx-1"> 审查和监管： 我们会对社区的内容进行审查和监管，以确保社区的秩序和安全。违反社区规定的行为将受到处理和制裁。</el-text>
                </a-space>
                <a-space>
                    <el-text class="mx-1">反馈和建议： 我们欢迎你提供反馈和建议，帮助我们改进社区的运营和管理。请随时与我们联系，分享你的想法和意见。</el-text>
                </a-space>
                <a-space>
                    <el-text class="mx-1">享受创作： 创作是一种乐趣和享受。请尽情地展示你的创意和想法，与社区的其他成员分享你的作品和经验。</el-text>
                </a-space>
                <div style="height: 50px">
                </div>
            </el-col>
        </el-row>
    </el-col>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, shallowRef, onMounted, reactive } from 'vue'
import { ElMessage, MessageParamsWithType } from 'element-plus'
import { Upload, CircleCheck, CircleClose } from '@element-plus/icons-vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import useUserStore from "../stores/modules/user"
import '@wangeditor/editor/dist/css/style.css'
import { useRouter } from 'vue-router'
const router = useRouter();
const formJson = reactive({ "widgetList": [{ "key": 49902, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 13442, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "title", "label": "标题", "labelAlign": "", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "showPassword": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input114453" }, { "key": 98780, "type": "textarea", "icon": "textarea-field", "formItemFlag": true, "options": { "name": "introduction", "label": "简介", "labelAlign": "", "rows": 3, "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "" }, "id": "textarea112791" }], "options": { "name": "gridCol51335", "hidden": false, "span": 24, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-51335" }], "options": { "name": "grid80978", "hidden": false, "gutter": 12, "colHeight": null, "customClass": [] }, "id": "grid80978" }, { "key": 31531, "type": "divider", "icon": "divider", "formItemFlag": false, "options": { "name": "divider52412", "label": "封面与背景", "columnWidth": "200px", "direction": "horizontal", "contentPosition": "center", "hidden": false, "customClass": "", "onCreated": "", "onMounted": "" }, "id": "divider52412" }, { "key": 82848, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 102345, "type": "picture-upload", "icon": "picture-upload-field", "formItemFlag": true, "options": { "name": "coverimage", "label": "文章封面", "labelAlign": "", "labelWidth": null, "labelHidden": false, "columnWidth": "200px", "disabled": false, "hidden": false, "required": true, "requiredHint": "", "customRule": "", "customRuleHint": "", "uploadURL": "http://127.0.0.1:6521/api/service/image/upload", "uploadTip": "", "withCredentials": false, "multipleSelect": false, "showFileList": true, "limit": 1, "fileMaxSize": 5, "fileTypes": ["jpg", "jpeg", "png"], "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "onCreated": "", "onMounted": "", "onBeforeUpload": "", "onUploadSuccess": "return {\n      name: file.name, // 使用上传文件的名称作为文件名\n      url: result.url   // 使用服务器返回的图片或文件URL\n    };", "onUploadError": "", "onFileRemove": "", "onValidate": "" }, "id": "pictureupload88570" }], "options": { "name": "gridCol28015", "hidden": false, "span": 8, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-28015" }, { "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 102345, "type": "picture-upload", "icon": "picture-upload-field", "formItemFlag": true, "options": { "name": "contentimage", "label": "内容大图", "labelAlign": "", "labelWidth": null, "labelHidden": false, "columnWidth": "400px", "disabled": false, "hidden": false, "required": true, "requiredHint": "", "customRule": "", "customRuleHint": "", "uploadURL": "http://127.0.0.1:6521/api/service/image/upload", "uploadTip": "", "withCredentials": false, "multipleSelect": false, "showFileList": true, "limit": 1, "fileMaxSize": 5, "fileTypes": ["jpg", "jpeg", "png"], "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "onCreated": "", "onMounted": "", "onBeforeUpload": "", "onUploadSuccess": "return {\n      name: file.name, // 使用上传文件的名称作为文件名\n      url: result.url   // 使用服务器返回的图片或文件URL\n    };", "onUploadError": "", "onFileRemove": "", "onValidate": "" }, "id": "pictureupload34743" }], "options": { "name": "gridCol68574", "hidden": false, "span": 9, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-68574" }], "options": { "name": "grid20445", "hidden": false, "gutter": 12, "colHeight": null, "customClass": [] }, "id": "grid20445" }, { "key": 67717, "type": "divider", "icon": "divider", "formItemFlag": false, "options": { "name": "divider81891", "label": "正文内容", "columnWidth": "200px", "direction": "horizontal", "contentPosition": "center", "hidden": false, "customClass": "", "onCreated": "", "onMounted": "" }, "id": "divider81891" }], "formConfig": { "modelName": "formData", "refName": "vForm", "rulesName": "rules", "labelWidth": 80, "labelPosition": "left", "size": "", "labelAlign": "label-left-align", "cssCode": "", "customClass": [], "functions": "", "layoutType": "PC", "jsonVersion": 3, "onFormCreated": "", "onFormMounted": "", "onFormDataChange": "" } })
const formData = reactive({})
const optionData = reactive({})
const vFormRef = ref(null)
const userStore = useUserStore()
const editorRef = shallowRef()
const aid = ref(router.currentRoute.value.params.id);

interface FormArticle {
    title: string;
    introduction: string;
    coverimage: {
        name: string;
        url: string;
    }[];
    contentimage: {
        name: string;
        url: string;
    }[];
    content: string;
}

interface Article {
    Aid: number;
    Coverimg: string;
    Contentimg: string;
    Title: string;
    Introduction: string;
    Text: string;
    Writetime: string;
    Updatetime: string;
    Author: string;
    Pageviews: number;
    Status: number;
}

const article = ref<Article>({
    Aid: 0,
    Coverimg: "",
    Contentimg: "",
    Title: "loading...",
    Introduction: "loading...",
    Text: "",
    Writetime: "",
    Updatetime: "",
    Author: "",
    Pageviews: 0,
    Status: 0,
});
onMounted(() => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/article/details?id=" + aid.value, requestOptions)
        .then(response => response.text())
        .then(result => {
            article.value = JSON.parse(result).data;
            const formarticle = <FormArticle>{
                title: article.value.Title,
                introduction: article.value.Introduction,
                coverimage: [{
                    name: article.value.Coverimg,
                    url: article.value.Coverimg
                }],
                contentimage: [{
                    name: article.value.Contentimg,
                    url: article.value.Contentimg
                }],
                content: article.value.Text
            };
            vFormRef.value.setFormData(formarticle);
            valueHtml.value = article.value.Text;
        })
        .catch(error => console.log('error', error));
})

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig = {
    excludeKeys: ['uploadVideo'],
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

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

const handleMakeVisible = (status: boolean) => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "aid": aid.value,
        "status": status ? 1 : 0
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/article/visible", requestOptions)
        .then(response => response.text())
        .then(result => {
            if (JSON.parse(result).code == 200) {
                ElMessage.success('修改成功');
                router.go(0);
            } else {
                ElMessage.error('修改失败，请检查网络');
            }
        })
        .catch(error => ElMessage.warning('error', error));
}

const handleArticleSubmit = (formData: any) => {
    // Form Validation OK
    var raw = JSON.stringify({
        'aid': aid.value,
        'data': formData, 'content': valueHtml.value, 'anchor': userStore.Name
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

    fetch("http://127.0.0.1:6521/api/article/update", requestOptions)
        .then(response => response.text())
        .then(result => {
            const res = JSON.parse(result)
            if (res.code == 200) {
                ElMessage.success('提交成功')
                router.push(
                    {
                        path: '/admin/article'
                    }
                )
            } else {
                ElMessage.error('提交失败,请检查网络')
            }
        })
        .then(result => console.log(result))
        .catch(error => ElMessage.error("网络错误", error));
}

const submitForm = () => {
    if (!vFormRef.value) {
        return
    }
    vFormRef.value.getFormData().then((formData: any) => {
        handleArticleSubmit(formData);
    }).catch((error: MessageParamsWithType) => {
        ElMessage.error(error)
    })
}
</script>