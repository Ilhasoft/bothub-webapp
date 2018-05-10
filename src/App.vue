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
@import '~@/assets/scss/utilities.scss';
@import '~bulma';
@import '~buefy/src/scss/buefy';

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
  background-attachment: fixed;
}

.container-padding {
  padding: 0 8px;
}

// based on https://flatuicolors.com/palette/nl
$entities-colors: (
  ('selected', $grey-lighter, black),
  ('sunflower', #FFC312, black),
  ('energos', #C4E538, black),
  ('blue-martina', #12CBC4, black),
  ('lavender-rose', #FDA7DF, black),
  ('bara-red', #ED4C67, white),
  ('radiant-yellow', #F79F1F, white),
  ('android-green', #A3CB38, white),
  ('mediterranean-sea', #1289A7, white),
  ('lavender-tea', #D980FA, black),
  ('very-berry', #B53471, white),
);

@each $entity-color in $entities-colors {
  $name: nth($entity-color, 1);
  $bg: nth($entity-color, 2);
  $color: nth($entity-color, 3);

  .entity-#{$name},
  .entity-#{$name}:not(.body) {
    color: $color;
    background-color: $bg;
  }
}
</style>
