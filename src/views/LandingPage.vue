<template>
  <div>
    <nav class="landing-page__nav">
      <div class="bh-grid bh-grid--space-between bh-grid--row">
        <router-link
          class="bh-grid__item landing-page__nav__logo"
          to="/">
          <img
            src="@/assets/imgs/logo.svg"
            alt="Bothub">
        </router-link>
        <div class="text-color-primary landing-page__nav__login">
          <strong
            class="text-color-primary clickable"
            @click="openLoginModal()">Sign in</strong>
          <span>or</span>
          <strong
            class="text-color-primary clickable"
            @click="openSignupModal()">Sign up</strong>
        </div>
      </div>
    </nav>
    <header class="landing-page__header">
      <div class="landing-page__header__content bh-grid">
        <div class="landing-page__header__content__text bh-grid__item">
          <h1>Build, Optimize and Train</h1>
          <p>Be part of an open source and democratic global community that builds,
          trains and shares data sets.</p>
          <bh-button
            size="medium"
            rounded
            primary
            @click="openSignupModal()">Join us for free</bh-button>
        </div>
        <div class="landing-page__header__content__animation bh-grid__item" />
      </div>
    </header>
    <section class="landing-page__intro">
      <div
        class="landing-page__intro__background-svg"
        v-html="BackgroundSvg"/>
      <div class="landing-page__intro__background bh-grid bh-grid--space-between">
        <div class="landing-page__intro__item bh-grid bh-grid--column text-center">
          <img src="~@/assets/imgs/hand.svg">
          <h2>Create new AI</h2>
          <span>Create repositories with example sentences and improve your bot intelligence.</span>
        </div>
        <div class="landing-page__intro__item bh-grid bh-grid--column text-center">
          <img src="~@/assets/imgs/cloud.svg">
          <h2>Use existing data sets</h2>
          <span>You can choose from various ready-to-use data sets.</span>
        </div>
        <div class="landing-page__intro__item bh-grid bh-grid--column text-center">
          <img src="~@/assets/imgs/talk-balloon.svg">
          <h2>Build a community</h2>
          <span>Contribute to existing data sets
          adding more examples or languages quickly and easily.</span>
        </div>
      </div>
    </section>
    <section class="landing-page__bots">
      <div class="landing-page__bots__content text-center">
        <h1>Best bots</h1>
        <repository-card-list/>
      </div>
    </section>
    <section class="landing-page__signup">
      <div class="landing-page__singup bh-grid text-center">
        <div class="bh-grid__item">
          <h1>Join the millions of developers already using Bothub</h1>
          <bh-button
            class="landing-page__signup__button"
            size="medium"
            rounded
            secondary
            @click="openSignupModal()">Sign up for free</bh-button>
        </div>
        <div class="landing-page__signup__animation bh-grid__item">
          <div class="landing-page__signup__animation__girl"/>
          <div class="landing-page__signup__animation__shadow"/>
        </div>
      </div>
    </section>
    <site-footer />
  </div>
</template>

<script>
import SiteFooter from '@/components-v1/shared/SiteFooter';
import RepositoryCardList from '@/components/repository/RepositoryCardList';
import { mapActions } from 'vuex';
import BackgroundSvg from '!!svg-inline-loader!@/assets/imgs/bg-intro.svg';


export default {
  name: 'LandingPage',
  components: {
    SiteFooter,
    RepositoryCardList,
  },
  data() {
    return {
      BackgroundSvg,
    };
  },
  methods: {
    ...mapActions([
      'openLoginModal',
      'openSignupModal',
    ]),
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';
@import '~@/assets/scss/utilities.scss';


.landing-page {
  $max-width: 1200px;
  $margin: 1rem 0;

  &__nav {
    padding: .3rem 1rem;
    background-color: $color-white;

    &__login {
      align-self: center;
    }

    &__logo {
      min-width: ($size-normal * .75);
      padding: ($size-normal * .125) 0;
      align-self: center;

      img {
        display: block;
        height: $size-small;
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

      &__text {
        h1 {
          font-size: 4rem;
        }
        p {
          margin: $margin;
        }
        position: relative;
        width:  calc(100% * 1/2 - 1rem);
        margin-top: 5vh;
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
            from { transform: translate(0,  0px); }
            65%  { transform: translate(0, 15px); }
            to   { transform: translate(0, -0px); }
          }
        }
      }
    }
  }

  &__intro {
    background-color: $color-white;
    position: relative;
    z-index: 1;

    @media screen and (max-width: 400px) {
      background-color: #16a895;
    }

    &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 50%;
      bottom: 0;
      background-color: $color-fake-white;

      @media screen and (max-width: $mobile-width) {
        height: 80%;
        background-color: #16a895;
      }
    }

    &__background-svg {
      position: relative;
      width: 100%;
      z-index:1;
    }

    &__background {
      max-width: $max-width;
      margin: auto;
      position: relative;
      bottom: 38vw;
      z-index:1;
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

      @media screen and (max-width: $mobile-width) {
        width: 100%;
        margin: 2rem;
      }
    }
  }

  &__bots {
    position: relative;

    &__content {
      margin: auto;
      max-width: $max-repository-card-width;
    }
  }

  &__signup {
    padding: 5rem 0;
    margin: 5rem auto;
    max-width: $max-width - 200px;

    &__button {
      margin: $margin;
    }

    &__animation {
      position: relative;
      align-items: center;
      max-width: calc(100% * 1/4 - 1rem);

      @media screen and (max-width: $mobile-width) {
        display: none;
      }

      &__girl {
        z-index: 1;
        position: absolute;
        background-image: url('~@/assets/imgs/girl-with-helmet.svg');
        background-repeat: no-repeat;
        width:  300px;
        height: 300px;
        bottom: 0rem;
        animation-name: floating;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;

        @keyframes floating {
          from { transform: translate(0,  0px); }
          65%  { transform: translate(0, 15px); }
          to   { transform: translate(0, -0px); }
        }

        @media screen and (max-width: $mobile-width) {
          display: none;
        }
      }

      &__shadow {
        position: relative;
        content: '';
        top: 100%;
        height: 200px;
        width: 100%;
        left: 1.5rem;
        background: url('~@/assets/imgs/girl-shadow.svg') no-repeat;
        animation-name: floating-shadow;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;

        @keyframes floating-shadow {
          from { transform: scale(1.1); }
          65% { transform: scale(1.2); }
          to { transform: scale(1.1); }
        }
      }
    }
  }
}
</style>
