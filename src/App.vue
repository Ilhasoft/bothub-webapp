<template>
  <div id="app">
    <news-modal />
    <router-view />
    <!-- <tutorial-modal
      :open="activeMenu"/> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NewsModal from '@/components/NewsModal';
import hotjar from '@/utils/plugins/hotjar';
// import TutorialModal from '@/components/TutorialModal';
import unnic from '@weni/unnnic-system';
import I18n from '@/utils/plugins/i18n';

const components = {
  NewsModal,
  I18n
  // TutorialModal,
};

export default {
  name: 'App',
  components,
  computed: {
    ...mapGetters([
      'activeMenu',
    ]),
    dynamicTitle() {
      if (I18n.locale === 'pt-BR') {
        return 'Weni Inteligência Artificial'
      }
      return 'Weni Artificial Intelligence'
    },
  },
  mounted() {
    document.title = this.dynamicTitle;
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
@import '~@/assets/scss/default.scss';
@import '~bulma';
@import '~buefy/src/scss/buefy';
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';
@import '~@weni/unnnic-system/dist/unnnic.css';
@import '~@weni/unnnic-system/src/assets/scss/unnnic.scss';

::-webkit-scrollbar {
  width: 0.3rem;
}

::-webkit-scrollbar-track {
  background: #e9e9ec;
}

::-webkit-scrollbar-thumb {
  background: $color-primary;
  border-radius: 1rem;
}

::-webkit-scrollbar-thumb:hover {
  background: $color-primary;
}

:not(.quick-test, .notices) {
  pointer-events: visible;
}
.container-padding {
  padding: 0 8px;
}

.button[disabled] {
  background-color: $color-grey-dark !important;
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

.clickable {
  cursor: pointer;
  outline: none;
}

.icon-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none !important;
  > * {
    pointer-events: none !important;
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

body {
  font-family: $font-family;
}

</style>
