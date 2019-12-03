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
        expanded >
        <b-tab-item label="Login">
          <login-form
            @authenticated="onAuthenticated"
            @forgotPasswordClick="showForgotPasswordTab" />
        </b-tab-item>
        <b-tab-item
          :visible="activeTab === 1"
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
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
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
      activeTab: this.currentTab === 'signin' ? 0 : 1,
    };
  },
  computed: {
    ...mapGetters({
      open: 'loginModalOpen',
      next: 'loginModalNext',
      redirectToWhenFails: 'loginModalRedirectToWhenFails',
    }),
  },
  mounted() {
    this.activeTab = 0;
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
      this.activeTab = 1;
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
