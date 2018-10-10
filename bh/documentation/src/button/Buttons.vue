<template>
  <div>
    <h2>Buttons</h2>
    <h3>Simple Buttons</h3>
    <example
      :component="SimpleButtons"
      :code="simpleButtonsCode" />
    <h3>Sizes</h3>
    <example
      :component="ButtonSizes"
      :code="buttonSizesCode" />
    <api :data="api" />
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import SimpleButtons from './examples/SimpleButtons';
import simpleButtonsCode from '!!raw-loader!./examples/SimpleButtons';
import ButtonSizes from './examples/ButtonSizes';
import buttonSizesCode from '!!raw-loader!./examples/ButtonSizes';
import api from './api';


export default {
  name: 'Buttons',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      SimpleButtons,
      simpleButtonsCode,
      ButtonSizes,
      buttonSizesCode,
      api,
    };
  },
};
</script>
