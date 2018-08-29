<template>
  <bh-card>
    <div class="i-a-l-item">
      <div class="i-a-l-item__left">
        <div class="i-a-l-item__left__content">
          <strong>{{ title }}</strong>
          <div class="i-a-l-item__left__content__info">
            <span><strong>{{ 0 }}</strong> Sentences</span>
            <span v-if="labelEntities"><strong>{{ 0 }}</strong> Entities</span>
          </div>
        </div>
        <span v-if="labelEntities">Entities</span>
      </div>
      <div
        v-if="labelEntities"
        slot="append"
        class="entities">
        <bh-badge
          v-for="(entities, i) in labelEntities"
          :key="i"
          :class="[
            'entities__entity',
            getEntityClass(entities),
          ]"
          size="small">
          <span>{{ entities }}</span>
        </bh-badge>
      </div>
    </div>
  </bh-card>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';


export default {
  name: 'IntentsAndLabelsItem',
  props: {
    title: {
      type: String,
      required: true,
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

<style lang="scss" scoped>
@import '~bh/assets/scss/bh.scss';


.i-a-l-item {
  flex-grow: 1;
  display: flex;
  color:$color-grey;

  &__left {
    display: flex;
    flex-grow: 1;
    align-items: center;
    border-color: #ebebeb;
    border-style: double;
    border-width: 0px 2px 0px 0px;
    height: auto;
    padding: 20px 20px 20px 20px;

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;

      &__info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 30%;
        margin-top: 20px;
      }
    }
  }
}

.entities {
  flex-basis: 30%;

  &__entity {
    margin: .25rem;
  }
}
</style>
