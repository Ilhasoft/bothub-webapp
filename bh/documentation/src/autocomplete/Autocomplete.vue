<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Autocomplete</h2>
      <h3>Simple Autocomplete</h3>
      <example
        :component="SimpleAutocomplete"
        :code="simpleAutocompleteCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleAutocomplete from './examples/SimpleAutocomplete';
import simpleAutocompleteCode from '!!raw-loader!./examples/SimpleAutocomplete';
import api from './api';


export default {
  name: 'Autocomplete',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SimpleAutocomplete,
      simpleAutocompleteCode,
      api,
    };
  },
};
</script>
