<template>
  <repository-view-base :repository="repository" :error-code="errorCode">
    <div v-if="repository" class="repository-home">
      <div class="repository-home__description">
        <div class="repository-home__title">
          {{ $t("webapp.home.description") }}
        </div>
        <div class="repository-home__description__header">
          <div>
            <b-tag
              v-for="(category, index) in getAllCategories"
              :key="index"
              class="repository-home__header__tag"
              rounded
            >
              {{ category }}
            </b-tag>
          </div>
          <unnnic-button
            v-if="hasIntegration && !hasIntegrationCheckError"
            type="primary"
            :loading="!hasIntegrationDefined"
            @click="changeIntegrateModalState(true)"
            :class="{
              'repository-home__description__header__remove-integrate': hasIntegrationDefined
            }"
          >
            {{ $t("webapp.summary.remove_integrate") }}
          </unnnic-button>
          <unnnic-button
            v-else-if="!hasIntegrationCheckError"
            type="primary"
            :loading="!hasIntegrationDefined"
            @click="changeIntegrateModalState(true)"
            :class="{ 'repository-home__description__header__integrate': hasIntegrationDefined }"
          >
            {{ $t("webapp.summary.integrate") }}
          </unnnic-button>
        </div>

        <div>
          <vue-markdown
            :source="repository.description"
            :show="show"
            :html="html"
            :breaks="breaks"
            :linkify="linkify"
            :emoji="emoji"
            :typographer="typographer"
            :toc="toc"
            toc-id="toc"
            class="repository-home__description__text markdown-body"
          />
          <p v-if="repository.description" class="repository-home__description__text" />
          <p v-else>
            <i class="text-color-grey-dark">{{ $t("webapp.home.no_description") }}</i>
          </p>
        </div>
      </div>

      <summary-information />

      <h1>Chegou aqui</h1>

      <div v-if="hasIntents" class="repository-home__intents-list">
        <div id="intent-container" class="repository-home__title">
          <p>
            {{ $t("webapp.home.intents_list") }}
          </p>
          <div>
            <b-tooltip
              :label="$t('webapp.summary.intent_question')"
              class="tooltipStyle"
              multilined
              type="is-dark"
              position="is-right"
            >
              <b-icon custom-size="mdi-18px" type="is-dark" icon="help-circle" />
            </b-tooltip>
          </div>
        </div>

        <badges-intents :list="repository.intents" />
      </div>

      <entity-edit
        id="entity-container"
        :groups="repository.groups || []"
        :can-edit="repository.authorization.can_contribute"
        :ungrouped="unlabeled"
        :repository-uuid="repository.uuid"
        @updateGroup="updatedGroup"
        @updateUngrouped="updateUngrouped"
        @removeGroup="removeGroup"
        @removeEntity="removeEntity"
        @createdGroup="addedGroup"
      />
    </div>
    <h1>{{ repositoryVersion }}</h1>
    <integration-modal
      :openModal="integrateModal"
      :repository="getCurrentRepository"
      :hasIntegration="hasIntegration"
      @closeIntegratationModal="changeIntegrateModalState(false)"
      @dispatchUpdateIntegration="changeIntegrationValue()"
    />
  </repository-view-base>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BadgesIntents from '@/components/repository/BadgesIntents';
import VueMarkdown from 'vue-markdown';
import EntityEdit from '@/components/repository/EntityEdit';
import SummaryInformation from '@/components/repository/SummaryInformation';
import IntegrationModal from '@/components/shared/IntegrationModal';
import RepositoryBase from '../Base';

