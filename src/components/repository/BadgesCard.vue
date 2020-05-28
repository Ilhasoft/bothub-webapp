<template>
  <div
    :class="['badges-card', dark ? 'badges-card__dark' : '' ]">
    <div class="badges-card__header">
      <div v-html="title" />
      <b-icon
        v-if="closable && edit"
        class="badges-card__icon"
        icon="close"
        size="is-medium"
        @click.native="onRemoveCard" />
    </div>
    <draggable
      :disabled="!edit"
      v-model="localList"
      :sort="false"
      :data-id-attr="identifier"
      :move="onMove"
      group="entities"
      class="badges-card__wrapper"
      @end="onEnd">
      <b-tag
        v-for="(item, i) in localList"
        :key="i"
        :class="[
          'badges-card__wrapper__badge',
          getEntityClass(item.value || item),
        ]"
        :closable="edit"
        rounded
        size="small"
        @close="close(item)"
      >
        <span>{{ item.value || item }}</span>
    </b-tag></draggable>
    <div v-if="examplesCount">
      <!-- <strong>{{ examplesCount }}</strong> {{ $t('webapp.dashboard.sentences') }} -->
    </div>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import draggable from 'vuedraggable';

export default {
  name: 'BadgesCard',
  components: {
    draggable,
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
    identifier: {
      type: null,
      default: null,
    },
  },
  data() {
    return {
      entity: null,
      to: null,
      localList: [],
      targetList: [],
    };
  },
  computed: {
    nameList() {
      return this.localList.map(item => item.value || item);
    },
  },
  watch: {
    list() {
      this.updateLocalList();
    },
  },
  mounted() {
    this.updateLocalList();
  },
  methods: {
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.nameList,
      );
      return `entity-${color}`;
    },
    onEnd() {
      if (this.entity == null || this.to == null) return;
      this.$emit('onMove', {
        from: this.identifier,
        to: this.to,
        entity: this.entity,
        targetList: this.targetList,
        sourceList: this.localList,
      });
      this.entity = null;
      this.to = null;
      this.targetList = [];
    },
    onMove({ draggedContext, relatedContext }) {
      this.to = relatedContext.component.$attrs['data-id-attr'];
      this.entity = draggedContext.element;
      this.targetList = [...relatedContext.list, this.entity];
    },
    updateLocalList() {
      this.localList = [...this.list];
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
