<template>
  <div
    :class="['badges-card', dark ? 'badges-card__dark' : '' ]">
    <div class="badges-card__header">
      <b-field
        class="badges-card__title"
        grouped
        group-multiline>
        <span>{{ title }}</span>
        <b-input
          v-model="text"
          class="badges-card__input"
          @keyup.enter.native.prevent.stop="finished"/>
        <b-button
          :disabled="!canSubmit"
          class="badges-card__button"
          type="is-primary"
          @click.prevent.stop="finished"> {{ $t('webapp.home.enter') }} </b-button>
      </b-field>
      <b-icon
        class="badges-card__icon"
        icon="close"
        size="is-medium"
        @click.native="close" />
    </div>
  </div>
</template>

<script>
import { formatters } from '@/utils';

export default {
  name: 'CreateBadgesCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    dark: {
      type: Boolean,
      default: null,
    },
    format: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: '',
    };
  },
  computed: {
    canSubmit() {
      return this.text && this.text.length > 0;
    },
  },
  watch: {
    text() {
      if (!this.format || !this.text || this.text.length <= 0) return;
      this.text = formatters.bothubItemKey()(this.text);
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    finished() {
      if (this.canSubmit) this.$emit('finished', this.text);
    },
  },
};
</script>

<style lang="scss" scoped>
  .badges-card {
    padding: .75rem;
    margin: .75rem 0;
    border: 1px solid #CFD5D9;
    border-radius: 6px;

    &__dark {
      background-color: #F5F5F5;
      border: 1px solid #F5F5F5;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
    }

    &__title {
        align-items: center;
        column-gap: 0.5rem;
    }

    &__icon {
      color: #CFD5D9;
      cursor: pointer;
    }

    &__input {
      max-width: 80%;
      margin-left: 0.5rem;
      margin-bottom: 0;
    }
  }

  .field.is-grouped.is-grouped-multiline > .control:last-child,
  .field.is-grouped.is-grouped-multiline > .control:not(:last-child) {
    margin-bottom: 0;
  }
</style>
