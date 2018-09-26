<template>
  <div class="update-item">
    <bh-card>
      <div class="update-item__content">
        <div class="update-item__header">
          <bh-language-flag :language="language" />
          <span>{{ language | languageVerbose }}</span>
        </div>
        <div class="level">
          <div class="level-left">
            <h4 class="title is-4">
              <div>#{{ id }}</div>
              <div class="subtitle is-7">
                <div v-if="by">
                  <div v-if="trained_at">
                    Trained at {{ trained_at | moment('from') }} by {{ by__nickname }}
                  </div>
                  <div v-else-if="failed_at">Train failed at {{ failed_at | moment('from') }}</div>
                  <div v-else>Training...</div>
                </div>
                <div v-else>
                  Not trained yet.
                </div>
              </div>
            </h4>
          </div>
          <div class="level-right">
            <bh-icon-button
              v-if="training_log"
              primary
              value="clipboard-text-outline"
              @click="openLogModal()" />
          </div>
        </div>
      </div>
    </bh-card>
    <bh-modal :open.sync="logModalOpen">
      <div class="update-item__log">
        <h2 class="title is-2">Training Log</h2>
        <pre class="update-item__log__content">{{ training_log }}</pre>
      </div>
    </bh-modal>
  </div>
</template>

<script>
export default {
  name: 'UpdateItem',
  props: {
    repository: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    created_at: {
      type: String,
      required: true,
    },
    by: {
      type: Number,
      default: null,
    },
    by__nickname: {
      type: String,
      default: null,
    },
    training_started_at: {
      type: String,
      default: null,
    },
    trained_at: {
      type: String,
      default: null,
    },
    failed_at: {
      type: String,
      default: null,
    },
    training_log: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      logModalOpen: false,
    };
  },
  methods: {
    openLogModal() {
      this.logModalOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.update-item {
  margin: 1rem 0;

  &__content {
    padding: 1rem;
  }

  &__header {
    margin-bottom: .5rem;
  }

  &__log {
    padding: 1rem;

    &__content {
      font-size: .75rem;
    }
  }
}
</style>
