<template>
  <b-modal :active.sync="openValue">
    <bh-card v-if="!!trainResponse">
      <div class="bh-grid bh-grid--column">
        <h1>Repository Trained!</h1>
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
                  value="check" />
                <bh-icon
                  v-else-if="data.status === 'not_ready_for_train'"
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
        <div class="bh-grid">
          <div class="bh-grid__item">
            <bh-icon
              icon="check"
              type="is-success"
              size="is-small" />
            <span>Trained</span>
          </div>
          <div class="bh-grid__item">
            <bh-icon
              icon="dots-horizontal"
              type="is-info"
              size="is-small" />
            <span>No changes</span>
          </div>
          <div class="bh-grid__item">
            <bh-icon
              icon="close"
              type="is-danger"
              size="is-small" />
            <span>Failed</span>
          </div>
        </div>
      </div>
    </bh-card>
  </b-modal>
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
