<template>
  <pagination
    v-if="translateList"
    :list="translateList"
    :itemComponent="translateExampleItem"
    :repository="repository"
    :translateTo="to" />
</template>

<script>
import { mapActions } from 'vuex';
import Pagination from '@/components/shared/Pagination';
import TranslateExampleItem from './TranslateExampleItem';


const components = {
  Pagination,
};

export default {
  name: 'TranslateList',
  components,
  props: {
    repository: {
      type: Object,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    await this.updateList();
  },
  watch: {
    async from() { await this.updateList(); },
    async to() { await this.updateList(); },
  },
  data() {
    return {
      translateList: null,
      translateExampleItem: TranslateExampleItem,
    };
  },
  methods: {
    ...mapActions([
      'getExamplesToTranslate',
    ]),
    async updateList() {
      this.translateList = null;
      if (!!this.from && !!this.to) {
        this.translateList = await this.getExamplesToTranslate({
          repositoryUuid: this.repository.uuid,
          from: this.from,
          to: this.to,
        });
      }
    },
  },
};
</script>
