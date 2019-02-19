<template>
  <div class="sign-up">
    <div class="sign-up__wrapper-content">
      <nav class="sign-up__wrapper-content__nav">
        <div class="bh-grid bh-grid--space-between bh-grid--row">
          <router-link
            class="bh-grid__item sign-up__wrapper-content__nav__logo"
            to="/">
            <img
              src="@/assets/imgs/logo.svg"
              alt="Bothub">
          </router-link>
          <div class="sign-up__wrapper-content__nav__login">
            <span>Already have an account?</span>
            <bh-button
              class="sign-up__wrapper-content__nav__login__button"
              primary
              size="normal">Sign in</bh-button>
          </div>
        </div>
      </nav>
      <section class="bh-grid bh-grid--space-between">
        <div
          class="bh-grid__item"
          v-html="botSvg"/>
        <div class="bh-grid__item">
          <h2>Get started free</h2>
          <form @submit.prevent="onSubmit">
            <loading v-if="!formSchema" />
            <form-generator
              v-if="formSchema"
              :schema="formSchema"
              v-model="data"
              :errors="errors"
              class="field" />
            <div class="field">
              <div class="control has-text-centered">
                <bh-button
                  :disabled="submitting"
                  type="submit"
                  size="medium"
                  color="info">Get free</bh-button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
    <site-footer />
  </div>
</template>

<script>
import botSvg from '!!svg-inline-loader!@/assets/imgs/computer-bot.svg';
import { mapActions } from 'vuex';
import FormGenerator from '@/components-v1/form-generator/FormGenerator';
import Loading from '@/components-v1/shared/Loading';
import SiteFooter from '@/components-v1/shared/SiteFooter';

const components = {
  FormGenerator,
  Loading,
  SiteFooter,
};


export default {
  name: 'SignUp',
  components,
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
      botSvg,
    };
  },
  async mounted() {
    this.formSchema = await this.getRegisterSchema();
  },
  methods: {
    ...mapActions([
      'register',
      'getRegisterSchema',
    ]),
    async onSubmit() {
      this.submitting = true;
      this.errors = {};

      try {
        await this.register(this.data);
        this.$emit('registered');
        return true;
      } catch (error) {
        const data = error.response && error.response.data;
        if (data) {
          this.errors = data;
        }
        this.submitting = false;
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';
@import '~@/assets/scss/utilities.scss';


.sign-up {
  background-color: $color-white;

  &__wrapper-content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    height: 100%;

    &__nav {
      padding: .25rem 1rem;
      background-color: $color-white;

      &__login {
        align-self: center;

        &__button {
          margin: 0 1rem;
        }
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

    &__form-section {

    }
  }
}
</style>
