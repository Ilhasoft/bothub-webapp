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
          @setAllEntities="getAllEntities($event)"
          @saveEdition="onItemSave($event)"/>
        <paginated-list
          v-if="examplesList"
          :item-component="sentencesEntities"
          :list="examplesList"
          :repository="repository"
          :per-page="perPage"
          :editable="entitiesEditable"
          :all-entities="allEntities"
          :add-attributes="{ entitySelected: entitySearch.entity }"
          @itemDeleted="onItemDeleted()"
          @itemSave="onItemSave()"/>
        <p
          v-if="examplesList && examplesList.empty"
          class="no-examples">{{ $t('webapp.entity.no_sentences') }}</p>
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
import Loading from '@/components/shared/Loading';

export default {
  name: 'Entity',
  components: {
    RepositoryViewBase,
    LoginForm,
    RequestAuthorizationModal,
    PaginatedList,
    SentencesEntityList,
    EntitiesList,
    Loading,
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
      totalList: 0,
      entitySearch: {
        entity: this.$route.params.value,
      },
      entitiesEditable: false,
      query: {},
      sentencesEntities: SentencesEntityList,
      requestAuthorizationModalOpen: false,
      querySchema: {},
      allEntities: [],
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
    repositoryList() {
      this.updateExamples();
    },
    entitySearch() {
      this.onSearch(this.entitySearch);
    },
  },
  mounted() {
    this.updateExamples();
    this.onSearch(this.entitySearch);
  },
  methods: {
    ...mapActions([
      'searchExamples',
    ]),
    getAllEntities(value) {
      this.allEntities = value;
    },
    onSearch(value) {
      Object.assign(this.querySchema, value);
      if (!this.querySchema.entity) {
        delete this.querySchema.entity;
      }
      const formattedQueryString = exampleSearchToString(this.querySchema);
      this.query = exampleSearchToDicty(formattedQueryString);
    },
    async updateExamples(force = false) {
      if (this.repositoryList.uuid !== undefined) {
        if (!this.examplesList || force) {
          this.examplesList = await this.searchExamples({
            repositoryUuid: this.repositoryList.uuid,
            version: this.repositoryVersion,
            query: this.query,
            limit: this.perPage,
          });
        }
      }
    },
    onItemDeleted() {
      this.onSearch(this.entitySearch);
    },
    onItemSave(entityName) {
      if (entityName === undefined) {
        return this.onSearch(this.entitySearch);
      }
      const newEntity = {
        entity: entityName,
      };
      return this.onSearch(newEntity);
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
  }


</style>
