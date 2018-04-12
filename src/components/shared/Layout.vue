<template>
  <div>
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
              @click.prevent="openRepositoryForm">start your bot</a></p>
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
    <slot />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Layout',
  mounted() {
    this.updateMyProfile();
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
    openRepositoryForm() {},
  },
};
</script>

<style lang="scss" scoped>
.logo {
  font-size: 2em;
}
</style>

