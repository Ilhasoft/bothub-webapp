<template>
  <div class="field">
    <div :class="{control: true, 'has-icons-right': hasAppend}">
      <textarea
        ref="input"
        v-model="val"
        :class="{textarea: true,
                 'self-adjust': true,
                 'self-adjust__appended': hasAppend,
                 'self-adjust--transparent': transparent}"
        v-bind="$attrs"
        v-on="inputListeners"/>
      <span
        v-if="hasAppend"
        class="icon is-right event-clickable">
        <slot name="append" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelfAdjustInput',
  props: {
    updateValue: {
      type: null,
      default: null,
    },
    value: {
      type: String,
      default: '',
    },
    transparent: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      rows: 1,
      val: this.value,
    };
  },
  computed: {
    hasAppend() {
      return this.$slots.append !== undefined;
    },
    inputListeners() {
      const vm = this;
      return Object.assign({},
        this.$listeners,
        {
          input(event) {
            vm.$emit('input', event.target.value);
          },
        });
    },
  },
  watch: {
    val() {
      this.updateTextareaHeight();
    },
    updateValue() {
      this.updateTextareaHeight();
    },
  },
  async mounted() {
    await this.$nextTick();
    this.updateTextareaHeight();
  },
  methods: {
    printEvent(event) {
      this.$emit('selected');
      console.log(event);
    },
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

<style lang="scss" scoped>
    .self-adjust {
        resize: none;
        height: 36px;
        padding: 0.3rem 1rem;

        &__appended {
            padding: 0.3rem 4rem 0.3rem 1rem;
        }

        &--transparent {
            background-color: transparent;
        }
    }

    .event-clickable {
        pointer-events: all !important;
        width: 5.2rem !important;
        > * {
            pointer-events: all !important;
        }
    }
</style>
