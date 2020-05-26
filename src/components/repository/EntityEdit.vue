<template>
  <div
    class="repository-home__entities-list"
  >
    <div class="repository-home__title repository-home__entities-list__header">
      <b-loading
        :is-full-page="false"
        :active="loading" />
      <p>{{ $t('webapp.home.entities_list') }}</p>
      <b-field
        class="repository-home__button-group"
        grouped>
        <b-button
          class="repository-home__button"
          type="is-primary"
          @click="editing=!editing">
          {{ editing ? 'Finish Editing' : 'Edit Groups' }}
        </b-button>
        <b-button
          v-if="editing"
          :disabled="newLabel.creating"
          class="repository-home__button"
          type="is-secondary"
          @click="newLabel.creating = !newLabel.creating"
          @finished="createLabel">
          Create new group
        </b-button>
    </b-field></div>
    <div v-if="editingLabels.length > 0">
      <div class="repository-home__entities-list__labeled-count">
        {{ $t('webapp.home.entities_label') }}
      </div>
      <create-badges-card
        v-if="newLabel.creating"
        title="New Label named"
        @finished="createLabel"
      />
      <badges-card
        v-for="(label, i) in editingLabels"
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
      && this.moving.toEntity.id === this.moving.fromEntity.id;
    },
  },
  watch: {
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
        await this.addLabel({
          name: text,
          repositoryId: this.repositoryUuid,
          version: this.version,
        });
        // TODO: get new label id
        this.editingLabels.push({
          id: this.editingLabels.length,
          value: text,
          entities: [],
        });
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
          .findIndex(listEntity => listEntity.id === entity.id);
        if (removeIndex >= 0) this.editingLabels[fromLabelIndex].entities.splice(removeIndex, 1);
      } else {
        const removeIndex = this.editingUnlabeled
          .findIndex(listEntity => listEntity.id === entity.id);
        if (removeIndex >= 0) this.editingUnlabeled.splice(removeIndex, 1);
      }
    },
    async moveEntity(entity, fromLabelIndex = null, toLabelIndex = null) {
      this.loading = true;
      try {
        await this.editEntity({
          entityId: entity.id,
          version: this.version,
          repositoryId: this.repositoryUuid,
          labelId: toLabelIndex ? this.editingLabels[toLabelIndex].id : null,
        });

        this.moveEntityLocal(entity, fromLabelIndex, toLabelIndex);
      } finally {
        this.loading = false;
      }
    },
    async removeEntity(entity, labelIndex) {
      console.log({entity, labelIndex})
      if (labelIndex != null) {
        const removeIndex = this.editingLabels[labelIndex].entities
          .findIndex(listEntity => listEntity.id === entity.id);
        if (removeIndex >= 0) this.editingLabels[labelIndex].entities.splice(removeIndex, 1);
      } else {
        const removeIndex = this.editingUnlabeled
          .findIndex(listEntity => listEntity.id === entity.id);
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
              entityId: entity.id,
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
              labelid: this.editingLabels[labelIndex].id,
              version: this.version,
              repositoryId: this.repositoryUuid,
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

</style>
