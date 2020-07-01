<template>
  <boarding-layout>
    <div class="login">
      <div class="login__content">
        <div class="login__content__field">
          <div class="login__content__field__header">
            <p>{{ $t('webapp.login_form.dont_have_account') }}</p>
            <b-button
              type="is-primary"
              class="login__content__field__header__createButton"
              @click="goToCreate">
              {{ $t('webapp.login_form.get_free') }}
            </b-button>
          </div>

          <div class="login__content__field__forms">
            <h1>{{ $t('webapp.login_form.login') }}</h1>
            <login-form
              @authenticated="onAuthenticated"
              @forgotPasswordClick="showForgotPasswordTab" />
          </div>
        </div>
      </div>
    </div>
  </boarding-layout>
</template>

<script>
import BoardingLayout from '@/components/user/BoardingLayout';
import FormGenerator from '@/components/form-generator/FormGenerator';
import LoginForm from '@/components/auth/LoginForm';

export default {
  name: 'SignIn',
  components: {
    BoardingLayout,
    FormGenerator,
    LoginForm,
  },
  methods: {
    onAuthenticated() {
      this.$router.push({
        name: 'home',
      });
    },
    goToCreate() {
      this.$router.push({
        name: 'signUp',
      });
    },
    showForgotPasswordTab() {
      this.$router.push({
        name: 'recoverpassword',
      });
    },
  },
};

</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.login{

  &__content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 5.5rem);
  background-color: $color-fake-white;

    &__field{
      width: 36rem;
      height: 25.25rem;

      &__header{
        display:flex;
        justify-content: flex-end;
        margin-bottom: 1.5rem;

        p{
          font-family: $font-family;
          font-size: 1rem;
          color:$color-fake-black;
          margin-right: 1rem;
          margin-top:1rem;
        }
        &__createButton{
          width: 6.875rem;
          height: 2.188rem;
          margin-top: 0.15rem;
          border-radius: 6px;
          box-shadow: 0px 3px 6px #00000029;
          font-weight: $font-weight-bolder;
          font-family: $font-family;
          font-size: $font-size;
    }
      }

      &__forms{
        max-height: 27rem;
        padding: 2rem 4.5rem;
        background-color: $color-white;
        box-shadow: 0px 3px 6px #00000029;

        h1{
          color:$color-primary;
          font-family: $font-family;
          font-size: 2.563rem;
          text-align: center;
            @media screen and (max-width: 40em) {
            font-size: 2rem;
            }
        }

      }
        @media screen and (max-width: 40em) {
           width: 30rem;
      }
    }
  }
}

</style>
