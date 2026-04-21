<template>
  <section class="px-4 sm:px-6 lg:px-10">
    <div class="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl">
      
      <!-- Background Image -->
      <img
        src="../../assets/images/a-man-and-a-girl.png"
        alt="Video thumbnail"
        class="w-full h-[300px] sm:h-[300px] md:h-[500px] lg:h-[600px] object-cover"
      />

      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/30"></div>

      <!-- Play Button -->
      <div class="absolute inset-0 flex items-center justify-center">
        <button
          class="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full shadow-lg hover:scale-105 transition"
        >
          <svg
            class="w-8 h-8 text-black ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>