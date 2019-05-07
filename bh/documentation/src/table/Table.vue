<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Table</h2>
      <example
        :component="TableExamples"
        :code="tableExamplesCode" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import TableExamples from './examples/TableExample';
import tableExamplesCode from '!!raw-loader!./examples/TableExample';


export default {
  name: 'Autocomplete',
  components: {
    Example,
  },
  data() {
    return {
      TableExamples,
      tableExamplesCode,
    };
  },
};
</script>
