<template>
  <div v-if="translationsList">
    <paginated-list
      :item-component="translationItemElem"
      :list="translationsList"
      :repository="repository"
      @itemDeleted="examplesDeleted()"/>
    <p
      v-if="translationsList.empty"
      class="no-examples">{{ $t('webapp.translate.no_translation') }}
      <a
        class="outline-text"
        @click="goToTranslate()">{{ $t('webapp.translate.click_here') }}</a>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
    }),
  },
  watch: {
    toLanguage() { this.updateTranslations(); },
  },
  async mounted() {
    await this.updateTranslations();
  },
  methods: {
    ...mapActions([
      'getTranslations',
    ]),
    async updateTranslations() {
      this.translationsList = await this.getTranslations({
        repositoryUuid: this.repository.uuid,
        to_language: this.toLanguage,
        repositoryVersion: this.repositoryVersion,
      });
    },
    goToTranslate() {
      this.$router.push({
        name: 'repository-translate',
      });
    },
    examplesDeleted() {
      this.updateTranslations();
      this.$emit('exampleUpdated');
    },
  },
};
</script>
