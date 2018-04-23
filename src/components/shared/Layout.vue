<template>
  <div>
    <new-repository-modal
      v-if="newRepositoryModalOpen"
      @requestClose="closeNewRepositoryModal" />
    <div class="topbar level">
      <div class="level-left">
        <div class="level-item">
          <div class="topbar-brand">
            <router-link to="/">
              <img src="@/assets/imgs/logo-white.svg" alt="bothub">
            </router-link>
          </div>
        </div>
      </div>
      <div class="level-right" v-if="authenticated">
        <div class="level-item">
          <button
            class="button is-primary-light"
            @click.prevent="openNewRepositoryModal">start your bot</button>
        </div>
        <div class="level-item">
          <b-dropdown position="is-bottom-left">
            <button
              slot="trigger"
              class="topbar-avatar" />
            <b-dropdown-item @click="openMyProfile()">
              {{ myProfile.name || '...' }}
            </b-dropdown-item>
            <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="level-right" v-else>
        <div class="level-item">
          <button
            class="button is-primary-light"
            @click.prevent="openLoginModal">sign in</button>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import NewRepositoryModal from '@/components/shared/NewRepositoryModal';

const components = {
  NewRepositoryModal,
};

export default {
  name: 'Layout',
  components,
  mounted() {
    document.title = this.title;
    this.updateMyProfile();
  },
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
      this.$router.push('myProfile');
    },
  },
};
</script>

<style lang="scss" scoped>
.topbar {
  padding: 16px;

  &-brand {
    width: 140px;

    img { width: 100%; }
  }

  &-avatar {
    $size: 36px;
    width: $size;
    height: $size;
    overflow: hidden;
    border-radius: 100%;
    border: 2px solid #fff;
    background-color: #dddddd;
    outline: none;
    cursor: pointer;
  }
}
</style>

