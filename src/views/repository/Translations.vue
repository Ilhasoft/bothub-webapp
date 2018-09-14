<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div v-if="repository">
      <div class="notification">
        <div class="columns">
          <div class="column">
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


const components = {
  RepositoryViewBase,
  TranslationsStatus,
  TranslationsList,
  mapGetters,
};

export default {
  name: 'RepositoryTranslations',
  components,
  extends: RepositoryBase,
  data() {
    return {
      toLanguage: null,
    };
  },
  methods: {
    ...mapActions([
      'getRepository',
      'trainRepository',
    ]),
    async updateRepository(doNull = true) {
      const { ownerNickname, slug } = this.$route.params;
      if (doNull) {
        this.repository = null;
      }
      try {
        const response = await this.getRepository({ ownerNickname, slug });
        this.repository = response.data;
        this.translate.from = this.repository.language;
      } catch (e) {
        this.hasError = true;
        const { detail } = e.response.data;
        this.errorDetail = detail;
      }
    },
    onExampleCreated() {
      this.$refs.examplesList.updateExamples();
      this.updateRepository(false);
    },
    async train() {
      const { ownerNickname, slug } = this.$route.params;
      this.training = true;
      try {
        const response = await this.trainRepository({ ownerNickname, slug });
        this.trainResponse = response.data;
      } catch (e) {
        this.$toast.open({
          message: 'Repository not trained :(',
          type: 'is-danger',
        });
      }
      this.training = false;
      await this.updateRepository(false);
    },
    onExampleDeleted() {
      this.updateRepository(false);
    },
    async onTranslated() {
      const {
        translationsStatus,
        translationsList,
      } = this.$refs;
      await translationsStatus.updateTranslationsStatus();
      await translationsList.updateTranslations();
      await this.updateRepository(false);
    },
  },
};
</script>
