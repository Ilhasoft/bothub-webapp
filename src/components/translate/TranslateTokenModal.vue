<template>
  <div class="token-modal">
    <p> Send this url to external translators </p>
    <b-field>
      <b-input
        :value="url"
        extended
        readonly />
      <b-button
        icon-right="content-copy"
        @click="copy"/>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'TokenModal',
  props: {
    token: {
      type: String,
      required: true,
    },
    urlGenerator: {
      type: Function,
      default: token => token,
    },
  },
  computed: {
    url() {
      return this.urlGenerator(this.token);
    },
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.url);
      this.$buefy.toast.open({
        message: 'copied',
        type: 'is-success',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
    .token-modal {
        background-color: white;
        border-radius: 4px;
        padding: 3rem;
    }
</style>
