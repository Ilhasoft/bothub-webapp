<template>
  <div>
    <h3 class="evaluate-result-example-list__title">
      {{ $t('webapp.result.sentence_details') }}
    </h3>
    <div
      v-if="busy"
      class="evaluate-result-example-list__loading">
      <Loading/>
    </div>
    <p v-else-if="error">{{ $t('webapp.result.error') }}</p>
    <div v-else-if="resultExampleList && resultExampleList.length > 0">
      <p>
        {{ $t('webapp.result.sentence_details_text') }}
      </p>
      <evaluate-result-example-item
        v-for="(item, i) in paginatedList"
        :key="i"
        :text="item.text"
        :intent="item.intent"
        :confidence="item.intent_prediction.confidence"
        :intent-success="item.intent_status === 'success'"
        :success="item.intent_status === 'success' && item.entity_status === 'success'"
        :intent-prediction="item.intent_prediction"
        :entities="item.true_entities"
        :swapped-entities="item.swapped_error_entities"/>
      <div class="evaluate-result-example-list__pagination">
        <b-pagination
          v-if="resultExampleList.length > 0"
          :total="resultExampleList.length"
          :current.sync="page"
          :per-page="limit"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"/>
      </div>
    </div>
    <p v-else>{{ $t('webapp.result.do_not_log') }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import EvaluateResultExampleItem from '@/components/repository/repository-evaluate/results/EvaluateResultExampleItem';
import Loading from '@/components/shared/Loading';

export default {
  name: 'EvaluateResultExampleList',
  components: {
    EvaluateResultExampleItem,
    Loading,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      resultExampleList: [],
      list: [],
      limit: 20,
      busy: false,
      error: null,
      page: 1,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    paginatedList() {
      const offset = this.limit * (this.page - 1);
      return this.resultExampleList.slice(offset, offset + this.limit);
    },
  },
  mounted() {
    this.updateList();
  },
  methods: {
    ...mapActions([
      'getAllResultsLog',
    ]),
    async updateList() {
      this.resultExampleList = this.testResults();
      this.busy = true;
      try {
        const response = await this.getAllResultsLog({
          repositoryUuid: this.repository.uuid,
          resultId: this.id,
        });
        this.list = response.data.log;
        this.error = null;
      } catch (error) {
        this.error = error;
      } finally {
        this.busy = false;
      }
    },
    testResults() {
      return [
        {
          text: 'i hate japanese food',
          intent: 'negative',
          intent_prediction: {
            name: 'food',
            confidence: 0.9992955923080444,
          },
          intent_status: 'success',
          entity_status: 'error',
          true_entities: [],
          false_positive_entities: [],
          swapped_error_entities: [
            {
              start: 7,
              end: 15,
              value: 'japanese',
              confidence: 0.8567371151062296,
              extractor: 'CRFEntityExtractor',
              entity: 'feeling',
              predicted_entity: 'cuisine',
            },
          ],
        },
        {
          text: 'i like japanese, italian and chinese cuisine',
          intent: 'food',
          intent_prediction: {
            name: 'food',
            confidence: 0.8951312303543091,
          },
          intent_status: 'success',
          entity_status: 'error',
          true_entities: [
            {
              start: 7,
              end: 15,
              value: 'japanese',
              entity: 'cuisine',
              status: 'success',
              confidence: 0.5984418480535343,
            },
            {
              start: 17,
              end: 24,
              value: 'italian',
              entity: 'cuisine',
              status: 'error',
            },
            {
              start: 29,
              end: 36,
              value: 'chinese',
              entity: 'cuisine',
              status: 'success',
              confidence: 0.48506775911100536,
            },
          ],
          false_positive_entities: [],
          swapped_error_entities: [],
        },
        {
          text: 'i like japanese food',
          intent: 'food',
          intent_prediction: {
            name: 'cuisine',
            confidence: 0.9926878213882446,
          },
          intent_status: 'error',
          entity_status: 'error',
          true_entities: [],
          false_positive_entities: [
            {
              start: 7,
              end: 15,
              value: 'japanese',
              entity: 'cuisine',
              confidence: 0.8883434111355147,
              extractor: 'CRFEntityExtractor',
            },
          ],
          swapped_error_entities: [],
        },
        {
          text: 'i hate italian and love mexican food',
          intent: 'food',
          intent_prediction: {
            name: 'cuisine',
            confidence: 0.9909083843231201,
          },
          intent_status: 'success',
          entity_status: 'error',
          true_entities: [
            {
              start: 7,
              end: 14,
              value: 'italian',
              entity: 'cuisine',
              status: 'error',
            },
            {
              start: 24,
              end: 31,
              value: 'mexican',
              entity: 'cuisine',
              status: 'success',
              confidence: 0.6894595541022857,
            },
          ],
          false_positive_entities: [],
          swapped_error_entities: [],
        },
        {
          text: 'i hate very much',
          intent: 'negative',
          intent_prediction: {
            name: 'negative',
            confidence: 0.9990888833999634,
          },
          intent_status: 'success',
        },
        {
          text: 'i love italian food',
          intent: 'food',
          intent_prediction: {
            name: 'food',
            confidence: 0.8277877569198608,
          },
          intent_status: 'success',
          entity_status: 'error',
          true_entities: [
            {
              start: 7,
              end: 14,
              value: 'italian',
              entity: 'cuisine',
              status: 'error',
            },
          ],
          false_positive_entities: [
            {
              start: 2,
              end: 6,
              value: 'love',
              entity: 'feeling',
              confidence: 0.6751853374379837,
              extractor: 'CRFEntityExtractor',
            },
          ],
          swapped_error_entities: [],
        },
        {
          text: 'i hate mexican food',
          intent: 'food',
          intent_prediction: {
            name: 'food',
            confidence: 0.9681663513183594,
          },
          intent_status: 'success',
          entity_status: 'success',
          true_entities: [
            {
              start: 7,
              end: 14,
              value: 'mexican',
              entity: 'cuisine',
              status: 'success',
              confidence: 0.7918899487915584,
            },
          ],
          false_positive_entities: [],
          swapped_error_entities: [],
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.evaluate-result-example-list {
  width: 100%;

  &__title {
    margin-top: 1rem;
    font-weight: 700;
  }

  &__loading {
    width: 100%;
    text-align: center;
  }

  &__pagination {
    min-width: 100%;
    display: block;
    margin: 1rem auto;
    max-width: 600px;
    display: flex;
    justify-content: flex-end;
  }
}
.no-examples {
  margin: 8px;
}
</style>
