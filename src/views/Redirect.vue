<template>
  <div>
    <nav class="redirect-page__nav">
      <router-link class="redirect-page__nav__logo" to="/">
        <img src="@/assets/imgs/weni_logo.svg" alt="Weni" />
      </router-link>
    </nav>
    <section class="redirect-page__intro">
      <div class="redirect-page__intro__background-svg">
        <div class="redirect-page__intro__info">
          <h1 class="mb-2">
            Esta página não está mais disponível
          </h1>
          <p class="mb-5">
            Agora você deve acessar seus projetos através da plataforma
            <a href="https://dash.weni.ai/">www.dash.weni.ai</a>.
          </p>
          <p>
            Em caso de dúvidas, entre em contato conosco através do e-mail <br>
            <a href="mailto:suporte@weni.ai">suporte@weni.ai</a>.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Redirect',
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@/assets/scss/utilities.scss";

.redirect-page {
  $max-width: 1200px;
  $margin: 1rem 0;
  $moredate-margin: 3rem 0;

  &__nav {
    padding: 1.3rem 1rem 0.25rem;
    background-color: $color-white;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-family: $font-family;

    &__logo {
      min-width: ($size-normal * 0.75);
      max-width: ($size-normal * 4.3);
      padding: ($size-normal * 0.125) 0;
      align-self: center;

      img {
        display: block;
      }
    }
  }

  &__intro {
    background-color: $color-white;
    position: relative;
    z-index: 1;

    &:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 45%;
      bottom: 0;
      background-color: $color-fake-white;
    }

    &__background-svg {
      height: 120vh;
      background: url("~@/assets/imgs/illustration.svg") no-repeat;
      background-size: 100%;
      position: relative;
      width: 100%;
      z-index: 1;
      @media screen and (max-height: $mobile-width) {
        height: 130vh;
      }
    }

    &__info {
      position: relative;
      top: 20vh;
      left: 20vh;

      a {
        text-decoration: underline;
        color: #67738B;
      }

      p {
        font: 16px 'Lato';
        color: #67738B
      }

      h1 {
        font-family: 'Aleo';
        font-size: 24px;
        color: #3B414D
      }
    }
  }

}
</style>
