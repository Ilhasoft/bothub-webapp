<template>
  <div class="intents-and-labels-list">
    <div class="intents-and-labels-list__radio">
      <div>
        <bh-button
          ref="intents"
          :primary="listActived === 'intents'"
          class="intents-and-labels-list__radio__button"
          size="medium"
          @click="activeList('intents')" >
          Intents
        </bh-button>
        <bh-button
          ref="labels"
          :primary="listActived === 'labels'"
          class="intents-and-labels-list__radio__button"
          size="medium"
          @click="activeList('labels')">
          Labels
        </bh-button>
      </div>
      <div>
        <bh-button
          ref="training"
          primary
          class="intents-and-labels-list__radio__button"
          size="medium"
          @click="openTrainingModal">
          Training
        </bh-button>
      </div>
    </div>
    <div v-if="listActived === 'intents'">
      <intents-and-labels-item
        v-for="intent in intents"
        :key="intent.value"
        :title="intent.value"
        :sentences-count="intent.examples__count"
        class="intents-and-labels-list__item"
        @showSentences="$emit('showSentences', { type: 'intent', intent })" />
      <p
        v-if="intents.length === 0"
        class="intents-and-labels-list__empty-message">There is no intents </p>
    </div>
    <div v-else-if="listActived === 'labels'">
      <intents-and-labels-item
        v-for="label in labels"
        :key="label.value"
        :title="label.value"
        :label-entities="label.entities"
        :sentences-count="label.examples__count"
        class="intents-and-labels-list__item"
        @showSentences="$emit('showSentences', { type: 'label', label })"
        @showEntitySentences="$emit('showSentences', { type: 'entity', label, entity: $event })" />
      <p
        v-if="labels.length === 0"
        class="intents-and-labels-list__empty-message">There is no labels </p>
    </div>
    <request-authorization-modal
      v-if="repository"
      :open.sync="requestAuthorizationModalOpen"
      :repository-uuid="repository.uuid"
      @requestDispatched="onAuthorizationRequested()" />
    <train-modal
      v-if="repository"
      :training="training"
      :ready-for-train="repository.ready_for_train"
      :requirements-to-train="repository.requirements_to_train"
      :languages-ready-for-train="repository.languages_ready_for_train"
      :open.sync="trainModalOpen"
      :languages-warnings="repository.languages_warnings"
      @train="train()" />
    <train-response
      v-if="trainResponseData"
      :train-response="trainResponseData"
      :open.sync="trainResponseOpen" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import IntentsAndLabelsItem from '@/components/repository/IntentsAndLabelsItem';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
import TrainModal from '@/components/repository/TrainModal';
import TrainResponse from '@/components/repository/TrainResponse';

export default {
  name: 'IntentsAndLabelsList',
  inject: {
    updateRepository: {
      default: null,
    },
  },
  components: {
    IntentsAndLabelsItem,
    RequestAuthorizationModal,
    TrainModal,
    TrainResponse,
  },
  props: {
    intents: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    repository: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      listActived: 'intents',
      trainModalOpen: false,
      requestAuthorizationModalOpen: false,
      trainResponseData: null,
      trainResponseOpen: false,
      training: false,
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
    ]),
    async train() {
      const { ownerNickname, slug } = this.$route.params;
      this.training = true;
      try {
        const response = await this.trainRepository({ ownerNickname, slug });
        this.trainResponseData = response.data;
        this.trainResponseOpen = true;
      } catch (e) {
        this.$bhToastNotification({
          message: 'Repository not trained :(',
          type: 'danger',
        });
      }
      this.trainModalOpen = false;
      this.training = false;
      await this.updateRepository(false);
    },
    activeList(value) {
      this.listActived = value;
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
      this.$bhToastNotification({
        message: 'Request made! Wait for review of an admin.',
        type: 'success',
      });
      this.updateRepository(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.intents-and-labels-list {
  &__empty-message {
    margin: 1rem;
    font-style: italic;
  }

  &__radio {
    margin: 0 -.25rem;
    display: flex;
    justify-content: space-between;

    &__button {
      margin: .25rem;
    }
  }

  &__item {
    margin: 1rem 0;
  }

}
</style>
