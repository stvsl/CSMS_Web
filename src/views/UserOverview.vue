<template>
  <a-col :span="22" :offset="1">
    <a-row>
      <a-carousel
        :autoPlay="true"
        animation-name="card"
        show-arrow="never"
        indicator-position="outer"
        :style="{
          width: '100%',
          height: '240px',
        }"
        indicator-type="line"
      >
        <a-carousel-item v-for="idx in recentArctile" :style="{ width: '60%' }">
          <router-link :to="'/article/' + idx.Aid">
            <div class="container">
              <img :src="idx.Contentimg" />
              <div class="content">
                <h2>{{ idx.Title }}</h2>
                <span>{{ idx.Introduction }}</span>
              </div>
            </div>
          </router-link>
        </a-carousel-item>
      </a-carousel>
    </a-row>
    <a-row>
      <a-col :span="14" :offset="1">
        <a-card title="近期文章" :bordered="true" hoverable>
          <template #extra>
            <router-link to="/article/all">更多文章>></router-link>
          </template>
          <a-row>
            <a-col :span="24" v-for="idx in recentArctile">
              <UserArcicleCard :id="idx.Aid" />
              <a-divider />
            </a-col>
          </a-row>
        </a-card>
        <br />
      </a-col>
      <a-col :span="7" :offset="1">
        <a-row>
          <a-col>
            <a-card title="快捷服务" :bordered="true" hoverable>
              <a-space :size="10">
                <el-button
                  type="primary"
                  :icon="Edit"
                  color="#ff8e8f"
                  round
                  @click="
                    () => {
                      router.push('/user/info');
                    }
                  "
                >
                  信息完善
                </el-button>
                <el-button
                  type="primary"
                  :icon="Promotion"
                  color="#ffc94a"
                  round
                  @click="
                    () => {
                      router.push('/user/activity');
                    }
                  "
                >
                  活动中心
                </el-button>
                <el-button
                  type="primary"
                  :icon="Avatar"
                  color="#d9ed8f"
                  round
                  @click="
                    () => {
                      router.push('/user/fix');
                    }
                  "
                >
                  维修中心
                </el-button>
              </a-space>
              <a-divider />
              <a-space :size="10">
                <el-button
                  type="primary"
                  :icon="EditPen"
                  color="#aa4afa"
                  round
                  @click="
                    () => {
                      router.push('/3rduser/work');
                    }
                  "
                >
                  我的任务
                </el-button>
              </a-space>
            </a-card>
          </a-col>
        </a-row>
        <br />
        <a-row>
          <a-col>
            <a-card title="近期公告" :bordered="true" hoverable>
              <template #extra>
                <router-link to="/anounce/all">更多公告>></router-link>
              </template>
              <a-row>
                <a-col :span="24" v-for="i in recentAnounce">
                  <UserAnounceCard :id="i" />
                  <a-divider />
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-col>
</template>

<script lang="ts" setup>
import { Edit, Promotion, Avatar, EditPen } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import UserArcicleCard from "../usercomponents/UserArcicleCard.vue";
import UserAnounceCard from "../usercomponents/UserAnounceCard.vue";
import { ElMessage } from "element-plus";
const router = useRouter();

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

interface Anounce {
  Aid: number;
  Title: string;
  Introduction: string;
  Text: string;
  Writetime: string;
  Updatetime: string;
  Author: string;
  Pageviews: number;
  Status: number;
}

const recentArctile = ref<Article[]>([]);
const recentAnounce = ref<Anounce[]>([]);

onMounted(() => {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:6521/api/article/id/recent", requestOptions)
    .then((response) => response.text())
    .then((result) => (recentArctile.value = JSON.parse(result).data))
    .catch((error) => ElMessage.error("error", error));

  fetch("http://127.0.0.1:6521/api/anounce/id/recent", requestOptions)
    .then((response) => response.text())
    .then((result) => (recentAnounce.value = JSON.parse(result).data))
    .catch((error) => ElMessage.error("error", error));
});
</script>

<style scoped>
.arco-card {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.arco-card:hover {
  transform: translateY(-4px) scale(1.01);
}

.container {
  position: relative;
  width: 100%;
}

.container img {
  width: 100%;
  height: 100%;
  display: block;
}

.content {
  position: absolute;
  top: 40%;
  left: 0%;
  width: 100%;
  min-height: 100%;
  padding: 0 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}

.content h2 {
  line-height: 0.3;
  color: #fefefe;
  font-size: 2em;
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
}

.content span {
  color: #fefefe;
  font-size: 1.2em;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
}
</style>
