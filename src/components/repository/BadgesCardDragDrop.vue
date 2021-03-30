<template>
  <div
    :class="['badges-card', dark ? 'badges-card__dark' : '' ]">
    <div class="badges-card__header">
      <div  v-show="!edit || !fieldInput">
        <span v-html="title"></span>
      <b-icon
          v-if="edit && identifier !== 'ungrouped'"
          icon="pencil"
          size="is-small"
          class="badges-card__header__edit__icon"
          @click.native="changeEditingInput()" />
      </div>
      <div v-show="edit && fieldInput" class="badges-card__header__edit">
        <p v-html="$tc('webapp.home.labeled', examplesCount)"></p>
        <b-field class="badges-card__header__edit__field">
          <b-input
            v-model="groupName"
            size="is-small"/>
        </b-field>
      <div class="badges-card__header__edit__icon">
        <b-icon
          v-if="edit"
          icon="check-bold"
          size="is-small"
          @click.native="saveChange()" />
      </div>
      </div>
      <b-icon
        v-if="closable && edit"
        class="badges-card__icon"
        icon="close"
        size="is-small"
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
  </div>
</template>

<script>
import { getEntityColor } from '@/utils/entitiesColors';
import EntityTag from '@/components/repository/repository-evaluate/example/EntityTag';
import draggable from 'vuedraggable';
import { mapActions, mapGetters } from 'vuex';
import { formatters } from '@/utils';

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
    exampleName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      entity: null,
      to: null,
      localList: [],
      targetList: [],
      groupName: this.exampleName,
      fieldInput: false
    };
  },
  computed: {
    ...mapGetters({
      version: 'getSelectedVersion',
      repositoryUuid: 'getSelectedVersionRepository'
    }),
    nameList() {
      return this.localList.map(item => item.value || item);
    },
  },
  watch: {
    list() {
      this.updateLocalList();
    },
    groupName(){
      this.groupName = formatters.bothubItemKey()(this.groupName.toLowerCase());
      this.$emit('changedName', this.groupName)
    }
  },
  mounted() {
    this.updateLocalList();
  },
  methods: {
    ...mapActions([
      'editGroup'
    ]),
    goToEntity(entity) {
      if (this.edit) return;
      const { entity_id } = entity;
      this.$router.push({ name: 'repository-entitylist', params: { entity_id } });
    },
    changeEditingInput(){
      this.fieldInput = !this.fieldInput
    },
    async saveChange(){
      this.fieldInput = !this.fieldInput
      try {
        await this.editGroup({
          name: this.groupName,
          groupId: this.identifier,
          repositoryId: this.repositoryUuid,
          version: this.version,
        });
      } catch (err) {
        this.$buefy.toast.open({
          message: this.$t('webapp.settings.default_error'),
          type: 'is-danger',
        });
      }
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
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

  .badges-card {
    padding: .75rem;
    margin: .75rem 0;
    border: 1px solid $color-border;
    border-radius: 6px;

    &__dark {
      background-color: $color-fake-white;
      border: 1px solid $color-fake-white;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      font-family: $font-family;

      &__edit{
        display: flex;

        p {
          min-width: 50%;
        }

        &__icon{
          color: $color-grey-dark;
          margin-left: 0.4rem;
        }
      }
    }

    &__icon {
      color: $color-grey-dark;
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
