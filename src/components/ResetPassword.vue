<template>
  <boarding-layout>
    <div class="recover-password">
      <div class="recover-password__content">
        <div class="recover-password__content__field">
          <div class="recover-password__content__field__header">
            <p>{{ $t('webapp.register_form.already_have_account') }}</p>
            <b-button
              type="is-primary"
              class="recover-password__content__field__header__createButton"
              @click="goToLoginPage">
              {{ $t('webapp.register_form.signin') }}</b-button>
          </div>
          <div class="recover-password__content__field__forms">
            <h1>{{ $t('webapp.recover_form.recover') }}</h1>
            <reset-password-form
              :nickname="$route.params.nickname"
              :token="$route.params.token" />
          </div>
        </div>
      </div>
    </div>
  </boarding-layout>
</template>

<script>
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import BoardingLayout from '@/components/user/BoardingLayout';

const components = {
  ResetPasswordForm,
  BoardingLayout,
};

export default {
  name: 'ResetPassword',
  components,
  methods: {
    goToLoginPage() {
      this.$router.push({
        name: 'signIn',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.recover-password{

  &__content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 5.5rem);
  background-color: $color-fake-white;


    &__field{
      width: 36rem;
      max-height: 25.938rem;

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

        padding: 2rem 4.5rem;
        background-color: $color-white;
        box-shadow: 0px 3px 6px #00000029;

        h1{
          color:$color-primary;
          font-family: $font-family;
          font-size: 2.563rem;
          text-align: center;
        }

      }
        @media screen and (max-width: 40em) {
           width: 30rem;
      }
    }
  }
}

</style>
