import { createApp } from "vue";
import VueECharts from "vue-echarts";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import router from "./router/router.ts";
import ElementPlus from "element-plus";
import VForm3 from "vform3-builds";
import "./style.css";
import "element-plus/dist/index.css";
import "vform3-builds/dist/designer.style.css";
import "@arco-design/web-vue/dist/arco.css";
import App from "./App.vue";

createApp(App)
  .component("v-chart", VueECharts)
  .use(router)
  .use(ElementPlus)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(VForm3)
  .mount("#app");
