<template>
  <a-list-item action-layout="vertical">
    <a-list-item-meta>
      <template #title>
        <a-typography-title :heading="6" style="margin-top: 0">问题编号：{{ feedix.ID }}</a-typography-title>
      </template>
      <template #description>
        <a-typography-paragraph>
          问题名称: {{ feedix.Name }}<br />
          问题描述: {{ feedix.Detail }}<br />
          处理记录：{{ feedix.Record == "" ? "无" : feedix.Record }}
        </a-typography-paragraph>
      </template>
    </a-list-item-meta>
    <template #actions>
      <a-divider />
      <a-steps v-if="feedix.Status == 0" :current="feedix.Process" :status="feedix.Process == 4 ? 'finish' : 'process'">
        <a-step title="已提交" />
        <a-step title="已采纳" />
        <a-step title="正在处理" />
        <a-step title="处理完成" />
      </a-steps>
      <a-steps v-else :current="2" status="error">
        <a-step title="已提交" />
        <a-step title="已关闭" />
      </a-steps>
    </template>
    <template #extra>
      <a-space direction="vertical" fill>
        <a-button v-if="feedix.Status == 0" type="primary" status="warning" @click="() => {
          record = feedix.Record
          visible = true;
        }">处理此问题</a-button>
        <a-button v-if="feedix.Status == 0 && feedix.Process == 3" type="primary" status="success"
          @click="handleUpdateProcess">已解决问题</a-button>
      </a-space>
    </template>
    <a-modal :visible="visible.valueOf()" title="问题处理记录" @cancel="visible = false"
      @before-ok="handleUpdateFeedixStatus">
      <a-textarea v-model="record" placeholder="请输入您的处理记录" :max-length="100" allow-clear show-word-limit
        :auto-size="{ minRows: 5, maxRows: 10 }" />
    </a-modal>
  </a-list-item>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

interface Feedix {
  ID: number;
  UID: number;
  Type: number;
  Name: string;
  Feedtime: string;
  Detail: string;
  Process: number;
  Status: number;
  Oid: number;
  Processor: string;
  Updatetime: string;
  Record: string;
}

const feedix = ref<Feedix>({
  ID: 0,
  UID: 0,
  Type: 0,
  Name: "loading...",
  Feedtime: "loading...",
  Detail: "loading...",
  Process: 0,
  Status: 0,
  Oid: 0,
  Processor: "loading...",
  Updatetime: "loading...",
  Record: "loading...",
});

const visible = ref(false);

const record = ref("");

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:6521/api/fix/details?id=" + props.id, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      feedix.value = JSON.parse(result).data;
    })
    .catch((error) => ElMessage("error", error));
});

const handleUpdateFeedixStatus = (done) => {
  let raw = feedix.value
  raw.Record = record.value
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/fix/update", requestOptions)
    .then(response => response.text())
    .then(result => {
      if (JSON.parse(result).code != 200) {
        ElMessage.error("处理失败");
        done();
        return;
      } else {
        ElMessage.success("处理成功");
        feedix.value.Record = record.value;
        done();
      }
      visible.value = false;
    })
    .catch(error => ElMessage.error(error));
};

const handleUpdateProcess = () => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/feed/process?id=" + props.id + "&status=4", requestOptions)
    .then(response => response.text())
    .then(result => ElMessage.success("处理成功"))
    .catch(error => ElMessage.error('error', error));
};
</script>
