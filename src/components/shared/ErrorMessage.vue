<template>
  <div class="error-message">
    <div class="error-message-icons">
      <b-icon
        class="error-message-icons-sad"
        custom-size="error-message-icons-sad-size"
        icon="emoticon-sad" />
    </div>
    <div
      v-if="detail"
      class="error-message-detail">{{ detail }}</div>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    detail: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.error-message {
  margin: 5rem auto;
  width: fit-content;

  &-icons {
    opacity: .75;
    text-align: center;

    &-sad {
      width: auto;
      height: auto;

      &:first-child {
        font-size: 12rem;
      }
    }
  }

  &-detail {
    text-align: center;
    font-size: 1.5rem;
    padding: .5rem;
  }
}
</style>
