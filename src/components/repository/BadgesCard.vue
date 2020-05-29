<template>
  <div class="badges-card">
    <div v-html="title" />
    <div class="badges-card__wrapper">
      <div v-if="clickable">
        <b-tag
          v-for="(item, i) in list"
          :key="i"
          :class="[
            'badges-card__wrapper__badge badges-card__wrapper__clickable',
            getEntityClass(item),
          ]"
          size="small"
          @click.native="entityList(item.entity_id)">

          <span>{{ item.value }}</span>

        </b-tag>
      </div>
      <div v-else>
        <b-tag
          v-for="(item, i) in list"
          :key="i"
          :class="[
            'badges-card__wrapper__badge',
            getEntityClass(item),
          ]"
          size="small">

          <span>{{ item }}</span>


        </b-tag>
      </div>


    </div>
    <div v-if="examplesCount">
      <strong>{{ examplesCount }}</strong> {{ $t('webapp.dashboard.sentences') }}
    </div>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';

export default {
  name: 'BadgesCard',
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
    list: {
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
    entityList(entity) {
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

  .badges-card {
    padding: .75rem;
    margin: .75rem 0;
    border: 1px solid #CFD5D9;
    border-radius: 6px;

    &__wrapper {
      margin: .75rem .5rem;

      &__badge {
        height: 1.5rem;
        margin: .4rem .5rem 0 0;
        padding: 0 1rem 0 1rem;
        font-weight: bold;
        line-height: calc(1.5rem - 4px);
        border-width: 1px;
        border-radius: 1rem;

        span{
          font-size: $font-small;
          font-family: $font-family;
          font-weight: $font-weight-normal;
        }
      }

    &__clickable{
      cursor: pointer;
    }
  }
}
</style>
