<template>
  <div>
    <nav class="layout__nav">
      <div class="bh-grid bh-grid--space-between bh-grid--row">
        <router-link
          class="bh-grid__item layout__nav__logo"
          to="/">
          <img
            src="@/assets/imgs/logo.svg"
            alt="Bothub">
        </router-link>
        <div class="text-color-primary layout__nav__account">
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
    <header class="layout__header">
      <div class="layout__header__content bh-grid">
        <div class="layout__header__content__text bh-grid__item">
          <h1>Build, Optimize and Train</h1>
          <p>Be part of an open source and democratic global community that builds,
          trains and shares data sets.</p>
          <bh-button
            size="medium"
            rounded
            primary>Join us for free</bh-button>
        </div>
        <div class="layout__header__content__animation bh-grid__item" />
      </div>
    </header>
    <section class="layout__intro">
      <div
        class="layout__intro__background-svg"
        v-html="BackgroundSvg"/>
      <div class="layout__intro__background bh-grid bh-grid--space-between">
        <div class="layout__intro__item bh-grid bh-grid--column">
          <div class="layout__intro__item__icon"/>
          <h2>Create new AI</h2>
          <span>Create repositories with example sentences and improve your bot intelligence.</span>
        </div>
        <div class="layout__intro__item bh-grid bh-grid--column">
          <div class="layout__intro__item__icon"/>
          <h2>Use existing data sets</h2>
          <span>You can choose from various ready-to-use data sets.</span>
        </div>
        <div class="layout__intro__item bh-grid bh-grid--column">
          <div class="layout__intro__item__icon"/>
          <h2>Build a community</h2>
          <span>Contribute to existing data sets
          adding more examples or languages quickly and easily.</span>
        </div>
      </div>
    </section>
    <section class="layout__bots">
      <div class="layout__bots__content text-center">
        <h1>Best bots</h1>
        <repository-card-list/>
      </div>
    </section>
    <section class="layout__signup">
      <div class="layout__singup bh-grid text-center">
        <div class="layout__signup__info bh-grid__item">
          <h1>Join the millions of developers already using Bothub</h1>
          <bh-button
            size="medium"
            rounded
            secondary>Sign up for free</bh-button>
        </div>
        <div class="layout__signup__animation bh-grid__item" />
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


.layout {
  $max-width: 1200px;

  &__nav {
    padding: .3rem 1rem;
    background-color: $color-white;

    &__account {
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
        position: relative;
        width:  calc(100% * 1/2 - 1rem);
        margin-top: 5vh;
        // float: left;
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

      &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 50%;
      bottom: 0;
      background-color: $color-fake-white;

      @media screen and (max-width: $mobile-width) {
        height: 80%;
        background-color: #25b3a0;
      }
    }

    &__background-svg {
      position: relative;
      width: 100%;
      z-index:1;
    }

    &__background {
      max-width: ($max-width );
      margin: auto;
      position: relative;
      bottom: 50vw;
      z-index:1;
    }

    &__item {
       align-items: center;
       align-self: center;
       width:  calc(100% * 1/3 - 1rem);

      @media screen and (max-width: $mobile-width) {
        width: 100%;
        margin: 2rem;
      }

      span, h2 {
        color: $color-white;
      }

      &__icon {
        background: url('~@/assets/imgs/hand.svg') no-repeat;
        height: 8rem;
        width: 8rem;
        border-radius: 50%;
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
    margin: auto;
    max-width: $max-width - 200px;
    align-items: center;

    &__info {
      width:  calc(100% * 1/2 - 1rem);
      margin-top: 10vh;
      // float: left;
    }

      &__animation {
        // position: relative;
        background-image: url('~@/assets/imgs/girl-with-helmet.svg');
        background-repeat: no-repeat;
        width:  max-content;
        height: 300px;
        // display: inline-block;
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

        &:before {
          position: absolute;
          content: '';
          top: 100%;
          height: 200px;
          width: 50%;
          left: 0rem;
          background: url('~@/assets/imgs/girl-shadow.svg') no-repeat;
          animation-name: floating;
          animation-duration: 4s;
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
</style>
