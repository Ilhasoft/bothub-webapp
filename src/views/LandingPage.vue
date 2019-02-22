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
            @click="signUpRedirect()">Sign up</strong>
        </div>
      </div>
    </nav>
    <header class="landing-page__header">
      <div class="landing-page__header__content bh-grid">
        <div class="landing-page__header__content__text bh-grid__item">
          <h1>Build, Optimize and Train</h1>
          <p>Be part of an open source and democratic global community that builds,
          trains and shares datasets.</p>
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
          <h2>Build your AI</h2>
          <span>Create repositories with example sentences contextualized.</span>
        </div>
        <div class="landing-page__intro__item bh-grid bh-grid--column text-center">
          <img src="~@/assets/imgs/cloud.svg">
          <h2>Share datasets</h2>
          <span>You can choose from various ready-to-use datasets.</span>
        </div>
        <div class="landing-page__intro__item bh-grid bh-grid--column text-center">
          <img src="~@/assets/imgs/talk-balloon.svg">
          <h2>Join the community</h2>
          <span>Contribute to existing datasets adding more
          examples or new language support.</span>
        </div>
      </div>
    </section>
    <section class="landing-page__bots">
      <div class="landing-page__bots__content text-center">
        <h1 class="landing-page__bots__content__title">Best bots</h1>
        <repository-card-list
          :show-more-button="false"
          limit="6"/>
        <bh-button
          class="landing-page__bots__content__button"
          size="medium"
          primary
          @click="showAllBots()"> All bots </bh-button>
      </div>
    </section>
    <section class="landing-page__signup">
      <div class="landing-page__singup bh-grid text-center">
        <div class="bh-grid__item bh-grid__item">
          <h1>Join the millions of developers already using Bothub</h1>
          <bh-button
            class="landing-page__signup__button"
            size="medium"
            rounded
            secondary
            @click="signUpRedirect()">Sign up for free</bh-button>
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
import { mapActions, mapGetters } from 'vuex';
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
      this.openLoginModal();
    }
  },
  methods: {
    ...mapActions([
      'openLoginModal',
    ]),
    showAllBots() {
      this.$router.push({
        name: 'home',
      });
    },
    signUpRedirect() {
      this.$router.push({
        name: 'signUp',
      });
    },
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
  $moredate-margin: 3rem 0;

  &__nav {
    padding: .25rem 1rem;
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

      @media screen and (max-width: $mobile-width) {
        padding: 1rem 0;
      }

      &__text {
        position: relative;
        width:  calc(100% * 1/2 - 1rem);
        margin-top: 5vh;

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
      position: relative;
      width: 100%;
      z-index:1;
    }

    &__background {
      max-width: $max-width;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      margin: auto;
      position: absolute;
      bottom: 50%;
      z-index:1;

      @media screen and (max-width: $mobile-width) {
        flex-direction: column;
        position: relative;
        transform: translateY(0);
        top: -20vw;
        background-color: #1aac9a;
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
      max-width: $max-width;

      &__title {
        margin: $moredate-margin;
      }

      &__button {
         margin: $moredate-margin;
      }
    }
  }

  &__signup {
    height: 350px;
    padding: 5rem 0;
    margin: 3rem auto;
    max-width: $max-width - 500px;

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
