<template>
  <div class="expander">
    <div
      :class="open ? 'active':'before-border'"
      class="expander__trigger"
      @click="toggleAccordion">
      
      <div class="level-left">
        <slot name="header" />
      </div>

      <div class="level-right expander__trigger__btns-wrapper">
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
import { mapState } from 'vuex';
import HighlightedText from '@/components/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';

export default {
  name: 'SentenceAccordion',
  components: {
    HighlightedText,
    LanguageBadge,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    training: {
      type: Boolean,
      default: false,
    },
    entities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    language: {
      type: String,
      default: '',
    },
    editing: {
      type: Boolean,
      default: false,
    },
    shouldEdit: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      deleteDialog: null,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
  },
  methods: {
    toggleAccordion() {
      this.open = !this.open;
      this.$emit('onToggle');
    },
  },
};
</script>


<style lang="scss" scoped>
  @import '../../../assets/scss/utilities';

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

  .expander {
    &__trigger {
      display: grid;
      grid-template-columns: 1fr 25%;
      justify-content: space-between;
      padding: .7rem;
      margin-top: 0.5rem;
      cursor: pointer;
      border: 1px solid #cfd5d9;
      border-radius: 3px;

      &__btns-wrapper {
        display: flex;
        justify-content: flex-end;
      }
    }

    &__body {
      padding: .7rem 0;
      background: #f5f5f5;
    }
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
