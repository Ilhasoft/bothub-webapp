<template>
  <layout>
    <div
      v-if="repository"
      class="wrapper">
      <repository-info
        :show-manager-authorization-action="repository.authorization.is_admin"
        :show-edit-action="repository.authorization.can_write"
        :show-train-action="repository.authorization.can_write && repository.ready_for_train"
        :training="training"
        :slug="repository.slug"
        :name="repository.name"
        :owner__nickname="repository.owner__nickname"
        :available_languages="repository.available_languages"
        :categories_list="repository.categories_list"
        :votes_sum="repository.votes_sum"
        hide-description
        @managerAuthorization="openManagerAuthorization()"
        @train="train()"
        @edit="openEditModal()" />
      <ul class="repository-navbar">
        <li
          :class="{'repository-navbar-item': true, 'active': activeTab === 0}"
          @click="activeTab = 0">Status</li>
        <li
          :class="{'repository-navbar-item': true, 'active': activeTab === 1}"
          @click="activeTab = 1">Examples</li>
        <li
          :class="{'repository-navbar-item': true, 'active': activeTab === 2}"
          @click="activeTab = 2">Translate</li>
        <li
          :class="{'repository-navbar-item': true, 'active': activeTab === 3}"
          @click="activeTab = 3">Translations</li>
        <li
          :class="{'repository-navbar-item': true, 'active': activeTab === 4}"
          @click="activeTab = 4">Analyze Text</li>
      </ul>
      <b-tabs
        v-model="activeTab"
        class="hide-tabs-nav tabs-remove-padding">
        <b-tab-item>
          <div class="notification">
            <div class="columns is-variable is-2">
              <div class="column has-text-right has-text-centered-mobile">
                <img
                  src="@/assets/imgs/mascot.svg"
                  class="status-mascot status-center-36px" >
              </div>
              <div class="column is-two-fifths has-text-centered has-text-primary">
                <p>
                  <span>You {{ repository.authorization.can_contribute | can_t }}
                    contribute and</span>
                  <span>you {{ repository.authorization.can_write | can_t }} write.</span>
                </p>
                <p class="is-size-7">
                  <span>{{ repository.examples__count }} examples,</span>
                  <span>created {{ repository.created_at | moment('from') }}.</span>
                </p>
              </div>
              <div
                v-if="repository.authorization.can_write"
                class="column has-text-centered">
                <button
                  :disabled="!repository.ready_for_train || training"
                  class="button is-primary status-center-36px"
                  @click="train()">
                  <b-icon
                    :icon="training ? 'refresh' : 'school'"
                    :custom-class="training && 'icon-spin' || null" />
                  <span v-if="training">Training</span>
                  <span v-else>Train</span>
                </button>
              </div>
              <div
                v-else-if="repository.available_request_authorization"
                class="column has-text-centered">
                <button
                  class="button is-primary is-outlined status-center-36px"
                  @click="openRequestAuthorizationModal()">Request Authorization</button>
              </div>
              <div
                v-else-if="
                  repository.request_authorization &&
                !repository.request_authorization.approved_by"
                class="column has-text-centered">
                <button
                  disabled
                  class="button is-primary is-outlined is-small">Authorization Requested</button>
                <p class="is-size-7 has-text-grey">Wait for admin review.</p>
              </div>
              <div
                v-else
                class="column" />
            </div>
          </div>
          <p v-if="repository.description">{{ repository.description }}</p>
          <p v-else>No description.</p>
        </b-tab-item>
        <b-tab-item>
          <div class="notification">
            <new-example-form
              v-if="repository.authorization.can_contribute"
              :repository="repository"
              :extra-entities-list="repository.entities"
              :extra-intents-list="repository.intents"
              @created="onExampleCreated()" />
            <div v-else-if="authenticated">
              <div class="notification is-warning">
                You can not contribute to this repository
              </div>
            </div>
            <div v-else>
              <div class="notification is-info">
                Sign in to your account to contribute to this repository.
              </div>
              <login-form hide-forgot-password />
            </div>
          </div>
          <div
            v-if="repository.authorization.can_write && repository.ready_for_train"
            class="notification is-info">
            <div class="level">
              <div class="level-left">
                <div class="level-item">Repository ready to train</div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <button
                    :disabled="training"
                    class="button is-info is-inverted is-outlined"
                    @click="train()">
                    <b-icon
                      :icon="training ? 'refresh' : 'school'"
                      :custom-class="training && 'icon-spin' || null" />
                    <span v-if="training">Training</span>
                    <span v-else>Train</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1 class="title examples-title">Examples</h1>
          <examples-list
            ref="examplesList"
            :repository="repository"
            @exampleDeleted="onExampleDeleted" />
        </b-tab-item>
        <b-tab-item>
          <div class="notification">
            <div v-if="repository.authorization.can_contribute">
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
            <div v-else-if="authenticated">
              <div class="notification is-warning">
                You can not contribute to this repository
              </div>
            </div>
            <div v-else>
              <div class="notification is-info">
                Sign in to your account to contribute to this repository.
              </div>
              <login-form hide-forgot-password />
            </div>
          </div>
          <translate-list
            v-if="!!translate.from && !!translate.to"
            :repository="repository"
            :from="translate.from"
            :to="translate.to"
            @translated="onTranslated()" />
        </b-tab-item>
        <b-tab-item>
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
        </b-tab-item>
        <b-tab-item>
          <div class="tab-padding">
            <div v-if="authenticated">
              <div class="columns">
                <div class="column is-half">
                  <div class="item">
                    <p>Make a HTTP request to NLP service, follow the example bellow.</p>
                  </div>
                  <div class="item">
                    <p><strong>URL:</strong></p>
                    <div class="pre">https://nlp.bothub.it/parse/</div>
                  </div>
                  <div class="item">
                    <p><strong>Header:</strong></p>
                    <div class="pre">Authorization: Bearer {{ repository.authorization.uuid }}</div>
                  </div>
                  <div class="item">
                    <p><strong>POST with form-data:</strong></p>
                    <div class="pre">language: [language code]
                    text: [text to analyze]</div>
                  </div>
                  <div class="item">
                    <p><strong>Response:</strong></p>
                    <div class="pre">{
                    "text": "yes",
                    "language": "en",
                    "answer": {
                    "intent": {
                    "name": "affirmative",
                    "confidence": 0.5872959956337126
                    },
                    "entities": [],
                    "intent_ranking": [
                    {
                    "name": "affirmative",
                    "confidence": 0.5872959956337126
                    },
                    {
                    "name": "negative",
                    "confidence": 0.2952035928665842
                    },
                    {
                    "name": "doubt",
                    "confidence": 0.11750041149970303
                    }
                    ],
                    "text": "yes"
                    }
                    }</div>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="item">
                    <div><strong>Code Generator:</strong></div>
                    <div>Generate code to your respective programming language.</div>
                  </div>
                  <request-generator
                    :authorization-uuid="repository.authorization.uuid"
                    :default-language-field="repository.language"/>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="notification is-warning">
                Sign in to your account to analyze text.
              </div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
    <div
      v-else-if="!hasError"
      class="wrapper">
      <loading />
    </div>
    <div v-else>
      <error-message :detail="errorDetail" />
    </div>
    <b-modal
      :active="!!trainResponse"
      @close="onCloseTrainResponseModal()">
      <div
        v-if="!!trainResponse"
        class="card">
        <div class="card-content">
          <h1 class="title">Repository Trained!</h1>
          <table class="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th colspan="2">Languages Report</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, language) in trainResponse.languages_report"
                :key="language">
                <td>{{ language | languageVerbose }}</td>
                <td class="has-text-right">
                  <b-icon
                    v-if="data.status === 'trained'"
                    icon="check"
                    type="is-success" />
                  <b-icon
                    v-else-if="data.status === 'not_ready_for_train'"
                    icon="dots-horizontal"
                    type="is-info" />
                  <div v-else-if="data.status === 'failed'">
                    <div>
                      <b-icon
                        icon="close"
                        type="is-danger" />
                    </div>
                    <p class="is-size-7">{{ data.error }}</p>
                  </div>
                  <span v-else>{{ data.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="columns">
            <div class="column has-text-centered">
              <b-icon
                icon="check"
                type="is-success"
                size="is-small" />
              <span>Trained</span>
            </div>
            <div class="column has-text-centered">
              <b-icon
                icon="dots-horizontal"
                type="is-info"
                size="is-small" />
              <span>No changes</span>
            </div>
            <div class="column has-text-centered">
              <b-icon
                icon="close"
                type="is-danger"
                size="is-small" />
              <span>Failed</span>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="editModalOpen">
      <div
        v-if="repository && editModalOpen"
        class="card">
        <div class="card-content">
          <h1 class="title is-4">Edit Repository</h1>
          <edit-repository-form
            :owner-nickname="repository.owner__nickname"
            :slug="repository.slug"
            :initial-data="getEditInitialData()"
            @edited="onEdited()" />
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="requestAuthorizationModal">
      <div
        v-if="repository && requestAuthorizationModal"
        class="card">
        <div class="card-content">
          <h1 class="title is-4">Request Authorization</h1>
          <request-authorization-form
            :repository-uuid="repository.uuid"
            @requested="onAuthorizationRequested()" />
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="managerAuthorizationModalOpen">
      <div
        v-if="repository && managerAuthorizationModalOpen"
        class="card">
        <div class="card-content">
          <h1 class="title is-4">Manager Team</h1>
          <set-authorization-role-form
            ref="setAuthorizationRoleForm"
            :repository-uuid="repository.uuid"
            @roleSetted="onRoleSetted()" />
        </div>
        <div class="card-content">
          <authorizations-list
            ref="authorizationsList"
            :repository-uuid="repository.uuid"
            @edit="onEditRole($event)" />
        </div>
        <div class="card-content">
          <h1 class="title is-5">Authorization Requests</h1>
          <authorization-requests-list
            :repository-uuid="repository.uuid"
            @review="onReviewAuthorizationRequest()" />
        </div>
      </div>
    </b-modal>
    <analyze-text-drawer
      v-if="repository && authenticated"
      :owner-nickname="repository.owner__nickname"
      :slug="repository.slug"
      :default-language="repository.language"
      :available-languages="repository.available_languages" />
  </layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layout from '@/components/shared/Layout';
import Loading from '@/components-v1/shared/Loading';
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import ErrorMessage from '@/components-v1/shared/ErrorMessage';
import NewExampleForm from '@/components-v1/example/NewExampleForm';
import LoginForm from '@/components-v1/auth/LoginForm';
import ExamplesList from '@/components-v1/example/ExamplesList';
import RequestGenerator from '@/components-v1/repository/RequestGenerator';
import AnalyzeTextDrawer from '@/components-v1/repository/AnalyzeTextDrawer';
import EditRepositoryForm from '@/components-v1/repository/EditRepositoryForm';
import LanguageSelect from '@/components-v1/inputs/LanguageSelect';
import TranslateList from '@/components-v1/translate/TranslateList';
import TranslationsStatus from '@/components-v1/translate/TranslationsStatus';
import TranslationsList from '@/components-v1/translate/TranslationsList';
import SetAuthorizationRoleForm from '@/components-v1/repository/SetAuthorizationRoleForm';
import AuthorizationsList from '@/components-v1/repository/AuthorizationsList';
import RequestAuthorizationForm from '@/components-v1/repository/RequestAuthorizationForm';
import AuthorizationRequestsList from '@/components-v1/repository/AuthorizationRequestsList';


const components = {
  Layout,
  Loading,
  RepositoryInfo,
  ErrorMessage,
  NewExampleForm,
  LoginForm,
  ExamplesList,
  RequestGenerator,
  AnalyzeTextDrawer,
  EditRepositoryForm,
  LanguageSelect,
  TranslateList,
  TranslationsStatus,
  TranslationsList,
  SetAuthorizationRoleForm,
  AuthorizationsList,
  RequestAuthorizationForm,
  AuthorizationRequestsList,
};

export default {
  name: 'Repository',
  components,
  data() {
    return {
      repository: null,
      activeTab: 0,
      hasError: false,
      errorDetail: null,
      training: false,
      trainResponse: null,
      editModalOpen: false,
      translate: {
        from: null,
        to: null,
      },
      toLanguage: null,
      requestAuthorizationModal: false,
      managerAuthorizationModalOpen: false,
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
    '$route.params.ownerNickname': async () => {
      await this.updateRepository();
    },
    '$route.params.slug': async () => {
      await this.updateRepository();
    },
  },
  async mounted() {
    await this.updateRepository();
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
    openEditModal() {
      this.editModalOpen = true;
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
        translationsStatus,
        translationsList,
      } = this.$refs;
      await translationsStatus.updateTranslationsStatus();
      await translationsList.updateTranslations();
      await this.updateRepository(false);
    },
    openRequestAuthorizationModal() {
      this.requestAuthorizationModal = true;
    },
    openManagerAuthorization() {
      this.managerAuthorizationModalOpen = true;
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

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.wrapper {
  margin: 2rem auto;
  max-width: $desktop;
  min-height: 35rem;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;

  @media screen and (max-width: $desktop) {
    margin: 0 auto;
    border-radius: 0;
    padding: 8px;
  }
}

.tab-padding {
  padding: 8px;
}

.repository-navbar {
  $primary-darken: darken($primary, 5%);

  list-style: none;
  display: flex;
  justify-content: center;
  overflow: hidden;

  border-bottom: 1px solid $primary-darken;

  @media (max-width: $desktop) {
    overflow-x: scroll;
    justify-content: flex-start;
  }

  &-item {
    position: relative;
    display: block;
    min-width: 100px;
    padding: 16px 16px 24px;
    color: $grey;
    font-size: .8rem;
    text-align: center;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      width: 100%;
      padding-top: 50%;
      bottom: -40%;
      transform: translate(-50%, 70%);
      background-color: $primary-darken;
      border-radius: 50%;
      transition: bottom .2s ease;
    }

    &:hover,
    &.active {
      color: $primary-darken;

      &::before {
        bottom: 0;
      }
    }
  }
}

.examples-title {
  margin: 2rem 8px 0;
}

.status-mascot {
  display: inline-block;
  vertical-align: bottom;
  height: 36px;
}

.status-center-36px {
  margin: 3px;
}
</style>

<style lang="scss">
.hide-tabs-nav {
  > nav.tabs {
    display: none;
  }
}

.tabs-remove-padding {
  .tab-content {
    padding: 0;
  }
}
</style>
