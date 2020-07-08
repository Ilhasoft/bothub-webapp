<template>
  <b-field>
    <div class="image-input">
      <div
        :style="image"
        :class="{'image-input__image__container': true, 'image-input__image__default': !src}">
        <b-icon
          v-if="!src"
          icon="account" />
      </div>
      <input
        ref="imageInput"
        :hidden="true"
        type="file"
        accept="image/*"
        @change="onChange">
      <span
        class="image-input__icon"
        @click="onFileUpload">
        <b-icon
          icon="camera" />
      </span>
    </div>
  </b-field>
</template>

<script>
export default {
  props: {
    initialData: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      value: null,
      src: null,
    };
  },
  computed: {
    image() {
      return `background-image: url('${this.src}')`;
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
    initialData() {
      this.src = this.initialData;
    },
  },
  mounted() {
    this.src = this.initialData;
  },
  methods: {
    onChange(element) {
      const file = element.target.files[0];
      this.value = file;
      this.src = URL.createObjectURL(file);
    },
    onFileUpload() {
      this.$refs.imageInput.click();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
    .image-input {
        border-radius: 50%;
        background-color: $color-white;
        height: 8.5rem;
        width: 8.5rem;
        box-shadow: 0px 3px 6px #00000029;

        &__image {
            &__container {
                width: 100%;
                height: 100%;
                overflow: hidden;
                border-radius: 50%;
                background-size: cover;
                background-position: center;
            }

            &__default {
              display: flex;
              justify-content: center;
              align-items: center;
            }
        }

        &__icon {
            border-radius: 50%;
            background-color: $color-primary;
            color: $color-white;
            padding: 0.5rem;
            position: relative;
            bottom: 40%;
            left: 75%;
            display: inline-flex;
            align-items: center;
            cursor: pointer;
        }
    }
</style>
