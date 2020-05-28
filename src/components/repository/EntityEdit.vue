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
        v-if="groups.length > 0"
        class="entity-edit__entities-list__labeled-count">
        {{ $tc('webapp.home.entities_label', groups.length) }}
      </div>
      <create-badges-card
        v-if="newGroup.creating"
        :title="$t('webapp.home.new_group_named', {})"
        format
        @close="clearNewGroup"
        @finished="createGroup"
      />
      <badges-card-drag-drop
        v-for="(group, i) in groups"
        :identifier="group.group_id"
        :key="i"
        :list="group.entities"
        :title="$tc('webapp.home.labeled', group.entities.length, { label_value: group.value })"
        :examples-count="0"
        :edit="editing"
        closable
        @onMove="moveEntity"
        @onRemoveCard="onRemoveGroup(group.group_id)"
        @onCloseTag="onRemoveEntity($event, group.group_id)"
      />
    </div>
    <badges-card-drag-drop
      :list="ungrouped"
      :examples-count="0"
      :edit="editing"
      :title="$tc('webapp.home.unlabeled', ungrouped.length)"
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
    editing() {
      this.clearNewGroup();
    },
  },
  methods: {
    ...mapActions([
      'editEntity',
      'addGroup',
      'deleteEntity',
      'deleteGroup',
    ]),
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
        this.$emit('createdGroup', { ...newGroup.data, entities: [], group_id: newGroup.data.id });
        this.clearNewGroup();
      } finally {
        this.loading = false;
      }
    },
    updateGroups(from, to, targetList, sourceList) {
      if (from !== 'ungrouped') {
        this.$emit('updateGroup', { entities: sourceList, groupId: from });
      } else {
        this.$emit('updateUngrouped', { entities: sourceList });
      }

      if (to !== 'ungrouped') {
        this.$emit('updateGroup', { entities: targetList, groupId: to });
      } else {
        this.$emit('updateUngrouped', { entities: targetList });
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

        this.updateGroups(from, to, targetList, sourceList);
      } finally {
        this.loading = false;
      }
    },
    onRemoveEntity(entity, groupId) {
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
            });
            this.$emit('removeEntity', { entity, groupId });
          } finally {
            this.loading = false;
          }
        },
      });
    },
    onRemoveGroup(groupId) {
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
              groupUuid: groupId,
            });
            this.$emit('removeGroup', groupId);
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
