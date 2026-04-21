<template>
  <div>
    <HeroSection />
    <VideoSection />
    <BenefitCard />
    <TestimonialsSection />
    <div id="courses">
      <CoursesSection />
    </div>
    <div id="pricing">
      <PricingSection />
    </div>
    <div id="about">
      <Accordion />
    </div>
    <div id="contact">
      <!-- Contact section can be added here -->
    </div>
  </div>
</template>

<script setup>
import HeroSection from "../components/sections/HeroSection.vue";
import VideoSection from "../components/sections/Video.vue";
import BenefitCard from "../components/sections/BenefitCard.vue";
import CoursesSection from "../components/sections/CourseSection.vue";
import Accordion from "../components/sections/Accordion.vue";
import TestimonialsSection from "../components/sections/TestimonialSection.vue";
import PricingSection from "../components/sections/PricingSection.vue";
import Video from "../components/sections/Video.vue";
</script>
