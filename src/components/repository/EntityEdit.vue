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
          ref="editButton"
          class="entity-edit__button"
          type="is-primary"
          @click.native="editing=!editing">
          {{ editing ? $t('webapp.home.finish_editing') : $t('webapp.home.edit_groups') }}
        </b-button>
        <b-button
          v-if="editing"
          :disabled="newGroup.creating"
          class="entity-edit__button"
          type="is-secondary"
          @click="newGroup.creating = !newGroup.creating">
          {{ $t('webapp.home.create_new_group') }}
        </b-button>
    </b-field></div>
    <div>
      <div
        v-if="editingGroups.length > 0"
        class="entity-edit__entities-list__labeled-count">
        {{ $tc('webapp.home.entities_label', editingGroups.length) }}
      </div>
      <create-badges-card
        v-if="newGroup.creating"
        :title="$t('webapp.home.new_group_named', {})"
        format
        @close="clearNewGroup"
        @finished="createGroup"
      />
      <badges-card-drag-drop
        v-for="(label, i) in editingGroups"
        :identifier="label.group_id"
        :key="i"
        :list="label.entities"
        :title="$tc('webapp.home.labeled', label.entities.length, { label_value: label.value })"
        :examples-count="0"
        :edit="editing"
        closable
        @onMove="moveEntity"
        @onRemoveCard="onRemoveEntityGroup(i)"
        @onCloseTag="onRemoveEntity($event, i)"
      />
    </div>
    <badges-card-drag-drop
      :list="editingUngrouped"
      :examples-count="0"
      :edit="editing"
      :title="$tc('webapp.home.unlabeled', editingUngrouped.length)"
      identifier="ungrouped"
      dark
      @onCloseTag="onRemoveEntity($event, null)"
      @onMove="moveEntity"
    />
  </div>

</template>

<script>
import BadgesCardDragDrop from '@/components/repository/BadgesCardDragDrop';
import CreateBadgesCard from '@/components/repository/CreateBadgesCard';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EntityEdit',
  components: {
    BadgesCardDragDrop,
    CreateBadgesCard,
  },
  props: {
    groups: {
      type: Array,
      default: () => [],
    },
    ungrouped: {
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
      editingGroups: [],
      editingUngrouped: [],
      newGroup: {
        creating: false,
        text: '',
      },
      editing: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      version: 'getSelectedVersion',
    }),
  },
  watch: {
    groups() {
      if (this.groups) this.editingGroups = [...this.groups];
    },
    unlabeled() {
      if (this.ungrouped) this.editingUngrouped = [...this.unlabeled];
    },
    editing() {
      this.clearNewGroup();
    },
  },
  mounted() {
    this.updateLocalData();
  },
  methods: {
    ...mapActions([
      'editEntity',
      'addGroup',
      'deleteEntity',
      'deleteGroup',
    ]),
    updateLocalData() {
      if (this.groups) this.editingGroups = [...this.groups];
      if (this.ungrouped) this.editingUngrouped = [...this.ungrouped];
    },
    clearNewGroup() {
      this.newGroup = {
        creating: false,
        name: '',
      };
    },
    async createGroup(text) {
      if (!text || text.length === 0) return;
      this.loading = true;
      try {
        const newGroup = await this.addGroup({
          name: text,
          repositoryId: this.repositoryUuid,
          version: this.version,
        });
        this.editingGroups.push({ ...newGroup.data, entities: [] });
        this.clearNewGroup();
      } finally {
        this.loading = false;
      }
    },
    moveEntityLocal(from, to, targetList, sourceList) {
      if (from !== 'ungrouped') {
        const replaceIndex = this.editingGroups
          .findIndex(group => group.group_id === from);
        if (replaceIndex >= 0) this.editingGroups[replaceIndex].entities = sourceList;
      } else {
        this.editingUngrouped.entities = sourceList;
      }

      if (to !== 'ungrouped') {
        const replaceIndex = this.editingGroups
          .findIndex(group => group.group_id === to);
        if (replaceIndex >= 0) this.editingGroups[replaceIndex].entities = targetList;
      } else {
        this.editingUngrouped.entities = targetList;
      }
    },
    async moveEntity(event) {
      const {
        entity, from, to, targetList, sourceList,
      } = event;
      this.loading = true;
      try {
        await this.editEntity({
          entityId: entity.entity_id,
          name: entity.value,
          repositoryId: this.repositoryUuid,
          groupId: to === 'ungrouped' ? null : to,
        });

        this.moveEntityLocal(from, to, targetList, sourceList);
      } finally {
        this.loading = false;
      }
    },
    async removeEntity(entity, labelIndex) {
      if (labelIndex != null) {
        const removeIndex = this.editingGroups[labelIndex].entities
          .findIndex(listEntity => listEntity.entity_id === entity.entity_id);
        if (removeIndex >= 0) this.editingGroups[labelIndex].entities.splice(removeIndex, 1);
      } else {
        const removeIndex = this.editingUngrouped
          .findIndex(listEntity => listEntity.entity_id === entity.entity_id);
        if (removeIndex >= 0) this.editingUngrouped.splice(removeIndex, 1);
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
            await this.deleteGroup({
              groupUuid: this.editingGroups[labelIndex].group_id,
            });
            this.editingUngrouped = [
              ...this.editingUngrouped,
              ...this.editingGroups[labelIndex].entities];
            this.editingGroups.splice(labelIndex, 1);
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
