<template>
  <main class="bg-gray-50 py-16">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
      <!-- LEFT: TESTIMONIAL -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Students Testimonials
        </h2>
        <p class="text-gray-500 mb-8">
          Hear what our students have to say about their learning experience.
        </p>

        <div class="bg-white p-6 rounded-xl shadow-sm border">
          <p class="text-gray-600 mb-6">
            The web design course provided a solid foundation for me. The
            instructors were knowledgeable and supportive, and the learning
            environment was engaging.
          </p>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img
                src="../assets/images/sarah.png"
                class="w-10 h-10 rounded-full object-cover"
              />
              <span class="text-sm font-medium text-gray-700">Sarah L</span>
            </div>

            <button
              @click="showTestimonial"
              class="text-sm px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT: SIGNUP FORM -->
      <div class="bg-white p-8 rounded-xl shadow-sm border">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Sign Up</h2>
        <p class="text-gray-500 mb-6">
          Create an account to unlock exclusive features.
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- NAME -->
          <div>
            <label class="text-sm text-gray-600">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter your name"
              class="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <!-- EMAIL -->
          <div>
            <label class="text-sm text-gray-600">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              class="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <!-- PASSWORD -->
          <div>
            <label class="text-sm text-gray-600">Password</label>

            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="Enter your password"
                class="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none pr-10"
              />

              <!-- Eye Toggle -->
              <img
                :src="showPassword ? eyeOpen : eyeClosed"
                @click="togglePassword"
                class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
              />
            </div>
          </div>

          <!-- TERMS -->
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="form.agree" />
            <label class="text-sm text-gray-600">
              I agree to Terms & Privacy Policy
            </label>
          </div>

          <!-- SUBMIT -->
          <button
            type="submit"
            class="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>

        <!-- DIVIDER -->
        <div class="flex items-center my-6">
          <div class="flex-1 h-px bg-gray-200"></div>
          <span class="px-3 text-gray-400 text-sm">OR</span>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>

        <!-- GOOGLE -->
        <button
          @click="handleGoogleSignup"
          class="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <span class="text-lg font-bold">G</span>
          Sign Up with Google
        </button>

        <!-- LOGIN -->
        <p class="text-sm text-gray-500 mt-6 text-center">
          Already have an account?
          <a href="/login" class="text-orange-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import eyeOpen from "../assets/images/eye open.jpg";
import eyeClosed from "../assets/images/eye closed.jpg";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";

/* ---------------------------
   FORM STATE
----------------------------*/
const form = reactive({
  name: "",
  email: "",
  password: "",
  agree: false,
});

const showPassword = ref(false);

/* ---------------------------
   TOGGLE PASSWORD
----------------------------*/
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

/* ---------------------------
   VALIDATION FUNCTION
----------------------------*/
const validateForm = () => {
  if (!form.name.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Missing Name",
      text: "Please enter your full name",
    });
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    return false;
  }

  if (form.password.length < 6) {
    Swal.fire({
      icon: "info",
      title: "Weak Password",
      text: "Password must be at least 6 characters",
    });
    return false;
  }

  if (!form.agree) {
    Swal.fire({
      icon: "question",
      title: "Terms Required",
      text: "You must accept Terms & Privacy Policy",
    });
    return false;
  }

  return true;
};

/* ---------------------------
   SIGNUP HANDLER
----------------------------*/
const handleSubmit = () => {
  if (!validateForm()) return;

  // Check existing user
  const existingUser = JSON.parse(localStorage.getItem("user"));

  if (existingUser && existingUser.email === form.email) {
    return Swal.fire({
      icon: "warning",
      title: "Account Exists",
      text: "This email is already registered. Please login.",
    });
  }

  // Loading state
  Swal.fire({
    title: "Creating Account...",
    text: "Please wait",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  setTimeout(() => {
    const user = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    Swal.fire({
      icon: "success",
      title: "Success 🎉",
      text: "Account created successfully! You can now login.",
    }).then(() => {
      // Redirect to login page after successful signup
      window.location.href = "/login";
    });

    form.name = "";
    form.email = "";
    form.password = "";
    form.agree = false;
  }, 1200);
};

/* ---------------------------
   GOOGLE SIGNUP
----------------------------*/
const handleGoogleSignup = () => {
  Swal.fire({
    icon: "info",
    title: "Google Signup",
    text: "Google authentication will be added soon 🚀",
  });
};

/* ---------------------------
   TESTIMONIAL POPUP
----------------------------*/
const showTestimonial = () => {
  Swal.fire({
    icon: "info",
    title: "Student Review",
    text: "This course completely changed my career path and improved my skills massively.",
  });
};
</script>
