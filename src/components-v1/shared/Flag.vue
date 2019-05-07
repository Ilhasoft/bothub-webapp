<template>
  <span
    :class="{
      'is-small': size === 'small',
      'is-medium': size === 'medium',
      'is-large': size === 'large',
  }">
    <img
      v-if="language === 'de'"
      src="@/assets/imgs/flags/de.svg" >
    <img
      v-else-if="language === 'en'"
      src="@/assets/imgs/flags/us.svg" >
    <img
      v-else-if="language === 'es'"
      src="@/assets/imgs/flags/es.svg" >
    <img
      v-else-if="language === 'fr'"
      src="@/assets/imgs/flags/fr.svg" >
    <img
      v-else-if="language === 'it'"
      src="@/assets/imgs/flags/it.svg" >
    <img
      v-else-if="language === 'nl'"
      src="@/assets/imgs/flags/nl.svg" >
    <img
      v-else-if="language === 'pt'"
      src="@/assets/imgs/flags/pt.svg" >
    <img
      v-else-if="language === 'pt_br'"
      src="@/assets/imgs/flags/br.svg" >
    <img
      v-else-if="language === 'mn'"
      src="@/assets/imgs/flags/mn.svg" >
    <img
      v-else-if="language === 'id'"
      src="@/assets/imgs/flags/id.svg" >
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
      default: null,
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
