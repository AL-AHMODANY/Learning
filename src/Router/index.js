import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "SignUp",
    component: SignUp, // ✅ first page
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐 Auth guard
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // if not logged in and trying to access home → force signup
  if (to.path === "/home" && !user) {
    next("/");
  } else {
    next();
  }
});

export default router;