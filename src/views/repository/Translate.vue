<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div v-if="authenticated">
        <div
          v-if="repository.authorization.can_contribute || repository.authorization.can_translate">
          <div class="repository-translate">
            <div class="repository-translate__fields">
              <b-field :label="$t('webapp.translate.translate_from')">
                <language-select v-model="translate.from" />
              </b-field>
            </div>
            <div class="repository-translate__translate-arrow-icon">
              <div class="field">
                <label class="label">&nbsp;</label>
                <b-icon
                  icon="chevron-right"
                  size="is-small" />
              </div>
            </div>
            <div class="repository-translate__fields">
              <b-field :label="$t('webapp.translate.translate_to')">
                <language-select
                  v-model="translate.to"
                  :exclude="[translate.from]" />
              </b-field>
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
              :update="update"
              :repository="repository"
              :query="query"
              :from="translate.from"
              :to="translate.to"
              @translated="examplesTranslated()" />
          </div>
        </div>
        <div v-else>
          <b-notification
            :closable="false"
            type="is-warning"
            role="alert">
            <div class="repository-translate__requestAuthorization">
              {{ $t('webapp.trainings.not_can_edit_repository') }}
              <request-authorization-modal
                v-if="repository"
                :open.sync="requestAuthorizationModalOpen"
                :repository-uuid="repository.uuid"
                @requestDispatched="onAuthorizationRequested()" />
              <a
                @click="openRequestAuthorizationModal">
                {{ $t('webapp.layout.request_authorization') }}
              </a>
            </div>
          </b-notification>
        </div>
      </div>
      <div v-else>
        <b-notification
          :closable="false"
          class="is-info"
          role="alert">
          {{ $t('webapp.translate.login') }}
        </b-notification>
        <login-form hide-forgot-password />
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
        update: false,
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
      this.update = !this.update;
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
      this.$buefy.toast.open({
        message: this.$t('webapp.layout.authorization_success'),
        type: 'success',
      });
      this.updateRepository(false);
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.repository-translate {
  background-color: $color-white;
  display:flex;
  justify-content: space-around;
  align-items: center;

  &__fields{
    width: 50%
  }

  &__translate-arrow-icon {
    align-self: center;
  }

  &__search {
    margin: 0.5rem;
  }
  &__requestAuthorization{
        color: $color-fake-black;
        text-align: center;
        display:flex;
        justify-content: space-between;
        align-items: center;

        a{
          font-weight: $font-weight-medium;
          text-decoration: none !important;
          &:hover{
           color: $color-grey-darker !important;
       }
      }

        @media screen and (max-width: 50em) {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
    }
}

</style>
