<template>
  <div class="exampleSearchInput">
    <bh-text
      :value="initialData"
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
export default {
  name: 'ExampleSearchInput',
  props: {
    initialData: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: this.initialData,
      dicty: this.initialData,
    };
  },
  watch: {
    initialData(value) {
      console.log(value);
    },
  },
  methods: {
    dictyMount(value) {
      const labelAndIntityAndEntityFilter = value.toLowerCase().match(/((intent|label|entity):([a-zA-Z0-9_-]+))/g);
      const textFilter = value.toLowerCase().replace(/((intent|label|entity):([a-zA-Z0-9_-]+))/g, '');
      const dicty = {};

      Object.assign(dicty, { text: `${textFilter.trim()}` });

      if (labelAndIntityAndEntityFilter) {
        labelAndIntityAndEntityFilter.forEach((filter) => {
          const splited = filter.trim().split(':');
          Object.assign(dicty, { [splited[0]]: splited[1] });
        });
      }
      this.$emit('input', dicty);
    },
  },
};
</script>
