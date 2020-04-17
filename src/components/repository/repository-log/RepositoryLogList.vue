<template>

  <div class="repository-log-list">
    {{ getLogSentence }}
    <div class="repository-log-list__section">

      <div>
        <b-checkbox
          v-model="select"
          :native-value="selectAll">
          Select all
        </b-checkbox>
      </div>

      <div class="repository-log-list__section__buttonsIcon">
        <div @click="showModal('Training')">
          <b-icon
            icon="refresh"
            class="repository-log-list__section__icons"/>
        </div>
        <div @click="show">
          <b-icon
            icon="chat-processing"
            class="repository-log-list__section__icons"/>
        </div>
        <div @click="show">
          <b-icon
            icon="delete"
            class="repository-log-list__section__icons"/>
        </div>

      </div>
    </div>
    <paginated-list
      :per-page="perPage"
      :item-component="logAccordion"
      :list="list"
      :loading.sync="loading"
      :editable="editable"
    />

    <h4
      v-if="list && list.empty && !loading"
      class="repository-log-list__empty-message">
      {{ $t('webapp.inbox.list_empty') }}
    </h4>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import LogAccordion from '@/components/shared/accordion/LogAccordion';
import IntentModal from '@/components/repository/IntentModal';

export default {
  name: 'RepositoryLogList',
  components: {
    PaginatedList,
    LogAccordion,
    IntentModal,
  },
  props: {
    query: {
      type: Object,
      default: null,
    },
    perPage: {
      type: Number,
      default: 20,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: null,
      loading: false,
      logAccordion: LogAccordion,
      versionsList: null,
      versions: [],
      select: '',
      selectAll: false,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    ...mapGetters(['getLogSentence', 'getCurrentRepository']),
  },
  watch: {
    query() {
      this.updateLogs();
    },
    select() {
      this.$root.$emit('selectAll', this.select);
    },
  },
  created() {
    this.$root.$on('nlp_values', value => console.log(value));
  },
  mounted() {
    this.updateLogs();
  },

  methods: {
    ...mapActions([
      'searchLogs',
    ]),
    showModal(typeSentence) {
      this.$buefy.modal.open({
        props: {
          info: this.nlp_log,
          repository: this.repository,
          titleHeader: typeSentence,
        },
        parent: this,
        component: IntentModal,
        hasModalCard: false,
        trapFocus: true,
        events: {
          addedIntent: (value, type) => {
            if (type === 'Training') {
              if (value === this.nlp_log.intent.name) {
                this.isCorrected = false;
              } else {
                this.isCorrected = true;
              }
              this.addToTraining(value);
            } else {
              if (value === this.nlp_log.intent.name) {
                this.isCorrected = false;
              } else {
                this.isCorrected = true;
              }
              this.addToSentences(value);
            }
            this.intent = value;
          },
        },
      });
    },
    async updateLogs() {
      this.list = await this.searchLogs({
        repositoryUUID: this.repository.uuid,
        query: this.query,
        limit: this.perPage,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
  .repository-log-list {
    &__pagination {
      margin-top: 1.25rem;
    }

    &__empty-message {
      margin: 2rem;
      text-align: center;
    }

      &__section{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $color-grey-dark;
      font-size: 1.1rem;
      font-weight: bold;

      &__buttonsIcon{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }
      &__icons{
      color: $color-grey-dark;
      margin-right: 0.7rem;
    }
    }

  }
</style>
