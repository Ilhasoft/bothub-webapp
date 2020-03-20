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
                <bh-field :label="$t('webapp.translate.translate_from')">
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
                <bh-field :label="$t('webapp.translate.translate_to')">
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
              {{ $t('webapp.translate.not_can_edit_repository') }}
              <request-authorization-modal
                v-if="repository"
                :open.sync="requestAuthorizationModalOpen"
                :repository-uuid="repository.uuid"
                @requestDispatched="onAuthorizationRequested()" />
              <a
                class="repository-translate__requestAuthorization"
                @click="openRequestAuthorizationModal">Request authorization</a>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="bh-grid">
        <div class="bh-grid__item">
          <div class="bh-notification bh-notification--info">
            {{ $t('webapp.translate.login') }}
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
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';

export default {
  name: 'RepositoryTranslate',
  components: {
    FilterExamples,
    RepositoryViewBase,
    LanguageSelect,
    TranslateList,
    TranslationsList,
    LoginForm,
    RequestAuthorizationModal,
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
      requestAuthorizationModalOpen: false,
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
    openRequestAuthorizationModal() {
      this.requestAuthorizationModalOpen = true;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModalOpen = false;
      this.$bhToastNotification({
        message: 'Request made! Wait for review of an admin.',
        type: 'success',
      });
      this.updateRepository(false);
    },
  },
};
</script>

<style lang="scss">
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';

.repository-translate {
  background-color: $color-white;

  &__translate-arrow-icon {
    align-self: center;
  }

  &__search {
    margin: 0.5rem;
  }
  &__requestAuthorization{
        color: $color-fake-black;
        font-weight: $font-weight-medium;
        text-align: center;
        float: right
      }
}
  @media screen and (max-width: 50em) {
        .bh-notification--warning{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
      }
</style>
