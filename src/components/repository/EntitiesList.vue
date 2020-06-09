<template>
  <div class="entity-list">
    <div class="entity-list__content">
      <div class="entity-list__content__descriptions">
        <h1> <strong>{{ $t('webapp.entity.title') }}</strong> </h1>
        <b-tag
          v-if="!EditSentences"
          :class="[
            'entity-list__content__descriptions__tag',
            getEntityClass(entityName.entity),
          ]"
          size="is-medium">
          <div>{{ entityName.entity }}</div>
        </b-tag>
        <b-field
          v-else
          class="entity-list__content__descriptions__editEntityName">
          <b-input v-model="entityFormatted"/>
        </b-field>
      </div>
      <div>
        <b-button
          v-if="!EditSentences"
          ref="editEntityEvent"
          class="entity-list__content__buttonEdit"
          @click.native="editOptionsEntity()">{{ $t('webapp.entity.edit_button') }}</b-button>
        <b-button
          v-else
          ref="saveEntityEvent"
          class="entity-list__content__buttonSave"
          @click.native="saveEdition()">{{ $t('webapp.entity.save_button') }}</b-button>
      </div>
    </div>
    <div class="entity-list__header__options">
      <p> {{ $tc('webapp.entity.description', totalSentences) }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getEntityColor } from '@/utils/entitiesColors';
import { formatters } from '@/utils';

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
      entityId: this.$route.params.entityid,
      entityFormatted: this.entityName.entity,
      allEntities: [],
      errors: {},
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
      repositoryList: 'getCurrentRepository',
    }),
    entityFormatters() {
      return [
        formatters.bothubItemKey(),
      ];
    },
    totalSentences() {
      if (this.entitiesList !== null) {
        return this.entitiesList.total;
      }
      return 0;
    },
  },
  watch: {
    entityFormatted() {
      this.entityFormatted = (formatters.bothubItemKey()(this.entityFormatted));
    },
  },
  mounted() {
    this.getEntitiesName();
  },
  methods: {
    ...mapActions([
      'editEntityName',
      'setUpdateRepository',
      'getAllEntities',
    ]),
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.allEntities,
      );
      return `entity-${color}`;
    },
    async getEntitiesName() {
      const allEntitiesName = await this.repository.entities.map(
        entityValue => entityValue.value,
      );
      this.allEntities = allEntitiesName;
    },
    editOptionsEntity() {
      this.EditSentences = !this.EditSentences;
      this.$emit('ableEditEntities', this.EditSentences);
      this.$emit('setAllEntities', this.allEntities);
    },
    async saveEdition() {
      try {
        await this.editEntityName({
          group: {
            repository: this.repositoryList.uuid,
          },
          entityId: this.entityId,
          value: this.entityFormatted,
          repositoryVersion: this.repositoryVersion,
        });
        this.entityName.entity = this.entityFormatted;
        this.setUpdateRepository(true);
        this.$emit('saveEdition', this.entityFormatted);
      } catch (error) {
        if (error.response.data.non_field_errors !== undefined) {
          this.$buefy.toast.open({
            message: this.$t('webapp.entity.error_entity_exists'),
            type: 'is-danger',
          });
        } else {
          this.$buefy.toast.open({
            message: this.$t('webapp.entity.error_entity'),
            type: 'is-danger',
          });
        }
        this.entityName.entity = this.entityName.entity;
        this.entityFormatted = this.entityName.entity;
      }
      this.editOptionsEntity();
      const value = this.entityName.entity;
      this.$router.push({ name: 'repository-entitylist', params: { value } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';
.entity-list {
    margin: 0.4rem;
    margin-bottom: $between-subtitle-content;
      &__options{
        p{
          font-size: $font-size
        }
      }

    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__descriptions{
        display: flex;

        &__tag{
        margin: 0.2rem 0.5rem;
        border-radius: 1rem;
        padding: 0 1.1rem;

          div {
            font-size: 1.12rem;
            font-family: $font-family;
            margin-bottom: .1rem;
          }
        }
        &__editEntityName{
          margin: 0.2rem 0.5rem;
          width: 10rem;
        }
      }

      h1{
        font-size: 1.75rem;
      }

        &__buttonEdit{
          width: 9.9rem;
          margin-bottom:0.5rem;
          background-color: $color-primary;
          color: #FFFFFF;
        }
        &__buttonSave{
          width: 9.9rem;
          margin-bottom:0.5rem;
          background-color: $color-secondary-light;
          color: #FFFFFF;
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
