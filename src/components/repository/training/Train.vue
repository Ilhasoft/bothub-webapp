<template>
  <div class="train">
    <b-button
      v-show="showButton
        && !trainProgress
      && repository.authorization.can_write"
      ref="training"
      :disabled="loading || repository.examples__count === 0"
      :loading="loading"
      type="is-secondary"
      class="train__button"
      @click="dispatchTrain()">
      {{ $t('webapp.trainings.run_training') }}
    </b-button>
    <div
      v-if="trainProgress"
      class="train__progress">
      <progress-bar
        :progress="progress"
        type="is-secondary"/>
      <p v-html="$t('webapp.trainings.train_progress', {progress: progress})"/>
    </div>
    <train-modal
      v-if="repository"
      :training="training"
      :requirements-to-train="repository.requirements_to_train"
      :open="trainModalOpen"
      :languages-warnings="repository.languages_warnings"
      @finishedTutorial="finishedTutorial()"
      @resetTutorial="resetTutorial()"
      @proceedTrain="train()"
      @closeTrainModal="closeTrainModal()"/>
    <train-response
      :open="trainResults"
      @dispatchCloseProgress="closeProgress()"
      @resetProgressValue="progress = 10"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TrainModal from '@/components/repository/training/TrainModal';
import ProgressBar from '@/components/shared/ProgressBar';
import TrainResponse from '@/components/repository/training/TrainResponse';

export default {
  name: 'TrainingProgress',
  components: {
    TrainModal,
    TrainResponse,
    ProgressBar,
  },
  props: {
    load: {
      type: Boolean,
      default: false,
    },
    repository: {
      type: Object,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    updateRepository: {
      type: Function,
      default: async () => {},
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    authenticated: {
      type: Boolean,
      default: false,
    },
    updateOnLoad: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      trainModalOpen: false,
      trainResponseData: null,
      trainResponseOpen: false,
      trainResults: false,
      training: false,
      progress: 0,
      trainProgress: false,
      repositoryStatus: {},
      loadingStatus: false,
    };
  },
  computed: {
    loading() {
      return this.load || this.loadingStatus;
    },
    repositoryCanWrite() {
      if (!this.repository || this.repository.authorization.can_write === 'null') { return null; }
      return this.repository.authorization.can_write;
    },
  },
  watch: {
    trainProgress() {
      this.$emit('trainProgressUpdated', this.trainProgress);
    },
    repositoryCanWrite() {
      if (this.repositoryCanWrite !== undefined) {
        this.getRepositoryStatus();
        this.resetTrainVariables();
      }
    },
  },
  mounted() {
    if (this.updateOnLoad) this.updateTrainingStatus();
    this.getRepositoryStatus();
  },
  methods: {
    ...mapActions([
      'trainRepository',
      'getTrainingStatus',
      'getRepositoryStatusTraining',
      'setRepositoryTraining',
    ]),
    finishedTutorial() {
      this.$emit('finishedTurorial');
    },
    resetTutorial() {
      this.$emit('tutorialReset');
    },
    closeTrainModal() {
      this.trainModalOpen = false;
    },
    async updateTrainingStatus() {
      this.loadingStatus = true;
      try {
        const trainStatus = await this.getTrainingStatus({
          repositoryUUID: this.repository.uuid,
          version: this.version,
        });
        if (trainStatus) {
          this.$emit('statusUpdated', trainStatus);
        }
      } finally {
        this.loadingStatus = false;
      }
    },
    async dispatchTrain() {
      if (!this.authenticated) {
        this.$emit('unauthorized');
      }
      if (this.authenticated && this.repository.authorization.can_write) {
        this.loadingStatus = true;
        if (this.repository.ready_for_train
          && Object.values(this.repository.requirements_to_train).length === 0
          && Object.values(this.repository.languages_warnings).length === 0) {
          await this.train();
          this.loadingStatus = false;
          return;
        }
        if (!this.repository.ready_for_train
          && Object.values(this.repository.requirements_to_train).length === 0
          && Object.values(this.repository.languages_warnings).length === 0) {
          this.$buefy.toast.open({
            message: this.$t('webapp.train_modal.language_warning'),
            type: 'is-danger',
          });

          this.loadingStatus = false;
          return;
        }
        this.loadingStatus = false;
        this.trainModalOpen = true;
      }
      this.$emit('onTrain');
    },
    async train() {
      this.training = true;
      this.loadingStatus = true;
      try {
        await this.trainRepository({
          repositoryUuid: this.repository.uuid,
          repositoryVersion: this.version,
        });
        await this.setRepositoryTraining(true);
        await this.updateRepository();
        await this.getRepositoryStatus();
      } catch (e) {
        this.$buefy.toast.open({
          message: this.$t('webapp.trainings.default_error'),
          type: 'is-danger',
        });
      }
      if (this.repository.ready_for_train) {
        this.$emit('onTrainReady');
      }
      this.training = false;
      this.loadingStatus = false;
    },
    async getRepositoryStatus() {
      if (this.repository.uuid !== null && this.repositoryCanWrite) {
        const { data } = await this.getRepositoryStatusTraining({
          repositoryUUID: this.repository.uuid,
          repositoryVersion: this.version,
        });
        this.repositoryStatus = data;
        if (this.repositoryStatus.results[0] !== undefined) {
          if (this.repositoryStatus.results[0].status === 0) {
            this.trainProgress = true;
            this.progress = 26;
          }
          if (this.repositoryStatus.results[0].status === 1) {
            this.trainProgress = true;
            this.progress = 68;
          }
          if (this.repositoryStatus.results[0].status === 2 && this.trainProgress) {
            this.progress = 100;
            this.setRepositoryTraining(false);
            this.trainResults = true;
            this.$emit('onTrainComplete');
          }
          setTimeout(() => {
            if (this.repositoryStatus.results[0].status === 0
          || this.repositoryStatus.results[0].status === 1) {
              this.getRepositoryStatus();
            }
          }, 100000);
        }
      } else {
        this.resetTrainVariables();
      }
    },
    resetTrainVariables() {
      this.progress = 10;
      this.trainResults = false;
      this.trainProgress = false;
    },
    async closeProgress() {
      this.trainResults = false;
      this.trainProgress = false;
      await this.updateRepository(false);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/colors.scss';
  @import '~@/assets/scss/variables.scss';


.train {

    &__button{
      color: $color-white;
      margin-top: 1rem;
      width: 14rem;

      &:hover{
        color: $color-white;
      }
    }

    &__progress {
      height: 25px;
      width: 60%;

      p {
        font-size: 13px;
        font-weight: $font-weight-bolder;
      }
    }
}

</style>]
