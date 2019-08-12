<template>
  <div class="badges-card">
    <div v-html="title" />
    <div class="badges-card__wrapper">
      <bh-badge
        v-for="(item, i) in list"
        :key="i"
        :class="[
          'badges-card__wrapper__badge',
          getEntityClass(item),
        ]"
        size="small"
      >
        <span>{{ item }}</span>
      </bh-badge>
    </div>
    <div v-if="examplesCount">
      <strong>{{ examplesCount }}</strong> sentences
    </div>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';

export default {
  name: 'BadgesCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    examplesCount: {
      type: Number,
      default: null,
    },
  },
  methods: {
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.list,
      );
      return `entity-${color}`;
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

    &__wrapper {
      margin: .75rem .5rem;

      &__badge {
        height: 1.5rem;
        margin: .4rem .5rem 0 0;
        font-weight: bold;
        line-height: calc(1.5rem - 4px);
        border-width: 1px;
      }
    }
  }
</style>
