<template>
  <section class="frame-section">
    <div class="lorem-ipsum-is-simply-dummy-te-parent">
      <h1 class="lorem-ipsum-is5">
        Simplify Your Procurement Process
      </h1>
      <div class="lorem-ipsum-is-simply-dummy-te-wrapper">
        <div class="lorem-ipsum-is6">
          Experience a seamless procurement process from start to finish. Our platform helps you manage vendor
          selection, purchase orders, and more, all in one place.
        </div>
      </div>
    </div>
    <div class="activities">
      <img class="recent-activities-1" loading="lazy" alt="" src="/images/17. Recent Activities 1.png" />
      <div class="activities-child" />
    </div>
  </section>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FrameComponent2",
});
</script>
<style scoped>
.lorem-ipsum-is5 {
  margin: 0;
  align-self: stretch;
  position: relative;
  font-size: inherit;
  line-height: 53px;
  font-weight: 600;
  font-family: inherit;
}

.lorem-ipsum-is6 {
  flex: 1;
  position: relative;
  line-height: 175%;
  display: inline-block;
  max-width: 100%;
}

.lorem-ipsum-is-simply-dummy-te-wrapper {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 78px 0px 77px;
  box-sizing: border-box;
  max-width: 100%;
  font-size: 18px;
  color: #868686;
}

.lorem-ipsum-is-simply-dummy-te-parent {
  width: 847px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 23px;
  max-width: 100%;
}

.recent-activities-1 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 738px;
  height: 511px;
  object-fit: cover;
  z-index: 1;
}

.activities-child {
  position: absolute;
  top: 32px;
  left: 559px;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%,
      #ded9ff,
      rgba(255, 255, 255, 0));
  width: 497px;
  height: 505px;
  z-index: 2;
}

.activities {
  height: 537px;
  width: 803px;
  position: absolute;
  margin: 0 !important;
  right: 0px;
  bottom: -460px;
}

.frame-section {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px 132px 21px;
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
  text-align: center;
  font-size: 33px;
  color: #252525;
  font-family: Poppins;
}

@media screen and (max-width: 1050px) {
  .lorem-ipsum-is5 {
    font-size: 26px;
    line-height: 42px;
  }

  .lorem-ipsum-is-simply-dummy-te-wrapper {
    padding-left: 38px;
    padding-right: 39px;
    box-sizing: border-box;
  }
}

@media screen and (max-width: 450px) {
  .lorem-ipsum-is5 {
    font-size: 20px;
    line-height: 32px;
  }
}
</style>
