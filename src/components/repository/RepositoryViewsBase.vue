<template>
  <layout>
    <slot />
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';


const components = {
  Layout,
};

export default {
  name: 'RepositoryViewsBase',
  components,
};
</script>
