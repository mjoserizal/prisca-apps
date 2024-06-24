<template>
  <section class="content8">
    <div class="main">
      <div class="image-container-wrapper">
        <div class="image-container3">
          <div class="slogan">
            <img class="bill-sitting-using-laptop-1" alt="" src="/images/dev.png" />
          </div>
        </div>
      </div>
      <div class="description4">
        <div class="description-child" />
        <div class="description-item" />
        <div class="experience-wrapper">
          <div class="experience">
            <div class="company-info-parent">
              <div class="company-info2">
                <h1 class="experienced-mobile-and-container">
                  <span>Experienced </span>
                  <span class="mobile-and-web">Procurement</span>
                  <span> Solutions for Your Business.</span>
                </h1>
                <div class="kodex-technology-pvt">
                  Offers a comprehensive solution to streamline your procurement processes,
                  ensuring efficiency and cost-effectiveness. We support multiple platforms, ensuring a seamless
                  experience for both vendors and buyers.
                </div>
              </div>
              <div class="buttons" @click="onGetStartedTextClick">
                <button class="button-names">
                  <div class="button-names-child" />
                  <div class="contact-us3">Get Started</div>
                </button>

              </div>
            </div>
            <div class="experience-inner">
              <div class="ellipse-div" />
            </div>
          </div>
        </div>
      </div>
      <img class="main-child" loading="lazy" alt="" src="/images/Vector 1.svg" />
      <div class="ellipse-parent">
        <div class="frame-child2" />
        <img class="frame-child3" loading="lazy" alt="" src="/images/Vector 2.svg" />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainContent",
  methods: {
    onGetStartedTextClick() {
      this.$router.push({ name: 'login' });
    },
  },
});
</script>

<style scoped>
.home3 {
  text-decoration: none;
  position: absolute;
  top: 25px;
  left: 0px;
  color: #1090cb;
  display: inline-block;
  min-width: 48px;
}

.about-us4 {
  text-decoration: none;
  position: absolute;
  top: 25px;
  left: 131px;
  color: inherit;
  display: inline-block;
  min-width: 71px;
  cursor: pointer;
}

.services1 {
  text-decoration: none;
  position: absolute;
  top: 25px;
  left: 273px;
  color: inherit;
  display: inline-block;
  min-width: 67px;
  cursor: pointer;
}

.blog3 {
  text-decoration: none;
  position: absolute;
  top: 25px;
  left: 401px;
  color: inherit;
  display: inline-block;
  min-width: 35px;
  cursor: pointer;
}

.bill-sitting-using-laptop-1 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: none;
}

.succlent-angle-1 {
  position: absolute;
  top: 275px;
  left: 107px;
  width: 66px;
  height: 66px;
  object-fit: contain;
  z-index: 1;
}

.slogan {
  position: absolute;
  height: 100%;
  top: 0px;
  bottom: 0px;
  left: 0px;
  width: 509px;
}

.big-plant-1 {
  position: absolute;
  top: 531px;
  left: 412px;
  width: 185px;
  height: 185px;
  object-fit: contain;
  z-index: 1;
}

.cuboid-1-icon {
  position: absolute;
  top: 189px;
  left: 483px;
  width: 93.7px;
  height: 93.7px;
  object-fit: contain;
  z-index: 1;
}

.image-container3 {
  height: 763px;
  flex: 1;
  position: relative;
  max-width: 100%;
}

.image-container-wrapper {
  width: 597px;
  margin: 0 !important;
  position: absolute;
  top: -86px;
  right: 65px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  z-index: 2;
}

.description-child {
  align-self: stretch;
  height: 743px;
  position: relative;
  background-color: rgba(16, 144, 203, 0.1);
  display: none;
}

.description-item {
  align-self: stretch;
  height: 0.7px;
  position: relative;
  border-top: 0.7px solid #c4c4c4;
  box-sizing: border-box;
  z-index: 3;
}

.mobile-and-web {
  color: #1090cb;
}

.experienced-mobile-and-container {
  margin: 0;
  align-self: stretch;
  position: relative;
  font-size: inherit;
  font-weight: 600;
  font-family: inherit;
  z-index: 2;
}

.kodex-technology-pvt {
  width: 613px;
  position: relative;
  font-size: 16px;
  line-height: 204.3%;
  color: #5d5d5d;
  white-space: pre-wrap;
  display: inline-block;
  max-width: 100%;
  z-index: 2;
}

