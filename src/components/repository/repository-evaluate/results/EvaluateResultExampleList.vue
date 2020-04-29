<template>
  <div
    v-if="resultExampleList"
    class="evaluate-result-example-list">
    <h3 class="evaluate-result-example-list__title">
      {{ $t('webapp.result.sentence_details') }}
    </h3>
    <p>
      {{ $t('webapp.result.sentence_details_text') }}
    </p>
    <div v-if="!busy">
      <evaluate-result-example-item
        v-for="(item, i) in paginatedList"
        :key="i"
        :text="item.text"
        :intent="item.intent"
        :confidence="item.intent_prediction.confidence"
        :status="item.status"
        :intent-prediction="item.intent_prediction" />
    </div>
    <div
      v-else
      class="evaluate-result-example-list__loading">
      <Loading/>
    </div>
    <div class="evaluate-result-example-list__pagination">
      <b-pagination
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
</template>

<script>
import { mapActions, mapState } from 'vuex';
import EvaluateResultExampleItem from '@/components/repository/repository-evaluate/results/EvaluateResultExampleItem';
import infiniteScroll from 'vue-infinite-scroll';
import Loading from '@/components/shared/Loading';

export default {
  name: 'EvaluateResultExampleList',
  components: {
    EvaluateResultExampleItem,
    Loading,
  },
  directives: { infiniteScroll },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      resultExampleList: [],
      limit: 20,
      maxLimit: null,
      busy: false,
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
    updateList() {
      this.busy = true;
      this.getAllResultsLog({
        repositoryUuid: this.repository.uuid,
        resultId: this.id,
      }).then((response) => {
        this.maxLimit = response.data.log.length;
        this.resultExampleList = response.data.log;
        this.busy = false;
      });
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
