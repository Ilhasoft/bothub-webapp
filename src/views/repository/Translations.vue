<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div v-if="repository">
      <div class="bh-notification">
        <div class="bh-grid">
          <div class="bh-grid__item">
            <translations-status
              ref="translationsStatus"
              :owner-nickname="repository.owner__nickname"
              :repository-slug="repository.slug"
              v-model="toLanguage" />
          </div>
        </div>
      </div>
      <translations-list
        ref="translationsList"
        :repository="repository"
        :to-language="toLanguage" />
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';
import TranslationsStatus from '@/components-v1/translate/TranslationsStatus';
import TranslationsList from '@/components-v1/translate/TranslationsList';


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
  },
};
</script>
