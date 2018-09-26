<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div v-if="repository">
      <div class="bh-notification">
        <div v-if="authenticated">
          <div
            v-if="repository.authorization.can_contribute"
            class="bh-grid repository-translate">
            <div class="bh-grid__item">
              <bh-field label="Translate from:">
                <language-select v-model="translate.from" />
              </bh-field>
            </div>
            <div class="repository-translate__translate-arrow-icon">
              <div class="field">
                <label class="label">&nbsp;</label>
                <bh-icon
                  value="chevron-right"
                  size="small" />
              </div>
            </div>
            <div class="bh-grid__item">
              <bh-field label="Translate to:">
                <language-select
                  v-model="translate.to"
                  :exclude="[translate.from]" />
              </bh-field>
            </div>
          </div>
          <div v-else>
            <div class="bh-notification bh-notification--warning">
              You can not contribute to this repository
            </div>
          </div>
        </div>
        <div v-else>
          <div class="bh-notification bh-notification--info">
            Sign in to your account to contribute to this repository.
          </div>
          <login-form hide-forgot-password />
        </div>
      </div>
      <translate-list
        v-if="!!translate.from && !!translate.to"
        :repository="repository"
        :from="translate.from"
        :to="translate.to" />
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';
import LanguageSelect from '@/components-v1/inputs/LanguageSelect';
import TranslateList from '@/components-v1/translate/TranslateList';
import TranslationsList from '@/components-v1/translate/TranslationsList';
import LoginForm from '@/components-v1/auth/LoginForm';


export default {
  name: 'RepositoryTranslate',
  components: {
    RepositoryViewBase,
    LanguageSelect,
    TranslateList,
    TranslationsList,
    LoginForm,
  },
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
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
  watch: {
    async authenticated() {
      await this.updateRepository();
    },
  },
  methods: {
    ...mapActions([
      'getRepository',
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

<style lang="scss">
.repository-translate {
  &__translate-arrow-icon {
    align-self: center;
  }
}
</style>
