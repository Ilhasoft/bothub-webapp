<template>
  <b-modal
    :active="open"
    @close="onClose()">
    <div
      v-if="open"
      class="card">
      <b-tabs
        v-model="activeTab"
        position="is-centered"
        expanded>
        <b-tab-item label="Create account">
          <register-form @registered="onRegistered" />
        </b-tab-item>
        <b-tab-item label="Login">
          <login-form
            @authenticated="onAuthenticated"
            @forgotPasswordClick="showForgotPasswordTab" />
        </b-tab-item>
        <b-tab-item
          :visible="activeTab === 2"
          label="Forgot password">
          <forgot-password-form />
        </b-tab-item>
      </b-tabs>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoginForm from '@/components/auth/LoginForm';
import ForgotPasswordForm from '@/components-v1/auth/ForgotPasswordForm';
import RegisterForm from '@/components/auth/RegisterForm';

const components = {
  LoginForm,
  ForgotPasswordForm,
  RegisterForm,
};

export default {
  name: 'LoginModal',
  components,
  props: {
    currentTab: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      activeTab: this.currentTab === 'signin' ? 1 : 0,
    };
  },
  computed: {
    ...mapGetters({
      open: 'loginModalOpen',
      next: 'loginModalNext',
      redirectToWhenFails: 'loginModalRedirectToWhenFails',
    }),
  },
  methods: {
    ...mapActions({
      close: 'closeLoginModal',
    }),
    onAuthenticated() {
      if (this.next) {
        this.$router.push(this.next.path || this.next);
      }
      this.close();
    },
    onRegistered() {
      /* istanbul ignore next */
      this.activeTab = 1;
    },
    showForgotPasswordTab() {
      /* istanbul ignore next */
      this.activeTab = 2;
    },
    onClose() {
      if (this.redirectToWhenFails) {
        this.$router.push(
          this.redirectToWhenFails.path || this.redirectToWhenFails,
        );
      }
      this.close();
    },
  },
};
</script>
