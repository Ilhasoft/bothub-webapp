<template>
  <div>
    <h2>Icon Buttons</h2>
    <h3>Icons Buttons</h3>
    <example
      :component="IconButtonExamples"
      :code="iconButtonExamplesCode" />
    <h3>Sizes</h3>
    <example
      :component="IconButtonSize"
      :code="iconButtonSizeCode" />
    <api :data="api" />
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import IconButtonExamples from './examples/IconButtonExamples';
import iconButtonExamplesCode from '!!raw-loader!./examples/IconButtonExamples';
import IconButtonSize from './examples/IconButtonSize';
import iconButtonSizeCode from '!!raw-loader!./examples/IconButtonSize';
import api from './api';


export default {
  name: 'IconButton',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      IconButtonExamples,
      iconButtonExamplesCode,
      IconButtonSize,
      iconButtonSizeCode,
      api,
    };
  },
};
</script>
