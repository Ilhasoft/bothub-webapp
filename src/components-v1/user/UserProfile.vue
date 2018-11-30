<template>
  <div>
    <h4 class="text-color-grey-light">
      <span>{{ profile.name || profile.nickname }}</span>
      <span>({{ profile.nickname }})</span>
    </h4>
    <p class="text-color-grey-light">{{ profile.locale || '-' }}</p>
    <p class="text-color-grey-light">
      <a
        :href="profileURL"
        class="text-color-grey-light"
        target="_blank">{{ profileURL }}</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    profileURL() {
      return `https://bothub.it/${this.profile.nickname}/`;
    },
  },
};
</script>
