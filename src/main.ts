import { createApp } from "vue";
import router from "./router/router.ts";
import ElementPlus from "element-plus";
import "./style.css";
import "element-plus/dist/index.css";
import App from "./App.vue";

createApp(App).use(router).use(ElementPlus).mount("#app");
