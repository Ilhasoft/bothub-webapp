<template>
  <div class="signup">
    <boarding-header/>
    <div class="signup__content">

      <div class="signup__content__field">
        <div class="signup__content__field__header">
          <p>{{ $t('webapp.register_form.already_have_account') }}</p>
          <b-button
            type="is-primary"
            class="signup__content__field__header__createButton"
            @click="goToLoginPage">
            {{ $t('webapp.register_form.signin') }}</b-button>
        </div>

        <div class="signup__content__field__forms">
          <h1>{{ $t('webapp.register_form.create_account_title') }}</h1>
          <form @submit.prevent="onSubmit">
            <loading v-if="!formSchema" />
            <form-generator
              v-if="formSchema"
              :schema="formSchema"
              v-model="data"
              :errors="errors"
              :show-labels="false"
              :available-max-lenght="false"
              class="field"/>
            <p
              class="signup__content__field__forms__passwordError">
              {{ confirmError }}
            </p>
            <div class="field">
              <div class="control has-text-centered">
                <b-button
                  :disabled="submitting"
                  expanded
                  class="signup__content__field__forms__button is-primary"
                  native-type="submit"
                >{{ $t('webapp.register_form.get_free') }}</b-button>
              </div>
              <div class="signup__content__field__forms__agree-message">
                <small>
                  <router-link
                    to="/terms"
                    class="signup__content__field__forms__terms">
                    {{ $t('webapp.register_form.policy_service') }}
                  </router-link>
                </small>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';
import BoardingHeader from '@/components/user/BoardingHeader';

const components = {
  FormGenerator,
  Loading,
  BoardingHeader,
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
      confirmError: '',
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
  watch: {
    authenticated() {
      this.$router.push({
        name: 'home',
      });
    },
  },
  mounted() {
    this.getAllRegisterSchema();
  },
  methods: {
    ...mapActions([
      'register',
      'getRegisterSchema',
      'login',
    ]),
    goToLoginPage() {
      this.$router.push({
        name: 'signIn',
      });
    },
    async getAllRegisterSchema() {
      const registerSchema = await this.getRegisterSchema();
      const { password } = registerSchema;
      const confirmPassword = {
        ...password, label: this.$t('webapp.register_form.confirm_password'),
      };
      this.formSchema = { ...registerSchema, confirmPassword };
    },
    async onSubmit() {
      this.submitting = true;
      this.errors = {};
      try {
        if (this.data.confirmPassword !== this.data.password) {
        // eslint-disable-next-line no-unused-expressions
          this.data.confirmPassword === ''
            ? this.confirmError = this.$t('webapp.register_form.confirm_password_empty')
            : this.confirmError = this.$t('webapp.register_form.password_didnt_match');
          this.submitting = false;
          return '';
        // eslint-disable-next-line no-else-return
        } else {
          this.confirmError = '';
        }

        if (this.data.confirmPassword === '') {
          this.confirmError = this.$t('webapp.register_form.confirm_password_empty');
          this.submitting = false;
        } else {
          this.confirmError = '';
        }

        delete this.data.confirmPassword;
        await this.register(this.data);
        this.loginUser();
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
    async loginUser() {
      const userData = {
        username: this.data.email,
        password: this.data.password,
      };

      try {
        await this.login(userData);
        this.$emit('authenticated');
        return true;
      } catch (error) {
        this.goToLoginPage();
        this.submitting = false;
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/utilities.scss';

.signup{
  background-color: $color-fake-white;

  &__content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 5.5rem);
  background-color: $color-fake-white;

    &__field{
      width: 36rem;
      height: 35.125rem;

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
        height: 31.5rem;
        width: 576px;
        padding: 2rem 4rem;
        background-color: $color-white;
        box-shadow: 0px 3px 6px #00000029;

        h1{
          color:$color-primary;
          font-family: $font-family;
          font-size: 2.563rem;
          text-align: center;
        }

        &__passwordError{
          color: #ff3860;
          font-size: 0.75rem;
          margin: -1.4rem 0px;
        }

        &__agree-message {
          margin: auto;
          width: 16rem;
          line-height: 0.8;
          color: #707070;
          text-align: center;
        }
        &__terms{
          color: #707070;
          font-size: 12px;
          font-family: $font-family;
          text-align: center;
          &:hover{
            color: #2BBFAC;
          }
        }
        &__button{
          margin: 1.5rem auto 0.8rem ;
          width: 9.813rem;
          height: 2.188rem;
          border-radius: 6px;
          box-shadow: 0px 3px 6px #00000029;
          font-weight: $font-weight-bolder;
          font-family: $font-family;
          font-size: $font-size;
        }
        @media screen and (max-width: 40em) {
           width: 30rem;
      }

      }
        @media screen and (max-width: 40em) {
           width: 30rem;
      }
    }
  }
}

</style>
