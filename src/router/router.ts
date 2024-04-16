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
    component: () => import("../views/AdminOverview.vue"),
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
  {
    path: "/admin/account",
    name: "adminaccountmanage",
    component: () => import("../views/AdminUserAccount.vue"),
  },
  {
    path: "/admin/idinfo/:id",
    name: "adminidinfo",
    component: () => import("../views/AdminUserInfo.vue"),
  },
  {
    path: "/admin/idinfo",
    name: "adminidinfomanage",
    component: () => import("../views/AdminUserInfoList.vue"),
  },
  {
    path: "/admin/right",
    name: "adminaccountright",
    component: () => import("../views/AdminAccountRight.vue"),
  },
  {
    path: "/admin/setting",
    name: "adminsetting",
    component: () => import("../views/AdminSetting.vue"),
  },
  {
    path: "/",
    name: "overview",
    component: () => import("../views/UserOverview.vue"),
  },
  {
    path: "/article/all",
    name: "articleall",
    component: () => import("../views/UserArticleAll.vue"),
  },
  {
    path: "/anounce/all",
    name: "anounceall",
    component: () => import("../views/UserAnounceAll.vue"),
  },
  {
    path: "/user/activity",
    name: "useractivity",
    component: () => import("../views/UserActivicy.vue"),
  },
  {
    path: "/user/myactivity",
    name: "usermyactivity",
    component: () => import("../views/UserMyActivicy.vue"),
  },
  {
    path: "/article/:id",
    name: "article",
    component: () => import("../views/ArticleView.vue"),
  },
  {
    path: "/anounce/:id",
    name: "anounce",
    component: () => import("../views/AnounceView.vue"),
  },
  {
    path: "/user/info",
    name: "userinfo",
    component: () => import("../views/UserInfo.vue"),
  },
  {
    path: "/user/fix",
    name: "userfixcenter",
    component: () => import("../views/UserFixCenter.vue"),
  },
  {
    path: "/user/feed",
    name: "userfeedcenter",
    component: () => import("../views/UserFeedCenter.vue"),
  },
  {
    path: "/activity/:id",
    name: "activity",
    component: () => import("../views/ActivityView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
