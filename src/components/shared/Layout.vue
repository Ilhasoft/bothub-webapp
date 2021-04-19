<template>
  <div
    :class="{
      layout: true,
      'layout--without-background': withoutBackground,
  }">
  <weni-notification/>
    <div
      v-if="loading"
      class="layout__loading">
      <div class="layout__loading__progress" />
    </div>
    <div class="layout__header">
      <div class="layout__header__container">
        <router-link
          class="layout__header__container__logo"
          to="/">
          <img
            :src="weniDynamicLogo"
            alt="Weni Inteligência Artificial"
            class="hide-mobile">
          <img
            src="@/assets/imgs/weni-logo-small.svg"
            alt="Weni Inteligência Artificial"
            class="hide-desktop">
        </router-link>
        <div
          v-if="$slots.center"
          class="layout__header__container__center">
          <slot name="center" />
        </div>
        <div class="layout__header__container__fields">
          <div class="layout__header__options">
            <div
              v-if="authenticated"
              id="tour-create_intelligence-step-1"
              :is-next-disabled="true"
              :is-previous-disabled="true"
              :is-step-blocked="!blockedNextStepTutorial"
              class="hide-mobile">
              <router-link :to="'/new'">
                <b-button
                  inverted
                  rounded
                  class="layout__header__options__create-intelligence"
                  @click="blockedNextStepTutorial = true">
                  <strong>{{ $t('webapp.layout.newbot') }}</strong>
                </b-button>
              </router-link>
            </div>
            <!-- <div
              v-if="authenticated && tutorialEnabled"
              class="layout__header__icon-tutorial--center">
              <b-icon
                class="layout__header__icon-tutorial"
                type="is-white"
                icon="help-circle"
                @click.native="openBeginnerTutorialModal()"
              />
            </div> -->
            <div
              v-if="authenticated">
              <b-dropdown position="is-bottom-left">
                <user-avatar
                  slot="trigger"
                  :profile="myProfile" />
                <b-icon
                  slot="trigger"
                  icon="chevron-down"
                  class="layout__header__icon"/>
                <b-dropdown-item @click="openMyProfile()">
                  {{ myProfile.name || '...' }}
                </b-dropdown-item>
                <b-dropdown-item
                  @click="orgs()">
                  {{ $t('webapp.layout.orgs') }}
                </b-dropdown-item>
                <b-dropdown-item @click="logout()">
                  {{ $t('webapp.layout.logout') }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="layout__header__options__buttons" v-if="!authenticated" >
              <b-button
                expanded
                class="layout__header__options__buttons__btn"
                @click="signIn()">{{ $t('webapp.layout.signin') }}</b-button>
              <b-button
                expanded
                type='is-primary'
                class="layout__header__options__buttons__btn hide-mobile"
                @click="signUp()">{{ $t('webapp.layout.signup') }}</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout__content">
      <slot/>
    </div>
    <site-footer v-if="showFooter" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import SiteFooter from '@/components/shared/SiteFooter';
import UserAvatar from '@/components/user/UserAvatar';
import WeniNotification from '@/components/WeniNotification';
import I18n from '@/utils/plugins/i18n';

const components = {
  SiteFooter,
  UserAvatar,
  WeniNotification,
  I18n
};

export default {
  name: 'Layout',
  components,
  props: {
    title: {
      type: String,
      default: 'Weni Inteligência Artificial',
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
      blockedNextStepTutorial: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'myProfile',
    ]),
    weniDynamicLogo() {
      if (I18n.locale === 'pt-BR') {
        return '/weni-logo-green.svg'
      }
      return '/weni-logo-green-en.svg'
    },
    tutorialEnabled() {
      return process.env.VUE_APP_BOTHUB_WEBAPP_TUTORIAL_ENABLED;
    },
  },
  mounted() {
    this.updateMyProfile('user');
  },
  methods: {
    ...mapActions([
      'updateMyProfile',
      'logout',
      'setTutorialMenuActive',
    ]),
    openNewRepository() {
      this.$router.push({
        name: 'new',
      });
    },
    openMyProfile() {
      if (this.$router.currentRoute.name !== 'profile') {
        this.$router.push({ name: 'profile' });
      }
    },
    openBeginnerTutorialModal() {
      if (process.env.VUE_APP_BOTHUB_WEBAPP_TUTORIAL_ENABLED) {
        this.setTutorialMenuActive();
      }
    },
    orgs() {
      this.$router.push({
        name: 'orgs',
      });
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
@import '~@/assets/scss/variables.scss';
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
    padding: $loading-height*3.8 1rem;

    &__container {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-around;

    &__logo {
      min-width: ($size-normal * .75);
      max-width: ($size-normal * 4);

      img {
        display: block;
      }
    }
      &__center {
        width: 50%;
        @media screen and (max-width: $mobile-width * 1.5) {
          width: 40%;
        }
        @media screen and (max-width: $mobile-width * 1.2) {
          width: 30%;
        }
        @media screen and (max-width: $mobile-width) {
          width: 50%;
        }
      }

      &__fields{
        display: flex;
        justify-content: center;
        width: 25%;
        @media screen and (max-width: $mobile-width * 1.5) {
          width: 30%;
        }
        @media screen and (max-width: $mobile-width * 1.2) {
          width: 35%;
        }
        @media screen and (max-width: $mobile-width) {
          width: 15%;
        }
      }
    }

    &__options {
      width: 85%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media screen and (max-width: $mobile-width * 1.5) {
          width: 100%;
      }
      @media screen and (max-width: $mobile-width) {
        justify-content: center;
      }

      &__create-intelligence{
        background-color: #009E96;
        border: none;
        color: $color-white;
        transition: 0.5s;

        &:hover{
          background-color: #00746f;
        }
      }

      strong {
        letter-spacing: 0.8px;
      }

      &__buttons{
        width: 100%;
        display: flex;
        justify-content: space-around;

        &__btn {
          width: 40%;
           @media screen and (max-width: $mobile-width) {
              width: 100%;
            }
        }
      }
    }

    &__icon-tutorial {
      color: $color-white;
      margin: 0;
      cursor: pointer;

      &--center {
        align-self: center;
      }

      &:hover {
        color: $color-fake-white;
      }
    }
      &__icon {
      margin-left: 0.5rem;
      color: #3B414D;
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