export default {
  name: 'RepositoryHome',
  components: {
    RepositoryViewBase,
    BadgesIntents,
    VueMarkdown,
    EntityEdit,
    SummaryInformation,
    IntegrationModal
  },
  extends: RepositoryBase,
  data() {
    return {
      initialTab: 0,
      currentLanguage: '',
      links: ['Sentences', 'Results', 'Versions'],
      languages: [],
      evaluating: false,
      error: {},
      source: '',
      show: true,
      html: true,
      breaks: false,
      linkify: false,
      emoji: true,
      typographer: true,
      toc: true,
      edit: false,
      creating: false,
      newLabels: [],
      integrateModal: false,
      hasIntegration: null,
      integrationError: null
    };
  },
  computed: {
    ...mapGetters(['getCurrentRepository', 'getProjectSelected', 'getOrgSelected']),
    unlabeled() {
      if (!this.repository || !this.repository.other_group) return [];
      return this.repository.other_group.entities;
    },
    hasIntegrationDefined() {
      return this.hasIntegration !== null;
    },
    hasIntegrationCheckError() {
      return this.integrationError !== null;
    },
    hasIntents() {
      return this.repository.intents_list.length > 0;
    },
    repositoryIcon() {
      return (this.repository.categories[0] && this.repository.categories[0].icon) || 'botinho';
    },
    getAllCategories() {
      const categories = this.repository.categories_list.map(category => category.name);
      return categories;
    }
  },
  watch: {
    edit() {
      if (!this.edit) this.creating = false;
    },
    getCurrentRepository() {
      if (this.getCurrentRepository) {
        this.checkIfHasIntegration();
      }
    }
  },
  methods: {
    ...mapActions(['getIntegrationRepository']),
    async checkIfHasIntegration() {
      try {
        const { data } = await this.getIntegrationRepository({
          repository_version: this.getCurrentRepository.repository_version_id,
          repository_uuid: this.getCurrentRepository.uuid,
          project_uuid: this.getProjectSelected,
          organization: this.getOrgSelected
        });
        this.hasIntegration = data.in_project;
      } catch (err) {
        this.integrationError = err.response && err.response.data;
      }
    },
    changeIntegrationValue() {
      this.hasIntegration = null;
    },
    updatedGroup({ groupId, entities }) {
      const groupIndex = this.getGroupIndex(groupId);
      if (groupIndex >= 0) this.repository.groups[groupIndex].entities = entities;
    },
    updateUngrouped({ entities }) {
      this.repository.other_group.entities = entities;
    },
    changeIntegrateModalState(value) {
      if (this.integrationError !== null && value) {
        this.$buefy.toast.open({
          message: this.integrationError.detail,
          type: 'is-danger'
        });
        return;
      }
      this.integrateModal = value;
    },
    removeEntity({ entity, groupId }) {
      if (groupId != null) {
        const groupIndex = this.getGroupIndex(groupId);

        if (groupIndex < 0) return;

        const removeIndex = this.repository.groups[groupIndex].entities.findIndex(
          listEntity => listEntity.entity_id === entity.entity_id
        );

        if (removeIndex < 0) return;

        this.repository.groups[groupIndex].entities.splice(removeIndex, 1);
      } else {
        const removeIndex = this.repository.other_group.entities.findIndex(
          listEntity => listEntity.entity_id === entity.entity_id
        );
        if (removeIndex < 0) return;
        this.repository.other_group.entities.splice(removeIndex, 1);
      }
    },
    removeGroup(groupId) {
      const groupIndex = this.getGroupIndex(groupId);
      if (groupIndex < 0) return;
      this.repository.other_group.entities = this.repository.other_group.entities.concat(
        this.repository.groups[groupIndex].entities
      );
      this.repository.groups.splice(groupIndex, 1);
    },
    addedGroup(group) {
      this.repository.groups.push(group);
    },
    getGroupIndex(groupId) {
      return this.repository.groups.findIndex(group => group.group_id === groupId);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.repository-home {
  &__title {
    font-size: 1.75rem;
    font-weight: $font-weight-medium;
    display: flex;
    align-items: center;
    font-family: $font-family;
    color: $color-fake-black;

    div {
      margin: 0 0 0.2rem 0.2rem;
    }
  }

  &__header {
    display: flex;
    margin-bottom: 1rem;

    &__tag {
      margin: 0.8rem 0.5rem 2.188rem 0;
      padding: 0 2rem;
      font-size: 15px;
    }
  }

  &__description {
    padding: 0 0.5rem;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      &__integrate {
        background-color: $color-primary-soft;
      }
      &__remove-integrate {
        border: 1px solid $unnnic-color-feedback-red;
        color: $unnnic-color-feedback-red;
        background-color: $color-white;
        transition: 0.1s;

        &:hover {
          border: 1px solid $unnnic-color-feedback-red;
          background-color: $unnnic-color-feedback-red;
          color: $unnnic-color-background-snow;
        }
      }
    }

    &__text {
      ul li {
        list-style-type: disc;
      }
    }
  }

  &__intents-list {
    margin-top: 2rem;
    padding: 1rem 0.5rem;
    &__header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
    }
  }
}
.tooltipStyle::after {
  font-size: 12px;
  line-height: 13px;
  padding: 1rem 0.5rem;
  font-family: $font-family;
}
.markdown-body {
  a {
    color: $color-primary;
    text-decoration: none;
  }

  hr {
    background: $color-primary;
    height: 2px;
  }

  h1,
  h2 {
    border-bottom: 1px solid $color-primary;
  }
}
</style>
