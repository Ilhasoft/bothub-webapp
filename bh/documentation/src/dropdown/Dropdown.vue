<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Dropdown Example</h2>
      <example
        :component="DropDownExample"
        :code="dropDownExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h2>Dropdown with slot Example</h2>
      <example
        :component="SlotDropDownExample"
        :code="slotDropDownExample" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import DropDownExample from './examples/DropDownExample';
import dropDownExampleCode from '!!raw-loader!./examples/DropDownExample';
import SlotDropDownExample from './examples/SlotDropDownExample';
import slotDropDownExample from '!!raw-loader!./examples/SlotDropDownExample';
import api from './api';


export default {
  name: 'Autocomplete',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      DropDownExample,
      dropDownExampleCode,
      SlotDropDownExample,
      slotDropDownExample,
      api,
    };
  },
};
</script>
