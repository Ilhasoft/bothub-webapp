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
@import url('https://fonts.googleapis.com/css?family=Encode+Sans:300,400,500,700|Roboto:300,400,700,900');

@import "~bulma/sass/utilities/_all";

$primary: #26c2b1;
$primary-invert: findColorInvert($primary);

$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

$family-sans-serif: 'Encode Sans', sans-serif;

@import "~bulma";
@import "~buefy/src/scss/buefy";

* {
 box-sizing: border-box;
}

body {
  background-image: url('~@/assets/imgs/bg.jpg');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}
</style>
