<template>
  <div class="entity-edit__entities-list">
    <div class="entity-edit__title entity-edit__entities-list__header">
      <div class="entity-edit__title entity-edit__entities-list__header__container">
        {{ $t('webapp.home.entities_list') }}
        <div
          class="entity-edit__title entity-edit__entities-list__header__question">
          <b-tooltip
            :label="$t('webapp.summary.entity_question')"
            multilined
            type="is-dark"
            position="is-right">
            <b-icon
              custom-size="mdi-18px"
              type="is-dark"
              icon="help-circle"
            />
          </b-tooltip>
        </div>
      </div>
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
          v-show="editing"
          :disabled="creating"
          class="entity-edit__button"
          type="is-secondary"
          @click="creating = true">
          {{ $t('webapp.home.create_new_group') }}
        </b-button>
      </b-field>
    </div>
    <div>
      <div
        class="entity-edit__entities-list__labeled-count">
        <span v-show="groups.length > 0">
          {{ $tc('webapp.home.entities_label', groups.length, ungrouped.length) }}
        </span>
        <span v-show="ungrouped.length > 0">
          <span v-if="groups.length > 0">
            {{ $tc('webapp.home.non-grouped_entities', ungrouped.length) }}
          </span>
          <span v-else>
            {{ $tc('webapp.home.only_non-grouped_entities', ungrouped.length) }}
          </span>
        </span>
      </div>
      <create-badges-card
        v-if="creating"
        :title="$t('webapp.home.new_group_named', {})"
        format
        @close="creating = false"
        @finished="createGroup"
      />
      <badges-card-drag-drop
        v-for="group in groups"
        :identifier="group.group_id"
        :key="`${group.group_id}-${needsUpdate}`"
        :list="group.entities"
        :title="$tc('webapp.home.labeled', group.entities.length, { label_value: group.value })"
        :examples-count="0"
        :edit="editing"
        closable
        @onMove="moveEntity"
        @onRemoveCard="onRemoveGroup(group)"
        @onCloseTag="onRemoveEntity($event, group.group_id)"
      />
    </div>
    <badges-card-drag-drop
      :key="needsUpdate"
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
      creating: false,
      editing: false,
      loading: false,
      needsUpdate: false,
    };
  },
  computed: {
    ...mapGetters({
      version: 'getSelectedVersion',
    }),
  },
  watch: {
    editing() {
      this.creating = false;
    },
  },
  methods: {
    ...mapActions([
      'editEntity',
      'addGroup',
      'deleteEntity',
      'deleteGroup',
    ]),
    showError(error) {
      let message = this.$t('webapp.home.default_error');

      if (error.response
      && error.response.data
      && error.response.data.non_field_errors
      && error.response.data.non_field_errors.length > 0) message = error.response.data.non_field_errors.join(', ');

      this.$buefy.toast.open({
        message,
        type: 'is-danger',
      });
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
        this.creating = false;
      } catch (e) {
        this.showError(e);
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
    async removeEntity(entity, groupId) {
      this.loading = true;
      try {
        await this.deleteEntity({
          entityId: entity.entity_id,
        });
        this.$emit('removeEntity', { entity, groupId });
      } catch (e) {
        this.showError(e);
      } finally {
        this.loading = false;
      }
    },
    async removeGroup(groupId) {
      this.loading = true;
      try {
        await this.deleteGroup({
          groupUuid: groupId,
        });
        this.$emit('removeGroup', groupId);
      } catch (e) {
        this.showError(e);
      } finally {
        this.loading = false;
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
          repositoryVersion: this.version,
          repositoryId: this.repositoryUuid,
          groupId: to === 'ungrouped' ? null : to,
        });
        this.updateGroups(from, to, targetList, sourceList);
      } catch (e) {
        this.showError(e);
        this.needsUpdate = !this.needsUpdate;
      } finally {
        this.loading = false;
      }
    },
    onRemoveEntity(entity, groupId) {
      this.$buefy.dialog.alert({
        title: this.$t('webapp.home.delete_entity'),
        message: this.$t('webapp.home.delete_entity_message', { entity: entity.value }),
        confirmText: this.$t('webapp.home.delete'),
        cancelText: this.$t('webapp.home.cancel'),
        canCancel: true,
        closeOnConfirm: true,
        type: 'is-danger',
        onConfirm: async () => {
          this.removeEntity(entity, groupId);
        },
      });
    },
    onRemoveGroup(group) {
      this.$buefy.dialog.alert({
        title: this.$t('webapp.home.delete_group'),
        message: this.$t('webapp.home.delete_group_message', { group: group.value }),
        confirmText: this.$t('webapp.home.delete'),
        cancelText: this.$t('webapp.home.cancel'),
        canCancel: true,
        closeOnConfirm: true,
        type: 'is-danger',
        onConfirm: async () => {
          this.removeGroup(group.group_id);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables.scss';

  .entity-edit {
  &__title {
    font-size: 1.75rem;
    font-weight: 700;
  }

  &__button {
    color: white;
    margin-left: 0.5rem;
    margin-top:0.6rem;
  }

  &__entities-list {
    padding: 1rem .5rem;
    &__header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;

      &__container{
      display: flex;
      }
      &__question{
      margin: -0.1rem 0 0 0.2rem;
      }
    }
  }

  &__entities-list {
    &__labeled-count {
      margin-top: $between-title-subtitle;
      margin-bottom: $between-subtitle-content;
    }
  }
}
</style>
