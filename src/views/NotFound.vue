<template>
  <layout title="404 - Page Not Found">
    <div class="not-found__content">
      <h1 class="has-text-grey">Page Not Found</h1>
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';


export default {
  name: 'NotFound',
  components: {
    Layout,
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  &__content {
    margin: 4rem 0;
    text-align: center;
  }
}
</style>
