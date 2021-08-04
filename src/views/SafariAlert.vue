<template>
  <div class="safari-alert">
    <div class="safari-alert__content">
      <article class="safari-alert__content__article">
      <h3 class="safari-alert__content__title">
        {{ $t('webapp.safari_alert.title') }}
      </h3>
      <p class="safari-alert__content__text">
        {{ $t('webapp.safari_alert.text') }}
      </p>
      </article>
      <div class="safari-alert__content__grid">
        <a
          href="https://www.mozilla.org/pt-BR/firefox/new/">
          <img
            src="@/assets/imgs/mozila.svg"
            alt="mozila"
            class="safari-alert__content__browser-icon">
            <p>Firefox</p>
        </a>
         <a
          href="https://www.google.com/intl/pt-BR_ALL/chrome/">
          <img
            src="@/assets/imgs/chrome.svg"
            alt="chrome"
            class="safari-alert__content__browser-icon">
            <p>Chrome</p>
        </a>
        <a
          href="https://www.opera.com/pt-br/download">
          <img
            src="@/assets/imgs/opera.svg"
            alt="opera"
            class="safari-alert__content__browser-icon">
            <p>Opera</p>
        </a>
      </div>
      <b-button
        class="safari-alert__content__button"
        size="normal"
        @click="goToLandingPage()">
        {{ $t('webapp.safari_alert.button') }}
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
@import "~@/assets/scss/utilities.scss";
@import "~@/assets/scss/default.scss";
@import "~bulma";
@import "~buefy/src/scss/buefy";
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.safari-alert{
  background-color: $color-white;

  &__content {
    font-family: 'Aleo', serif;
    background-color: $color-white;
    margin: 4rem auto;
    text-align: center;
    max-width: $max-repository-card-width - 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    &__grid {
      display: flex;
      justify-content: space-around;
    }

    &__title {
      margin-top: 3rem;
      font-size: 2rem;
    }

    &__text{
      font-family: 'Lato', sans-serif;
      margin: 1rem 1rem 3.3rem;
      text-align: center;
      line-height: 24px;

      @media (min-width: 992px){
        margin: 1rem 14rem 3rem;
      }
    }
    a {
      display: flex;
      flex-direction: column;
      color: $dark;

      p{
        font-family: 'Lato', sans-serif;
        margin-top: 5px;
      }
    }
    &__browser-icon {
      height: 2.5rem;
      margin: 0 auto;
      cursor: pointer;
      transition: all .3s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }

    &__button {
      margin-top: 3rem;
      border: none;
      text-decoration: underline;

      &:hover{
        font-weight: 700;
      }
    }
  }
}
</style>
