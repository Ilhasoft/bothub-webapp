<template>
  <b-tag
    :class="!withoutStyle ? classes : 'withoutStyle'"
    :closable="closable"
    :size="withoutStyle ? 'is-medium' : ''"
    rounded
    @close="$emit('close')" >
    <span
      v-if="group"
      v-html="$t('webapp.evaluate.entity_is_group',
                 { entity: entityName, group })" />
    <div
      v-else-if="withoutStyle"
      class="container">
      <div class="countStyle">{{ count }}</div> {{ entityName }}
    </div>
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
    count: {
      type: Number,
      default: 0,
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
    withoutStyle: {
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

<style lang="scss" scoped>
  /deep/ strong {
      color: inherit;
    }

    .highlighted {
        border: 2px solid red;
    }
    .withoutStyle{
      border-radius: 0px !important;
      font-weight: none !important;
      height: 2.188rem;

      &:hover{
        background-color: #2BBFAC;
        color: #ffffff;

        div > .countStyle{
        background-color: #12A391;
        }
      }
    }
    .container{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .countStyle{
      font-size: 12px;
      font-weight: bold;
      border-radius: 1rem;
      min-width:  20px;
      height: 20px;
      margin-right: 0.5rem;
      padding: 0.19rem;
      color: #FFFFFF;
      background-color: #D5D5D5;

      display: flex;
      justify-content: center;
      align-items: center;
    }
</style>
