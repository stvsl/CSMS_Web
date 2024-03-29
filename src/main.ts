import { createApp } from "vue";
import VueECharts from "vue-echarts";
import router from "./router/router.ts";
import ElementPlus from "element-plus";
import VForm3 from "vform3-builds";
import "./style.css";
import "element-plus/dist/index.css";
import "vform3-builds/dist/designer.style.css";
import App from "./App.vue";

createApp(App)
  .component("v-chart", VueECharts)
  .use(router)
  .use(ElementPlus)
  .use(VForm3)
  .mount("#app");