.company-info2 {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 29px;
  max-width: 100%;
}

.button-names-child {
  height: 51px;
  width: 193px;
  position: relative;
  border-radius: 10px;
  background-color: #1090cb;
  display: none;
}

.contact-us3 {
  position: relative;
  font-size: 16px;
  line-height: 33px;
  font-family: Poppins;
  color: #fff;
  text-align: left;
  display: inline-block;
  min-width: 88px;
  z-index: 3;
}

.button-names {
  cursor: pointer;
  border: none;
  padding: 9px 52px;
  background-color: #1090cb;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  white-space: nowrap;
  z-index: 2;
}

.button-names:hover {
  background-color: #29a8e6;
}

.frame-child1 {
  height: 51px;
  width: 193px;
  position: relative;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #1090cb;
  box-sizing: border-box;
  display: none;
}

.view-more {
  position: relative;
  font-size: 16px;
  line-height: 33px;
  font-family: Poppins;
  color: #1090cb;
  text-align: left;
  display: inline-block;
  min-width: 85px;
  z-index: 1;
}

.rectangle-group {
  cursor: pointer;
  border: 1px solid #1090cb;
  padding: 7px 54px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  white-space: nowrap;
  z-index: 2;
}

.rectangle-group:hover {
  background-color: #e6e6e6;
  border: 1px solid #29a8e6;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
  max-width: 100%;
}

.company-info-parent {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 59px;
  min-width: 409px;
  max-width: 100%;
}

.ellipse-div {
  align-self: stretch;
  height: 504px;
  position: relative;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%,
      #fdffea,
      rgba(196, 196, 196, 0));
  z-index: 1;
}

.experience-inner {
  height: 575px;
  width: 496px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 496px;
  max-width: 100%;
}

.experience {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 165px;
  max-width: 100%;
}

.experience-wrapper {
  width: 1343px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0px 26px;
  box-sizing: border-box;
  max-width: 100%;
  flex-shrink: 0;
}

.description4 {
  flex: 1;
  background-color: rgba(16, 144, 203, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 100px 160px;
  box-sizing: border-box;
  gap: 2.3px;
  max-width: 100%;
  font-size: 40px;
}

.main-child {
  height: 531px;
  width: 475px;
  position: absolute;
  margin: 0 !important;
  right: -428px;
  bottom: 42px;
  z-index: 2;
}

.frame-child2 {
  position: absolute;
  top: 0px;
  left: -111px;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%,
      #edeaff,
      rgba(196, 196, 196, 0));
  width: 496px;
  height: 504px;
  z-index: 1;
}

.frame-child3 {
  position: absolute;
  top: 153px;
  left: -690px;
  width: 787.7px;
  height: 830.6px;
  object-fit: contain;
  z-index: 2;
}

.ellipse-parent {
  height: 983.6px;
  width: 385px;
  position: absolute;
  margin: 0 !important;
  bottom: -263.6px;
  left: 0px;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  max-width: 100%;
}

.content8 {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 11px;
  box-sizing: border-box;
  max-width: 100%;
  text-align: left;
  font-size: 16px;
  color: #000;
  font-family: Poppins;
}

@media (max-width: 1024px) {
  .image-container-wrapper {
    width: 100%;
    right: 0;
    top: 0;
  }

  .description4 {
    padding: 20px;
  }

  .buttons {
    flex-direction: column;
  }

  .button-names,
  .rectangle-group {
    padding: 12px 24px;
  }

  .company-info2 {
    gap: 20px;
  }

  .slogan,
  .big-plant-1,
  .cuboid-1-icon,
  .succlent-angle-1 {
    position: static;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .main {
    flex-direction: column;
  }

  .description4 {
    order: 1;
  }

  .image-container-wrapper {
    order: 2;
  }

  .buttons {
    align-items: center;
  }

  .experienced-mobile-and-container {
    font-size: 24px;
  }

  .kodex-technology-pvt {
    font-size: 14px;
  }
}

@media (max-width: 480px) {

  .button-names,
  .rectangle-group {
    width: 100%;
    text-align: center;
    padding: 8px 16px;
  }

  .slogan,
  .big-plant-1,
  .cuboid-1-icon,
  .succlent-angle-1 {
    width: 100%;
    max-width: 100%;
  }

  .kodex-technology-pvt {
    font-size: 12px;
  }

  .experienced-mobile-and-container {
    font-size: 18px;
  }

  .buttons {
    gap: 10px;
  }
}
</style>
