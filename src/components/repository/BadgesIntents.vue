<template>
  <div class="badges-without-styles">
    <div v-html="title" />
    <div class="badges-card__wrapper">
      <div>
        <intent-tag
          v-for="item in list"
          :key="item.value"
          :entity-name="item.value"
          :count="item.examples__count"
          class="badges-card__wrapper__badge"
          @click.native="goToList(item.value)"/>
      </div>
    </div>
    <div v-if="examplesCount">
      <strong>{{ examplesCount }}</strong> {{ $t('webapp.dashboard.sentences') }}
    </div>
  </div>
</template>

<script>
import IntentTag from '@/components/repository/repository-evaluate/example/IntentTag';

export default {
  name: 'BadgesIntents',
  components: {
    IntentTag,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    repository: {
      type: Object,
      default: null,
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    examplesCount: {
      type: Number,
      default: null,
    },
  },
  methods: {
    goToList(intent) {
      this.$router.push({ name: 'repository-intentlist', params: { intent } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/colors.scss';

.badges-without-styles{
    padding-top: .75rem;
    margin: .75rem -0.4rem;
    margin-bottom: 3rem;
}
  .badges-card {
    padding: .75rem;
    margin: .75rem 0;
    border: 1px solid $color-border;
    border-radius: 6px;
    font-weight: bold;

    &__wrapper {
      margin: .75rem .5rem;

      &__badge {
        height: 1.5rem;
        margin: .4rem .5rem 0 0;
        padding: 0 1rem 0 1rem;
        line-height: calc(1.5rem - 4px);
        border-width: 1px;
        border-radius: 1rem;
        cursor: pointer;

        span{
          font-size: $font-small;
          font-family: $font-family;
          font-weight: $font-weight-normal;
        }
      }
  }
}
</style>
