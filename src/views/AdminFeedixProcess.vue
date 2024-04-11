<template>
  <el-col>
    <el-row>
      <el-col :offset="1">
        <a-page-header title="进度跟进" subtitle="跟进反馈和报修进度" :show-back="false">
          <template #breadcrumb>
            <a-breadcrumb>
              <a-breadcrumb-item>反馈与报修</a-breadcrumb-item>
              <a-breadcrumb-item>进度跟进</a-breadcrumb-item>
            </a-breadcrumb>
          </template>
        </a-page-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="15" :offset="2">
        <a-card>
          <div class="cardtitle">
            <h2>反馈情况统计</h2>
            <router-link to="/admin/feed">
              <a-button type="primary" icon="plus">转到反馈</a-button>
            </router-link>
          </div>
          <a-divider />
          <a-row>
            <a-col :flex="1">
              <a-statistic title="反馈总数" :value="125670" show-group-separator>
              </a-statistic>
            </a-col>
            <a-col :flex="1">
              <a-statistic title="累计已处理" :value="5012" :precision="2" :value-style="{ color: '#0fbf60' }">
              </a-statistic>
            </a-col>
            <a-col :flex="1">
              <a-statistic title="未处理" :value="5010" :precision="2" :value-style="{ color: '#f5222d' }">
              </a-statistic>
            </a-col>
          </a-row>
          <br>
          <a-row>
            <a-col :flex="1">
              <a-statistic title="进行中" :value="1256" show-group-separator>
              </a-statistic>
            </a-col>
            <a-col :flex="2">
              <a-statistic title="处理完成率" :value="12.56" show-group-separator>
                <template #suffix>%</template>
              </a-statistic>
            </a-col>
          </a-row>
        </a-card>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="15" :offset="2">
        <a-card>
          <div class="cardtitle">
            <h2>维修情况统计</h2>
            <router-link to="/admin/fix">
              <a-button type="primary" icon="plus">转到维修</a-button>
            </router-link>
          </div>
          <a-divider />
          <a-row>
            <a-col :flex="1">
              <a-statistic title="维修总数" :value="125670" show-group-separator>
              </a-statistic>
            </a-col>
            <a-col :flex="1">
              <a-statistic title="累计已处理" :value="5012" :precision="2" :value-style="{ color: '#0fbf60' }">
              </a-statistic>
            </a-col>
            <a-col :flex="1">
              <a-statistic title="未处理" :value="5010" :precision="2" :value-style="{ color: '#f5222d' }">
              </a-statistic>
            </a-col>
          </a-row>
          <br>
          <a-row>
            <a-col :flex="1">
              <a-statistic title="进行中" :value="1256" show-group-separator>
              </a-statistic>
            </a-col>
            <a-col :flex="2">
              <a-statistic title="处理完成率" :value="12.56" show-group-separator>
                <template #suffix>%</template>
              </a-statistic>
            </a-col>
          </a-row>
        </a-card>
      </el-col>
    </el-row>
  </el-col>
</template>

<script lang="ts" setup>
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