<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid">
      <h1>Test Sentences</h1>
    </div>
    <search-example-test
      :intents="repository.intents_list"
      :labels="repository.labels_list"
      :entities="repository.entities_list"
    />
    <examples-test-list
      :repository="repository"/>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
import Pagination from '@/components-v1/shared/Pagination';
import SearchExampleTest from '@/components/repository/sentences-test/sentences/SearchExampleTest';
import ExamplesTestList from '@/components/repository/sentences-test/sentences/ExamplesTestList';


export default {
  name: 'TestSentences',
  components: {
    Pagination,
    SearchExampleTest,
    ExamplesTestList,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {

    };
  },
  // async mounted() {
  //   await this.updateList();
  // },

  // async updateList() {
  //   this.translateList = null;
  //   if (!!this.from && !!this.to) {
  //     await this.$nextTick();
  //     this.translateList = await this.getExamplesToTranslate({
  //       repositoryUuid: this.repository.uuid,
  //       from: this.from,
  //       to: this.to,
  //     });
  //   }
  // },
  // },
};
</script>
