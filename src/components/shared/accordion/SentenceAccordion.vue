<template>
  <div class="expander">
    <div
      :class="{
        'expander__trigger': true,
        'active': isOpen,
        'before-border': !isOpen,
        'border-thick': thickBorder,
        'border-success': type === 'is-success',
        'border-danger': type === 'is-danger',
        'is-light': isLight,
        'border': !type,
    }">


      <div class="expander__trigger__check">
        <slot name="check" />
      </div>

      <div
        ref="expander"
        class="expander__trigger__header"
        @click="toggleAccordion()">
        <slot name="header" />
      </div>

      <div
        ref="expander"
        class="expander__trigger__options"
        @click="toggleAccordion()">
        <slot name="options" />
      </div>
    </div>
    <transition name="fade">
      <div
        v-show="open"
        class="expander__body">
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
  },
  data() {
    return {
      isOpen: false,
    };
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
  @import '../../../assets/scss/utilities';
  @import '~bh/src/assets/scss/colors.scss';

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
    background: #fff;
    box-shadow: 0 1px 12px 1PX rgba(0,0,0,0.25);
  }

  .border {
    border-color: #cfd5d9;
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
      align-items: center;
      padding: .7rem;
      margin-top: 0.5rem;
      cursor: pointer;
    &__check{
      margin-right: 1rem;
    }
    &__header{
      display: flex;
      width: 80%;
      align-items: center;
    }
    &__options{
      width: 30%;
      display: flex;
      justify-content: flex-end;
    }
    }

    &__body {
      padding: .5rem 0;
      background: #f5f5f5;
      border-radius: 4px;
    }
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
