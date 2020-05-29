<template>
  <div class="entity-list__header">
    <div class="entity-list__content">
      <h1> <strong>Entity</strong> </h1>
      <b-tag
        v-if="!EditSentences"
        :class="[
          'entity-list__content__tag',
          getEntityClass(entityName.entity),
        ]"
        size="is-medium">
        <div>{{ entityName.entity }}</div>
      </b-tag>
      <b-field
        v-else
        class="entity-list__content__editEntityName">
        <b-input v-model="entityName.entity"/>
      </b-field>
    </div>
    <div class="entity-list__header__options">
      <p> This entity contain in {{ entitiesList.total }} sentences.</p>
      <b-button
        v-if="!EditSentences"
        ref="editEntityEvent"
        class="entity-list__header__options__buttonEdit"
        @click.native="editOptionsEntity()">Edit Entity</b-button>
      <b-button
        v-else
        ref="saveEntityEvent"
        class="entity-list__header__options__buttonSave"
        @click.native="saveEdition()">Save Edit</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getEntityColor } from '@/utils/entitiesColors';

export default {
  name: 'EntitiesList',
  props: {
    entitiesList: {
      type: Object,
      default: null,
    },
    entityName: {
      type: Object,
      default: () => {},
    },
    repository: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      EditSentences: false,
      entityId: this.$route.params.entity,
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
      repositoryList: 'getCurrentRepository',
    }),
  },
  methods: {
    ...mapActions([
      'editEntityName',
      'setUpdateRepository',
    ]),
    getEntityClass(entity) {
      const entitiesName = this.repository.other_group.entities.map(
        entityValue => entityValue.value,
      );
      const entityGroup = this.repositoryList.groups.map(
        entitiesValue => entitiesValue.entities[0].value,
      );

      if (entitiesName.indexOf(entity) !== -1) {
        const color = getEntityColor(
          entity,
          entitiesName,
        );
        return `entity-${color}`;
      }

      const color = getEntityColor(
        entity,
        entityGroup,
      );
      return `entity-${color}`;
    },
    editOptionsEntity() {
      this.EditSentences = !this.EditSentences;
      this.$emit('ableEditEntities', this.EditSentences);
    },
    async saveEdition() {
      try {
        await this.editEntityName({
          group: {
            repository: this.repositoryList.uuid,
          },
          entityId: this.entityId,
          value: this.entityName.entity,
        });
        this.setUpdateRepository(true);
        this.$emit('saveEdition');
      } catch (error) {
        this.$buefy.toast.open({
          message: 'Something\'s not good, my bad!',
          type: 'is-danger',
        });
      }
      this.editOptionsEntity();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';
.entity-list {
    margin: 0.4rem;

    &__header {
      margin-bottom: 3.5rem;

      &__options{
        display:flex;
        justify-content: space-between;
        align-items: center;

        p{
          font-size: $font-size
        }

        &__buttonEdit{
          width: 9.9rem;
          background-color: $color-primary;
          color: #FFFFFF;
        }
        &__buttonSave{
          width: 9.9rem;
          background-color: $color-secondary-light;
          color: #FFFFFF;
        }
      }
    }

    &__content {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      h1{
        font-size: 1.75rem;
      }

      &__editEntityName{
        margin: 1rem;
        width: 10rem;
      }
      &__tag{
        margin-left: 0.5rem;
        border-radius: 1rem;
        margin-bottom: 0.5rem;
        padding: 0 1.1rem;

        div {
          font-size: 1.12rem;
          font-family: $font-family;
          margin-bottom: .1rem;
        }
      }
    }

    &__notification {

      margin: 0.5rem;

         @media screen and (max-width: 50em) {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
      }
    }
}
</style>
