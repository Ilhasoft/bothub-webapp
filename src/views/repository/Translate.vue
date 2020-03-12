<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div v-if="authenticated">
        <div v-if="repository.authorization.can_contribute">
          <div class="repository-translate">
            <div class="bh-grid">
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
          </div>
          <div
            v-if="!!translate.from && !!translate.to">
            <div class="repository-translate__search">
              <filter-examples
                :intents="repository.intents_list"
                :entities="repository.entities_list"
                @queryStringFormated="onSearch($event)"/>
            </div>
            <translate-list
              :repository="repository"
              :query="query"
              :from="translate.from"
              :to="translate.to"
              @translated="examplesTranslated()" />
          </div>
        </div>
        <div
          v-else
          class="bh-grid">
          <div class="bh-grid__item">
            <div class="bh-notification bh-notification--warning">
              You can not contribute to this repository
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="bh-grid">
        <div class="bh-grid__item">
          <div class="bh-notification bh-notification--info">
            Sign in to your account to contribute to this repository.
          </div>
          <login-form hide-forgot-password />
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import LanguageSelect from '@/components/inputs/LanguageSelect';
import TranslateList from '@/components/translate/TranslateList';
import TranslationsList from '@/components/translate/TranslationsList';
import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';
import FilterExamples from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';

export default {
  name: 'RepositoryTranslate',
  components: {
    FilterExamples,
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
      query: {},
      querySchema: {},
    };
  },
  methods: {
    ...mapActions([
      'getRepository',
    ]),
    examplesTranslated() {
      this.updateRepository(true);
    },
    onSearch(value) {
      Object.assign(this.querySchema, value);

      if (!this.querySchema.intent) {
        delete this.querySchema.intent;
      }
      if (!this.querySchema.entity) {
        delete this.querySchema.entity;
      }
      if (!this.querySchema.label) {
        delete this.querySchema.label;
      }
      const formattedQueryString = exampleSearchToString(this.querySchema);
      this.query = exampleSearchToDicty(formattedQueryString);
    },
  },
};
</script>

<style lang="scss">
@import '~bh/src/assets/scss/colors.scss';

.repository-translate {
  background-color: $color-white;
  border-bottom: .120rem solid whitesmoke;

  &__translate-arrow-icon {
    align-self: center;
  }

  &__search {
    margin: 0.5rem;
  }
}
</style>
