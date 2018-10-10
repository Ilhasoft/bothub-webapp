<template>
  <div
    :class="{
      example: true,
      'example--code-bg': codeOpen,
  }">
    <div
      :class="{
        'example__content': true,
        'example__content--color-inverted': colorInverted,
    }">
      <div class="example__content__actions">
        <bh-icon-button
          primary
          inverted
          size="small"
          value="invert-colors"
          @click="invertColors()" />
      </div>
      <div class="example__content__wrapper">
        <div :is="component" />
      </div>
    </div>
    <div class="example__code">
      <div class="example__code__trigger">
        <bh-icon-button
          primary
          inverted
          size="small"
          value="code-tags"
          @click="toggleCodeOpen()" />
        <span v-if="codeOpen">Code</span>
      </div>
      <pre
        v-highlightjs="code"
        v-show="codeOpen"
        class="example__code__content"><code :class="codeClass" /></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Example',
  props: {
    component: {
      type: Object,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    codeClass: {
      type: String,
      default: 'html',
    },
  },
  data() {
    return {
      codeOpen: false,
      colorInverted: false,
    };
  },
  methods: {
    toggleCodeOpen() {
      this.codeOpen = !this.codeOpen;
    },
    invertColors() {
      this.colorInverted = !this.colorInverted;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';


.example {
  display: flex;

  &--code-bg {
    background-color: #f8f8f8;
  }

  &__content {
    flex-grow: 1;
    border: 1px solid $color-primary;
    border-radius: .25rem 0 .25rem;
    background-color: white;

    &--color-inverted {
      background-color: #222;
    }

    &__wrapper {
      padding: 1rem;
    }

    &__actions {
      padding: .25rem .5rem;
      background-color: $color-primary;
    }
  }

  &__code {
    flex-grow: 0;

    &__trigger {
      display: flex;
      align-items: center;
      margin: 0;
      padding: .25rem .5rem;
      color: white;
      background: $color-primary;
      border-top: 1px solid $color-primary;
      border-radius: 0 .25rem .25rem 0;

      > * {
        margin-right: 1rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &__content {
      margin: 0;
      padding: 2rem;
    }
  }
}
</style>
