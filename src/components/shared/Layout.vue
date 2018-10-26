<template>
  <div
    :class="{
      layout: true,
      'layout--without-background': withoutBackground,
  }">
    <new-repository-modal
      :active="newRepositoryModalOpen"
      @requestClose="closeNewRepositoryModal()" />
    <div class="layout__header">
      <div class="layout__header__item">
        <router-link
          class="layout__header__logo"
          to="/">
          <img
            src="@/assets/imgs/logo-white.svg"
            alt="bothub">
        </router-link>
      </div>
      <div class="layout__header__item">
        <div
          v-if="authenticated"
          class="bh-grid bh-grid--ever-desktop">
          <bh-button
            primary
            inverted
            size="medium"
            class="bh-grid__item hide-mobile"
            @click="openNewRepositoryModal()">start your bot</bh-button>
          <bh-dropdown position="left">
            <user-avatar
              slot="trigger"
              :profile="myProfile"
              class="bh-grid__item"
              size="medium" />
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
          v-else
          class="bh-grid bh-grid--ever-desktop">
          <bh-button
            primary
            inverted
            transparent
            size="medium"
            class="bh-grid__item"
            @click="openLoginModal()">sign in</bh-button>
          <bh-button
            primary
            inverted
            size="medium"
            class="bh-grid__item hide-mobile"
            @click="openSignupModal()">sign up</bh-button>
        </div>
      </div>
    </div>
    <div class="layout__content"><slot /></div>
    <site-footer />
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
@import '~@/assets/scss/utilities.scss';
@import '~bh/src/assets/scss/colors.scss';


.layout {
  $parent: &;

  &::before {
    display: block;
    width: 100%;
    height: 10rem;
    margin-bottom: -10rem;
    content: "";
    background-color: $color-primary;
  }

  &--without-background {
    #{$parent}::before {
      display: none;
    }
  }

  &__header {
    $heigth: 2rem;

    display: flex;
    justify-content: space-between;
    padding: .5rem;

    &__item {
      flex-grow: 0;
    }

    &__logo {
      display: inline-block;
      padding: .25rem;
      border: 1px solid transparent;

      img {
        height: $heigth;
      }
    }
  }

  &__content {
    min-height: calc(100vh - 4rem);
  }
}
</style>
