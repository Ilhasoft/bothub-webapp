<template>
  <layout>
    <div
      v-if="repository"
      class="wrapper">
      <repository-info
        hideDescription
        :slug="repository.slug"
        :name="repository.name"
        :owner__nickname="repository.owner__nickname"
        :available_languages="repository.available_languages"
        :categories_list="repository.categories_list" />
      <ul class="navbar">
        <li
          @click="activeTab = 0"
          :class="{'navbar-item': true, 'active': activeTab === 0}">Status</li>
        <li
          @click="activeTab = 1"
          :class="{'navbar-item': true, 'active': activeTab === 1}">Examples</li>
      </ul>
      <b-tabs
        v-model="activeTab"
        class="hide-tabs-nav tabs-remove-padding">
        <b-tab-item>
          <div class="notification">
            <div class="columns">
              <div class="column">
                <p>
                  <span>{{ repository.examples__count }} examples,</span>
                  <span>created {{ repository.created_at | moment('from') }}.</span>
                </p>
                <p>
                  <span>You {{ repository.authorization.can_contribute | can_t }}
                    contribute and</span>
                  <span>you {{ repository.authorization.can_write | can_t }} write.</span>
                </p>
              </div>
              <div
                v-if="repository.authorization.can_write"
                class="column is-narrow">
                <button
                  :disabled="!repository.ready_for_train || training"
                  class="button is-primary is-medium"
                  @click="train()">
                  <b-icon
                    :icon="training ? 'refresh' : 'school'"
                    :customClass="training && 'icon-spin' || null" />
                  <span v-if="training">Training</span>
                  <span v-else>Train</span>
                </button>
              </div>
            </div>
          </div>
          <div class="tab-padding">
            <p v-if="repository.description">{{ repository.description }}</p>
            <p v-else>No description.</p>
          </div>
        </b-tab-item>
        <b-tab-item>
          <div class="notification">
            <new-example-form
              v-if="repository.authorization.can_contribute"
              :repository="repository"
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
              <login-form hideForgotPassword />
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
                      :customClass="training && 'icon-spin' || null" />
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
        <b-tab-item>Translate</b-tab-item>
        <b-tab-item>Update</b-tab-item>
        <b-tab-item>Issues</b-tab-item>
        <b-tab-item>Historic</b-tab-item>
      </b-tabs>
    </div>
    <div
      v-else-if="!hasError"
      class="wrapper">
        <loading />
      </div>
    <div v-else><error-message :detail="!!errorDetail" /></div>
    <b-modal
      v-if="!!trainResponse"
      active
      @close="onCloseTrainResponseModal()">
      <div class="card">
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
  </layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layout from '@/components/shared/Layout';
import Loading from '@/components/shared/Loading';
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import ErrorMessage from '@/components/shared/ErrorMessage';
import NewExampleForm from '@/components/example/NewExampleForm';
import LoginForm from '@/components/auth/LoginForm';
import ExamplesList from '@/components/example/ExamplesList';

const components = {
  Layout,
  Loading,
  RepositoryInfo,
  ErrorMessage,
  NewExampleForm,
  LoginForm,
  ExamplesList,
};

export default {
  name: 'Repository',
  components,
  mounted() {
    this.updateRepository();
  },
  watch: {
    authenticated() {
      this.updateRepository();
    },
  },
  data() {
    return {
      repository: null,
      activeTab: 0,
      hasError: false,
      errorDetail: null,
      training: false,
      trainResponse: null,
    };
  },
  filters: {
    can_t(value) {
      return value ? 'can' : 'can\'t';
    },
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
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

.navbar {
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
  margin: 48px 8px 0;
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

