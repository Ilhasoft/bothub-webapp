<template>
  <bh-modal
    :open.sync="openValue"
    :title="$t('webapp.trainings.train_response_title')">
    <bh-card
      v-if="!!trainResponse"
      no-border>
      <div class="bh-grid bh-grid--column align">
        <div class="bh-grid__item bh-grid__item--nested text-center">
          <div class="bh-grid">
            <div class="bh-grid__item">
              <b-icon
                class="text-color-primary"
                icon="check"
                type="is-success"
                size="is-small" />
              <span>{{ $t('webapp.trainings.trained') }}</span>
            </div>
            <div class="bh-grid__item">
              <b-icon
                class="text-color-warning loading"
                icon="sync"
                size="is-small" />
              <span>{{ $t('webapp.trainings.processing') }}</span>
            </div>
            <div class="bh-grid__item">
              <b-icon
                class="text-color-info"
                icon="dots-horizontal"
                type="is-info"
                size="is-small" />
              <span>{{ $t('webapp.trainings.no_changes') }}</span>
            </div>
            <div class="bh-grid__item">
              <b-icon
                class="text-color-danger"
                icon="close"
                type="is-danger"
                size="is-small" />
              <span>{{ $t('webapp.trainings.failed') }}</span>
            </div>
          </div>
        </div>
        <div class="bh-grid__item">
          <table>
            <tbody>
              <tr
                v-for="(data, language) in trainResponse.languages_report"
                :key="language">
                <td>{{ language | languageVerbose }}</td>
                <td class="text-right">
                  <b-icon
                    v-if="data.status === 'trained'"
                    class="text-color-primary"
                    icon="check"
                    size="is-small" />
                  <b-icon
                    v-else-if="data.status === 'not_ready_for_train'"
                    class="text-color-info"
                    icon="dots-horizontal"
                    size="is-small" />
                  <b-icon
                    v-else-if="data.status === 'processing'"
                    class="text-color-warning loading"
                    icon="sync"
                    size="is-small" />
                  <div v-else-if="data.status === 'failed'">
                    <div>
                      <b-icon
                        icon="close"
                        class="text-color-danger"
                        size="is-small" />
                    </div>
                    <small>{{ data.error }}</small>
                  </div>
                  <span v-else>{{ data.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bh-grid__item text-center">
          <bh-button
            ref="closeBtn"
            primary
            @click="closeModal()">
            <span>Ok</span>
          </bh-button>
        </div>
      </div>
    </bh-card>
  </bh-modal>
</template>

<script>

export default {
  name: 'TrainResponse',
  props: {
    trainResponse: {
      type: Object,
      default: () => ({}),
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openValue: this.open,
    };
  },
  watch: {
    open(value) {
      this.openValue = value;
    },
    openValue(value) {
      this.$emit('update:open', value);
    },
  },
  methods: {
    closeModal() {
      this.$emit('update:open', false);
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 70%;
  margin: 1rem auto;
}

.loading {
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}
</style>
