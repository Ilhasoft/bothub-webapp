<template>
  <div
    :class="['badges-card', dark ? 'badges-card__dark' : '' ]">
    <div class="badges-card__header">
      <b-field
        class="badges-card__title"
        grouped>
        <span>{{ title }}</span>
        <b-input
          v-model="text"
          @blur="finished"
          @keyup.enter.native="finished"/>
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
  },
  data() {
    return {
      text: '',
    };
  },
  methods: {
    close() {
      this.$emit('finished', null);
    },
    finished() {
      this.$emit('finished', this.text);
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
  }
</style>
