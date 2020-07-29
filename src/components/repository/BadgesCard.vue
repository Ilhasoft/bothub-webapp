<template>
  <div :class="!homeIntenties ? 'badges-card' : 'badges-without-styles'">
    <div v-html="title" />
    <div class="badges-card__wrapper">
      <div>
        <entity-tag
          v-for="item in list"
          :key="item.value || item"
          :entity-name="item.value || item"
          :count="item.examples__count"
          :class="['badges-card__wrapper__badge', clickable ? 'badges-card__clickable' : '']"
          :without-style="homeIntenties"
          @click.native="goToList(item.entity_id, item.value)"/>
      </div>
    </div>
    <div v-if="examplesCount">
      <strong>{{ examplesCount }}</strong> {{ $t('webapp.dashboard.sentences') }}
    </div>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import EntityTag from '@/components/repository/repository-evaluate/example/EntityTag';

export default {
  name: 'BadgesCard',
  components: {
    EntityTag,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    repository: {
      type: Object,
      default: null,
    },
    entityId: {
      type: Number,
      default: null,
    },
    homeIntenties: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    intentsList: {
      type: Array,
      default: () => ([]),
    },
    examplesCount: {
      type: Number,
      default: null,
    },
  },
  computed: {
    nameList() {
      return this.list.map(item => item.value || item);
    },
  },
  methods: {
    goToList(entity, intent) {
      if (!this.clickable) return;
      if (this.homeIntenties) {
        this.$router.push({ name: 'repository-intentlist', params: { intent } });
        return;
      }
      this.$router.push({ name: 'repository-entitylist', params: { entity } });
    },
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.nameList,
      );
      return `entity-${color}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables.scss';

.badges-without-styles{
    padding-top: .75rem;
    margin: .75rem -0.4rem;
    margin-bottom: 3rem;
}
  .badges-card {
    padding: .75rem;
    margin: .75rem 0;
    border: 1px solid #CFD5D9;
    border-radius: 6px;
    font-weight: bold;

    &__clickable{
      cursor: pointer;
    }

    &__wrapper {
      margin: .75rem .5rem;

      &__badge {
        height: 1.5rem;
        margin: .4rem .5rem 0 0;
        padding: 0 1rem 0 1rem;
        line-height: calc(1.5rem - 4px);
        border-width: 1px;
        border-radius: 1rem;

        span{
          font-size: $font-small;
          font-family: $font-family;
          font-weight: $font-weight-normal;
        }
      }
  }
}
</style>
