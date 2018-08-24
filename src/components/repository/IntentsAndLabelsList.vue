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
      <intents-and-labels-card
        v-for="intent in intents"
        :key="intent"
        :title="intent"
        class="card" />
    </div>
    <div v-else>
      <intents-and-labels-card
        v-for="label in labels"
        :key="label.value"
        :title="label.value"
        :label-entities="label.entities"
        class="card" />
    </div>
  </div>
</template>

<script>
import BhCard from '@/bh/components/BhCard';
import BhButton from '@/bh/components/BhButton';
import IntentsAndLabelsCard from './IntentsAndLabelsCard';


export default {
  name: 'IntentsAndLabelsList',
  components: {
    BhCard,
    IntentsAndLabelsCard,
    BhButton,
  },
  props: {
    labels: {
      type: Array,
      required: true,
    },
    intents: {
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
}

.card {
  margin: 1rem 0;
}
</style>
