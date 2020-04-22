<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="bh-grid bh-grid--column">
      <div class="bh-grid__item bh-grid__item--nested">
        <div class="bh-grid trainings-repository__new-example">
          <div class="bh-grid__item">
            <div v-if="authenticated">
              <div v-if="repository.authorization.can_contribute">
                <h2>{{ $t('webapp.trainings.grid_text1') }}</h2>
                <span>{{ $t('webapp.trainings.grid_text2') }}</span>
                <new-example-form
                  :repository="repository"
                  @created="updatedExampleList()" />
              </div>
              <div v-else>
                <div class="bh-notification bh-notification--warning">
                  {{ $t('webapp.trainings.not_can_edit_repository') }}
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
                </div>
              </div>
            </div>
            <div v-else>
              <div class="bh-notification bh-notification--info">
                {{ $t('webapp.trainings.login') }}
              </div>
              <login-form hide-forgot-password />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="authenticated && repository.authorization.can_contribute"
        class="bh-grid__item">
        <hr>
        <div class="trainings-repository__list-wrapper">
          <h2>{{ $t('webapp.trainings.sentences_list') }}</h2>
          <bh-button
            v-if="loadingStatus"
            ref="training"
            disabled
            loading
            color="secondary-light"
            size="normal">
            {{ $t('webapp.trainings.run_training') }}
          </bh-button>
          <bh-button
            v-else-if="repository.examples__count > 0 && repository.authorization.can_write "
            ref="training"
            color="secondary-light"
            size="normal"
            @click="openTrainingModal">
            {{ $t('webapp.trainings.run_training') }}
          </bh-button>
        </div>
        <filter-examples
          :intents="repository.intents_list"
          :entities="repository.entities_list"
          :language-filter="true"
          @queryStringFormated="onSearch($event)"/>
        <examples-list
          :query="query"
          :update="update"
          @exampleDeleted="onExampleDeleted"
        />
      </div>
    </div>
    <train-modal
      v-if="repository"
      :training="training"
      :ready-for-train="repository.ready_for_train"
      :requirements-to-train="repository.requirements_to_train"
      :open.sync="trainModalOpen"
      :languages-warnings="repository.languages_warnings"
      @train="train(repository.uuid)" />
    <train-response
      v-if="trainResponseData"
      :train-response="trainResponseData"
      :open.sync="trainResponseOpen" />
  </repository-view-base>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import NewExampleForm from '@/components/example/NewExampleForm';
import FilterExamples from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import ExamplesList from '@/components/example/ExamplesList';
import LoginForm from '@/components/auth/LoginForm';
import ExampleSearchInput from '@/components/example/ExampleSearchInput';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
import TrainModal from '@/components/repository/TrainModal';
import TrainResponse from '@/components/repository/TrainResponse';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';
import RepositoryBase from './Base';
import Loading from '@/components/shared/Loading';

export default {
  name: 'RepositoryTrainings',
  components: {
    RepositoryViewBase,
    NewExampleForm,
    FilterExamples,
    ExamplesList,
    LoginForm,
    ExampleSearchInput,
    RequestAuthorizationModal,
    TrainModal,
    TrainResponse,
    Loading,
  },
  extends: RepositoryBase,
  data() {
    return {
      trainModalOpen: false,
      requestAuthorizationModalOpen: false,
      trainResponseData: null,
      trainResponseOpen: false,
      querySchema: {},
      query: {},
      update: false,
      training: false,
      loadingStatus: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
  methods: {
    ...mapActions([
      'openLoginModal',
      'trainRepository',
      'getTrainingStatus',
    ]),
    onSearch(value) {
      Object.assign(this.querySchema, value);

      if (!this.querySchema.intent) {
        delete this.querySchema.intent;
      }
      if (!this.querySchema.entity) {
        delete this.querySchema.entity;
      }
      if (!this.querySchema.label) {
        delete this.querySchema.label;
      }
      if (!this.querySchema.language) {
        delete this.querySchema.language;
      }

      const formattedQueryString = exampleSearchToString(this.querySchema);
      this.query = exampleSearchToDicty(formattedQueryString);
    },
    async updateTrainingStatus() {
      this.loadingStatus = true;
      try {
        const trainStatus = await this.getTrainingStatus(this.repository.uuid);
        if (trainStatus) {
          Object.assign(this.repository, trainStatus);
        }
      } finally {
        this.loadingStatus = false;
      }
    },
    openTrainingModal() {
      if (!this.authenticated) {
        this.openLoginModal();
      }
      if (this.authenticated && this.repository.available_request_authorization) {
        this.openRequestAuthorizationModal();
      }
      if (this.authenticated && this.repository.authorization.can_write) {
        this.trainModalOpen = true;
      }
    },
    openRequestAuthorizationModal() {
      this.requestAuthorizationModalOpen = true;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModalOpen = false;
      this.$buefy.toast.open({
        message: this.$t('webapp.layout.authorization_success'),
        type: 'is-success',
      });
      this.updateRepository(false);
    },
    updatedExampleList() {
      this.updateTrainingStatus();
      this.update = !this.update;
    },
    onExampleDeleted() {
      this.repository.examples__count -= 1;
      this.updateTrainingStatus();
      this.updatedExampleList();
    },
    async train(repositoryUuid) {
      this.training = true;
      try {
        const response = await this.trainRepository({
          repositoryUuid,
          repositoryVersion: this.repositoryVersion,
        });
        this.trainResponseData = response.data;
        this.trainResponseOpen = true;
      } catch (e) {
        this.$buefy.toast.open({
          message: 'Repository not trained :(',
          type: 'is-danger',
        });
      }
      this.trainModalOpen = false;
      this.training = false;
      await this.updateRepository(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';

.trainings-repository {
  &__list-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
  }

  &__new-example {
    margin-top: 1rem;
    background-color: $color-white;
  }
}

  .requestAuthorization{
        color: $color-fake-black;
        font-weight: $font-weight-medium;
        text-align: center;
        float: right;
  }

   @media screen and (max-width: 50em) {
        .bh-notification--warning{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
      }

</style>
