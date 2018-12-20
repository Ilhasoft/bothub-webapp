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
        :code="slotDropDownExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h2>Dropdown positions</h2>
      <example
        :component="PositionDropDownExample"
        :code="positionDropDownExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h2>Dropdown content size</h2>
      <example
        :component="SizeContentDropDown"
        :code="sizeContentDropDownCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import DropDownExample from './examples/DropDown';
import dropDownExampleCode from '!!raw-loader!./examples/DropDown';
import SlotDropDownExample from './examples/SlotDropDown';
import slotDropDownExampleCode from '!!raw-loader!./examples/SlotDropDown';
import PositionDropDownExample from './examples/PositionDropDown';
import positionDropDownExampleCode from '!!raw-loader!./examples/PositionDropDown';
import SizeContentDropDown from './examples/SizeContentDropDown';
import sizeContentDropDownCode from '!!raw-loader!./examples/SizeContentDropDown';
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
      slotDropDownExampleCode,
      PositionDropDownExample,
      positionDropDownExampleCode,
      SizeContentDropDown,
      sizeContentDropDownCode,
      api,
    };
  },
};
</script>
