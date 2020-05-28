<template>
  <div
    class="entity-edit__entities-list"
  >
    <div class="entity-edit__title entity-edit__entities-list__header">
      <p>{{ $t('webapp.home.entities_list') }}</p>
      <b-loading
        :is-full-page="false"
        :active="loading" />
      <b-field
        class="entity-edit__button-group"
        grouped>
        <b-button
          v-if="canEdit"
          class="entity-edit__button"
          type="is-primary"
          @click="editing=!editing">
          {{ editing ? $t('webapp.home.finish_editing') : $t('webapp.home.edit_groups') }}
        </b-button>
        <b-button
          v-if="editing"
          :disabled="newLabel.creating"
          class="entity-edit__button"
          type="is-secondary"
          @click="newLabel.creating = !newLabel.creating">
          {{ $t('webapp.home.create_new_group') }}
        </b-button>
    </b-field></div>
    <div>
      <div
        v-if="editingLabels.length > 0"
        class="entity-edit__entities-list__labeled-count">
        {{ $tc('webapp.home.entities_label', editingLabels.length) }}
      </div>
      <create-badges-card
        v-if="newLabel.creating"
        :title="$t('webapp.home.new_group_named', {})"
        format
        @close="clearNewLabel"
        @finished="createLabel"
      />
      <badges-card
        v-for="(label, i) in editingLabels"
        :identifier="label.group_id"
        :key="i"
        :list="label.entities"
        :title="$tc('webapp.home.labeled', label.entities.length, { label_value: label.value })"
        :examples-count="0"
        :edit="editing"
        closable
        @onRemove="moving.fromEntity = $event; moving.from = i"
        @onAdd="moving.toEntity = $event; moving.to = i"
        @onRemoveCard="onRemoveEntityGroup(i)"
        @onCloseTag="onRemoveEntity($event, i)"
      />
    </div>
    <badges-card
      :list="editingUnlabeled"
      :examples-count="0"
      :edit="editing"
      :title="$tc('webapp.home.unlabeled', editingUnlabeled.length)"
      identifier="unlabeled"
      dark
      @onRemove="moving.fromEntity = $event; moving.from = 'unlabeled'"
      @onAdd="moving.toEntity = $event; moving.to = 'unlabeled'"
      @onCloseTag="onRemoveEntity($event, null)"
    />
  </div>

</template>

