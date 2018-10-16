<template>
  <div class="bh-grid">
    <div class="bh-grid__item">
      <h2>Installation</h2>
      <vue-markdown>{{ installation }}</vue-markdown>
    </div>
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
