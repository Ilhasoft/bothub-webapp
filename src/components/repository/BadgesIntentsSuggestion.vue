<template>
  <div class="badges-container">
    <intent-tag
      v-for="item in list"
      :key="item.value"
      :entity-name="item.value"
      :intent-count="false"
      :class="{
        'badges-container__badge': true,
        'badges-container__style': checkSelectedIntents(item.value)
      }"
      @click.native="addIntents(item.value)"/>
  </div>
</template>

<script>
import IntentTag from '@/components/repository/repository-evaluate/example/IntentTag';

export default {
  name: 'BadgesIntentsSuggestion',
  components: {
    IntentTag,
  },
  props: {
    repository: {
      type: Object,
      default: null,
    },
    list: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      selectedIntents: [],
    };
  },
  methods: {
    checkSelectedIntents(intent) {
      if (this.selectedIntents.includes(intent)) { return true; }

      return false;
    },
    addIntents(intent) {
      if (!this.checkSelectedIntents(intent)) {
        this.selectedIntents.push(intent);
        return;
      }
      const removeIntent = this.selectedIntents.filter(value => value !== intent);
      this.selectedIntents = removeIntent;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/colors.scss';

.badges-container{
    padding-top: .75rem;
    margin-bottom: 3rem;

      &__badge {
        min-width: 130px;
        height: 41px;
        margin: .4rem .5rem 0 0;
        padding: 0 1rem 0 1rem;
        line-height: calc(1.5rem - 4px);
        border-width: 1px;
        border-radius: 0.375rem !important;
        cursor: pointer;

        span{
          font-size: $font-small;
          font-family: $font-family;
          font-weight: $font-weight-normal;
        }
    }

    &__style{
        background-color: $color-primary;
        color: $color-white;
    }

}


</style>
