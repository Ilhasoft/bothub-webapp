<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div class="translations__header">
        <translations-status
          ref="translationsStatus"
          :repository-uuid="repository.uuid"
          v-model="toLanguage" />
      </div>
      <hr>
      <div class="translations__list">
        <translations-list
          ref="translationsList"
          :repository="repository"
          :to-language="toLanguage"
          @exampleUpdated="exampleUpdated()" />
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import TranslationsStatus from '@/components/translate/TranslationsStatus';
import TranslationsList from '@/components/translate/TranslationsList';
import RepositoryBase from './Base';


export default {
  name: 'RepositoryTranslations',
  components: {
    RepositoryViewBase,
    TranslationsStatus,
    TranslationsList,
    mapGetters,
  },
  extends: RepositoryBase,
  data() {
    return {
      toLanguage: null,
      translate: {
        from: null,
        to: null,
      },
    };
  },
  methods: {
    ...mapActions([
      'getRepository',
    ]),
    exampleUpdated() {
      this.updateRepository(false);
    },
  },
};
</script>
