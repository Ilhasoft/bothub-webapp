<template>
  <div class="image-input">
    <img
      :src="src"
      class="image-input__image">
    <span class="image-input__icon">
      <b-icon
        icon="camera" />
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      src: 'https://robohash.org/alexazv',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
    .image-input {
        border-radius: 50%;
        background-color: $color-white;
        height: 8.5rem;
        width: 8.5rem;

        &__image {
            overflow: hidden;
        }

        &__icon {
            border-radius: 50%;
            background-color: $color-primary;
            color: $color-white;
            padding: 0.5rem;
            position: relative;
            bottom: 30%;
            left: 75%;
            display: inline-flex;
            align-items: center;
            cursor: pointer;
        }
    }
</style>
