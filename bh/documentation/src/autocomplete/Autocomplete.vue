<template>
  <bh-card class="autocomplete">
    <h2>Autocomplete</h2>
    <h3>Simple Autocomplete</h3>
    <example
      :component="SimpleAutocomplete"
      :code="simpleAutocompleteCode" />
    <api :data="api" />
  </bh-card>
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

<style lang="scss">
.autocomplete {
  padding: 1rem;
}
</style>
