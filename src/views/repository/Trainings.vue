<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div class="trainings-repository__new-example">
        <div v-if="authenticated">
          <div v-if="repository.authorization.can_contribute">
            <div class="trainings-repository__list-wrapper">
              <div>
                <h2>{{ $t('webapp.trainings.grid_text1') }}</h2>
                <span>{{ $t('webapp.trainings.grid_text2') }}</span>
              </div>
            </div>
            <new-example-form
              :repository="repository"
              @created="updatedExampleList()"
              @eventStep="dispatchClick()"/>
            <ExamplesPendingTraining
              :query="query"
              :update="update"
              :text-data="textExample"
              :is-train="checkTrainProgress"
              class="trainings-repository__new-example__pending-example"
              @exampleDeleted="onExampleDeleted"
              @noPhrases="noPhrasesYet = false"
            />
            <div class="trainings-repository__new-example__train">
              <div
                v-if="checkTrainProgress"
                class="trainings-repository__new-example__train__progress">
                <div
                  :style="{ width: getProgress + '%' }"
                  class="trainings-repository__new-example__train__bar"/>
                <p v-html="$t('webapp.trainings.train_progress', {progress: getProgress})"/>
              </div>
              <div
                v-else-if="!noPhrasesYet && !getCheckRepositoryTrain"
                id="tour-training-step-6"
                :is-next-disabled="true"
                :is-previous-disabled="true"
                class="trainings-repository__list-wrapper__tutorialStep">
                <b-button
                  v-if="repository.authorization.can_write && !noPhrasesYet"
                  ref="training"
                  :disabled="loadingStatus || repository.examples__count === 0"
                  :loading="loadingStatus"
                  type="is-secondary"
                  class="trainings-repository__list-wrapper__button"
                  @click="dispatchTrain()">
                  {{ $t('webapp.trainings.run_training') }}
                </b-button>
              </div>
            </div>
          </div>
          <authorization-request-notification
            v-else
            :available="!repository.available_request_authorization"
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
        <div
          class="trainings-repository__list-wrapper">
          <h2>{{ $t('webapp.trainings.sentences_list') }}</h2>
        </div>
        <filter-examples
          :intents="repository.intents_list"
          :entities="repository.entities"
          :language-filter="true"
          @queryStringFormated="onSearch($event)"
          @textData="changedText($event)"/>
        <examples-list
          :query="query"
          :update="update"
          :text-data="textExample"
          @exampleDeleted="onExampleDeleted"
        />
      </div>
    </div>
    <train-modal
      v-if="repository"
      :training="training"
      :requirements-to-train="repository.requirements_to_train"
      :open="trainModalOpen"
      :languages-warnings="repository.languages_warnings"
      @finishedTutorial="dispatchFinish()"
      @resetTutorial="dispatchReset()"
      @closeTrainModal="closeTrainModal()"/>
    <train-response/>
    <tour
      v-if="activeTutorial === 'training'"
      :step-count="8"
      :next-event="eventClick"
      :finish-event="eventClickFinish"
      :reset-tutorial="eventReset"
      name="training"/>
  </repository-view-base>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import NewExampleForm from '@/components/example/NewExampleForm';
