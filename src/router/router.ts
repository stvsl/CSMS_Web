import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
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
    path: "/admin/announcement",
    name: "adminanounce",
    component: () => import("../views/AdminAnounce.vue"),
  },
  {
    path: "/admin/content",
    name: "admincontent",
    component: () => import("../views/ContentEditor.vue"),
  },
  {
    path: "/admin/activity/create",
    name: "adminactivitycreate",
    component: () => import("../views/AdminActivityCreate.vue"),
  },
  {
    path: "/admin/activity/edit/:id",
    name: "adminactivityedit",
    component: () => import("../views/AdminActivityEdit.vue"),
  },
  {
    path: "/admin/activity/manage",
    name: "adminactivitymanage",
    component: () => import("../views/AdminActivityManage.vue"),
  },
  {
    path: "/admin/feed",
    name: "adminfeedmanage",
    component: () => import("../views/AdminFeedManage.vue"),
  },
  {
    path: "/admin/fix",
    name: "adminfixmanage",
    component: () => import("../views/AdminFixManage.vue"),
  },
  {
    path: "/admin/feedixprocess",
    name: "adminfeedixprocess",
    component: () => import("../views/AdminFeedixProcess.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
