<template>
  <layout>
    <div class="container">
      <h1>My Profile</h1>
      <p><strong>Nickname:</strong> {{ myProfile.nickname }}</p>
      <p><strong>Email:</strong> {{ myProfile.email }}</p>
      <p><strong>Name:</strong> {{ myProfile.name }}</p>
      <p><strong>Locale:</strong> {{ myProfile.locale || '-' }}</p>
    </div>
  </layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Layout from '@/components/shared/Layout';

const components = {
  Layout,
};

export default {
  name: 'MyProfile',
  components,
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

