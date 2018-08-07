<template>
  <bh-input>
    <div :class="inputClassAttr">
      <textarea
        ref="textarea"
        v-bind="$attrs"
        v-model="val" />
    </div>
  </bh-input>
</template>

<script>
import BhText from './BhText';

export default {
  name: 'BhTextarea',
  extends: BhText,
  async mounted() {
    await this.$nextTick();
    this.updateTextareaHeight();
  },
  watch: {
    val() {
      this.updateTextareaHeight();
    },
  },
  data() {
    return {
      className: 'bh-textarea',
    };
  },
  methods: {
    updateTextareaHeight() {
      const { textarea } = this.$refs;
      const offset = textarea.offsetHeight - textarea.clientHeight;
      const computedStyle = window.getComputedStyle(textarea);
      textarea.style.height = computedStyle.getPropertyValue('min-height');
      textarea.style.height = `${offset + textarea.scrollHeight}px`;
    },
  },
};
</script>

<style lang="scss">
@import '~bh/assets/scss/forms.scss';


.bh {
  &-textarea {
    @include textarea();
  }
}
</style>
