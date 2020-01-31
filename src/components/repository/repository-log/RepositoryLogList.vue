<template>
  <div class="repository-log-list">
    <log-accordion
      v-for="item in items"
      :key="item.id"
      :log="item"
    />
    <div class="repository-log-list__pagination">
      <b-pagination
        :total="total"
        :current.sync="page"
        :per-page="perPage"
        @change="updateLogs()"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LogAccordion from '@/components/shared/accordion/LogAccordion';

export default {
  name: 'RepositoryLogList',
  components: {
    LogAccordion,
  },
  props: {
    query: {
      type: Object,
      default: null,
    },
    perPage: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      page: 1,
      items: [],
      total: 0,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
  },
  mounted() {
    this.updateLogs();
  },
  methods: {
    ...mapActions([
      'searchLogs',
    ]),
    async updateLogs() {
      const response = this.mockData(); // this.mockData();

      // const response = await this.searchLogs({
      //   repositoryUUID: this.repository.uuid,
      //   limit: this.perPage,
      //   offset: (this.page - 1) * this.perPage,
      // });

      this.items = response.data.results;
      this.total = response.data.count;
    },

    mockData() {
      return {
        data: {
          count: 6,
          next: null,
          previous: null,
          results: [
            {
              id: 6,
              text: 'estou com medo',
              user_agent: 'PostmanRuntime/7.22.0',
              nlp_log: {
                intent: {
                  name: 'affirmative',
                  confidence: 0.9992188811302185,
                },
                intent_ranking: [
                  {
                    name: 'affirmative',
                    confidence: 0.9992188811302185,
                  },
                  {
                    name: 'negative',
                    confidence: 0.0,
                  },
                  {
                    name: 'doubt',
                    confidence: 0.0,
                  },
                  {
                    name: 'bias',
                    confidence: 0.0,
                  },
                ],
                labels_list: [],
                entities_list: [
                {
                    "id": 56353,
                    "repository_example": 61679,
                    "start": 10,
                    "end": 14,
                    "entity": "medo",
                    "label": "emotion",
                    "created_at": "2019-09-13T03:59:18.424602Z",
                    "value": "medo"
                }
            ],
                entities: {},
                text: 'estou com medo',
                repository_version: 6647,
                language: 'pt_br',
              },
              user: 303,
              log_intent: {
                21: {
                  intent: 'affirmative',
                  confidence: 0.999218881130219,
                  is_default: true,
                },
                22: {
                  intent: 'negative',
                  confidence: 0.0,
                  is_default: false,
                },
                23: {
                  intent: 'doubt',
                  confidence: 0.0,
                  is_default: false,
                },
                24: {
                  intent: 'bias',
                  confidence: 0.0,
                  is_default: false,
                },
              },
            },
            {
              id: 5,
              text: 'oi',
              user_agent: 'PostmanRuntime/7.22.0',
              nlp_log: {
                intent: {
                  name: 'bias',
                  confidence: 0.9993326663970947,
                },
                intent_ranking: [
                  {
                    name: 'bias',
                    confidence: 0.9993326663970947,
                  },
                  {
                    name: 'doubt',
                    confidence: 0.02122560888528824,
                  },
                  {
                    name: 'negative',
                    confidence: 0.0,
                  },
                  {
                    name: 'affirmative',
                    confidence: 0.0,
                  },
                ],
                labels_list: [],
                entities_list: [],
                entities: {},
                text: 'oi',
                repository_version: 6647,
                language: 'pt_br',
              },
              user: 303,
              log_intent: {
                17: {
                  intent: 'bias',
                  confidence: 0.999332666397095,
                  is_default: true,
                },
                18: {
                  intent: 'doubt',
                  confidence: 0.0212256088852882,
                  is_default: false,
                },
                19: {
                  intent: 'negative',
                  confidence: 0.0,
                  is_default: false,
                },
                20: {
                  intent: 'affirmative',
                  confidence: 0.0,
                  is_default: false,
                },
              },
            },
            {
              id: 4,
              text: 'estou com medo',
              user_agent: 'PostmanRuntime/7.22.0',
              nlp_log: {
                intent: {
                  name: 'affirmative',
                  confidence: 0.9992188811302185,
                },
                intent_ranking: [
                  {
                    name: 'affirmative',
                    confidence: 0.9992188811302185,
                  },
                  {
                    name: 'negative',
                    confidence: 0.0,
                  },
                  {
                    name: 'doubt',
                    confidence: 0.0,
                  },
                  {
                    name: 'bias',
                    confidence: 0.0,
                  },
                ],
                labels_list: [],
                entities_list: [],
                entities: {},
                text: 'estou com medo',
                repository_version: 6647,
                language: 'pt_br',
              },
              user: 303,
              log_intent: {
                13: {
                  intent: 'affirmative',
                  confidence: 0.999218881130219,
                  is_default: true,
                },
                14: {
                  intent: 'negative',
                  confidence: 0.0,
                  is_default: false,
                },
                15: {
                  intent: 'doubt',
                  confidence: 0.0,
                  is_default: false,
                },
                16: {
                  intent: 'bias',
                  confidence: 0.0,
                  is_default: false,
                },
              },
            },
            {
              id: 3,
              text: 'estou com medo',
              user_agent: 'PostmanRuntime/7.22.0',
              nlp_log: {
                intent: {
                  name: 'affirmative',
                  confidence: 0.9992188811302185,
                },
                intent_ranking: [
                  {
                    name: 'affirmative',
                    confidence: 0.9992188811302185,
                  },
                  {
                    name: 'negative',
                    confidence: 0.0,
                  },
                  {
                    name: 'doubt',
                    confidence: 0.0,
                  },
                  {
                    name: 'bias',
                    confidence: 0.0,
                  },
                ],
                labels_list: [],
                entities_list: [],
                entities: {},
                text: 'estou com medo',
                repository_version: 6647,
                language: 'pt_br',
              },
              user: 303,
              log_intent: {
                9: {
                  intent: 'affirmative',
                  confidence: 0.999218881130219,
                  is_default: true,
                },
                10: {
                  intent: 'negative',
                  confidence: 0.0,
                  is_default: false,
                },
                11: {
                  intent: 'doubt',
                  confidence: 0.0,
                  is_default: false,
                },
                12: {
                  intent: 'bias',
                  confidence: 0.0,
                  is_default: false,
                },
              },
            },
            {
              id: 2,
              text: 'estou com medo',
              user_agent: 'PostmanRuntime/7.22.0',
              nlp_log: {
                intent: {
                  name: 'affirmative',
                  confidence: 0.9992188811302185,
                },
                intent_ranking: [
                  {
                    name: 'affirmative',
                    confidence: 0.9992188811302185,
                  },
                  {
                    name: 'negative',
                    confidence: 0.0,
                  },
                  {
                    name: 'doubt',
                    confidence: 0.0,
                  },
                  {
                    name: 'bias',
                    confidence: 0.0,
                  },
                ],
                labels_list: [],
                entities_list: [],
                entities: {},
                text: 'estou com medo',
                repository_version: 6647,
                language: 'pt_br',
              },
              user: 303,
              log_intent: {
                5: {
                  intent: 'affirmative',
                  confidence: 0.999218881130219,
                  is_default: true,
                },
                6: {
                  intent: 'negative',
                  confidence: 0.0,
                  is_default: false,
                },
                7: {
                  intent: 'doubt',
                  confidence: 0.0,
                  is_default: false,
                },
                8: {
                  intent: 'bias',
                  confidence: 0.0,
                  is_default: false,
                },
              },
            },
            {
              id: 1,
              text: 'estou com medo',
              user_agent: 'PostmanRuntime/7.22.0',
              nlp_log: {
                intent: {
                  name: 'affirmative',
                  confidence: 0.9992188811302185,
                },
                intent_ranking: [
                  {
                    name: 'affirmative',
                    confidence: 0.9992188811302185,
                  },
                  {
                    name: 'negative',
                    confidence: 0.0,
                  },
                  {
                    name: 'doubt',
                    confidence: 0.0,
                  },
                  {
                    name: 'bias',
                    confidence: 0.0,
                  },
                ],
                labels_list: [],
                entities_list: [],
                entities: {},
                text: 'estou com medo',
                repository_version: 6647,
                language: 'pt_br',
              },
              user: 303,
              log_intent: {
                1: {
                  intent: 'affirmative',
                  confidence: 0.999218881130219,
                  is_default: true,
                },
                2: {
                  intent: 'negative',
                  confidence: 0.0,
                  is_default: false,
                },
                3: {
                  intent: 'doubt',
                  confidence: 0.0,
                  is_default: false,
                },
                4: {
                  intent: 'bias',
                  confidence: 0.0,
                  is_default: false,
                },
              },
            },
          ],
        },
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
  }
</style>
