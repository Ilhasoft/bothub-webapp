<template>
  <bh-modal
    :open.sync="openValue"
    title="Repository Trained!">
    <bh-card
      v-if="!!trainResponse"
      no-border>
      <div class="bh-grid bh-grid--column">
        <div class="bh-grid__item">
          <table>
            <thead>
              <tr>
                <th colspan="2">Languages Report</th>
              </tr>
            </thead>
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
        <div class="bh-grid__item bh-grid__item--nested">
          <div class="bh-grid">
            <div class="bh-grid__item">
              <bh-icon
                class="text-color-primary"
                value="check"
                type="is-success"
                size="is-small" />
              <span>Trained</span>
            </div>
            <div class="bh-grid__item">
              <bh-icon
                class="text-color-info"
                value="dots-horizontal"
                type="is-info"
                size="is-small" />
              <span>No changes</span>
            </div>
            <div class="bh-grid__item">
              <bh-icon
                class="text-color-danger"
                value="close"
                type="is-danger"
                size="is-small" />
              <span>Failed</span>
            </div>
          </div>
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
};
</script>
