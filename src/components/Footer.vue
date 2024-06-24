<template>
  <footer class="footer-wrapper">
    <div class="footer-content">
      <div class="footer-about">
        <div class="footer-title">About us</div>
        <div class="footer-links">
          <p>Lorem Portfolio</p>
          <p>Careers</p>
          <p>Contact us</p>
        </div>
      </div>
      <div class="footer-contact">
        <div class="footer-title">Contact us</div>
        <div class="footer-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>
        <div class="footer-phone">+908 89097 890</div>
      </div>
      <div class="footer-social">
        <div class="social-icons">
          <img loading="lazy" alt="icon" src="/images/Group 5.svg" />
          <img loading="lazy" alt="icon" src="/images/Group 5.svg" />
          <img loading="lazy" alt="icon" src="/images/Group 5.svg" />
          <img loading="lazy" alt="icon" src="/images/Group 5.svg" />
        </div>
      </div>
      <div class="footer-logo">
        <b>LOGO</b>
        <div class="footer-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>
        <div class="footer-copyright">@Lorem</div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppFooter",
});
</script>

<style scoped>
.footer-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px 26px;
  box-sizing: border-box;
  font-size: 17px;
  color: #000;
  font-family: Poppins;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  max-width: 1421px;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-about,
.footer-contact,
.footer-social,
.footer-logo {
  flex: 1 1 100%;
  max-width: 300px;
  margin: 10px;
}

.footer-title {
  font-weight: 500;
}

.footer-links p,
.footer-description,
.footer-phone,
.footer-copyright {
  margin: 0;
  color: #515151;
}

.social-icons {
  display: flex;
  gap: 16px;
}

.social-icons img {
  height: 34px;
  width: 34px;
  object-fit: contain;
}

@media (min-width: 600px) {

  .footer-about,
  .footer-contact,
  .footer-social,
  .footer-logo {
    flex: 1 1 45%;
    max-width: none;
  }
}

@media (min-width: 900px) {

  .footer-about,
  .footer-contact,
  .footer-social,
  .footer-logo {
    flex: 1 1 22%;
  }
}
</style>
