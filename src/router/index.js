import { createRouter, createWebHistory } from "vue-router";
import ManageSession from "@/pages/ManageSessionPage.vue";
import Blueprint from "@/pages/BlueprintOverviewPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/manage",
  },
  {
    path: "/manage",
    name: "manage",
    component: ManageSession,
  },
  {
    path: "/blueprint",
    name: "blueprint",
    component: Blueprint,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
