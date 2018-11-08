<template>
  <div>
    <h4 class="text-color-gray">
      <span>{{ profile.name || profile.nickname }}</span>
      <span>({{ profile.nickname }})</span>
    </h4>
    <p class="text-color-gray">{{ profile.locale || '-' }}</p>
    <p class="text-color-gray">
      <a
        :href="profileURL"
        class="text-color-gray"
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
