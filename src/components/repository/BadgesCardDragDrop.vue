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
      @change="onChange">
      <entity-tag
        v-for="(item, i) in localList"
        :key="i"
        :class="[
          'badges-card__wrapper__badge',
          getEntityClass(item.value),
          `badges-card__wrapper__badge--${edit ? 'moving' : 'locked'}`,
        ]"
        :entity-name="item.value"
        :closable="edit"
        @close="close(item)"
        @click.native="goToEntity(item)"/>
    </draggable>
    <div v-if="examplesCount">
      <!-- <strong>{{ examplesCount }}</strong> {{ $t('webapp.dashboard.sentences') }} -->
    </div>
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import EntityTag from '@/components/repository/repository-evaluate/example/EntityTag';
import draggable from 'vuedraggable';

export default {
  name: 'BadgesCardDragDrop',
  components: {
    draggable,
    EntityTag,
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
    goToEntity(entity) {
      if (this.edit) return;
      // eslint-disable-next-line camelcase
      const { entity_id } = entity;
      const { value } = entity;
      this.$router.push({ name: 'repository-entitylist', params: { entityid: entity_id, value } });
    },
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.nameList,
      );
      return `entity-${color}`;
    },
    onRemoveCard() {
      this.$emit('onRemoveCard');
    },
    close(entity) {
      this.$emit('onCloseTag', entity);
    },
    onMove({ draggedContext, relatedContext }) {
      this.to = relatedContext.component.$attrs['data-id-attr'];
      this.entity = draggedContext.element;
      this.targetList = [...relatedContext.list, this.entity];
    },
    onChange() {
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

        &--moving {
          cursor: move
        }

        &--locked {
          cursor: pointer;
        }
      }
    }
  }
</style>
