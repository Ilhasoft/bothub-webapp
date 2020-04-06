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
              <bh-icon
                class="text-color-primary"
                value="check"
                type="is-success"
                size="is-small" />
              <span>{{ $t('webapp.trainings.trained') }}</span>
            </div>
            <div class="bh-grid__item">
              <bh-icon
                class="text-color-info"
                value="dots-horizontal"
                type="is-info"
                size="is-small" />
              <span>{{ $t('webapp.trainings.no_changes') }}</span>
            </div>
            <div class="bh-grid__item">
              <bh-icon
                class="text-color-danger"
                value="close"
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
                  <bh-icon
                    v-if="data.status === 'trained'"
                    class="text-color-primary"
                    value="check" />
                  <bh-icon
                    v-else-if="data.status === 'not_ready_for_train'"
                    class="text-color-info"
                    value="dots-horizontal" />
                  <div v-else-if="data.status === 'failed'">
                    <div>
                      <bh-icon
                        value="close" />
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
</style>
