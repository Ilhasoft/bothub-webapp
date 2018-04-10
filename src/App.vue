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
html,
body,
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: sans-serif;
  color: #2c3e50;
}
</style>
