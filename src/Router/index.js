import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/home",
    redirect: "/",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to handle authentication flow
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If user is not logged in and trying to access home, redirect to signup
  if (!user && to.path === "/") {
    next("/signup");
  }
  // If user exists but not logged in (no currentUser in session), redirect to login
  else if (user && !sessionStorage.getItem("currentUser") && to.path === "/") {
    next("/login");
  }
  // Allow navigation to login/signup pages
  else if (to.path === "/login" || to.path === "/signup") {
    next();
  }
  // Allow other navigation
  else {
    next();
  }
});

export default router;
