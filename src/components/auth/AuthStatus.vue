<template>
  <span>{{ authenticated && 'You are authenticated' || 'You not authenticated' }}</span>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AuthStatus',
  computed: {
    ...mapGetters({
      authenticated: 'authenticated',
    }),
  },
};
</script>
