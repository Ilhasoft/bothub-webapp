<template>
  <div class="no-examples">
    <div class="button-position">
      <bh-button
        size="medium"
        :primary="active ? true : false"
        @click="activeChange(true)">
        Intenties
      </bh-button>
      <bh-button
        class="button-position-space"
        :primary="active ? false : true"
        size="medium"
        @click="activeChange(false)">
      Labels
    </bh-button>
    </div>

    <intent-label-card
      v-if="active"
      v-for="intent in repository.intents"
      :key="intent"
      :title='intent'
    />
    <intent-label-card
      v-if="!active"
      v-for="label in repository.labels"
      :key="label.value"
      :title='label.value'
      :entities="label.entities"
    />
  </div>
</template>
<script>
import BhCard from '@/bh/components/BhCard';
import BhButton from '@/bh/components/BhButton';
import IntentLabelCard from './IntentLabelCard';

export default {
  name: 'IntentsAndEntitiesList',
  data() {
    return {
      active: {
        type: Boolean,
        default: true,
      },
    };
  },
  components: {
    BhCard,
    IntentLabelCard,
    BhButton,
  },
  props: {
    repository: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    activeChange(boolean) {
      this.active = boolean;
    },
  },
};
</script>
<style lang="scss" scoped>
.button-position{
  display: flex;
  margin: 20px 20px 20px 11px;;

  &-space{
    margin-left: 10px;
  }
}
</style>
