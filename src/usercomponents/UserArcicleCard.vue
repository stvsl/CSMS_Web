<template>
  <a-list-item @click="goDetail" class="list-demo-item" action-layout="vertical">
    <template #actions>
      <span><icon-user />&nbsp;用户名</span>
      <span><icon-eye />&nbsp;111</span>
      <span>时间：XXXX</span>
    </template>
    <a-list-item-meta title="大师的dffgsfsdfdgd阿森松岛代入感vgxferrt"
      description="gsfgtwefswg士大夫二二萨尔燃灯佛而突然大幅缩短如果sder分隔符efwtq4二渗透压二人wrs反而更为恩爱">
      <template #avatar>
        <a-image width="100"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp" />
      </template>
    </a-list-item-meta>
  </a-list-item>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goDetail = () => {
  router.push({
    path: '/article/' + 1,
  });
};

</script>