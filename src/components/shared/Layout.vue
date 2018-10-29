<template>
  <div
    :class="{
      layout: true,
      'layout--without-background': withoutBackground,
  }">
    <div class="layout__header">
      <div class="bh-grid bh-grid--space-between bh-grid--row">
        <router-link
          class="bh-grid__item layout__header__logo"
          to="/">
          <img
            src="@/assets/imgs/logo-white.svg"
            alt="bothub">
        </router-link>
        <div class="bh-grid__item layout__header__center">
          <slot name="center" />
        </div>
        <div class="bh-grid__item bh-grid__item--nested">
          <div class="bh-grid bh-grid--row">
            <div
              v-if="authenticated"
              class="bh-grid__item hide-mobile">
              <bh-button
                primary
                inverted
                @click="openNewRepositoryModal()">start your bot</bh-button>
            </div>
            <div
              v-if="authenticated"
              class="bh-grid__item">
              <bh-dropdown position="left">
                <user-avatar
                  slot="trigger"
                  :profile="myProfile" />
                <bh-dropdown-item @click="openMyProfile()">
                  {{ myProfile.name || '...' }}
                </bh-dropdown-item>
                <bh-dropdown-item @click="openNewRepositoryModal()">
                  Start your bot
                </bh-dropdown-item>
                <bh-dropdown-item @click="logout()">
                  Logout
                </bh-dropdown-item>
              </bh-dropdown>
            </div>
            <div
              v-if="!authenticated"
              class="bh-grid__item">
              <bh-button
                primary
                inverted
                transparent
                @click="openLoginModal()">sign in</bh-button>
            </div>
            <div
              v-if="!authenticated"
              class="bh-grid__item">
              <bh-button
                primary
                inverted
                class="hide-mobile"
                @click="openSignupModal()">sign up</bh-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout__content"><slot /></div>
    <site-footer />
    <new-repository-modal
      :active="newRepositoryModalOpen"
      @requestClose="closeNewRepositoryModal()" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import NewRepositoryModal from '@/components-v1/shared/NewRepositoryModal';
import SiteFooter from '@/components-v1/shared/SiteFooter';
import UserAvatar from '@/components/user/UserAvatar';

const components = {
  NewRepositoryModal,
  SiteFooter,
  UserAvatar,
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
  },
  data() {
    return {
      newRepositoryModalOpen: false,
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
    this.updateMyProfile();
  },
  methods: {
    ...mapActions([
      'updateMyProfile',
      'logout',
      'openLoginModal',
      'openSignupModal',
    ]),
    openNewRepositoryModal() {
      this.newRepositoryModalOpen = true;
    },
    closeNewRepositoryModal() {
      this.newRepositoryModalOpen = false;
    },
    openMyProfile() {
      this.$router.push({ name: 'myProfile' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';


.layout {
  &__header {
    background-color: $color-primary;

    &__logo {
      img {
        display: block;
        height: $size-normal;
      }
    }

    &__center {
      width: 750px;
    }
  }

  &__content {
    min-height: calc(100vh - 3.75rem);
  }
}
</style>
