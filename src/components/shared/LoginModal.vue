<template>
  <modal ref="loginModal" v-if="open">
    <login-form @authenticated="onAuthenticated" />
    <p><button
      ref="cancelBtn"
      @click="closeLoginModal">cancel</button></p>
  </modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Modal from '@/components/shared/Modal';
import LoginForm from '@/components/auth/LoginForm';

const components = {
  Modal,
  LoginForm,
};

export default {
  name: 'LoginModal',
  components,
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
      if (this.next) this.$router.push(this.next.path);
      this.closeLoginModal();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
