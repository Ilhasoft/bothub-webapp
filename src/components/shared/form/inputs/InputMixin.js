const VALIDATE_THROTTLE_DELAY = 1000;

export default {
  methods: {
    onInput(value) {
      clearTimeout(this.validateThrottleTimeout);
      this.validateError = this.typingValidate ? this.typingValidate(value) : false;
      this.$emit('input', value);
      this.$emit('validate', this.validateError);
      this.validateThrottleTimeout = setTimeout(
        () => this.onChange(value),
        VALIDATE_THROTTLE_DELAY,
      );
    },
    onChange(value) {
      clearTimeout(this.validateThrottleTimeout);
      this.validateError = this.validateError || (this.validate ? this.validate(value) : false);
      this.$emit('validate', this.validateError);
    },
  },
  data() {
    return {
      validateError: false,
      validateThrottleTimeout: null,
    };
  },
  computed: {
    isValid() {
      return !this.validateError;
    },
  },
  VALIDATE_THROTTLE_DELAY,
};
