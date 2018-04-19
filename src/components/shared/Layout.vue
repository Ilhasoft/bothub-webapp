<template>
  <div>
    <new-repository-modal
      v-if="newRepositoryModalOpen"
      @requestClose="closeNewRepositoryModal" />
    <header class="container">
      <div class="columns">
        <div class="column">
          <h1 class="logo">Bothub</h1>
        </div>
        <div class="column">[search]</div>
        <div class="column">
          <div v-if="authenticated">
            <p>Hello, {{ myProfile.name || '...' }}</p>
            <p><a
              href="#start-your-bot"
              @click.prevent="openNewRepositoryModal">start your bot</a></p>
            <p><a
              ref="logout"
              href="#logout"
              @click.prevent="logout">Logout</a></p>
          </div>
          <div v-if="!authenticated">
            <p><a
              ref="login"
              href="#login"
              @click.prevent="openLoginModal">Login</a></p>
          </div>
        </div>
      </div>
    </header>
    <hr />
    <nav class="container">
      <router-link :to="{ name: 'home' }" href="#home">Home</router-link> -
      <router-link :to="{ name: 'myProfile' }" href="#my-profile">My Profile</router-link>
    </nav>
    <hr />
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
    this.updateMyProfile();
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
  },
};
</script>

<style lang="scss" scoped>
.logo {
  font-size: 2em;
}
</style>

