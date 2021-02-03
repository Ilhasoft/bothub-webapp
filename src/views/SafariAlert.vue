<template>
  <div class="safari-alert">
    <div class="safari-alert__content">
      <img
        src="@/assets/imgs/botinho.png"
        alt="botinho">
      <h3 class="safari-alert__content__title">
        {{ $t('webapp.safari_alert.title1') }}
      </h3>
      <h3 class="safari-alert__content__title">
        {{ $t('webapp.safari_alert.title2') }}
      </h3>
      <div class="safari-alert__content__grid">
        <a
          href="https://www.google.com/intl/pt-BR_ALL/chrome/">
          <img
            src="@/assets/imgs/chrome.svg"
            alt="chrome"
            class="safari-alert__content__browser-icon">
        </a>
        <a
          href="https://www.mozilla.org/pt-BR/firefox/new/">
          <img
            src="@/assets/imgs/mozila.svg"
            alt="mozila"
            class="safari-alert__content__browser-icon">
        </a>
        <a
          href="https://www.opera.com/pt-br/download">
          <img
            src="@/assets/imgs/opera.svg"
            alt="opera"
            class="safari-alert__content__browser-icon">
        </a>
      </div>
      <b-button
        class="safari-alert__content__button"
        size="normal"
        type="is-primary"
        @click="goToLandingPage()">
        {{ $t('webapp.safari_alert.keep_using_safari') }}
      </b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SafariAlert',
  beforeMount() {
    const chrome = navigator.userAgent.indexOf('Chrome') > -1;
    const safari = navigator.userAgent.indexOf('Safari') > -1;

    if (!safari || chrome) {
      this.$router.push({
        name: 'landingPage',
      });
    }
  },
  methods: {
    goToLandingPage() {
      this.$router.push({
        name: 'landingPage',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/utilities.scss';


.safari-alert{
  background-color: $color-white;

  &__content {
    background-color: $color-white;
    margin: 4rem auto;
    text-align: center;
    max-width: $max-repository-card-width - 300px;

    &__grid {
      display: flex;
      justify-content: space-around;
    }

    &__title {
      margin: 3rem;
    }

    &__browser-icon {
      height: 5rem;
      margin: 0 auto;
      cursor: pointer;
      transition: all .3s ease-in-out;

      &:hover {
        transform: scale(1.2);
      }
    }

    &__button {
      margin-top: 2rem;
    }
  }
}
</style>
