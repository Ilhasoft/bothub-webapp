<template>
  <div class="hello">
    <h1>Bothub</h1>
    <button @click="openLoginModal">do login</button>
    <p><router-link to="/myprofile/">My Profile</router-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  methods: {
    ...mapActions([
      'openLoginModal',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.hello {
  text-align: center;

  h1 {
    font-weight: normal;
  }
}
</style>
