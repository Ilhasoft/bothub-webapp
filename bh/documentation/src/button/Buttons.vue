<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Buttons</h2>
      <h3>Simple Buttons</h3>
      <example
        :component="SimpleButtons"
        :code="simpleButtonsCode" />
      <h3>Button Sizes</h3>
      <example
        :component="ButtonSizes"
        :code="buttonSizesCode" />
      <h3>Button Click</h3>
      <example
        :component="ButtonActionExample"
        :code="buttonActionExampleCode" />
      <h3>Button with BhIcon in content</h3>
      <example
        :component="ButtonIconContentExample"
        :code="buttonIconContentExampleCode" />
      <h3>Loading</h3>
      <example
        :component="ButtonLoadingExample"
        :code="buttonLoadingExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
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
import ButtonIconContentExample from './examples/ButtonIconContent';
import buttonIconContentExampleCode from '!!raw-loader!./examples/ButtonIconContent';
import ButtonLoadingExample from './examples/ButtonLoading';
import buttonLoadingExampleCode from '!!raw-loader!./examples/ButtonLoading';
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
      ButtonIconContentExample,
      buttonIconContentExampleCode,
      ButtonLoadingExample,
      buttonLoadingExampleCode,
      api,
    };
  },
};
</script>
