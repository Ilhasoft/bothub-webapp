<template>
  <bh-card>
    <div class="bh-card__left__content__flex-display">
      <strong> {{ title }}</strong>
      <div class="bh-card__left__content__flex-display__label">
        <p><strong>{{ SentencesSize }}</strong> Sentences </p>
        <p v-if="entities.length != 0 "><strong>{{ entitiesSize }}</strong> Entities</p>
      </div>
    </div>
    <template slot="right">
      <bh-badge
        v-for="(entity, i) in entities"
        :key="i"
        :class="[
          getEntityClass(entity),
          'bh-card__right__space-around'
      ]">
        <span>{{ entity }}</span>
      </bh-badge>
    </template>
  </bh-card>
</template>
<script>
import BhCard from '@/bh/components/BhCard';
import BhBadge from '@/bh/components/BhBadge';
import { getEntityColor } from '@/utils/entitiesColors';


const components = {
  BhCard,
  BhBadge,
};
export default {
  name: 'IntentLabelCard',
  components,
  props: {
    title: {
      type: String,
      required: true,
    },
    examples: {
      type: Array,
      default: () => ([]),
    },
    entities: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    entitiesSize() {
      return this.entities.length;
    },
    sentencesSize() {
      return this.examples.length;
    },
  },
  methods: {
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.entities,
      );
      return `entity-${color}`;
    },
  },
};
</script>
<style>
</style>
