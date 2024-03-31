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
  },
  {
    path: "/admin/overview",
    name: "adminoverview",
    component: () => import("../views/OverviewView.vue"),
  },
  {
    path: "/admin/article",
    name: "adminarticle",
    component: () => import("../views/AdminArticle.vue"),
  },
  {
    path: "/admin/content",
    name: "admincontent",
    component: () => import("../views/ContentEditor.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
