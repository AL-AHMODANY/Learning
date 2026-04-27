import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "SignUpPage",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// Navigation guard to handle authentication flow
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If trying to access home without being logged in, redirect to signup
  if (to.path === "/home" && !user) {
    next("/signup");
  } else {
    next();
  }
});

export default router;
