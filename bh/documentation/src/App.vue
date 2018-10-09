<template>
  <div class="app">
    <div class="bh-grid bh-grid--column">
      <section class="bh-grid__item bh-grid__item--nested">
        <HeaderComponent />
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
      <section class="bh-grid__item">
        <Icons />
      </section>
      <section class="bh-grid__item">
        <Avatar />
      </section>
      <section class="bh-grid__item">
        <Badge />
      </section>
    </div>
  </div>
</template>

<script>
import Installation from './installation/Installation';
import Typography from './typography/Typography';
import Grid from './grid/Grid';
import Autocomplete from './autocomplete/Autocomplete';
import Card from './card/Card';
import Buttons from './button/Buttons';
import HeaderComponent from './header/HeaderComponent';
import Icons from './icon/Icon';
import Avatar from './avatar/Avatar';
import Badge from './badge/Badge';

export default {
  name: 'App',
  components: {
    Installation,
    Typography,
    Grid,
    Autocomplete,
    Card,
    Buttons,
    HeaderComponent,
    Icons,
    Avatar,
    Badge,
  },
};
</script>
