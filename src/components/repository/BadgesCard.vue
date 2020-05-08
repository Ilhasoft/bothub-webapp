<template>
  <drop
    :class="['badges-card', dark ? 'badges-card__dark' : '' ]"
    mode="cut"
    @drop="paste">
    <div class="badges-card__header">
      <div v-html="title" />
      <b-icon
        v-if="closable && edit"
        class="badges-card__icon"
        icon="close"
        size="is-medium"
        @click.native="onRemoveCard" />
    </div>
    <div
      class="badges-card__wrapper">
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
          :closable="edit"
          rounded
          size="small"
          @close="close(item)"
        >
          <span>{{ item }}</span>
        </b-tag>
      </drag>
    </div>
    <div v-if="examplesCount">
      <strong>{{ examplesCount }}</strong> {{ $t('webapp.dashboard.sentences') }}
    </div>
  </drop>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import { Drag, Drop } from 'vue-easy-dnd';

export default {
  name: 'BadgesCard',
  components: {
    Drag,
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
    dark: {
      type: Boolean,
      default: null,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
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
    onRemoveCard() {
      this.$emit('onRemoveCard');
    },
    close(item) {
      this.$emit('onCloseTag', item);
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

    &__dark {
      background-color: #F5F5F5;
      border: 1px solid #F5F5F5;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
    }

    &__icon {
      color: #CFD5D9;
      cursor: pointer;
    }

    &__wrapper {
      margin: .75rem .5rem;
      display: flex;
      flex-wrap: wrap;

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
