<template>

  <div class="repository-log-list">

    <paginated-list
      :per-page="perPage"
      :item-component="logAccordion"
      :list="list"
      :loading.sync="loading"
    />

    <h4
      v-if="list && list.empty && !loading"
      class="repository-log-list__empty-message">
      No logs found
    </h4>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import LogAccordion from '@/components/shared/accordion/LogAccordion';

export default {
  name: 'RepositoryLogList',
  components: {
    PaginatedList,
    LogAccordion,
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
  },
  data() {
    return {
      list: null,
      loading: false,
      logAccordion: LogAccordion,
      versionsList: null,
      versions: [],
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
  },
  watch: {
    query() {
      this.updateLogs();
    },
  },
  mounted() {
    this.updateLogs();
  },
  methods: {
    ...mapActions([
      'searchLogs',
    ]),
    async updateLogs() {
      const response = await this.searchLogs({
        repositoryUUID: this.repository.uuid,
        query: this.searchQuery,
        limit: this.perPage,
      });
      const mockData = this.mockData();

      response.items = mockData.results;
      response.total = mockData.count;
      this.list = response;
    },
    mockData() {
      return {
        count: 2,
        next: null,
        previous: null,
        results: [
          {
            id: 8,
            text: 'cobrança',
            created_at: '2020-02-04T13:39:07.082771Z',
            user_agent: 'PostmanRuntime/7.22.0',
            nlp_log: {
              intent: {
                name: 'bias',
                confidence: 0.9999115467071533,
              },
              intent_ranking: [
                {
                  name: 'bias',
                  confidence: 0.9999115467071533,
                },
                {
                  name: 'search',
                  confidence: 0.0,
                },
                {
                  name: 'reissue',
                  confidence: 0.0,
                },
                {
                  name: 'negotiation',
                  confidence: 0.0,
                },
                {
                  name: 'greeting',
                  confidence: 0.0,
                },
                {
                  name: 'general_statement',
                  confidence: 0.0,
                },
                {
                  name: 'financial_position',
                  confidence: 0.0,
                },
                {
                  name: 'estate_broker',
                  confidence: 0.0,
                },
                {
                  name: 'customer_service',
                  confidence: 0.0,
                },
                {
                  name: 'conversation_exit',
                  confidence: 0.0,
                },
              ],
              labels_list: [
                'greetings',
              ],
              entities_list: [],
              entities: {
                greetings: [
                  {
                    value: 'cobrança',
                    entity: 'greetings',
                    confidence: 0.7366296968797883,
                    self: true,
                  },
                ],
              },
              text: 'cobrança',
              repository_version: 6901,
              language: 'en',
            },
            user: 2,
            log_intent: {
              35: {
                intent: 'bias',
                confidence: 0.999911546707153,
                is_default: true,
              },
              36: {
                intent: 'search',
                confidence: 0.0,
                is_default: false,
              },
              37: {
                intent: 'reissue',
                confidence: 0.0,
                is_default: false,
              },
              38: {
                intent: 'negotiation',
                confidence: 0.0,
                is_default: false,
              },
              39: {
                intent: 'greeting',
                confidence: 0.0,
                is_default: false,
              },
              40: {
                intent: 'general_statement',
                confidence: 0.0,
                is_default: false,
              },
              41: {
                intent: 'financial_position',
                confidence: 0.0,
                is_default: false,
              },
              42: {
                intent: 'estate_broker',
                confidence: 0.0,
                is_default: false,
              },
              43: {
                intent: 'customer_service',
                confidence: 0.0,
                is_default: false,
              },
              44: {
                intent: 'conversation_exit',
                confidence: 0.0,
                is_default: false,
              },
            },
          },
          {
            id: 7,
            text: 'estou com medo',
            created_at: '2020-02-04T13:39:07.082771Z',
            user_agent: 'PostmanRuntime/7.22.0',
            nlp_log: {
              intent: {
                name: 'bias',
                confidence: 0.9803563356399536,
              },
              intent_ranking: [
                {
                  name: 'bias',
                  confidence: 0.9803563356399536,
                },
                {
                  name: 'search',
                  confidence: 0.0,
                },
                {
                  name: 'reissue',
                  confidence: 0.0,
                },
                {
                  name: 'negotiation',
                  confidence: 0.0,
                },
                {
                  name: 'greeting',
                  confidence: 0.0,
                },
                {
                  name: 'general_statement',
                  confidence: 0.0,
                },
                {
                  name: 'financial_position',
                  confidence: 0.0,
                },
                {
                  name: 'estate_broker',
                  confidence: 0.0,
                },
                {
                  name: 'customer_service',
                  confidence: 0.0,
                },
                {
                  name: 'conversation_exit',
                  confidence: 0.0,
                },
              ],
              labels_list: [],
              entities_list: [],
              entities: {},
              text: 'estou com medo',
              repository_version: 6901,
              language: 'en',
            },
            user: 2,
            log_intent: {
              25: {
                intent: 'bias',
                confidence: 0.980356335639954,
                is_default: true,
              },
              26: {
                intent: 'search',
                confidence: 0.0,
                is_default: false,
              },
              27: {
                intent: 'reissue',
                confidence: 0.0,
                is_default: false,
              },
              28: {
                intent: 'negotiation',
                confidence: 0.0,
                is_default: false,
              },
              29: {
                intent: 'greeting',
                confidence: 0.0,
                is_default: false,
              },
              30: {
                intent: 'general_statement',
                confidence: 0.0,
                is_default: false,
              },
              31: {
                intent: 'financial_position',
                confidence: 0.0,
                is_default: false,
              },
              32: {
                intent: 'estate_broker',
                confidence: 0.0,
                is_default: false,
              },
              33: {
                intent: 'customer_service',
                confidence: 0.0,
                is_default: false,
              },
              34: {
                intent: 'conversation_exit',
                confidence: 0.0,
                is_default: false,
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .repository-log-list {
    &__pagination {
      margin-top: 1.25rem;
    }

    &__empty-message {
      margin: 2rem;
      text-align: center;
    }
  }
</style>
