<template>
  <div class="badges-card">
    <div v-html="title" />
    <drop
      class="badges-card__wrapper"
      mode="cut"
      @drop="paste">
      <drag
        v-for="(item, i) in list"
        :key="i"
        :data="item"
        @cut="remove(i)">
        <b-tag
          :class="[
            'badges-card__wrapper__badge',
            getEntityClass(item),
          ]"
          rounded
          size="small"
        >
          <span>{{ item }}</span>
        </b-tag>
      </drag>
    </drop>
    <div v-if="examplesCount">
      <strong>{{ examplesCount }}</strong> {{ $t('webapp.dashboard.sentences') }}
    </div>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import { Drag, Drop, DropList } from 'vue-easy-dnd';

export default {
  name: 'BadgesCard',
  components: {
    Drag,
    DropList,
    Drop,
  },
  props: {
    title: {
      type: String,
      default: '',
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
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.list,
      );
      return `entity-${color}`;
    },
    remove(i) {
      this.$emit('onRemove', i);
    },
    paste(event) {
      this.$emit('onAdd', event.data);
    },
  },
};
</script>

<style lang="scss" scoped>
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
        font-weight: bold;
        line-height: calc(1.5rem - 4px);
        border-width: 1px;
      }
    }
  }
</style>
