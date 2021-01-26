<template>
  <div>
    <weni-notification/>
    <nav class="landing-page__nav">
        <router-link
          class="landing-page__nav__logo"
          to="/">
          <img
            src="@/assets/imgs/logo-new.svg"
            alt="Bothub">
        </router-link>
        <div class="landing-page__nav__login">
          <strong
            class="landing-page__nav__button clickable"
            @click="signIn()">{{ $t('webapp.landing_page.signin') }}</strong>
          <span>{{ $t('webapp.landing_page.or') }}</span>
          <strong
            class="landing-page__nav__button clickable"
            @click="signUp()">{{ $t('webapp.landing_page.signup') }}</strong>
        </div>
    </nav>
    <header class="landing-page__header">
      <div class="landing-page__header__content">
        <div class="landing-page__header__content__text">
          <h1>{{ $t('webapp.landing_page.header_content1') }}</h1>
          <p>{{ $t('webapp.landing_page.header_content2') }}</p>
          <b-button
            type='is-primary'
            rounded
            @click="signUp()">
            {{ $t('webapp.landing_page.join_for_free') }}
          </b-button>
        </div>
        <div class="landing-page__header__content__animation hide-mobile" />
      </div>
    </header>
    <section class="landing-page__intro">
      <div
        class="landing-page__intro__background-svg"/>
      <div class="landing-page__intro__background">
        <div class="landing-page__intro__item">
          <img src="~@/assets/imgs/hand.svg">
          <h2>{{ $t('webapp.landing_page.grid_text1') }}</h2>
          <span>{{ $t('webapp.landing_page.grid_text2') }}</span>
        </div>
        <div class="landing-page__intro__item">
          <img src="~@/assets/imgs/cloud.svg">
          <h2>{{ $t('webapp.landing_page.grid_text3') }}</h2>
          <span>{{ $t('webapp.landing_page.grid_text4') }}</span>
        </div>
        <div class="landing-page__intro__item">
          <img src="~@/assets/imgs/talk-balloon.svg">
          <h2>{{ $t('webapp.landing_page.grid_text5') }}</h2>
          <span>{{ $t('webapp.landing_page.grid_text6') }}</span>
        </div>
      </div>
    </section>
    <section class="landing-page__bots">
      <div class="landing-page__bots__content text-center">
        <h1 class="landing-page__bots__content__title">
          {{ $t('webapp.landing_page.best_bots') }}
        </h1>
        <repository-card-list
          :show-more-button="false"
          limit="6"/>
        <b-button
          class="landing-page__bots__content__button"
          type="is-primary"
          @click="showAllBots()"> {{ $t('webapp.landing_page.all_bots') }} </b-button>
      </div>
    </section>
    <section class="landing-page__signup">
      <div class="landing-page__signup__container">
        <div class="landing-page__signup__container__items">
          <h1>
            {{ $t('webapp.landing_page.signup_grid') }}
            </h1>
          <b-button
            class="landing-page__signup__button"
            rounded
            @click="signUp()">
            {{ $t('webapp.landing_page.signup_forfree') }}
          </b-button>
        </div>
        <div class="landing-page__signup__animation">
          <div class="landing-page__signup__animation__girl"/>
          <div class="landing-page__signup__animation__shadow"/>
        </div>
      </div>
    </section>
    <site-footer />
  </div>
</template>

<script>
import SiteFooter from '@/components/shared/SiteFooter';
import RepositoryCardList from '@/components/repository/RepositoryCardList';
import { mapGetters } from 'vuex';
import WeniNotification from '@/components/WeniNotification';

