<template>
  <span :class="{
      'is-small': size === 'small',
      'is-medium': size === 'medium',
      'is-large': size === 'large',
    }">
    <img
      v-if="language === 'de'"
      src="@/assets/imgs/flags/DE.png" />
    <img
      v-if="language === 'en'"
      src="@/assets/imgs/flags/EN.png" />
    <img
      v-if="language === 'es'"
      src="@/assets/imgs/flags/ES.png" />
    <img
      v-if="language === 'fr'"
      src="@/assets/imgs/flags/FR.png" />
    <img
      v-if="language === 'it'"
      src="@/assets/imgs/flags/IT.png" />
    <img
      v-if="language === 'nl'"
      src="@/assets/imgs/flags/NL.png" />
    <img
      v-if="language === 'pt'"
      src="@/assets/imgs/flags/PT.png" />
  </span>
</template>

<script>
export default {
  name: 'Flag',
  props: {
    language: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  display: inline-flex;
  width: 16px;
  align-items: center;

  img {
    display: inline-block;
    width: 100%;
  }

  &.is-small { width: 8px; }
  &.is-medium { width: 32px; }
  &.is-large { width: 64px; }
}
</style>
