<template>
  <div
    v-infinite-scroll="updateList"
    v-if="resultExampleList"
    class="evaluate-result-example-list"
    infinite-scroll-disabled="busy"
    infinite-scroll-throttle-delay="800"
    infinite-scroll-distance="-20">
    <evaluate-result-example-item
      v-for="(item, i) in resultExampleList"
      :key="i"
      :text="item.text"
      :intent="item.intent"
      :confidence="item.intent_prediction.confidence"
      :status="item.status" />
    <div
      v-if="!busy"
      class="evaluate-result-example-list__loading">
      <bh-loading />
    </div>
  </div>
  <p v-else>Dont log</p>
</template>

<script>
import EvaluateResultExampleItem from '@/components/repository/repository-evaluate/results/EvaluateResultExampleItem';
import infiniteScroll from 'vue-infinite-scroll';


export default {
  name: 'EvaluateResultExampleList',
  components: {
    EvaluateResultExampleItem,
  },
  directives: { infiniteScroll },
  props: {
    repository: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      resultExampleList: [],
      limit: 5,
      maxLimit: null,
      busy: false,
    };
  },
  mounted() {
    this.updateList();
  },
  methods: {
    updateList() {
      if (this.resultExampleList.length !== this.maxLimit) {
        this.busy = true;
        this.$api.evaluateExample.getAllResultsLog(
          this.repository.uuid,
          this.id,
        ).then((response) => {
          this.maxLimit = response.data.log.length;
          const append = response.data.log.slice(
            this.resultExampleList.length,
            this.resultExampleList.length + this.limit,
          );
          this.resultExampleList = this.resultExampleList.concat(append);
          this.busy = false;
        });
      } else {
        this.busy = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.evaluate-result-example-list {
  width: 100%;

  &__loading {
    width: 100%;
    text-align: center;
  }
}
.no-examples {
  margin: 8px;
}
</style>
