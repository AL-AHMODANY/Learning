<template>
  <header class="w-full">
    <!-- Top Banner -->
    <div
      class="bg-brand m-2 text-white text-xs md:text-sm text-center py-2 px-3 rounded-lg"
    >
      Free Courses ✨ Sale Ends Soon, Get It Now →
    </div>

    <!-- Navbar -->
    <nav class="bg-white border-b">
      <div
        class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"
      >
        <!-- Left: Logo -->
        <img
          src="../../assets/images/image.png"
          alt="Logo"
          class="w-9 h-9 object-contain"
        />

        <!-- Desktop Nav -->
        <ul class="hidden lg:flex items-center gap-6 text-sm text-gray-800">
          <li>
            <router-link
              to="/"
              class="bg-gray-100 px-4 py-2 rounded-md font-medium"
            >
              Home
            </router-link>
          </li>
          <li><a href="#courses" class="hover:text-orange-500">Courses</a></li>
          <li><a href="#about" class="hover:text-orange-500">About Us</a></li>
          <li><a href="#pricing" class="hover:text-orange-500">Pricing</a></li>
          <li><a href="#contact" class="hover:text-orange-500">Contact</a></li>
        </ul>

        <!-- Right -->
        <div class="flex items-center gap-3">
          <!-- Desktop Auth -->
          <div class="hidden lg:flex items-center gap-4">
            <template v-if="currentUser">
              <div class="flex items-center gap-3">
                <!-- Avatar -->
                <div
                  class="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm"
                >
                  {{ initials }}
                </div>

                <!-- Name + Email -->
                <div class="hidden sm:block leading-tight">
                  <p class="text-sm font-semibold text-gray-800">
                    {{ currentUser.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ currentUser.email }}
                  </p>
                </div>

                <!-- Logout -->
                <button
                  @click="handleLogout"
                  class="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-sm"
                >
                  Logout
                </button>
              </div>
            </template>

            <template v-else>
              <router-link
                to="/signup"
                class="text-sm text-gray-700 hover:text-orange-500"
              >
                Sign Up
              </router-link>
              <router-link
                to="/login"
                class="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium"
              >
                Login
              </router-link>
            </template>
          </div>

          <!-- Mobile Right -->
          <div class="flex items-center gap-2 lg:hidden">
            <!-- User -->
            <div
              v-if="currentUser"
              class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-semibold"
            >
              {{ initials }}
            </div>

            <!-- Toggle -->
            <button
              @click="toggleMenu"
              class="relative w-8 h-8 flex items-center justify-center"
            >
              <span
                class="absolute h-0.5 w-6 bg-gray-800 transition-all duration-300"
                :class="isOpen ? 'rotate-45' : '-translate-y-2'"
              ></span>
              <span
                class="absolute h-0.5 w-6 bg-gray-800 transition-all duration-300"
                :class="isOpen ? 'opacity-0' : 'opacity-100'"
              ></span>
              <span
                class="absolute h-0.5 w-6 bg-gray-800 transition-all duration-300"
                :class="isOpen ? '-rotate-45' : 'translate-y-2'"
              ></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="fade">
        <div v-if="isOpen" class="lg:hidden px-4 pb-5">
          <ul class="flex flex-col gap-4 text-gray-800 text-base mb-5">
            <li><a class="font-medium">Home</a></li>
            <li><a>Courses</a></li>
            <li><a>About Us</a></li>
            <li><a>Pricing</a></li>
            <li><a>Contact</a></li>
          </ul>

          <!-- User Info -->
          <div
            v-if="currentUser"
            class="border-t pt-4 flex items-center gap-3 mb-4"
          >
            <div
              class="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white"
            >
              {{ initials }}
            </div>
            <div>
              <p class="font-medium">{{ currentUser.name }}</p>
              <p class="text-xs text-gray-500">{{ currentUser.email }}</p>
            </div>
          </div>

          <!-- Auth Buttons -->
          <div class="flex gap-5">
            <template v-if="currentUser">
              <button
                @click="handleLogout"
                class="flex-1 bg-orange-500 text-white py-2 rounded-md"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <router-link
                to="/signup"
                class="hover:text-gray-900 flex-1 text-center"
              >
                Sign Up
              </router-link>
              <router-link
                to="/login"
                class="hover:text-gray-900 flex-1 text-center"
              >
                Login
              </router-link>
            </template>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Get current user from sessionStorage
const currentUser = computed(() => {
  const user = sessionStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
});

// Get user initials
const initials = computed(() => {
  if (!currentUser.value?.name) return "";
  return currentUser.value.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});

// Handle logout
const handleLogout = () => {
  sessionStorage.removeItem("currentUser");
  router.push("/signup");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
