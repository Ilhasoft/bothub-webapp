<template>
  <div>
    <pagination
      v-if="translationsList"
      :item-component="translationItemElem"
      :list="translationsList"
      :repository="repository" />
    <p
      v-if="translationsList && translationsList.empty"
      class="no-examples">No translations.</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Pagination from '@/components/shared/Pagination';
import TranslationItem from './TranslationItem';


const components = {
  Pagination,
};

export default {
  name: 'TranslationsList',
  components,
  props: {
    repository: {
      type: Object,
      required: true,
    },
    toLanguage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      translationsList: null,
      translationItemElem: TranslationItem,
    };
  },
  watch: {
    async toLanguage() { await this.updateTranslations(); },
  },
  async mounted() {
    await this.updateTranslations();
  },
  methods: {
    ...mapActions([
      'getTranslations',
    ]),
    async updateTranslations() {
      this.translationsList = null;
      this.translationsList = await this.getTranslations({
        repositoryUuid: this.repository.uuid,
        to_language: this.toLanguage,
      });
    },
  },
};
</script>
