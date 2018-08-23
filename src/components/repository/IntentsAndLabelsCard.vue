<template>
  <bh-card>
    <div class="i-a-l-card">
      <div class="i-a-l-card__left">
        <div class="i-a-l-card__left__content">
          <strong> {{ title }}</strong>
          <div class="i-a-l-card__left__content__info">
            <p><strong> {{ 0 }} </strong> Sentences </p>
            <p v-if="labelEntities"><strong> {{ 0 }} </strong> Entities</p>
          </div>
        </div>
        <p v-if="labelEntities">Entities</p>
      </div>
      <div
        v-if="labelEntities"
        slot="right"
        class="entities">
        <bh-badge
          v-for="(entities, i) in labelEntities"
          :key="i"
          :class="[
            getEntityClass(entities),
          ]"
          size="small"
          class="entities__entity">
          <span> {{ entities }} </span>
        </bh-badge>
      </div>
    </div>
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


.i-a-l-card {
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
      width: 100%;

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
  flex-wrap: wrap;
  width: 30%;
  margin: 0 -.25rem;

  &__entity {
    margin: .50rem;
  }
}
</style>
