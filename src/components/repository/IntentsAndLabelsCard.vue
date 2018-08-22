<template>
  <bh-card>
    <div class="bh-card__left__content__flex-display">
      <strong> {{ title }}</strong>
      <div class="bh-card__left__content__flex-display__label">
        <p><strong>{{ 0 }}</strong> Sentences </p>
        <p v-if="labelEntities != null"><strong>{{ 0 }}</strong> Entities</p>
      </div>
    </div>
    <p v-if="labelEntities != null">Entities</p>
    <template slot="right">
      <div v-if="labelEntities != null">
        <bh-badge
          v-for="(entities, i) in labelEntities"
          :key="i"
          :class="[
            getEntityClass(entities),
            'bh-card__right__space-around'
          ]"
          size="small"
          class="margin-badge">
          <span> {{ entities }} </span>
        </bh-badge>
      </div>
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
  name: 'IntentsAndLabelsCard',
  components,
  props: {
    title: {
      type: String,
      required: true,
    },
    intents: {
      type: Array,
      default: null,
    },
    labelEntities: {
      type: Array,
      default: null,
    },
  },
  methods: {
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.labelEntities,
      );
      return `entity-${color}`;
    },
  },
};
</script>
<style>
  .margin-badge{
    margin-left: 5px;
  }
</style>
