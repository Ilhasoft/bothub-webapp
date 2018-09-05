<template>
  <div class="intents-and-labels-list">
    <example-search-input
      v-model="searchQuery" />
    <pre>{{ searchQuery }}</pre>

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
        :key="intent.value"
        :title="intent.value"
        :sentences-count="intent.examples__count"
        class="intents-and-labels-list__item"
        @showSentences="$emit('showSentences', { type: 'intent', intent })" />
      <p
        v-if="intents.length === 0"
        class="intents-and-labels-list__empty-message">There is no intents </p>
    </div>
    <div v-else-if="listActived === 'labels'">
      <intents-and-labels-item
        v-for="label in labels"
        :key="label.value"
        :title="label.value"
        :label-entities="label.entities"
        :sentences-count="label.examples__count"
        class="intents-and-labels-list__item"
        @showSentences="$emit('showSentences', { type: 'label', label })"
        @showEntitySentences="$emit('showSentences', { type: 'entity', label, entity: $event })" />
      <p
        v-if="labels.length === 0"
        class="intents-and-labels-list__empty-message">There is no labels </p>
    </div>
  </div>
</template>

<script>
import IntentsAndLabelsItem from '@/components/repository/IntentsAndLabelsItem';
import ExampleSearchInput from '@/components/example/ExampleSearchInput';


export default {
  name: 'IntentsAndLabelsList',
  components: {
    IntentsAndLabelsItem,
    ExampleSearchInput,
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
      searchQuery: { intent: 'intent_here', label: 'label_here', text: 'Text Heree' },
    };
  },
  methods: {
    activeList(value) {
      this.listActived = value;
    },
    searchQueryMount(value) {
      this.searchQuery = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.intents-and-labels-list {
  &__empty-message {
    margin: 1rem;
    font-style: italic;
  }

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
