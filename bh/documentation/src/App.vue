<template>
  <div class="app">
    <div class="bh-grid bh-grid--column">
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
      <section class="bh-grid__item">
        <autocomplete />
      </section>
      <section class="bh-grid__item">
        <card />
      </section>
      <section class="bh-grid__item">
        <buttons />
      </section>
    </div>
  </div>
</template>

<script>
import Installation from './installation/Installation';
import Typography from './typography/Typography';
import Grid from './grid/Grid';
import Autocomplete from './autocomplete/Autocomplete';
import Card from './card/Card'
import Buttons from './button/Buttons';

export default {
  name: 'App',
  components: {
    Installation,
    Typography,
    Grid,
    Autocomplete,
    Card,
    Buttons
  },
};
</script>
