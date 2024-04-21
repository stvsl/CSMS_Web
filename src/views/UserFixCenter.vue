<template>
  <a-col :offset="3" :span="20">
    <a-row>
      <a-col :span="20">
        <a-page-header title="维修中心" @back="() => {
          router.back();
        }">
        </a-page-header>
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :span="22" :offset="0">
        <a-card title="统计数据">
          <a-row>
            <a-col :flex="1">
              <a-statistic title="总反馈数" :value="overdata.TotalFeedbacks" :value-from="0" :start="true" animation>
              </a-statistic>
            </a-col>
            <a-col :flex="1">
              <a-statistic title="已处理" :value="overdata.TotalProcessed" :value-from="0" :start="true" animation>
              </a-statistic>
            </a-col>
            <a-col :flex="1">
              <a-statistic title="处理中" :value="overdata.TotalPending" :value-from="0" :start="true" animation>
              </a-statistic>
            </a-col>
            <a-col :flex="1">
              <a-statistic title="处理完成率" :value="overdata.CompletionRate * 100" :value-from="0" :start="true" animation>
                <template #suffeed>%</template>
              </a-statistic>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :span="14" :offset="0">
        <a-card title="维修事件">
          <template #extra>
            <el-col :span="4">
              <el-pagination :page-size="4" background layout="prev, pager, next, jumper" :total="count" @change="(currentPage) => {
                page.value = currentPage;
                handleFetchFix();
              }" />
            </el-col>
          </template>
          <a-col :flex="1">
            <a-row v-for="i in datas">
              <UserFixCard :id="i.valueOf()" />
              <a-divider v-if="i !== 10" />
            </a-row>
          </a-col>
        </a-card>
      </a-col>
      <a-col :span="7" :offset="1">
        <a-card title="操作中心">
          <a-space direction="vertical" size="medium">
            <a-button-group v-if="false">
              <a-select v-model:input-value="searchType" :style="{ width: '200px' }" placeholder="筛选">
                <a-option value="0">全部</a-option>
                <a-option value="1">未处理</a-option>
                <a-option value="2">已处理</a-option>
                <a-option value="3">处理中</a-option>
                <a-option value="4">已关闭</a-option>
              </a-select>
              &nbsp;
              <a-button @click="() => { }">
                查询
              </a-button>
            </a-button-group>
            <a-button-group v-if="false">
              <a-input :style="{ width: '200px' }" placeholder="请输入搜索关键字" v-model="searchKeyword" allow-clear />
              &nbsp;
              <a-button @click="() => { }">
                查询
              </a-button>
            </a-button-group>
            <a-button-group>
              <a-button type="primary" status="success" @click="() => {
                router.go(0);
              }">
                刷新
              </a-button> &nbsp;
              <a-button type="primary" @click="handleClick">
                创建新维修事件
              </a-button>
            </a-button-group>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
    <br>
  </a-col>
  <a-modal v-model:visible="visible" :width="600" title="创建维修事件" @cancel="handleCancel" @before-ok="handleBeforeOk"
    :simple="true">
    <a-col :flex="1">
      <div style="width: 99%;">
        <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
        </v-form-render>
      </div>
    </a-col>
  </a-modal>
</template>

<script lang="ts" setup>
import UserFixCard from "../usercomponents/UserFixCard.vue";
import { useRouter } from "vue-router";
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import useUserStore from "../stores/modules/user"
const userStore = useUserStore()

const formJson = reactive({ "widgetList": [{ "key": 27227, "type": "grid", "category": "container", "icon": "grid", "cols": [{ "type": "grid-col", "category": "container", "icon": "grid-col", "internal": true, "widgetList": [{ "key": 29509, "type": "input", "icon": "text-field", "formItemFlag": true, "options": { "name": "name", "label": "维修名称", "labelAlign": "", "type": "text", "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "clearable": true, "showPassword": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "prefixIcon": "", "suffixIcon": "", "appendButton": false, "appendButtonDisabled": false, "buttonIcon": "custom-search", "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "", "onAppendButtonClick": "" }, "id": "input103459" }, { "key": 101041, "type": "textarea", "icon": "textarea-field", "formItemFlag": true, "options": { "name": "detail", "label": "维修内容", "labelAlign": "", "rows": 5, "defaultValue": "", "placeholder": "", "columnWidth": "200px", "size": "", "labelWidth": null, "labelHidden": false, "readonly": false, "disabled": false, "hidden": false, "required": true, "requiredHint": "", "validation": "", "validationHint": "", "customClass": [], "labelIconClass": null, "labelIconPosition": "rear", "labelTooltip": null, "minLength": null, "maxLength": null, "showWordLimit": false, "onCreated": "", "onMounted": "", "onInput": "", "onChange": "", "onFocus": "", "onBlur": "", "onValidate": "" }, "id": "textarea48524" }], "options": { "name": "gridCol106814", "hidden": false, "span": 24, "offset": 0, "push": 0, "pull": 0, "responsive": false, "md": 12, "sm": 12, "xs": 12, "customClass": [] }, "id": "grid-col-106814" }], "options": { "name": "grid46841", "hidden": false, "gutter": 12, "colHeight": null, "customClass": "" }, "id": "grid46841" }], "formConfig": { "modelName": "formData", "refName": "vForm", "rulesName": "rules", "labelWidth": 80, "labelPosition": "left", "size": "", "labelAlign": "label-left-align", "cssCode": ".el-table{\n  border: none;\n}", "customClass": [], "functions": "", "layoutType": "PC", "jsonVersion": 3, "onFormCreated": "", "onFormMounted": "", "onFormDataChange": "" } })
const formData = reactive({})
const optionData = reactive({})
const vFormRef = ref(null)

const router = useRouter();

const visible = ref(false);

const count = ref(0);
const page = ref(1);
const searchType = ref();
const searchKeyword = ref("");

const handleClick = () => {
  visible.value = true;
};

const handleBeforeOk = (done) => {
  vFormRef.value.getFormData().then(formData => {
    formData.id = userStore.ID;
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(formData),
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:6521/api/fix/upload", requestOptions)
      .then(response => response.text())
      .then(result => {
        if (JSON.parse(result).code == 200) {
          ElMessage.success("创建成功")
          visible.value = false;
          router.go(0);
        } else {
          ElMessage.error("创建失败")
        }
      })
      .catch(error => console.log('error', error));
  }).catch(error => {
    ElMessage.error(error)
  })
};

const handleCancel = () => {
  visible.value = false;
}

interface OverData {
  CompletionRate: number;
  InProgress: number;
  TotalFeedbacks: number;
  TotalPending: number;
  TotalProcessed: number;
  TotalRepairs: number;
}

const overdata = ref < OverData > ({});
onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/fix/user/count?id=" + userStore.ID, requestOptions)
    .then(response => response.text())
    .then(result => count.value = JSON.parse(result).data)
    .catch(error => console.log('error', error));
  handleFetchFix(1);
  fetch("http://127.0.0.1:6521/api/fix/user/overview?id=" + userStore.ID, requestOptions)
    .then(response => response.text())
    .then(result => overdata.value = JSON.parse(result).data)
    .catch(error => console.log('error', error));
});

const datas = ref < number[] > ([])

const handleFetchFix = () => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/fix/user/id/list?id=" + userStore.ID + "&page=" + page.value, requestOptions)
    .then(response => response.text())
    .then(result => datas.value = JSON.parse(result).data)
    .catch(error => console.log('error', error));
}
</script>
