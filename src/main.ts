import { createApp } from "vue";
import VueECharts from "vue-echarts";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import router from "./router/router.ts";
import pinia from "./stores/index.ts";
import ElementPlus from "element-plus";
import VForm3 from "vform3-builds";
import "./style.css";
import "element-plus/dist/index.css";
import "vform3-builds/dist/designer.style.css";
import "@arco-design/web-vue/dist/arco.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
const app = createApp(App)
  .component("v-chart", VueECharts)
  .use(router)
  .use(ElementPlus)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(VForm3)
  .use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
