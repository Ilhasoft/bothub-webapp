<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div v-if="repository">
      <div class="notification">
        <div>
          <div class="columns">
            <div class="column">
              <b-field label="Translate from:">
                <language-select
                  v-model="translate.from" />
              </b-field>
            </div>
            <div class="column is-narrow">
              <div class="field">
                <label class="label">&nbsp;</label>
                <b-icon
                  icon="chevron-right"
                  size="is-medium" />
              </div>
            </div>
            <div class="column">
              <b-field label="Translate to:">
                <language-select
                  v-model="translate.to"
                  :exclude="[translate.from]" />
              </b-field>
            </div>
          </div>
        </div>
      </div>
      <translate-list
        v-if="!!translate.from && !!translate.to"
        :repository="repository"
        :from="translate.from"
        :to="translate.to"
        @translated="onTranslated()" />
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';
import LanguageSelect from '@/components-v1/inputs/LanguageSelect';
import TranslateList from '@/components-v1/translate/TranslateList';
import TranslationsStatus from '@/components-v1/translate/TranslationsStatus';
import TranslationsList from '@/components-v1/translate/TranslationsList';
import { mapActions } from 'vuex';

const components = {
  RepositoryViewBase,
  LanguageSelect,
  TranslateList,
  TranslationsStatus,
  TranslationsList,
};

export default {
  name: 'RepositoryTranslate',
  components,
  extends: RepositoryBase,
  data() {
    return {
      trainResponse: null,
      translate: {
        from: null,
        to: null,
      },
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
    onCloseTrainResponseModal() {
      this.trainResponse = null;
    },
    getEditInitialData() {
      const {
        name,
        slug,
        language,
        categories_list: categories,
        description,
        is_private: isPrivate,
      } = this.repository;
      return {
        name,
        slug,
        language,
        categories: categories.map(
          ({ id, name: n }) => ({ value: id, display_name: n }),
        ),
        description,
        is_private: isPrivate,
      };
    },
    onEdited() {
      this.updateRepository();
      this.editModalOpen = false;
      this.$toast.open({
        message: 'Repository edited!',
        type: 'is-success',
      });
    },
    async onTranslated() {
      const {
        translationsList,
      } = this.$refs;
      await translationsList.updateTranslations();
      await this.updateRepository(false);
    },
    onRoleSetted() {
      this.$refs.authorizationsList.updateAuthorizations();
    },
    onEditRole(value) {
      this.$refs.setAuthorizationRoleForm.setData(value);
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModal = false;
      this.$toast.open({
        message: 'Request made! Wait for review of an admin.',
        type: 'is-success',
      });
      this.updateRepository(false);
    },
    onReviewAuthorizationRequest() {
      this.$refs.authorizationsList.updateAuthorizations();
    },
  },
};
</script>
