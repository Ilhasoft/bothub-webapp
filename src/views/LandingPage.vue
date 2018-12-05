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
          <strong class="text-color-primary">Sign in</strong>
          <span>or</span>
          <strong class="text-color-primary">Sign up</strong>
        </div>
      </div>
    </nav>
    <header class="layout__header">
      <div class="layout__header__content">
        <div class="layout__header__content__text">
          <h1>Build, Optimize and Train</h1>
          <p>Be part of an open source and democratic global community that builds,
          trains and shares data sets.</p>
          <bh-button
            size="medium"
            rounded
            primary>Join us for free</bh-button>
        </div>
        <div class="layout__header__content__animation" />
      </div>
    </header>

    <section class="layout__intro">
      <div class="layout__intro__background"/>
    </section>
    <section/>
    <section/>
    <site-footer />
  </div>
</template>

<script>
import SiteFooter from '@/components-v1/shared/SiteFooter';


export default {
  name: 'LandingPage',
  components: {
    SiteFooter,
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';
@import '~@/assets/scss/utilities.scss';


.layout {
  $loading-height: .3rem;

  &__nav {
    padding: $loading-height 1rem;
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
      margin: auto;
      max-width: 1000px;


      &__text {
        float: left;
      }

      &__animation {
        position: relative;
        background-image: url('~@/assets/imgs/network.svg');
        background-repeat: no-repeat;

        width: 300px;
        height: 300px;
        display: inline-block;

        &:before {
          position: absolute;
          content: '';
          height: 300px;
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
    height: 500px;

    &__background {
      background: url('~@/assets/imgs/bg-intro.svg') no-repeat;
      background-repeat: no-repeat;
    }
  }
}
</style>
