<template>
  <div
    class="notification">
    <div class="notification__field">
      <span class="notification__field__title">
        {{ $t('webapp.weni_notification.title') }}
      </span>
      <span class="notification__field__division"/>
      <span class="notification__field__subtitle">
        {{ $t('webapp.weni_notification.subtitle') }}
      </span>
      <a :href="checkLanguage.weni">
        <b-button
          rounded
          class="notification__field__button"
        >{{ $t('webapp.weni_notification.button') }}</b-button>
      </a>
    </div>
  </div>
</template>

<script>
import I18n from '@/utils/plugins/i18n';

export default {
  name: 'WeniNotication',
  computed: {
    checkLanguage() {
      if (I18n.locale === 'pt-BR') {
        return {
          weni: 'https://www.ilhasoft.com.br/somos-weni ',
        };
      }
      return {
        weni: 'https://www.ilhasoft.com.br/we-are-weni ',
      };
    },
  },
};

</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.notification {
  width: 100%;
  height: 5.25rem;
  background-color: $color-primary-light;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  @media screen and (max-width: $mobile-width) {
    height: 12rem;
  }

    &__field {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      color: $color-fake-black;
      @media screen and (max-width: $mobile-width) {
        flex-direction: column;
        width: 100%;
      }

      &__title {
        font-size: 1.3rem;
        font-family: Roboto slab;
        line-height: 1.4rem;
        width: 40%;
        text-shadow: 0px 1px 1px #00000029;
        @media screen and (max-width: $mobile-width) {
          width: 100%;
          text-align: center;
        }
      }

      &__subtitle {
        font-size: 0.9rem;
        width: 90%;
        @media screen and (max-width: $mobile-width) {
           width: 100%;
           text-align: center;
           padding-bottom: 1rem;
        }
      }

      &__division{
        border-right: 2px solid $color-fake-grey;
        height: 2rem;
        margin-right: 3.5%;
         @media screen and (max-width: $mobile-width) {
           border-right: none;
        }
      }

      a {
        text-decoration: none !important;
      }

      &__button{
        background-color: $color-primary-dark;
        border-color: $color-primary-dark;
        color: $color-white;
        font-family: Roboto slab;
        transition: 0.5s ease;
        font-size: 1.1rem;
        margin-left: 2%;
        font-weight: $font-weight-medium;

        &:hover{
            background-color: $color-primary;
            border-color: $color-primary;
        }

      }
    }
  }

</style>