import FilterExamples from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import ExamplesList from '@/components/example/ExamplesList';
import ExamplesPendingTraining from '@/components/example/ExamplesPendingTraining';
import LoginForm from '@/components/auth/LoginForm';
import ExampleSearchInput from '@/components/example/ExampleSearchInput';
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
import TrainModal from '@/components/repository/TrainModal';
import TrainResponse from '@/components/repository/TrainResponse';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
import RepositoryBase from './Base';
import Loading from '@/components/shared/Loading';
import Tour from '@/components/Tour';

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
    RequestAuthorizationModal,
    ExamplesPendingTraining,
    TrainModal,
    TrainResponse,
    Loading,
    Tour,
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
      pendingList: false,
      loadingStatus: false,
      eventClick: false,
      eventClickFinish: false,
      eventReset: false,
      blockedNextStepTutorial: false,
      repositoryStatus: {},
      textExample: '',
      noPhrasesYet: true,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'activeTutorial',
      'getWhichRepositoryIsTrain',
      'getSelectedVersionRepository',
      'getRepositoriesTrain',
      'getCheckRepositoryTrain',
    ]),
    checkTrainProgress() {
      if (this.getRepositoriesTrain[this.repository.slug] !== undefined) {
        this.getRepositoryTrain();
        return true;
      }
      return false;
    },
    getProgress() {
      return this.getRepositoriesTrain[this.repository.slug].progress;
    },
  },
  mounted() {
    this.setTrainProgress();
  },
  methods: {
    ...mapActions([
      'trainRepository',
      'getTrainingStatus',
      'getRepositoryStatusTraining',
      'setRepositoryTraining',
      'setWhichRepositoryIsTrain',
      'setTrainResponse',
      'setIncreaseTrainProgress',
      'setTrainProgress',
      'removeProgressTrain',
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
    async getRepositoryStatus() {
      const { data } = await this.getRepositoryStatusTraining({
        repositoryUUID: this.repository.uuid,
        repositoryVersion: this.repositoryVersion,
      });
      this.repositoryStatus = data;
    },
    async dispatchTrain() {
      if (!this.authenticated) {
        this.signIn();
      }
      if (this.authenticated && this.repository.authorization.can_write) {
        this.loadingStatus = true;
        if (this.repository.ready_for_train) {
          await this.train();
          this.loadingStatus = false;
          return;
        }
        this.loadingStatus = false;
        this.trainModalOpen = true;
      }
      this.dispatchClick();
    },
    async getRepositoryTrain() {
      await this.getRepositoryStatus();
      if (this.repositoryStatus.results[0].status === 0) {
        setTimeout(() => {
          this.setIncreaseTrainProgress({
            slug: this.repository.slug,
            id: this.repository.uuid,
            progress: 32,
          });
        }, 100000);
      }
      if (this.repositoryStatus.results[0].status === 1) {
        setTimeout(() => {
          this.setIncreaseTrainProgress({
            slug: this.repository.slug,
            id: this.repository.uuid,
            progress: 68,
          });
        }, 100000);
      }
      if (this.repositoryStatus.results[0].status === 2) {
        setTimeout(() => {
          if (this.getRepositoriesTrain[this.repository.slug] !== undefined) {
            this.setIncreaseTrainProgress({
              slug: this.repository.slug,
              id: this.repository.uuid,
              progress: 100,
            });
            this.removeProgressTrain({
              slug: this.repository.slug,
            });
            this.setRepositoryTraining(false);
            this.setTrainResponse(true);
            this.noPhrasesYet = true;
          }
        }, 100000);
      }
    },
    closeTrainModal() {
      this.trainModalOpen = false;
    },
    changedText(newText) {
      this.textExample = newText;
    },
    dispatchClick() {
      this.blockedNextStepTutorial = !this.blockedNextStepTutorial;
      this.eventClick = !this.eventClick;
    },
    dispatchFinish() {
      this.eventClickFinish = !this.eventClickFinish;
    },
    dispatchReset() {
      this.eventReset = !this.eventReset;
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
    updateTrainButton() {
      this.hideButton = true;
    },
    async train() {
      this.training = true;
      try {
        await this.trainRepository({
          repositoryUuid: this.repository.uuid,
          repositoryVersion: this.repositoryVersion,
        });
        await this.setRepositoryTraining(true);
        await this.setWhichRepositoryIsTrain({
          slug: this.repository.slug,
          id: this.repository.uuid,
          version: this.repositoryVersion,
          progress: 5,
        });
        await this.updateRepository(false);
      } catch (e) {
        this.$buefy.toast.open({
          message: this.$t('webapp.trainings.default_error'),
          type: 'is-danger',
        });
      }
      if (this.repository.ready_for_train) {
        this.dispatchFinish();
      }
      this.training = false;
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

    &__pending-example{
      margin-top: 2rem;
    }
    &__train {
      display: flex;
      margin-top: -1.8rem;
      margin-bottom: 4rem;

      &__progress {
        height: 25px;
        width: 60%;
        background-color: #EAEAEA;
        border-radius: 0px;

        p{
          font-size: 13px;
          font-weight: $font-weight-bolder;
        }
      }

      &__bar {
        background: #312B53;
        height: 25px;
        width: 15px;
      }
    }
  }
}

</style>
