<template>
  <div>
    <b-button @click="examplesDeleted()"> TEST </b-button>
    <paginated-list
      v-if="translationsList"
      :item-component="translationItemElem"
      :list="translationsList"
      :repository="repository"
      @itemDeleted="examplesDeleted()" />
    <p
      v-if="translationsList && translationsList.empty"
      class="no-examples">{{ $t('webapp.translate.no_translation') }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import TranslationItem from './TranslationItem';


const components = {
  PaginatedList,
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
      default: undefined,
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
    examplesDeleted() {
      this.updateTranslations();
      this.$emit('exampleUpdated');
    },
  },
};
</script>
