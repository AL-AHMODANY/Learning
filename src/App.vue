<template>
  <div class="flex flex-col min-h-screen font-sans text-gray-800">
    <Navbar />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import LoginPage from "./views/LoginPage.vue";
import SignUp from "./views/SignUp.vue";
</script>
