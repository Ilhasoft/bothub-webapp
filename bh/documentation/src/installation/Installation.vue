<template>
  <div class="installation">
    <h2>Installation</h2>
    <vue-markdown>{{ installation }}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import installation from './mds/installation.md';


export default {
  name: 'Installation',
  components: {
    VueMarkdown,
  },
  data() {
    return {
      installation,
    };
  },
};
</script>

<style lang="scss">
.installation {
  padding: 1rem;
}
</style>
