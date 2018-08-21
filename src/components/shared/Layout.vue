<template>
  <div class="layout">
    <new-repository-modal
      :active="newRepositoryModalOpen"
      @requestClose="closeNewRepositoryModal" />
    <div class="topbar level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <div class="topbar-brand">
            <router-link to="/">
              <img
                src="@/assets/imgs/logo-white.svg"
                alt="bothub">
            </router-link>
          </div>
        </div>
      </div>
      <div
        v-if="authenticated"
        ref="authenticated"
        class="level-right">
        <div class="level-item is-hidden-mobile">
          <button
            class="button is-primary-light"
            @click.prevent="openNewRepositoryModal()">start your bot</button>
        </div>
        <div class="level-item">
          <b-dropdown position="is-bottom-left">
            <user-avatar
              slot="trigger"
              :profile="myProfile" />
            <b-dropdown-item @click="openMyProfile()">
              {{ myProfile.name || '...' }}
            </b-dropdown-item>
            <b-dropdown-item @click="openNewRepositoryModal()">
              Start your bot
            </b-dropdown-item>
            <b-dropdown-item @click="logout()">
              Logout
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div
        v-else
        ref="notAuthenticated"
        class="level-right">
        <div class="level-item">
          <button
            ref="login"
            class="button is-primary-light"
            @click.prevent="openLoginModal()">sign in</button>
        </div>
      </div>
    </div>
    <div class="layout-content">
      <slot />
    </div>
    <site-footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import NewRepositoryModal from '@/components/shared/NewRepositoryModal';
import SiteFooter from '@/components/shared/SiteFooter';
import UserAvatar from '@/components/shared/UserAvatar';

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
      default: 'bothub',
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
      /* istanbul ignore next */
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
    ]),
    openNewRepositoryModal() {
      /* istanbul ignore next */
      this.newRepositoryModalOpen = true;
    },
    closeNewRepositoryModal() {
      /* istanbul ignore next */
      this.newRepositoryModalOpen = false;
    },
    openMyProfile() {
      /* istanbul ignore next */
      this.$router.push({ name: 'myProfile' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.layout {
  min-height: 100vh;

  &-content {
    min-height: calc(100vh - 500px);
  }
}

.topbar {
  padding: 16px;

  &-brand {
    width: 140px;

    img { width: 100%; }
  }
}
</style>
