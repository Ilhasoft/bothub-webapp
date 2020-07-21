<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div class="trainings-repository__new-example">
        <div v-if="authenticated">
          <div v-if="repository.authorization.can_contribute">
            <div
              v-if="authenticated && repository.authorization.can_contribute">
              <div class="trainings-repository__list-wrapper">
                <div>
                  <h2>{{ $t('webapp.trainings.grid_text1') }}</h2>
                  <span>{{ $t('webapp.trainings.grid_text2') }}</span>
                </div>
                <div
                  id="tour-training-step-6"
                  class="trainings-repository__list-wrapper__tutorialStep">
                  <b-button
                    v-if="repository.examples__count > 0 && repository.authorization.can_write "
                    ref="training"
                    :disabled="loadingStatus"
                    :loading="loadingStatus"
                    type="is-secondary"
                    class="trainings-repository__list-wrapper__button"
                    @click="openTrainingModal">
                    {{ $t('webapp.trainings.run_training') }}
                  </b-button>
                </div>
              </div>
            </div>
            <new-example-form
              :repository="repository"
              @created="updatedExampleList()"
              @eventStep="dispatchClick()" />
          </div>
          <authorization-request-notification
            v-else
            :repository-uuid="repository.uuid"
            @onAuthorizationRequested="updateRepository(false)" />
        </div>
        <div v-else>
          <b-notification
            :closable="false"
            type="is-info">
            {{ $t('webapp.trainings.login') }}
          </b-notification>
          <login-form hide-forgot-password />
        </div>
      </div>
      <div
        v-if="authenticated && repository.authorization.can_contribute">
        <hr>
        <div class="trainings-repository__list-wrapper">
          <h2>{{ $t('webapp.trainings.sentences_list') }}</h2>
        </div>
        <filter-examples
          :intents="repository.intents_list"
          :entities="repository.entities"
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
    <tour
      v-if="activeTutorial === 'training'"
      :step-count="7"
      :next-event="eventClick"
      :finish-event="eventClickFinish"
      name="training"/>
    <tutorial-modal :open="activeMenu"/>
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
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
import TrainModal from '@/components/repository/TrainModal';
import TrainResponse from '@/components/repository/TrainResponse';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';
import RepositoryBase from './Base';
import Loading from '@/components/shared/Loading';
import Tour from '@/components/Tour';
import TutorialModal from '@/components/TutorialModal';

export default {
  name: 'RepositoryTrainings',
  components: {
    RepositoryViewBase,
    NewExampleForm,
    FilterExamples,
    ExamplesList,
    LoginForm,
    ExampleSearchInput,
    AuthorizationRequestNotification,
    TrainModal,
    TrainResponse,
    Loading,
    Tour,
    TutorialModal,
  },
  extends: RepositoryBase,
  data() {
    return {
      trainModalOpen: false,
      trainResponseData: null,
      trainResponseOpen: false,
      querySchema: {},
      query: {},
      update: false,
      training: false,
      loadingStatus: false,
      eventClick: false,
      eventClickFinish: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'activeTutorial',
      'activeMenu',
    ]),
  },
  methods: {
    ...mapActions([
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
        const trainStatus = await this.getTrainingStatus({
          repositoryUUID: this.repository.uuid,
          version: this.repositoryVersion,
        });
        if (trainStatus) {
          Object.assign(this.repository, trainStatus);
        }
      } finally {
        this.loadingStatus = false;
      }
    },
    openTrainingModal() {
      if (!this.authenticated) {
        this.signIn();
      }
      if (this.authenticated && this.repository.available_request_authorization) {
        this.openRequestAuthorizationModal();
      }
      if (this.authenticated && this.repository.authorization.can_write) {
        this.trainModalOpen = true;
      }
      this.dispatchFinish();
    },
    dispatchClick() {
      this.eventClick = !this.eventClick;
    },
    dispatchFinish() {
      this.eventClickFinish = !this.eventClickFinish;
    },
    signIn() {
      this.$router.push({
        name: 'signIn',
      });
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
  @import '~@/assets/scss/colors.scss';
  @import '~@/assets/scss/variables.scss';

.trainings-repository {
  &__list-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;

    &__button{
      color: $color-white;
      width: 14rem;

      &:hover{
        color: $color-white;
      }
    }

    &__tutorialStep{
      height:2.2rem;
    }
  }

  &__new-example {
    margin-top: 1rem;
    background-color: $color-white;
  }
}


</style>
