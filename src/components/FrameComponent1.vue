<template>
  <section class="good-company-wrapper">
    <div class="good-company">
      <div class="good-company-title">
        <h3 class="you-will-be">You will be in good Company</h3>
      </div>
      <div class="company-logos">
        <img class="beneoshop-icon" loading="lazy" alt="" src="/images/prisca logo.png" />
        <img class="caspio-icon" loading="lazy" alt="" src="/images/prisca logo.png" />
        <img class="hypergrid-icon" loading="lazy" alt="" src="/images/prisca logo.png" />
        <img class="leotrippi-icon" loading="lazy" alt="" src="/images/prisca logo.png" />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FrameComponent1",
});
</script>

<style scoped>
.you-will-be {
  margin: 0;
  position: relative;
  font-size: inherit;
  line-height: 159%;
  font-weight: 500;
  font-family: inherit;
  text-align: center;
}

.good-company-title {
  display: flex;
  justify-content: center;
  width: 100%;
}

.beneoshop-icon,
.caspio-icon,
.hypergrid-icon,
.leotrippi-icon {
  height: 185px;
  width: 185px;
  object-fit: cover;
  min-height: 185px;
}

.company-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px;
}

.good-company {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  width: 100%;
}

.good-company-wrapper {
  display: flex;
  justify-content: center;
  padding: 0px 20px 60px;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: #000;
  font-family: Poppins;
}

@media screen and (max-width: 1050px) {
  .company-logos {
    gap: 10px;
  }
}

@media screen and (max-width: 450px) {
  .you-will-be {
    font-size: 19px;
    line-height: 31px;
  }

  .beneoshop-icon,
  .caspio-icon,
  .hypergrid-icon,
  .leotrippi-icon {
    height: 120px;
    width: 120px;
  }
}
</style>
