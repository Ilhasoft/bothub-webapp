<template>
  <b-modal :active="open" @close="close">
    <div class="card">
      <b-tabs
        v-model="activeTab"
        position="is-centered"
        expanded>
        <b-tab-item label="Me Registered">
          <p>comming soon...</p>
        </b-tab-item>
        <b-tab-item label="I have registered">
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
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const components = {
  LoginForm,
  ForgotPasswordForm,
};

export default {
  name: 'LoginModal',
  components,
  data() {
    return {
      activeTab: 1,
    };
  },
  computed: {
    ...mapGetters({
      open: 'loginModalOpen',
      next: 'loginModalNext',
    }),
  },
  methods: {
    ...mapActions({
      close: 'closeLoginModal',
    }),
    onAuthenticated() {
      if (this.next && this.$router) this.$router.push(this.next.path);
      this.close();
    },
    showForgotPasswordTab() {
      this.activeTab = 2;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
