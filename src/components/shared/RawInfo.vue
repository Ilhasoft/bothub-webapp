<template>
  <div class="raw-info columns is-centered">
    <div class="control column">
      <textarea
        :value="text"
        rows="1200"
        class="raw-info__text column textarea has-fixed-size"
        readonly/>
    </div>
    <b-button
      class="column is-narrow raw-info__button"
      size="is-medium"
      type="is-text"
      icon-right="content-copy"
      @click="copyText()" />
  </div>
</template>

<script>
export default {
  name: 'RawInfo',
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  computed: {
    text() {
      return JSON.stringify(this.info, undefined, 4);
    },
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.text);
      this.$bhToastNotification({
        message: 'Json copied',
        type: 'success',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
    .raw-info {
        border-radius: 8px;
        width: auto;
        margin: 0 auto;
        background-color: white;
        padding: 0.5rem;

        &__text {
            margin: 0.5rem;
            height: 5 rem;
        }

        &__button {
            margin: 0.5rem;
        }
    }
</style>
