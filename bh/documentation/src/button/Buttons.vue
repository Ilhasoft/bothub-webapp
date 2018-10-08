<template>
  <bh-card class="buttons">
    <h2>Buttons</h2>
    <div class="bh-grid">
      <div class="bh-grid__item">
        <h3>Simple Buttons</h3>
        <example
          :component="SimpleButton"
          :code="simpleButtonCode" />
      </div>
    </div>

    <h2>Sizes</h2>
    <example
      :component="SizeButtons"
      :code="sizeButtonsCode" />
    <api :data="api" />
  </bh-card>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleButton from './examples/SimpleButton';
import simpleButtonCode from '!!raw-loader!./examples/SimpleButton';
import SizeButtons from './examples/SizeButtons';
import sizeButtonsCode from '!!raw-loader!./examples/SizeButtons';
import api from './api';


export default {
  name: 'Buttons',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SimpleButton,
      simpleButtonCode,
      SizeButtons,
      sizeButtonsCode,
      api,
    };
  },
};
</script>

<style lang="scss">
.buttons {
  padding: 1rem;
}
</style>
