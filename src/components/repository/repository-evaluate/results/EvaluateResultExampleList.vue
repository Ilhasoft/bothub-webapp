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
    resultsData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      resultExampleList: [],
    };
  },
  mounted() {
    this.resultExampleList = this.resultsData.log;
    console.log(this.resultExampleList);
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.no-examples {
  margin: 8px;
}
</style>
