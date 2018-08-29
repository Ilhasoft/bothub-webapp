<template>
  <div class="intents-and-labels-list">
    <div class="intents-and-labels-list__radio">
      <bh-button
        ref="intents"
        :primary="listActived === 'intents'"
        class="intents-and-labels-list__radio__button"
        size="medium"
        @click="activeList('intents')" >
        Intents
      </bh-button>
      <bh-button
        ref="labels"
        :primary="listActived === 'labels'"
        class="intents-and-labels-list__radio__button"
        size="medium"
        @click="activeList('labels')">
        Labels
      </bh-button>
    </div>
    <div v-if="listActived === 'intents'">
      <intents-and-labels-item
        v-for="intent in intents"
        :key="intent"
        :title="intent"
        class="intents-and-labels-list__item"
        @showSentences="$emit('showSentences', $event)" />
    </div>
    <div v-else-if="listActived === 'labels'">
      <intents-and-labels-item
        v-for="label in labels"
        :key="label.value"
        :title="label.value"
        :label-entities="label.entities"
        class="intents-and-labels-list__item" />
    </div>
  </div>
</template>

<script>
import IntentsAndLabelsItem from '@/components/repository/IntentsAndLabelsItem';


export default {
  name: 'IntentsAndLabelsList',
  components: {
    IntentsAndLabelsItem,
  },
  props: {
    intents: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      listActived: 'intents',
    };
  },
  methods: {
    activeList(value) {
      this.listActived = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.intents-and-labels-list {
  &__radio {
    margin: 0 -.25rem;
    display: flex;

    &__button {
      margin: .25rem;
    }
  }

  &__item {
    margin: 1rem 0;
  }
}
</style>
