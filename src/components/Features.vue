<template>
  <section class="features">
    <div class="feature-list">
      <div class="web-content-parent">
        <div class="web-content">
          <div class="web-content-child" />
          <img class="website-content-1-icon" loading="lazy" alt="" src="/images/website-content 1.svg" />
        </div>
        <div class="web-application">
          <div class="application-info">
            <div class="m-2 web-application1">Vendor Management</div>

          </div>
        </div>
      </div>
      <div class="frame-div">
        <div class="rectangle-container">
          <div class="frame-child4" />
          <img class="seo-tag-1-icon" loading="lazy" alt="" src="/images/website-content 1.svg" />
        </div>
        <div class="feature-names-wrapper">
          <div class="feature-names">
            <div class="ml-2 seo">Purchase Orders</div>

          </div>
        </div>
      </div>
      <div class="frame-parent1">
        <div class="rectangle-parent1">
          <div class="frame-child5" />
          <img class="immersive-1-icon" loading="lazy" alt="" src="/images/website-content 1.svg" />
        </div>
        <div class="frame-wrapper1">
          <div class="arvr-solutions-parent">
            <div class="arvr-solutions">Approval Workflow</div>

          </div>
        </div>
      </div>
      <div class="frame-parent1">
        <div class="rectangle-parent1">
          <div class="frame-child5" />
          <img class="immersive-1-icon" loading="lazy" alt="" src="/images/website-content 1.svg" />
        </div>
        <div class="frame-wrapper1">
          <div class="arvr-solutions-parent">
            <div class="arvr-solutions">Invoice Management</div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FeaturesComponent",
});
</script>

<style scoped>
.web-content-child,
.frame-child4,
.frame-child5 {
  height: 8px;
  width: 83px;
  position: relative;
  border-radius: 20px;
  display: none;
}

.website-content-1-icon,
.seo-tag-1-icon,
.immersive-1-icon {
  height: 41px;
  width: 41px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  z-index: 3;
}

.web-content,
.rectangle-container,
.rectangle-parent1 {
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 25px;
  z-index: 2;
}

.web-content {
  background-color: #efeaff;
}

.rectangle-container {
  background-color: #ecffda;
}

.rectangle-parent1 {
  background-color: #dae7ff;
}

.web-application1,
.seo,
.arvr-solutions {
  position: relative;
  line-height: 400%;
  font-weight: 500;
  z-index: 2;
}

.lorem-ipsum-is1,
.lorem-ipsum-is2,
.lorem-ipsum-is3 {
  font-size: 15px;
  line-height: 175%;
  color: #969696;
  z-index: 3;
}

.application-info,
.feature-description,
.arvr-solutions-parent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.application-info,
.feature-names {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

}

.feature-description,
.lorem-ipsum-is-simply-wrapper {
  padding-left: 1px;
}

.feature-names {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.feature-names-wrapper,
.frame-wrapper1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 7px;
}

.web-content-parent,
.frame-div,
.frame-parent1 {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
}

.feature-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
  max-width: 100%;
}

.features {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0 27px 16px 20px;
  box-sizing: border-box;
  max-width: 100%;
  text-align: left;
  font-size: 20px;
  color: #000;
  font-family: Poppins;
}

@media (max-width: 1024px) {
  .feature-list {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .features {
    flex-direction: column;
    align-items: center;
  }

  .feature-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .feature-item {
    flex: 1 1 calc(25% - 16px);
    max-width: calc(25% - 16px);
    padding: 20px;
  }

  .web-content-parent,
  .frame-div,
  .frame-parent1 {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
  }

  .web-content,
  .rectangle-container,
  .rectangle-parent1 {
    padding: 20px;
  }
}

@media (max-width: 450px) {

  .web-application1,
  .seo,
  .arvr-solutions {
    font-size: 16px;
    line-height: 28px;
  }

  .lorem-ipsum-is1,
  .lorem-ipsum-is2,
  .lorem-ipsum-is3 {
    font-size: 14px;
    line-height: 24px;
  }

  .features {
    padding: 0 10px;
  }

  .feature-list {
    gap: 10px;
  }

  .web-content,
  .rectangle-container,
  .rectangle-parent1 {
    padding: 15px;
  }
}
</style>
