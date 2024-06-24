<template>
  <section class="testimonial2">
    <div class="testimonial-content">
      <div class="group-div">
        <div class="frame-child8" />
        <div class="quote-content">
          <div class="lorem-ipsum-is-simply-dummy-te-wrapper1">
            <h3 class="lorem-ipsum-is12">Register as Buyer</h3>
          </div>
          <div class="kodex-technology-pvt4">
            Our system offers a comprehensive solution to streamline your procurement processes,
            ensuring efficiency and cost-effectiveness. As a buyer, you'll have access to a wide range of products
            and services, simplified ordering, and seamless communication with vendors.
          </div>
        </div>
        <div class="view-more-container">
          <button class="group-button" @click="goToRegisterBuyer">
            <div class="frame-child9" />
            <div class="view-more1">Register Now</div>
          </button>
        </div>
      </div>
      <div class="testimonial-quote">
        <div class="testimonial-quote-child" />
        <div class="rectangle-parent3">
          <div class="frame-child10" />
          <div class="frame-parent3">
            <div class="lorem-ipsum-is-simply-dummy-te-wrapper2">
              <h3 class="lorem-ipsum-is13">
                Register as Seller Vendor
              </h3>
            </div>
            <div class="kodex-technology-pvt5">
              Our platform connects you with numerous buyers, providing an opportunity to expand your market reach.
              As a seller, you can easily manage your product listings, receive and process orders, and ensure timely
              deliveries, all while maintaining excellent customer relations.
            </div>
          </div>
          <div class="view-more-button-wrapper">
            <button class="rectangle-parent4" @click="goToRegisterVendor">
              <div class="frame-child11" />
              <div class="view-more2">Register Now</div>
            </button>
          </div>
        </div>
        <img class="bell-angle-1" loading="lazy" alt="" src="/images/Bell Angle 1.png" />
      </div>
    </div>

  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TestimonialComponent",
  methods: {
    goToRegisterBuyer() {
      this.$router.push({ name: "register-buyer" });
    },
    goToRegisterVendor() {
      this.$router.push({ name: "register-vendor" });
    }
  }
});
</script>

<style scoped>
.frame-child8 {
  width: 572px;
  height: 459px;
  position: relative;
  border-radius: 20px;
  background-color: #f4f4f4;
  display: none;
  max-width: 100%;
}

.lorem-ipsum-is12 {
  margin: 0;
  flex: 1;
  position: relative;
  font-size: inherit;
  line-height: 170%;
  font-weight: 600;
  font-family: inherit;
  display: inline-block;
  max-width: 100%;
  z-index: 1;
}

.lorem-ipsum-is-simply-dummy-te-wrapper1 {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0px 55px 0px 56px;
  box-sizing: border-box;
  max-width: 100%;
}

.kodex-technology-pvt4 {
  align-self: stretch;
  position: relative;
  font-size: 16px;
  line-height: 170%;
  color: #545454;
  white-space: pre-wrap;
  z-index: 1;
}

.quote-content {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 36px;
  max-width: 100%;
}

.frame-child9 {
  height: 49px;
  width: 153px;
  position: relative;
  border-radius: 10px;
  background-color: #1090cb;
  display: none;
}

.view-more1 {
  position: relative;
  font-size: 16px;
  line-height: 170%;
  font-weight: 500;
  font-family: Poppins;
  color: #fff;
  text-align: center;
  display: inline-block;
  min-width: 83px;
  z-index: 1;
}

.group-button {
  cursor: pointer;
  border: none;
  padding: 11px 35px;
  background-color: #1090cb;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  white-space: nowrap;
  z-index: 1;
}

.group-button:hover {
  background-color: #29a8e6;
}

.view-more-container {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 0px 0px 1px;
}

.group-div {
  flex: 0.8322;
  border-radius: 20px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 64px 48px 49px;
  box-sizing: border-box;
  gap: 41px;
  min-width: 372px;
  max-width: 100%;
  z-index: 1;
}

.testimonial-quote-child {
  height: 505px;
  width: 497px;
  position: absolute;
  margin: 0 !important;
  right: -177px;
  bottom: -140px;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%,
      #ffd9eb,
      rgba(255, 255, 255, 0));
}