export default {
  name: 'LandingPage',
  components: {
    SiteFooter,
    RepositoryCardList,
    WeniNotification,
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'myProfile',
    ]),
  },
  watch: {
    authenticated() {
      this.$router.push({
        name: 'home',
      });
    },
  },
  mounted() {
    if (this.$route.params.signed) {
      this.signIn();
    }
  },
  methods: {
    showAllBots() {
      this.$router.push({
        name: 'home',
      });
    },
    signIn() {
      this.$router.push({
        name: 'signIn',
      });
    },
    signUp() {
      this.$router.push({
        name: 'signUp',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/utilities.scss';


.landing-page {
  $max-width: 1200px;
  $margin: 1rem 0;
  $moredate-margin: 3rem 0;

  &__nav {
    padding: .25rem 1rem;
    background-color: $color-white;
    width: 100%;
    display: flex;
    justify-content:space-between;
    font-family: $font-family;

    &__button {
      color: $color-primary;
      &:hover {
        color: $color-primary-dark;
      }
    }

    &__login {
      align-self: center;

      span {
        margin: 0 0.5rem;
      }
    }

    &__logo {
      min-width: ($size-normal * .75);
      padding: ($size-normal * .125) 0;
      align-self: center;

      img {
        display: block;
        height: $size-small * 1.4;
      }
    }
  }

  &__header {
    background-color: $color-white;

    &__content {
      padding: 5rem 0;
      margin: auto;
      max-width: $max-width - 200px;
      align-items: center;
      display: flex;

      @media screen and (max-width: $mobile-width) {
        padding: 1rem 0;
        padding-bottom: 7rem;
        text-align: center;
      }

      &__text {
        position: relative;
        width:  calc(100% * 1/2 - 1rem);
        margin-top: 5vh;

        @media screen and (max-width: $mobile-width) {
            width: 100%;
        }

        h1 {
          font-size: 4rem;

          @media screen and (max-width: $mobile-width) {
            font-size: 3rem;
          }
        }
        p {
          margin: $margin;
        }
      }

      &__animation {
        position: relative;
        background-image: url('~@/assets/imgs/network.svg');
        background-repeat: no-repeat;
        width:  calc(100% * 1/2 - 1rem);
        height: 400px;
        display: inline-block;

        @media screen and (max-width: $mobile-width) {
          display: none;
        }

        &:before {
          position: absolute;
          content: '';
          height: 400px;
          width: 100%;
          left: 3rem;
          background: url('~@/assets/imgs/floating-girl.svg') no-repeat;
          animation-name: floating;
          animation-duration: 3s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;

          @keyframes floating {
            0% { transform: translate(0,  0px); }
            65%  { transform: translate(0, 15px); }
            100%   { transform: translate(0, -0px); }
          }
        }
      }
    }
  }

  &__intro {
    background-color: $color-white;
    position: relative;
    z-index: 1;

    &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 50%;
      bottom: 0;
      background-color: $color-fake-white;
    }

    &__background-svg {
      height: 120vh;
      background: url('~@/assets/imgs/bg-intro.svg') no-repeat;
      background-size: 100%;
      position: relative;
      width: 100%;
      z-index:1;
    }

    &__background {
      display: flex;
      max-width: $max-width;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      margin: auto;
      position: absolute;
      bottom: 50%;
      z-index:1;
      text-align: center;

      @media screen and (max-width: $mobile-width * 1.2) {
        flex-direction: column;
        position: relative;
        transform: translateY(0);
        top: -100vh;
        bottom: 10%;
        background-color: #12b3a0;
      }
    }
    &__item {
      align-items: center;
      align-self: center;
      width:  calc(100% * 1/3 - 1rem);

      img {
        height: 8rem;
        width: 8rem;
        border-radius: 50%;
      }

      span, h2 {
        color: $color-white;
      }

      h2 {
        font-size: 1.5rem;
        font-weight: $font-weight-bolder;
      }

      @media screen and (max-width: $mobile-width) {
        width: 100%;
        margin: 2rem;
      }
    }
  }

  &__bots {
    z-index: 99;
    position: relative;

    @media screen and (max-width: $mobile-width) {
        top: -90vh;
      }

    &__content {
      margin: auto;
      max-width: $max-width;

      &__title {
        margin: $moredate-margin;
        color: $color-fake-black;
        font-weight: $font-weight-medium;
        font-family: $font-family;
        font-size: 1.75rem;
      }

      &__button {
        margin: $moredate-margin;
        font-weight: $font-weight-medium;
        font-family: $font-family;
      }
    }
  }

  &__signup {
    margin: 2rem auto 0;
    max-width: $max-width - 400px;
    height: 200px;
    @media screen and (max-width: $mobile-width) {
      height: 400px;
    }
    &__container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 1.75rem;
        text-align: center;
        color: $color-fake-black;
        font-weight: $font-weight-medium;
        font-family: $font-family;
        height: 350px;
        @media screen and (max-width: $mobile-width) {
          margin-top: -100vh;
          height: 400px;
        }
        &__items {
            width: 60%;
            @media screen and (max-width: $mobile-width) {
              width: 90%;
            }
        }
    }

    &__button {
      margin: $margin;
      color: $color-white;
      font-family: $font-family;
      font-weight: $font-weight-bolder;
      padding: 0 2rem;
      background-color: $color-secondary;
    }

    &__animation {
      margin-top: 5rem;
      position: relative;
      align-items: center;
      max-width: calc(100% * 1/4 - 1rem);

      @media screen and (max-width: $mobile-width) {
        display: none;
      }

      &__girl {
        z-index: 1;
        position: relative;
        background-image: url('~@/assets/imgs/girl-with-helmet.svg');
        background-repeat: no-repeat;
        width:  300px;
        height: 300px;
        bottom: 5rem;
        animation-name: floating;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;

        @keyframes floating {
          0% { transform: translate(0,  0px); }
          65%  { transform: translate(0, 15px); }
          100%   { transform: translate(0, -0px); }
        }

        @media screen and (max-width: $mobile-width) {
          display: none;
        }
      }

      &__shadow {
        position: relative;
        content: '';
        top: -5rem;
        height: 200px;
        width: 100px;
        left: 2rem;
        background: url('~@/assets/imgs/girl-shadow.svg') no-repeat;
        animation-name: floating-shadow;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;

        @keyframes floating-shadow {
          0% { transform: scale(1.2); }
          65% { transform: scale(1.1); }
          100% { transform: scale(1.2); }
        }
      }
    }
  }
}
</style>
