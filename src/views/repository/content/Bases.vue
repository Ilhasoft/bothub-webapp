<template>
  <repository-view-base :repository="repository" :error-code="errorCode">
    <div v-if="repository" class="repository-base">
      <div class="repository-base__description">
        <div class="repository-base__title">
            <unnnic-card
            type="title"
            :title="$t('webapp.home.description')"
            enabled
            icon="paginate-filter-text-1"
            infoPosition="right"
            :hasInformationIcon="false"
            scheme="aux-orange"
          />
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
            class="repository-base__description__text markdown-body"
          />
          <p v-if="repository.description" class="repository-base__description__text" />
          <p v-else>
            <i class="text-color-grey-dark">{{ $t("webapp.home.no_description") }}</i>
          </p>
        </div>
        <div class="repository-base__description__header">
          <div>
            <b-tag
              v-for="(category, index) in getAllCategories"
              :key="index"
              class="repository-base__header__tag"
              rounded
            >
              {{ category }}
            </b-tag>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <unnnic-card
            type="title"
            :title="$t('webapp.home.bases.knowledge_bases')"
            enabled
            icon="book-address-1-2"
            infoPosition="right"
            :hasInformationIcon="false"
            scheme="aux-pink"
          />
          <p class="repository-base__description__text">
            {{ $t("webapp.home.bases.description") }}
          </p>
      </div>
      <div class="repository-base__cards">
        <unnnic-card
          clickable
          :text="$t('webapp.home.bases.new_knowledge_base')"
          type="blank"
          icon="add-1"
          class="repository-base__cards__new"
        />
        <home-repository-card
          v-for="list in repositoryOrgList"
          :key="list.uuid"
          :repository-detail="list"
          @dispatchShowModal="showModal($event)"
        />
      </div>
      <infinite-scroll
        v-show="!isComplete"
        @intersect="getOrgsRepositories()"
      />
    </div>
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
import HomeRepositoryCard from '@/components/repository/home/HomeRepositoryCard';

export default {
  name: 'RepositoryBase',
  components: {
    RepositoryViewBase,
    BadgesIntents,
    VueMarkdown,
    EntityEdit,
    SummaryInformation,
    IntegrationModal,
    HomeRepositoryCard
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

.repository-base {
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
    }

    &__text {
      margin-top: 8px;
      ul li {
        list-style-type: disc;
      }
    }
  }
  &__cards {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(4, 24%);
    margin-top: 24px;
    @media screen and (max-width: 1400px) {
      grid-template-columns: repeat(3, 32%);
    }

    &__new {
      height: 16.8125rem;
      margin-bottom: $unnnic-inline-sm;
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
