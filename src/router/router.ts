import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "LoginView",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "RegisterView",
    component: () => import("../views/RegisterView.vue"),
  }, {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main.vue"),
  }
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
