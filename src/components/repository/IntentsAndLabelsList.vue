<template>
  <div>
    <div class="button-position">
      <bh-button
        ref="intents"
        :primary="active"
        class="button-position__space"
        size="medium"
        @click="activeChange(true)">
        Intents
      </bh-button>
      <bh-button
        ref="labels"
        :primary="!active"
        class="button-position__space"
        size="medium"
        @click="activeChange(false)">
        Labels
      </bh-button>
    </div>
    <div v-if="active">
      <intents-and-labels-card
        v-for="intent in intents"
        :key="intent"
        :title="intent"
        class="card" />
    </div>
    <div v-if="!active">
      <intents-and-labels-card
        v-for="label in labels"
        :key="label.value"
        :title="label.value"
        :label-entities="label.entities"
        class="card"/>
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
      default: null,

    },
    intents: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      active: true,
    };
  },
  methods: {
    activeChange(value) {
      this.active = value;
    },
  },
};
</script>

<style lang="scss" scoped>

.button-position {
  display: flex;
  margin: 0 -.25rem;

  &__space {
    margin: .25rem;
  }
}

.card {
  margin: 1rem 0;
}
</style>
