<template>
  <div>
    <b-button
      v-show="repository.authorization.can_write && repository.ready_for_train || !noPhrasesYet"
      ref="training"
      :disabled="loading || repository.examples__count === 0"
      :loading="loading"
      type="is-secondary"
      class="trainings-progress__button"
      @click="dispatchTrain()">
      {{ $t('webapp.trainings.run_training') }}
    </b-button>
    <div
      v-if="trainProgress"
      class="trainings-progress__progress">
      <div class="trainings-progress__bar">
        <span :style="{ width: progress + '%' }"/>
      </div>
      <p v-html="$t('webapp.trainings.train_progress', {progress: progress})"/>
    </div>
    <train-modal
      v-if="repository"
      :training="training"
      :requirements-to-train="repository.requirements_to_train"
      :open="trainModalOpen"
      :languages-warnings="repository.languages_warnings"
      @finishedTutorial="$emit('finishedTutorial')"
      @resetTutorial="$emit('resetTutorial')"
      @closeTrainModal="closeTrainModal()"/>
    <train-response
      :open="trainResults"
      @dispatchCloseProgress="closeProgress()"
      @resetProgressValue="progress = 10"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TrainModal from '@/components/repository/training/TrainModal';
import TrainResponse from '@/components/repository/training/TrainResponse';

export default {
  name: 'TrainingProgress',
  components: {
    TrainModal,
    TrainResponse,
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
      noPhrasesYet: false,
      loadingStatus: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
    loading() {
      return this.load || this.loadingStatus;
    },
  },
  watch: {
    trainProgress() {
      this.$emit('statusChanged', this.trainProgress);
    },
  },
  mounted() {
    this.getRepositoryStatus();
  },
  methods: {
    ...mapActions([
      'trainRepository',
      'getTrainingStatus',
      'getRepositoryStatusTraining',
      'setRepositoryTraining',
    ]),
    closeTrainModal() {
      this.trainModalOpen = false;
    },
    async dispatchTrain() {
      if (!this.authenticated) {
        this.$emit('unauthorized');
        return;
      }
      if (this.repository.authorization.can_write) {
        this.loadingStatus = true;
        if (this.repository.ready_for_train
          && Object.values(this.repository.requirements_to_train).length === 0
          && Object.values(this.repository.languages_warnings).length === 0) {
          await this.train();
        } else if (!this.repository.ready_for_train
          && Object.values(this.repository.requirements_to_train).length === 0
          && Object.values(this.repository.languages_warnings).length === 0) {
          this.$buefy.toast.open({
            message: this.$t('webapp.train_modal.language_warning'),
            type: 'is-danger',
          });
        }
        this.loadingStatus = false;
        this.trainModalOpen = true;
      }
      this.$emit('onTrain');
    },
    async train() {
      this.training = true;
      try {
        await this.trainRepository({
          repositoryUuid: this.repository.uuid,
          repositoryVersion: this.version,
        });
        await this.setRepositoryTraining(true);
        await this.updateRepository(false);
        await this.getRepositoryStatus();
      } catch (e) {
        this.$buefy.toast.open({
          message: this.$t('webapp.trainings.default_error'),
          type: 'is-danger',
        });
      }
      if (this.repository.ready_for_train) {
        this.$emit('onTrainFinish');
      }
      this.training = false;
    },
    async getRepositoryStatus() {
      if (this.repositoryUUID !== null && this.repositoryCanWrite) {
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
            this.noPhrasesYet = true;
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


trainings-progress {
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

        p{
          font-size: 13px;
          font-weight: $font-weight-bolder;
        }
      }

      &__bar {
      position: relative;
      display: block;
      width: 100%;
      background-color: $color-grey-light;
    }
      &__bar span {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      height: 25px;
      background-color: $color-secondary;
    }
      &__bar span:after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: "";
      background-size: 100%;
      background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.603) 25%,
                                        rgba(0, 0, 0, 0) 25%,
                                        rgba(0, 0, 0, 0) 50%,
                                        rgba(255, 255, 255, 0.603) 50%,
                                        rgba(255, 255, 255, 0.603) 75%,
                                        rgba(0, 0, 0, 0) 75%,
                                        rgba(0, 0, 0, 0));
      background-size: 30px 30px;
      opacity: 0.3;
      animation: progress-animation 0.5s infinite linear;
    }
    @-webkit-keyframes progress-animation {
      0% {
        background-position: 0 100%;
      }
      100% {
        background-position: 30px 100%;
      }
    }
    @keyframes progress-animation {
      0% {
        background-position: 0 100%;
      }
      100% {
        background-position: 30px 100%;
      }
    }
}

</style>]
