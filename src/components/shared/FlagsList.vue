<template>
  <span><flag
    v-for="language in languages"
    :key="language"
    :language="language"
    :size="size" /></span>
</template>

<script>
import Flag from '@/components/shared/Flag';

const components = {
  Flag,
};

export default {
  name: 'FlagList',
  components,
  props: {
    languages: {
      type: Array,
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
  display: inline-block;

  > * {
    margin-right: 4px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
