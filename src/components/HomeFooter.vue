<template>
  <div class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer-col nav-box">
          <div class="brand">
            <img src="../assets/images/logo-white.svg" alt="">
          </div>
          <ul class="footer-nav">
            <li class="footer-nav__item"><a href="#">Terms & conditions</a></li>
            <li class="footer-nav__item"><a href="#">Privacy policy</a></li>
            <li class="footer-nav__item"><a href="#">Copyrights Notification</a></li>
          </ul>
          <ul class="social-nav">
            <li class="social-nav__item facebook">
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li class="social-nav__item gplus">
              <a href="#">
                <i class="fab fa-google-plus-g"></i>
              </a>
            </li>
            <li class="social-nav__item instagram">
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li class="social-nav__item twitter">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-col contact-box">
          <h4 class="footer-col__title">Contact Us</h4>
          <div class="vcard">
            <span class="email">bothub@contact.com</span>
            <address class="adr">
              <span class="street-address">
                Rua José Pontes de Magalhães <br>
                70, JTR Ed. Espanha Sala 803,
              </span>
              <span class="locality">
                Jatiúca - Maceió AL
              </span>
            </address>
            <span class="tel">+55 82 3022.5978</span>
          </div>
        </div>

        <div class="footer-col subscribe-box">
          <h4 class="footer-col__title">Subscribe</h4>
          <span>
            Enter your email to get notified about our new solutions
          </span>
          <input type="text">
          <buttom>GO</buttom>
        </div>
      </div>
    </div>
    <div class="site-info">
      Bothub is a project by ilhasoft. © 2017 All rights reserved. IMGBG-By Julie - Busy City
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeFooter'
}
</script>

<style lang="scss" scoped>

</style>
