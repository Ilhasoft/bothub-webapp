<template>
  <bh-input>
    <div :class="inputClassAttr">
      <textarea
        ref="input"
        v-model="val"
        :class="`${className}__input`"
        v-bind="$attrs"
      />
    </div>
  </bh-input>
</template>

<script>
import BhText from './BhText';

export default {
  name: 'BhTextarea',
  extends: BhText,
  props: {
    rows: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      className: 'bh-textarea',
    };
  },
  watch: {
    val() {
      this.updateTextareaHeight();
    },
  },
  async mounted() {
    await this.$nextTick();
    this.updateTextareaHeight();
  },
  methods: {
    updateTextareaHeight() {
      const { input } = this.$refs;
      const offset = (input.offsetHeight - input.clientHeight);
      const computedStyle = window.getComputedStyle(input);
      input.style.minHeight = this.rows
        ? `${offset + (this.rows * 16)}px`
        : '';
      input.style.height = computedStyle.getPropertyValue('min-height');
      input.style.height = `${offset + input.scrollHeight}px`;
    },
  },
};
</script>

<style lang="scss">
@import '@scss/forms.scss';


.bh {
  &-textarea {
    @include textarea();
  }
}
</style>
