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
      <bh-dropdown>
        <bh-icon-button
          slot="trigger"
          v-if="editEntityEnable"
          value="dots-horizontal"
          size="small" />
        <bh-dropdown-item>Edit</bh-dropdown-item>
        <bh-dropdown-item>Remove</bh-dropdown-item>
      </bh-dropdown>
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
    editEntityEnable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editEntityDropDown: true,
    };
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
  position: relative;
  margin: -4px;

  &__badge {
    margin: 4px;
  }
}
</style>
