<template>
  <a-list-item @click="goDetail" class="list-demo-item" action-layout="vertical">
    <template #actions>
      <span><icon-user />&nbsp;{{ article.Author }}</span>
      <span><icon-eye />&nbsp;{{ article.Pageviews }}</span>
      <span>时间：{{ formatDate(article.Updatetime) }}</span>
    </template>
    <a-list-item-meta :title="article.Title" :description="article.Introduction">
      <template #avatar>
        <a-image width="100" :src="article.Coverimg" />
      </template>
    </a-list-item-meta>
  </a-list-item>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();

const goDetail = () => {
  router.push({
    path: '/article/' + article.value.Aid,
  });
};

const props = defineProps({
  id: {
    type: Number,
    default: false,
  },
});

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

const formatDate = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}年${month}月${day}日${hour}:${minute}`;
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

  fetch("http://127.0.0.1:6521/api/article/details?id=" + props.id, requestOptions)
    .then(response => response.text())
    .then(result => {
      article.value = JSON.parse(result).data;
      console.log(article.value);
    }
    )
    .catch(error => console.log('error', error));
})

</script>