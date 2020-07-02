<template>
  <div class="recover-password">
    <boarding-header/>
    <div class="recover-password__content">
      <div class="recover-password__content__field">
        <div class="recover-password__content__field__forms">
          <h1>{{ $t('webapp.recover_form.recover') }}</h1>
          <reset-password-form
            :nickname="$route.params.nickname"
            :token="$route.params.token" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import BoardingHeader from '@/components/user/BoardingHeader';

const components = {
  ResetPasswordForm,
  BoardingHeader,
};

export default {
  name: 'ResetPassword',
  components,
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
  min-height: 100vh;
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
