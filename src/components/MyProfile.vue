<template>
  <div>
    <h1>My Profile</h1>
    <p>{{ myProfile }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MyProfile',
  mounted() {
    this.updateMyProfile();
  },
  computed: {
    ...mapGetters([
      'myProfile',
    ]),
  },
  methods: {
    ...mapActions([
      'updateMyProfile',
    ]),
  },
};
</script>

