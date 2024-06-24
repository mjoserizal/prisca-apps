<template>
  <div class="landing-page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="navbar-logo">
        <q-img src="/images/prisca logo.png" class="logo-img" />
      </div>
      <button @click="onLoginClick" class="login-button">Login</button>
    </header>

    <!-- Main Content -->
    <MainContent />
    <FeaturesComponent />

    <!-- Section Divider -->
    <section class="section-divider">
      <div class="divider-line"></div>
    </section>

    <FrameComponent2 />
    <TestimonialsComponent />
    <TestimonialComponent />
    <FrameComponent1 />
    <FrameComponent />
    <AppFooter />

    <!-- Footer -->
    <div class="footer">
      <div class="footer-divider"></div>
      <div class="footer-text">Copyright ® 2021 Prisca All rights Reserved</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MainContent from "../components/Content.vue";
import FeaturesComponent from "../components/Features.vue";
import FrameComponent2 from "../components/FrameComponent2.vue";
import TestimonialsComponent from "../components/Testimonials.vue";
import TestimonialComponent from "../components/Testimonial.vue";
import FrameComponent1 from "../components/FrameComponent1.vue";
import FrameComponent from "../components/FrameComponent.vue";
import AppFooter from "../components/Footer.vue";

export default defineComponent({
  name: "LandingPage",
  components: {
    MainContent,
    FeaturesComponent,
    FrameComponent2,
    TestimonialsComponent,
    TestimonialComponent,
    FrameComponent1,
    FrameComponent,
    AppFooter,
  },
  methods: {
    onLoginClick() {
      this.$router.push({ name: 'login' });
    },
  },
});
</script>

<style scoped>
.landing-page {
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  font-size: 14px;
  color: #868686;
  font-family: Poppins, sans-serif;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.navbar-logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 60px;
  width: 60px;
  margin-left: 50px;
}

.login-button {
  padding: 8px 20px;
  margin-right: 30px;
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
  z-index: 10;
}

.login-button:hover {
  background-color: #00bfff;
}

.section-divider {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  padding: 0 0 96px;
  box-sizing: border-box;
  max-width: 100%;
  border-top: 1px solid #ffffff;
}

.divider-line {
  width: 100%;
  border-top: 1px solid #ffffff;
  box-sizing: border-box;
}

.footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 28.2px;
  font-size: 14px;
  color: #a9a9a9;
}

.footer-divider {
  width: 100%;
  border-top: 1px solid #d2d2d2;
}

.footer-text {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .logo-img {
    margin-left: 0;
  }

  .login-button {
    margin-right: 0;
    margin-top: 10px;
  }

  .footer {
    align-items: center;
  }

  .footer-text {
    text-align: center;
  }
}
</style>
