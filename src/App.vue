<template>
  <div id="app">
    <bh-toast-notification />
    <news-modal />
    <login-modal
      v-if="loginModalOpen"
      ref="loginModal"
      :current-tab="loginModalTabValue" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoginModal from '@/components/shared/LoginModal';
import NewsModal from '@/components/shared/NewsModal';
import hotjar from '@/utils/plugins/hotjar';

const components = {
  LoginModal,
  NewsModal,
};

export default {
  name: 'App',
  components,
  computed: {
    ...mapGetters([
      'loginModalOpen',
      'loginModalTabValue',
    ]),
  },
  mounted() {
    hotjar.addHotjar();
    this.safariDetected();
  },
  methods: {
    safariDetected() {
      if (navigator.userAgent.indexOf('Safari') !== -1
      && navigator.userAgent.indexOf('Chrome') === -1) {
        this.$router.push({
          name: 'safari-alert',
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/utilities.scss';
@import '~bulma';
@import '~buefy/src/scss/buefy';
@import '~bh/src/assets/scss/bh.scss';
@import '@mdi/font/css/materialdesignicons.css';
@import 'highlight.js/styles/github.css';


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

@keyframes iconSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.icon-spin {
  animation-name: iconSpin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.item {
  margin-bottom: 1rem;
}

.item-1-2 {
  margin-bottom: .5rem;
}

.mh-200 {
  max-height: 200px;
}

.align-items-center {
  align-items: center;
}
</style>
