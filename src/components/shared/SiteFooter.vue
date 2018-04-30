<template>
  <footer>
    <div class="container container-padding">
      <div class="footer-content">
        <div class="columns">
          <div class="column">
            <div class="footer-item footer-brand">
              <img src="~@/assets/imgs/logo-white.svg" alt="bothub" />
            </div>
            <ul class="footer-item">
              <li><a href="#">Terms &amp; conditions</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Copyrights Notification</a></li>
            </ul>
            <ul class="footer-item footer-sociallist">
              <li class="footer-sociallist-item">
                <a href="#"><b-icon icon="facebook" /></a>
              </li>
              <li class="footer-sociallist-item">
                <a href="#"><b-icon icon="google-plus" /></a>
              </li>
              <li class="footer-sociallist-item">
                <a href="#"><b-icon icon="instagram" /></a>
              </li>
              <li class="footer-sociallist-item">
                <a href="#"><b-icon icon="twitter" /></a>
              </li>
            </ul>
          </div>
          <div class="column">
            <h4 class="footer-title has-text-white">Contact Us</h4>
            <div class="footer-section-item">
              <p>bothub@contact.com</p>
            </div>
            <div class="footer-section-item">
              <p>Rua José Pontes de Magalhães 70,</p>
              <p>JTR Ed. Espanha Sala 803,</p>
              <p>Jatiúca - Maceió AL</p>
            </div>
            <div class="footer-section-item">
              <p>+55 82 3022.5978</p>
            </div>
          </div>
          <div class="column">
            <h4 class="footer-title has-text-white">Subscribe</h4>
            <div class="footer-section-item">
              <p>Enter your email to get notified about our new solutions</p>
            </div>
            <form @submit.prevent="onSubscribeSubmit()">
              <div class="footer-has-input">
                <b-field>
                  <input
                    type="email"
                    class="input footer-input"
                    placeholder="your@email.com" />
                  <span class="control">
                    <button class="button is-secondary"><b-icon icon="email" /></button>
                  </span>
                </b-field>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="footer-license">
        <p class="has-text-centered">Bothub is a project by Ilhasoft.
          &copy; 2018 All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  methods: {
    onSubscribeSubmit() {},
  },
};
</script>

<style lang="scss" scoped>
footer {
  $font-color: #5E5786;
  $font-color-lighten: #aba8c2;
  $background-color: #221859;

  background-color: $background-color;
  color: $font-color;

  ul {
    li {
      a {
        color: $font-color;
        transition: color .2s ease;

        &:hover {
          color: $font-color-lighten;
        }
      }
    }
  }

  .footer {
    &-content {
      padding: 64px 0;
    }

    &-item {
      margin-bottom: 32px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-brand {
      img {
        width: 140px;
      }
    }

    &-title {
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    &-section-item {
      margin-bottom: 8px;
    }

    &-has-input {
      input {
        outline: none;
        border: none;
        box-shadow: none;
      }
    }

    &-sociallist {
      display: flex;

      &-item {
        $size: 36px;
        width: $size;
        height: $size;
        line-height: $size;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 4px;

        &:last-child {
          margin-right: 0;
        }

        a {
          display: block;
          width: 100%;
          height: 100%;
          color: $background-color;
          background-color: $font-color;
          text-align: center;
          transition: background-color .2s ease;

          &:hover {
            color: $background-color;
            background-color: $font-color-lighten;
          }

          .icon {
            display: block;
            width: $size;
            height: $size;
          }
        }
      }
    }

    &-license {
      border-top: 1px solid $font-color;
      padding: 16px 0;
    }
  }
}
</style>

