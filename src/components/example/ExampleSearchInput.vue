<template>
  <div class="exampleSearchInput">
    <bh-text
      :value="dictyToString"
      @input="dictyMount">
      <div slot="append">
        <bh-button
          size="small"
          inverted
          primary>
          <bh-icon
            value="magnify"
            size="normal"
            class="exampleSearchInput__icon" />
        </bh-button>
      </div>
    </bh-text>
  </div>
</template>

<script>
import { turnsStringToDicty, stringMount } from '@/bh/utils';


export default {
  name: 'ExampleSearchInput',
  props: {
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dicty: this.initialData,
      dictyToString: '',
    };
  },
  watch: {
    initialData(value) {
      this.dictyToString = stringMount(value);
    },
  },
  methods: {
    dictyMount(value) {
      this.dicty = turnsStringToDicty(value);
      this.$emit('input', this.dicty);
    },
  },
};
</script>
