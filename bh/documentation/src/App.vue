<template>
  <div class="app">
    <div class="bh-grid bh-grid--columns">
      <section class="bh-grid__item">
        <h1>BH Documentation</h1>
      </section>
      <section class="bh-grid__item">
        <installation />
      </section>
      <section class="bh-grid__item">
        <typography />
      </section>
      <section class="bh-grid__item">
        <grid />
      </section>
    </div>
  </div>
</template>

<script>
import Installation from './installation/Installation';
import Typography from './typography/Typography';
import Grid from './grid/Grid';

export default {
  name: 'App',
  components: {
    Installation,
    Typography,
    Grid,
  },
};
</script>

<style lang="scss">
</style>
