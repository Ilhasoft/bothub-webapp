<template>
  <div class="expander">
    <div
      ref="expander"
      :class="{
        'expander__trigger': true,
        'expander__trigger--slim': slim,
        [`align-${align}`]: true,
        'active': isOpen,
        'before-border': !isOpen && customAccordion,
        'border-thick': thickBorder,
        'border-success': type === 'is-success',
        'border-danger': type === 'is-danger',
        'expander__trigger--pending': pendingExample,
        'is-light': isLight,
        'cursor-pointer': customAccordion,
        'border': !type && customAccordion,
      }"
      @click="toggleAccordion()">

      <div
        ref="check"
        class="expander__trigger__check"
        @click.stop>
        <slot name="check" />
      </div>

      <div
        class="expander__trigger__header"
      >
        <slot name="header" />
      </div>

      <div
        class="expander__trigger__options"
      >
        <slot name="options" />
      </div>
    </div>
    <transition name="fade">
      <div
        v-show="open && customAccordion"
        :class="pendingExample ? 'expander__body--pending' : 'expander__body'">
        <slot name="body"/>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'SentenceAccordion',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    isLight: {
      type: Boolean,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    thickBorder: {
      type: Boolean,
      default: null,
    },
    align: {
      type: String,
      default: 'center',
    },
    slim: {
      type: Boolean,
      default: false,
    },
    pendingExample: {
      type: Boolean,
      default: false,
    },
    customAccordion: {
      type: Boolean,
      default: true,
    },
    suggestion: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    open() {
      this.isOpen = this.open;
    },
  },
  mounted() {
    this.isOpen = this.open;
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
      this.$emit('update:open', this.isOpen);
    },
  },
};
</script>


<style lang="scss" scoped>
  @import '~@/assets/scss/utilities';
  @import '~@/assets/scss/colors.scss';
  @import '~@/assets/scss/variables.scss';

  .align {
    &-center {
      align-items: center;
    }

    &-top {
      align-items: flex-start;
    }
  }

  .before-border {
    position: relative;

    &:before {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      content: '';
      border-bottom: 1px solid #2bbfac;
      transition: opacity .1s linear, transform .5s ease-in-out;
    }

    &:not(:hover)::before {
      opacity: 0;
      transform: scaleX(0);
    }
  }

  .accordion {
    overflow: hidden;
    background: $color-white;
    box-shadow: 0 1px 12px 1PX rgba(0,0,0,0.25);
  }

  .border {
    border-color: $color-border;
    border-width: 1px;
    border-style: solid;
    border-radius: 6px;

    &-success {
      border-color: $color-success;
    }

    &-danger {
      border-color: $color-danger
    }

    &-thick {
      border-width: 2px;
      border-style: solid;
      border-radius: 6px;
    }
  }

  .expander {
    &__trigger {
      display: flex;
      padding: .7rem;
      margin-top: 0.5rem;

      &--slim {
        padding: .35rem;
      }

      @media screen and (max-width: $mobile-width) {
        flex-wrap: wrap;
      }

      &--pending {
        background-color: $color-fake-white;
      }

    &__check {
      margin: 0 1rem;

      @media screen and (max-width: $mobile-width) {
        margin: 1rem 0;
      }
    }
    &__header {
      display: flex;
      width: 80%;
      align-items: center;
    }
    &__options {
      min-width: 20%;
      display: flex;
      justify-content: flex-end;

      @media screen and (max-width: $mobile-width) {
        margin: 0.3rem 0;
      }
    }
    }

    &__body {
      padding: .5rem 0;
      background: #f5f5f5;
      border-radius: 4px;

      &--pending{
        padding: .5rem 0;
        background: #EAEAEA;
        border-radius: 4px;
      }
    }
  }
  .cursor-pointer{
    cursor: pointer;
  }

  .is-light {
    background-color: white;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .example {
    &__icon {
      margin: 0 .5rem;

      &:hover {
        color: black;
        transition: 1s;
      }
    }
  }
</style>
