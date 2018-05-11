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
        <li
          @click="activeTab = 2"
          :class="{'navbar-item': true, 'active': activeTab === 2}">Translate</li>
        <li
          @click="activeTab = 3"
          :class="{'navbar-item': true, 'active': activeTab === 3}">Update</li>
        <li
          @click="activeTab = 4"
          :class="{'navbar-item': true, 'active': activeTab === 4}">Issues</li>
        <li
          @click="activeTab = 5"
          :class="{'navbar-item': true, 'active': activeTab === 5}">Historic</li>
      </ul>
      <b-tabs
        v-model="activeTab"
        class="hide-tabs-nav tabs-remove-padding">
        <b-tab-item>
          <p v-if="repository.description">{{ repository.description }}</p>
          <p v-else>No description.</p>
        </b-tab-item>
        <b-tab-item>
          <div class="new-example-wrapper">
            <new-example-form
              v-if="repository.authorization.can_contribute"
              :repository="repository" />
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
          <div style="height: 300px;"></div>
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
    <div v-else><error-message :detail="errorDetail" /></div>
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

const components = {
  Layout,
  Loading,
  RepositoryInfo,
  ErrorMessage,
  NewExampleForm,
  LoginForm,
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
      activeTab: 1,
      hasError: false,
      errorDetail: null,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
  methods: {
    ...mapActions([
      'getRepository',
    ]),
    async updateRepository() {
      const { ownerNickname, slug } = this.$route.params;
      this.repository = null;
      try {
        const response = await this.getRepository({ ownerNickname, slug });
        this.repository = response.data;
      } catch (e) {
        this.hasError = true;
        const { detail } = e.response.data;
        this.errorDetail = detail;
      }
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

.new-example-wrapper {
  padding: 8px;
  background-color: $white-ter;
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

