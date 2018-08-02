<template>
  <div class="entities-badges">
    <bh-badge
      v-for="(entity, i) in entities"
      :key="i"
      :class="[
        'entities-badges__badge',
        getEntityClass(entity),
      ]">
      <span>
        <span><strong>{{ entity.entity }}</strong></span>
        <span v-if="entity.label">is <strong>{{ entity.label }}</strong></span>
      </span>
      <bh-icon-button
        v-if="editLabelEnable"
        value="dots-horizontal"
        size="small" />
    </bh-badge>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';


export default {
  name: 'EntitiesBadges',
  props: {
    entities: {
      type: Array,
      required: true,
    },
    availableEntities: {
      type: Array,
      default: () => ([]),
    },
    editLabelEnable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.availableEntities,
        this.entities,
      );
      return `entity-${color}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.entities-badges {
  margin: -4px;

  &__badge {
    margin: 4px;
  }
}
</style>
