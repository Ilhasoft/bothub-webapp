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

$primary-light: #b3f0be;

$colors: join(("primary-light": ($primary-light, #099081)), $colors);

$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

$family-sans-serif: 'Encode Sans', sans-serif;

@import "~bulma";
@import "~buefy/src/scss/buefy";

* {
 box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}

body {
  background-image: url('~@/assets/imgs/bg.jpg');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}
</style>
