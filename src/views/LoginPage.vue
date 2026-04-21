<template>
  <main class="bg-gray-50 py-16">
    <div class="max-w-md mx-auto bg-white p-8 rounded-xl shadow border">
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Login</h2>
      <p class="text-gray-500 mb-6">Welcome back 👋</p>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div>
          <label class="text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm text-gray-600">Password</label>

          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none pr-10"
            />

            <img
              :src="showPassword ? eyeOpen : eyeClosed"
              @click="togglePassword"
              class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
            />
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
        >
          Login
        </button>
      </form>

      <p class="text-sm text-gray-500 mt-6 text-center">
        Don’t have an account?
        <a href="/signup" class="text-orange-500">Sign Up</a>
      </p>
    </div>
  </main>
</template>

<script setup>
import eyeOpen from "../assets/images/eye open.jpg";
import eyeClosed from "../assets/images/eye closed.jpg";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const email = ref("");
const password = ref("");
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    return Swal.fire(
      "No Account",
      "Please sign up first before logging in.",
      "warning",
    );
  }

  if (!email.value || !password.value) {
    return Swal.fire("Missing Fields", "Please fill in all fields", "info");
  }

  if (
    email.value === savedUser.email &&
    password.value === savedUser.password
  ) {
    // Save current user session
    sessionStorage.setItem("currentUser", JSON.stringify(savedUser));
    window.dispatchEvent(new Event("userLoggedIn"));

    Swal.fire({
      title: "Welcome back 🎉",
      text: `Hello ${savedUser.name}`,
      icon: "success",
    }).then(() => {
      // Redirect to home page after successful login
      router.push("/home");
    });
  } else {
    Swal.fire("Login Failed", "Incorrect email or password", "error");
  }
};
</script>
