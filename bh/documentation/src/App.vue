<template>
  <div class="app">
    <div class="bh-grid bh-grid--column">
      <section class="bh-grid__item bh-grid__item--nested">
        <header-component />
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
        <icons />
      </section>
      <section class="bh-grid__item">
        <avatar />
      </section>
      <section class="bh-grid__item">
        <badge />
      </section>
      <section class="bh-grid__item">
        <modal />
      </section>
      <section class="bh-grid__item">
        <text-component />
      </section>
      <section class="bh-grid__item">
        <dropdown />
      </section>
      <section class="bh-grid__item">
        <loading />
      </section>
      <section class="bh-grid__item">
        <notification />
      </section>
      <section class="bh-grid__item">
        <icon-button />
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
import Modal from './modal/Modal';
import TextComponent from './text/TextComponent';
import Dropdown from './dropdown/Dropdown';
import loading from './loading/Loading';
import Notification from './notification/Notification';
import IconButton from './icon-button/IconButton';

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
    Modal,
    TextComponent,
    Dropdown,
    loading,
    Notification,
    IconButton,
  },
};
</script>
