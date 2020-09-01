<template>
  <footer>
    <div
      class="footer__background-svg"
      v-html="BackgroundSvg"
    />
    <div class="container">
      <div class="footer-content">
        <div class="footer-items">
          <div class="footer-item footer-brand">
            <img
              src="~@/assets/imgs/logo-white.svg"
              alt="bothub">
            <div>Webapp v{{ version }}</div>
          </div>
          <ul class="footer-item">
            <li>
              <router-link to="/terms">{{ $t('webapp.layout.terms_conditions') }}
              </router-link>
            </li>
          </ul>
          <ul class="footer-item footer-sociallist">
            <li class="footer-sociallist-item">
              <a
                href="https://www.facebook.com/bothub.it"
                target="_blank"><b-icon icon="facebook" /></a>
            </li>
            <li class="footer-sociallist-item">
              <a
                href="https://github.com/Ilhasoft/bothub/"
                target="_blank"><b-icon icon="github" /></a>
            </li>
          </ul>
        </div>
        <div class="footer-items">
          <h4 class="footer-title">{{ $t('webapp.layout.contact_us') }}</h4>
          <div class="footer-section-item">
            <p>bothub@ilhasoft.com.br</p>
          </div>
          <div class="footer-section-item">
            <p>Rua José Pontes de Magalhães 70,</p>
            <p>Empresarial JTR - Ed. Austrália, Sala 07</p>
            <p>Jatiúca - Maceió/AL</p>
          </div>
          <div class="footer-section-item">
            <p>+55 82 3022.5978</p>
          </div>
        </div>
        <div class="footer-items">
          <h4 class="footer-title">{{ $t('webapp.layout.subscribe') }}</h4>
          <div class="footer-section-item">
            <p>{{ $t('webapp.layout.newsletter') }}</p>
          </div>
          <form @submit.prevent="onSubscribeSubmit()">
            <div class="footer-has-input">
              <b-input
                v-model="email"
                :placeholder="$t('webapp.layout.you_best_email')"
                type="email"
                icon-right="chevron-right"
                icon-right-clickable
                @icon-right-click="onSubscribeSubmit()"
              />
            </div>
          </form>
        </div>
      </div>
      <div class="footer-license">
        <p class="has-text-centered">{{ $t('webapp.layout.footer_license') }}</p>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from 'axios';
import qs from 'query-string';
import BackgroundSvg from '!!svg-inline-loader!@/assets/imgs/bg-footer.svg';


export default {
  name: 'SiteFooter',
  data() {
    return {
      email: '',
      submittingNewsletter: false,
      version: process.env.VERSION,
      BackgroundSvg,
    };
  },
  methods: {
    async onSubscribeSubmit() {
      /* istanbul ignore next */
      const {
        MAILCHIMP_LOGIN,
        MAILCHIMP_DATACENTER,
        MAILCHIMP_USER_ID,
        MAILCHIMP_LIST_ID,
      } = process.env;
      /* istanbul ignore next */
      const baseUrl = `https://${MAILCHIMP_LOGIN}.${MAILCHIMP_DATACENTER}.list-manage.com/subscribe/post`;
      /* istanbul ignore next */
      const query = {
        u: MAILCHIMP_USER_ID,
        id: MAILCHIMP_LIST_ID,
        EMAIL: this.email,
      };
      /* istanbul ignore next */
      const url = `${baseUrl}?${qs.stringify(query)}`;
      /* istanbul ignore next */
      this.submittingNewsletter = true;
      /* istanbul ignore next */
      try {
        await axios.get(url);
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
      /* istanbul ignore next */
      this.submittingNewsletter = false;
      /* istanbul ignore next */
      this.email = '';
      /* istanbul ignore next */
      this.$buefy.toast.open({
        message: 'Thank you for subscribing!',
        type: 'is-success',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';


footer {
  $margin-top: 12vw;
  $background-gradient-color: #18a997;

  position: relative;
  width: 100%;
  margin-top: $margin-top;

  $font-color: $color-white;
  $font-color-lighten: $color-white;
  $background-color: $color-primary;

  background-color: $background-gradient-color;
  color: $font-color;

  ul {
    li {
      a {
        color: $font-color;
        transition: color .2s ease;

        &:hover {
          color: $color-grey-light;
        }
      }
    }
  }


  .footer {
    &__background-svg {
    position: absolute;
    width: 100%;
    top: -($margin-top);
    z-index: 0;

      svg {
        position: absolute;
        width: 100%;
      }
    }

    &-content {
      padding: 64px 0;
      display: flex;
      justify-content: space-around;
       @media screen and (max-width: 50em) {
        flex-direction: column;
        justify-content: space-around;
        margin: 1rem;
      }
    }

    &-items{
      margin-top: 1rem;
    }

    &-item {
      margin-bottom: 15px;

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
            color: $color-primary-dark;
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
