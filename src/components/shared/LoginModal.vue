<template>
  <modal ref="loginModal">
    <div v-show="tab === 'login'">
      <login-form @authenticated="onAuthenticated" />
      <p><a href="" @click.prevent="showForgotPassword">forgot password?!</a></p>
    </div>
    <div v-show="tab === 'forgot-password'">
      <forgot-password-form />
    </div>
    <p><button
      ref="cancelBtn"
      @click="closeLoginModal">cancel</button></p>
  </modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Modal from '@/components/shared/Modal';
import LoginForm from '@/components/auth/LoginForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const components = {
  Modal,
  LoginForm,
  ForgotPasswordForm,
};

export default {
  name: 'LoginModal',
  components,
  data() {
    return {
      tab: 'login',
    };
  },
  computed: {
    ...mapGetters({
      open: 'loginModalOpen',
      next: 'loginModalNext',
    }),
  },
  methods: {
    ...mapActions([
      'closeLoginModal',
    ]),
    onAuthenticated() {
      if (this.next && this.$router) this.$router.push(this.next.path);
      this.closeLoginModal();
    },
    showForgotPassword() {
      this.tab = 'forgot-password';
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
