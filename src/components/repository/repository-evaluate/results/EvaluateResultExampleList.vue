<template>
  <div v-if="resultExampleList">
    <evaluate-result-example-item
      v-for="(item, i) in resultExampleList"
      :key="i"
      :text="item.text"
      :intent="item.intent"
      :confidence="item.intent_prediction.confidence"
      :status="item.status"/>
  </div>
  <p v-else>Dont log</p>
</template>

<script>
import EvaluateResultExampleItem from '@/components/repository/repository-evaluate/results/EvaluateResultExampleItem';


export default {
  name: 'EvaluateResultExampleList',
  components: {
    EvaluateResultExampleItem,
  },
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
      limit: 10,
      busy: false,
    };
  },
  mounted() {
    this.updateList();
  },
  methods: {
    async updateList() {
      console.dir(this.$el);

      this.resultExampleList = [];
      const result = await this.$api.evaluateExample.getAllResultsLog(
        this.repository.uuid,
        this.id,
      );
      const examplesArray = result.data.log.slice(
        this.resultExampleList.length,
        this.resultExampleList + this.limit,
      );
      this.resultExampleList = this.resultExampleList.concat(examplesArray);
    },
  },
};
</script>

<style lang="scss" scoped>
.no-examples {
  margin: 8px;
}
</style>