.frame-child10 {
  width: 572px;
  height: 459px;
  position: relative;
  border-radius: 20px;
  background-color: #1090cb;
  display: none;
  max-width: 100%;
}

.lorem-ipsum-is13 {
  margin: 0;
  flex: 1;
  position: relative;
  font-size: inherit;
  line-height: 170%;
  font-weight: 600;
  font-family: inherit;
  display: inline-block;
  max-width: 100%;
  z-index: 1;
}

.lorem-ipsum-is-simply-dummy-te-wrapper2 {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 56px 0px 55px;
  box-sizing: border-box;
  max-width: 100%;
}

.kodex-technology-pvt5 {
  align-self: stretch;
  position: relative;
  font-size: 16px;
  line-height: 170%;
  white-space: pre-wrap;
  z-index: 1;
}

.frame-parent3 {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 36px;
  max-width: 100%;
}

.frame-child11 {
  height: 49px;
  width: 153px;
  position: relative;
  border-radius: 10px;
  background-color: #fff;
  display: none;
}

.view-more2 {
  position: relative;
  font-size: 16px;
  line-height: 170%;
  font-weight: 500;
  font-family: Poppins;
  color: #1090cb;
  text-align: center;
  display: inline-block;
  min-width: 83px;
  z-index: 1;
}

.rectangle-parent4 {
  cursor: pointer;
  border: none;
  padding: 11px 35px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  white-space: nowrap;
  z-index: 1;
}

.rectangle-parent4:hover {
  background-color: #e6e6e6;
}

.view-more-button-wrapper {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 1px 0px 0px;
}

.rectangle-parent3 {
  flex: 1;
  border-radius: 20px;
  background-color: #1090cb;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 64px 48px 49px;
  box-sizing: border-box;
  gap: 41px;
  max-width: 100%;
  z-index: 1;
}

.bell-angle-1 {
  height: 154.6px;
  width: 154.6px;
  position: absolute;
  margin: 0 !important;
  top: -77px;
  right: 6.4px;
  object-fit: contain;
  z-index: 2;
}

.testimonial-quote {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  min-width: 372px;
  max-width: 100%;
  color: #fff;
}

.testimonial-content {
  width: 1194px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 50px;
  max-width: 100%;
}



.testimonial2 {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 20px 157px;
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
  text-align: center;
  font-size: 25px;
  color: #252525;
  font-family: Poppins;
}

@media screen and (max-width: 1050px) {
  .group-div {
    flex: 1;
  }

  .testimonial-quote {
    flex: 1;
  }

  .testimonial-content {
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 750px) {
  .lorem-ipsum-is-simply-dummy-te-wrapper1 {
    padding-left: 28px;
    padding-right: 27px;
    box-sizing: border-box;
  }

  .quote-content {
    gap: 18px;
  }

  .group-div {
    gap: 20px;
    padding-left: 24px;
    padding-right: 24px;
    box-sizing: border-box;
  }

  .lorem-ipsum-is-simply-dummy-te-wrapper2 {
    padding-left: 27px;
    padding-right: 28px;
    box-sizing: border-box;
  }

  .frame-parent3 {
    gap: 18px;
  }

  .rectangle-parent3 {
    gap: 20px;
    padding-left: 24px;
    padding-right: 24px;
    box-sizing: border-box;
  }

  .testimonial-content {
    gap: 25px;
  }

  .testimonial2 {
    padding-bottom: 102px;
    box-sizing: border-box;
  }
}

@media screen and (max-width: 450px) {
  .lorem-ipsum-is12 {
    font-size: 20px;
    line-height: 34px;
  }

  .group-div {
    padding-top: 42px;
    padding-bottom: 32px;
    box-sizing: border-box;
    min-width: 100%;
  }

  .lorem-ipsum-is13 {
    font-size: 20px;
    line-height: 34px;
  }

  .rectangle-parent3 {
    padding-top: 42px;
    padding-bottom: 32px;
    box-sizing: border-box;
  }

  .testimonial-quote {
    min-width: 100%;
  }
}
</style>