<script>
import BadgesCard from '@/components/repository/BadgesCard';
import CreateBadgesCard from '@/components/repository/CreateBadgesCard';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EntityEdit',
  components: {
    BadgesCard,
    CreateBadgesCard,
  },
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    unlabeled: {
      type: Array,
      default: () => [],
    },
    repositoryUuid: {
      type: String,
      required: true,
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      editingLabels: [],
      editingUnlabeled: [],
      newLabel: {
        creating: false,
        text: '',
      },
      moving: {
        fromEntity: null,
        toEntity: null,
        from: null,
        to: null,
      },
      editing: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      version: 'getSelectedVersion',
    }),
    isMoveReady() {
      return this.moving.to !== null
      && this.moving.from !== null
      && this.moving.to !== this.moving.from
      && this.moving.toEntity
      && this.moving.fromEntity
      && this.moving.toEntity.entity_id === this.moving.fromEntity.entity_id;
    },
  },
  watch: {
    unlabeled() {
      this.updateLocalData();
    },
    editing() {
      this.clearNewLabel();
    },
    isMoveReady() {
      if (!this.isMoveReady) return;
      const from = this.moving.from === 'unlabeled' ? null : this.moving.from;
      const to = this.moving.to === 'unlabeled' ? null : this.moving.to;
      this.moveEntity(this.moving.toEntity, from, to);
      this.moving = {
        fromEntity: null,
        toEntity: null,
        from: null,
        to: null,
      };
    },
  },
  mounted() {
    this.updateLocalData();
  },
  methods: {
    ...mapActions([
      'editEntity',
      'addLabel',
      'deleteEntity',
      'deleteLabel',
    ]),
    updateLocalData() {
      this.editingLabels = [...this.labels];
      this.editingUnlabeled = [...this.unlabeled];
    },
    clearNewLabel() {
      this.newLabel = {
        creating: false,
        name: '',
      };
    },
    async createLabel(text) {
      if (!text || text.length === 0) return;
      this.loading = true;
      try {
        const newLabel = await this.addLabel({
          name: text,
          repositoryId: this.repositoryUuid,
          version: this.version,
        });
        this.editingLabels.push({ ...newLabel.data, entities: [] });
        this.clearNewLabel();
      } finally {
        this.loading = false;
      }
    },
    moveEntityLocal(entity, fromLabelIndex = null, toLabelIndex = null) {
      if (toLabelIndex != null) {
        this.editingLabels[toLabelIndex].entities.push(entity);
      } else {
        this.editingUnlabeled.push(entity);
      }

      if (fromLabelIndex != null) {
        const removeIndex = this.editingLabels[fromLabelIndex].entities
          .findIndex(listEntity => listEntity.entity_id === entity.entity_id);
        if (removeIndex >= 0) this.editingLabels[fromLabelIndex].entities.splice(removeIndex, 1);
      } else {
        const removeIndex = this.editingUnlabeled
          .findIndex(listEntity => listEntity.entity_id === entity.entity_id);
        if (removeIndex >= 0) this.editingUnlabeled.splice(removeIndex, 1);
      }
    },
    async moveEntity(entity, fromLabelIndex = null, toLabelIndex = null) {
      this.loading = true;
      try {
        await this.editEntity({
          entityId: entity.entity_id,
          name: entity.value,
          repositoryId: this.repositoryUuid,
          groupId: toLabelIndex != null ? this.editingLabels[toLabelIndex].group_id : null,
        });

        this.moveEntityLocal(entity, fromLabelIndex, toLabelIndex);
      } finally {
        this.loading = false;
      }
    },
    async removeEntity(entity, labelIndex) {
      if (labelIndex != null) {
        const removeIndex = this.editingLabels[labelIndex].entities
          .findIndex(listEntity => listEntity.entity_id === entity.entity_id);
        if (removeIndex >= 0) this.editingLabels[labelIndex].entities.splice(removeIndex, 1);
      } else {
        const removeIndex = this.editingUnlabeled
          .findIndex(listEntity => listEntity.entity_id === entity.entity_id);
        if (removeIndex >= 0) this.editingUnlabeled.splice(removeIndex, 1);
      }
    },
    onRemoveEntity(entity, labelIndex = null) {
      this.$buefy.dialog.alert({
        title: 'Delete Entity',
        message: 'Are you sure you want to delete this entity?',
        confirmText: 'Ok',
        cancelText: 'Cancel',
        canCancel: true,
        closeOnConfirm: true,
        onConfirm: async () => {
          this.loading = true;
          try {
            await this.deleteEntity({
              entityId: entity.entity_id,
              version: this.version,
              repositoryId: this.repositoryUuid,
            });
            this.removeEntity(entity, labelIndex);
          } finally {
            this.loading = false;
          }
        },
      });
    },
    onRemoveEntityGroup(labelIndex) {
      this.$buefy.dialog.alert({
        title: 'Delete Group',
        message: 'Are you sure you want to delete this entity group?',
        confirmText: 'Ok',
        cancelText: 'Cancel',
        canCancel: true,
        closeOnConfirm: true,
        onConfirm: async () => {
          this.loading = true;
          try {
            await this.deleteLabel({
              groupUuid: this.editingLabels[labelIndex].group_id,
            });
            this.editingLabels.splice(labelIndex, 1);
          } finally {
            this.loading = false;
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>

  .entity-edit {
  &__title {
    font-size: 1.75rem;
    font-weight: 700;
  }

  &__button {
    color: white;
    margin-left: 0.5rem;
  }

  &__entities-list {
    padding: 1rem .5rem;
    &__header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  &__entities-list {
    &__labeled-count {
      margin: 1.5rem 0 1rem;
    }
  }
}
</style>
