<template>
  <div id="app">
    <login-modal
      ref="loginModal"
      v-if="loginModalOpen" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoginModal from '@/components/shared/LoginModal';

const components = {
  LoginModal,
};

export default {
  name: 'App',
  components,
  computed: {
    ...mapGetters(['loginModalOpen']),
  },
};
</script>

<style lang="scss">
</style>
