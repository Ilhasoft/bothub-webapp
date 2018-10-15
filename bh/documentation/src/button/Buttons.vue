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
    <h3>Button Click</h3>
    <example
      :component="ButtonActionExample"
      :code="buttonActionExampleCode" />
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
import ButtonActionExample from './examples/ButtonActionExample';
import buttonActionExampleCode from '!!raw-loader!./examples/ButtonActionExample';
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
      ButtonActionExample,
      buttonActionExampleCode,
      api,
    };
  },
};
</script>
