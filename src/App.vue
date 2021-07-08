<template>
  <div id="app">
    <news-modal />
    <router-view />
    <!-- <tutorial-modal
      :open="activeMenu"/> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NewsModal from '@/components/NewsModal';
import hotjar from '@/utils/plugins/hotjar';
import unnic from '@weni/unnnic-system';
import I18n from '@/utils/plugins/i18n';
import store from './store';

const components = {
  NewsModal,
  I18n
};

export default {
  name: 'App',
  components,
  computed: {
    ...mapGetters(['activeMenu']),
    dynamicTitle() {
      if (I18n.locale === 'pt-BR') {
        return 'Weni Inteligência Artificial';
      }
      return 'Weni Artificial Intelligence';
    }
  },
  created() {
    window.addEventListener('message', (event) => {
      const prefix = 'connect:';
      const content = String(event.data);
      if (content.startsWith(prefix)) {
        const eventMessage = content.substr(prefix.length);
        const type = eventMessage.substr(0, eventMessage.indexOf(':'));
        const data = {
          ...JSON.parse(eventMessage.substr(type.length + 1)),
          origin: event.origin,
        };
        if (type === 'updateExternalToken') {
          store.dispatch('externalLogin', { token: data.data.token });
        }
      }
    });
  },
  mounted() {
    document.title = this.dynamicTitle;
    hotjar.addHotjar();
    this.safariDetected();
    this.profileInfo();
  },
  methods: {
    ...mapActions(['getMyProfileInfo', 'setUserName']),
    async profileInfo() {
      const { data } = await this.getMyProfileInfo();
      if (data){
        this.setUserName(data.name)
        if (data.language) {
          const [first, second] = data.language.split('-');
          const secondUpperCase = second.toUpperCase();
          const languageResult = `${first}-${secondUpperCase}`;
          this.$i18n.locale = languageResult;
        }
      }
    },
    safariDetected() {
      if (
        navigator.userAgent.indexOf('Safari') !== -1
        && navigator.userAgent.indexOf('Chrome') === -1
      ) {
        this.$router.push({
          name: 'safari-alert'
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/utilities.scss";
@import "~@/assets/scss/default.scss";
@import "~bulma";
@import "~buefy/src/scss/buefy";
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: $unnnic-color-neutral-soft;
}

::-webkit-scrollbar-thumb {
  background: $unnnic-color-neutral-clean;
  border-radius: $unnnic-border-radius-pill;
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
  ("selected", $grey-lighter, black),
  ("sunflower", #ffc312, black),
  ("energos", #c4e538, black),
  ("blue-martina", #12cbc4, black),
  ("lavender-rose", #fda7df, black),
  ("bara-red", #ed4c67, white),
  ("radiant-yellow", #f79f1f, white),
  ("android-green", #a3cb38, white),
  ("mediterranean-sea", #1289a7, white),
  ("lavender-tea", #d980fa, black),
  ("very-berry", #b53471, white)
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
  margin-bottom: 0.5rem;
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
