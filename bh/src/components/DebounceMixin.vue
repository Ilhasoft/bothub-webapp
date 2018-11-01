<script>
export default {
  name: 'DebounceMixin',
  props: {
    debounce: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      debounceTimeoutId: null,
    };
  },
  methods: {
    onInput(value) {
      if (this.debounce <= 0) {
        return this.emitInput(value);
      }
      if (this.debounceTimeoutId) {
        clearTimeout(this.debounceTimeoutId);
      }
      this.debounceTimeoutId = setTimeout(() => {
        this.emitInput(value);
      }, this.debounce);
      return this.debounceTimeoutId;
    },
    emitInput(value) {
      this.$emit('input', value);
    },
  },
};
</script>
