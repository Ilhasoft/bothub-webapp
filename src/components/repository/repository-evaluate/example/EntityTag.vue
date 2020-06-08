<template>
  <b-tag
    :class="classes"
    :closable="closable"
    rounded
    @close="$emit('close')" >
    <span
      v-if="group"
      v-html="$t('webapp.evaluate.entity_is_group',
                 { entity: entityName, group })" />
    <strong v-else>{{ entityName }} </strong>
  </b-tag>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';

export default {
  name: 'EntityTag',
  props: {
    entityName: {
      type: String,
      default: '',
    },
    colorClass: {
      type: String,
      default: null,
    },
    group: {
      type: String,
      default: null,
    },
    highlighted: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const classList = { highlighted: this.highlighted };
      classList[this.tagClass] = true;
      return classList;
    },
    tagClass() {
      return this.colorClass || `entity-${getEntityColor(this.entityName)}`;
    },
  },
};
</script>

<style scoped>
    strong {
      color: inherit;
    }

    .highlighted {
        border: 2px solid red;
    }
</style>
