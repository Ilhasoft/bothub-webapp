<template>
  <div>
    <h1 class="title is-5 is-marginless">
      <span>{{ profile.name || profile.nickname }}</span>
      <span>({{ profile.nickname }})</span>
    </h1>
    <p>{{ profile.locale || '-' }}</p>
    <p><a
      :href="profileURL"
      target="_blank"
      class="has-text-grey">{{ profileURL }}</a></p>
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

