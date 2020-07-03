<template>
  <div
    :class="{
      layout: true,
      'layout--without-background': withoutBackground,
  }">
    <div
      v-if="loading"
      class="layout__loading">
      <div class="layout__loading__progress" />
    </div>
    <div class="layout__header">
      <div class="bh-grid bh-grid--space-between bh-grid--row">
        <router-link
          class="bh-grid__item layout__header__logo"
          to="/">
          <img
            src="@/assets/imgs/logo-white.svg"
            alt="Bothub"
            class="hide-mobile">
          <img
            src="@/assets/imgs/icon-white.svg"
            alt="Bothub"
            class="hide-desktop">
        </router-link>
        <div
          v-if="$slots.center"
          class="bh-grid__item layout__header__center">
          <slot name="center" />
        </div>
        <div class="bh-grid__item bh-grid__item--nested">
          <div class="bh-grid bh-grid--row layout__header__options">
            <div
              v-if="authenticated"
              class="bh-grid__item hide-mobile">
              <router-link :to="'new'">
                <b-button
                  type="is-primary"
                  inverted
                  rounded>
                  <strong>{{ $t('webapp.layout.newbot') }}</strong>
                </b-button>
              </router-link>
            </div>
            <div
              v-if="authenticated"
              class="bh-grid__item layout__header__icon-tutorial--center">
              <bh-icon-button
                class="layout__header__icon-tutorial"
                size="medium"
                value="question"
                @click="openBeginnerTutorialModal()"
              />
            </div>
            <div
              v-if="authenticated"
              class="bh-grid__item">
              <bh-dropdown position="left">
                <user-avatar
                  slot="trigger"
                  :profile="myProfile" />
                <b-icon
                  slot="trigger"
                  icon="chevron-down"
                  class="layout__header__icon"/>
                <bh-dropdown-item @click="openMyProfile()">
                  {{ myProfile.name || '...' }}
                </bh-dropdown-item>
                <bh-dropdown-item
                  @click="openNewRepository()">
                  {{ $t('webapp.layout.start_you_bot') }}
                </bh-dropdown-item>
                <bh-dropdown-item @click="logout()">
                  {{ $t('webapp.layout.logout') }}
                </bh-dropdown-item>
              </bh-dropdown>
            </div>
            <div
              v-if="!authenticated"
              class="bh-grid__item">
              <bh-button
                color="fake-white"
                transparent
                max-content
                @click="signIn()">{{ $t('webapp.layout.signin') }}</bh-button>
            </div>
            <div
              v-if="!authenticated"
              class="bh-grid__item">
              <bh-button
                primary
                inverted
                max-content
                class="hide-mobile"
                @click="signUp()">{{ $t('webapp.layout.signup') }}</bh-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout__content"><slot /></div>
    <site-footer v-if="showFooter"  />
    <tutorial-modal :open.sync="beginnerTutorialModalOpen"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import SiteFooter from '@/components/shared/SiteFooter';
import UserAvatar from '@/components/user/UserAvatar';
import TutorialModal from '@/components/TutorialModal';

const components = {
  SiteFooter,
  UserAvatar,
  TutorialModal,
};

export default {
  name: 'Layout',
  components,
  props: {
    title: {
      type: String,
      default: 'Bothub',
    },
    withoutBackground: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      beginnerTutorialModalOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'myProfile',
    ]),
  },
  watch: {
    title() {
      document.title = this.title;
    },
  },
  mounted() {
    document.title = this.title;
    this.updateMyProfile('user');
  },
  methods: {
    ...mapActions([
      'updateMyProfile',
      'logout',
    ]),
    openNewRepository() {
      this.$router.push({
        name: 'new',
      });
    },
    openMyProfile() {
      this.$router.push({ name: 'myProfile' });
    },
    openBeginnerTutorialModal() {
      this.beginnerTutorialModalOpen = true;
    },
    signIn() {
      this.$router.push({
        name: 'signIn',
      });
    },
    signUp() {
      this.$router.push({
        name: 'signUp',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/variables.scss';
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/colors.scss';

@keyframes layout-loading-progress {
  1% {
    width: 40%
  }
  2% {
    width: 70%;
  }
  10% {
    width: 80%;
  }
  50% {
    width: 90%;
  }
  100% {
    width: 100%;
  }
}

.layout {
  $loading-height: .3rem;

  &__loading {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: $loading-height;
    background-color: $primary;
    background-color: rgba($primary, .25);
    overflow: hidden;

    &__progress {
      display: block;
      height: $loading-height;
      width: 20%;
      background-color: $primary;
      animation-name: layout-loading-progress;
      animation-duration: 30s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }
  }

  &__header {
    padding: $loading-height 1rem;
    background-color: $color-fake-grey;

    &__logo {
      min-width: ($size-normal * .75);
      padding: ($size-normal * .125) 0;

      img {
        display: block;
        height: 1.75rem;
      }
    }

    &__options {
      align-items: center;
    }

    &__icon-tutorial {
      color: $color-white;
      margin: 0;

      &--center {
        align-self: center;
      }

      &:hover {
        color: $color-fake-white;
      }
    }
      &__icon {
      margin-left: 0.5rem;
      color: white;
      width: 1rem;
      height: 3rem;
      cursor: pointer;
      float: right;
    }
    &__center {
      width: 50%;
    }
  }

  &__content {
    min-height: calc(100vh - 3.75rem);
  }
}
</style>
