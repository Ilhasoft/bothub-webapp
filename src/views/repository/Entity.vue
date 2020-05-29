<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div
      v-if="authenticated"
      class="entity-list">
      <div v-if="repository && repository.authorization.can_contribute">
        <entities-list
          :entities-list="examplesList"
          :entity-name="entitySearch"
          :repository="repository"
          @ableEditEntities="editEntity($event)"
          @saveEdition="onItemSave()"/>
        <paginated-list
          v-if="examplesList"
          :item-component="sentencesEntities"
          :list="examplesList"
          :repository="repository"
          :per-page="perPage"
          :editable="entitiesEditable"
          @itemDeleted="onItemDeleted()"
          @itemSave="onItemSave()"/>

        <p
          v-if="examplesList && examplesList.empty"
          class="no-examples">No examples.</p>
      </div>
      <b-notification
        v-else
        :closable="false"
        class="repository-log__notification"
        type="is-warning">
        {{ $t('webapp.evaluate.you_can_not_edit') }}
        <request-authorization-modal
          v-if="repository"
          :open.sync="requestAuthorizationModalOpen"
          :repository-uuid="repository.uuid"
          @requestDispatched="onAuthorizationRequested()" />
        <a
          class="requestAuthorization"
          @click="openRequestAuthorizationModal">
          {{ $t('webapp.layout.request_authorization') }}
        </a>
      </b-notification>
    </div>

    <div
      v-else>
      <b-notification
        :closable="false"
        class="is-info">
        {{ $t('webapp.inbox.signin_you_account') }}
      </b-notification>
      <login-form hide-forgot-password />
    </div>
  </repository-view-base>

</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import RepositoryBase from './Base';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';
import LoginForm from '@/components/auth/LoginForm';
import EntitiesList from '@/components/repository/EntitiesList';
import PaginatedList from '@/components/shared/PaginatedList';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import SentencesEntityList from '@/components/repository/SentencesEntityList';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';

export default {
  name: 'Entity',
  components: {
    RepositoryViewBase,
    LoginForm,
    RequestAuthorizationModal,
    PaginatedList,
    SentencesEntityList,
    EntitiesList,
  },
  extends: RepositoryBase,
  props: {
    perPage: {
      type: Number,
      default: 20,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: '',
      examplesList: null,
      entitySearch: {
        entity: this.$route.params.entity,
      },
      entitiesEditable: false,
      query: {},
      sentencesEntities: SentencesEntityList,
      requestAuthorizationModalOpen: false,
      querySchema: {},
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
      repositoryList: 'getCurrentRepository',
    }),
  },
  watch: {
    query() {
      this.updateExamples(true);
    },
    update() {
      this.updateExamples(true);
    },
    repository() {
      this.updateExamples(true);
    },
    entitySearch() {
      this.onSearch(this.entitySearch);
    },
  },
  mounted() {
    this.updateExamples();
    this.findEntityById();
    this.onSearch(this.entitySearch);
  },
  methods: {
    ...mapActions([
      'searchExamples',
    ]),
    findEntityById() {
      const entityGroup = this.repositoryList.groups.find(
        entityId => entityId.entities[0].entity_id === this.$route.params.entity,
      );
      const entityOtherGroup = this.repositoryList.other_group.entities.find(
        entityId => entityId.entity_id === this.$route.params.entity,
      );
      if (entityGroup) {
        this.entitySearch.entity = entityGroup.entities[0].value;
        return '';
      }
      this.entitySearch.entity = entityOtherGroup.value;
      return '';
    },
    onSearch(value) {
      // console.log(value);
      Object.assign(this.querySchema, value);

      if (!this.querySchema.entity) {
        delete this.querySchema.entity;
      }

      const formattedQueryString = exampleSearchToString(this.querySchema);
      this.query = exampleSearchToDicty(formattedQueryString);
    },
    async updateExamples(force = false) {
      if (!this.examplesList || force) {
        this.examplesList = await this.searchExamples({
          repositoryUuid: this.repository.uuid,
          version: this.repositoryVersion,
          query: this.query,
          limit: this.perPage,
        });
      }
    },
    onItemDeleted() {
      this.onSearch(this.entitySearch);
    },
    onItemSave() {
      this.onSearch(this.entitySearch);
    },
    openRequestAuthorizationModal() {
      this.requestAuthorizationModalOpen = true;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModalOpen = false;
      this.$buefy.toast.open({
        message: this.$t('webapp.layout.authorization_success'),
        type: 'success',
      });
      this.updateRepository(false);
    },
    editEntity(editValue) {
      this.entitiesEditable = editValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';
  label {
    vertical-align: middle;
  }
  .requestAuthorization{
       color: $color-fake-black;
      font-weight: $font-weight-medium;
      text-align: center;
      float: right
    }
  .entity-list {
    margin: 0.4rem;

    &__header {
      margin-bottom: 3.5rem;

      &__options{
        display:flex;
        justify-content: space-between;
        align-items: center;

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

      &__editEntityName{
        margin: 1rem;
        width: 10rem;
      }
      &__tag{
        margin-left: 1rem;
        border-radius: 1rem;
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
