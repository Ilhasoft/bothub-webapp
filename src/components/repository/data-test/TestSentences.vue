<template>
  <div>
    <search-example-test
      :intents="repository.intents_list"
      :labels="repository.labels_list"
    />
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
import Pagination from '@/components-v1/shared/Pagination';
import SearchExampleTest from '@/components/repository/data-test/example-test/SearchExampleTest';


const components = {
  Pagination,
  SearchExampleTest,
};

export default {
  name: 'TestSentences',
  components,
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
