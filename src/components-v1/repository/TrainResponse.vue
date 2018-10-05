<template>
  <b-modal :active.sync="openValue">
    <div
      v-if="!!trainResponse"
      class="card">
      <div class="card-content">
        <h1 class="title">Repository Trained!</h1>
        <table class="table is-fullwidth is-hoverable">
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
              <td class="has-text-right">
                <b-icon
                  v-if="data.status === 'trained'"
                  icon="check"
                  type="is-success" />
                <b-icon
                  v-else-if="data.status === 'not_ready_for_train'"
                  icon="dots-horizontal"
                  type="is-info" />
                <div v-else-if="data.status === 'failed'">
                  <div>
                    <b-icon
                      icon="close"
                      type="is-danger" />
                  </div>
                  <p class="is-size-7">{{ data.error }}</p>
                </div>
                <span v-else>{{ data.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="columns">
          <div class="column has-text-centered">
            <b-icon
              icon="check"
              type="is-success"
              size="is-small" />
            <span>Trained</span>
          </div>
          <div class="column has-text-centered">
            <b-icon
              icon="dots-horizontal"
              type="is-info"
              size="is-small" />
            <span>No changes</span>
          </div>
          <div class="column has-text-centered">
            <b-icon
              icon="close"
              type="is-danger"
              size="is-small" />
            <span>Failed</span>
          </div>
        </div>
      </div>
    </div>
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
