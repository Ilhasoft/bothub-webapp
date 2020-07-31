<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="repository-home">
      <div class="repository-home__description">
        <div class="repository-home__title">
          {{ $t('webapp.home.description') }}
        </div>
        <div class="repository-home__header">
          <p
            v-html="$t('webapp.home.categories_repository', {getAllCategories} ) "
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
            class="repository-home__description__text markdown-body"
          />
          <p
            v-if="repository.description"
            class="repository-home__description__text"/>
          <p v-else>
            <i class="text-color-grey-dark">{{ $t('webapp.home.no_description') }}</i>
          </p>
        </div>
      </div>

      <summary-information/>

      <div
        v-if="hasIntents"
        class="repository-home__intents-list">
        <div
          id="intent-container"
          class="repository-home__title">
          <p>
            {{ $t('webapp.home.intents_list') }}
          </p>
          <div>
            <b-tooltip
              :label="$t('webapp.summary.intent_question')"
              multilined
              type="is-dark"
              position="is-right">
              <b-icon
                custom-size="mdi-18px"
                type="is-dark"
                icon="help-circle"
              />
            </b-tooltip>
          </div>
        </div>

        <badges-intents :list="repository.intents"/>
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
        @createdGroup="addedGroup"/>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BadgesIntents from '@/components/repository/BadgesIntents';
import VueMarkdown from 'vue-markdown';
import RepositoryBase from './Base';
import EntityEdit from '@/components/repository/EntityEdit';
import SummaryInformation from '@/components/repository/SummaryInformation';

export default {
  name: 'RepositoryHome',
  components: {
    RepositoryViewBase,
    BadgesIntents,
    VueMarkdown,
    EntityEdit,
    SummaryInformation,
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
    };
  },
  computed: {
    unlabeled() {
      if (!this.repository || !this.repository.other_group) return [];
      return this.repository.other_group.entities;
    },
    hasIntents() {
      return this.repository.intents_list.length > 0;
    },
    repositoryIcon() {
      return (this.repository.categories[0] && this.repository.categories[0].icon) || 'botinho';
    },
    getAllCategories() {
      const categories = this.repository.categories_list.map(category => category.name);
      return categories.join(', ');
    },
  },
  watch: {
    edit() {
      if (!this.edit) this.creating = false;
    },
  },
  methods: {
    updatedGroup({ groupId, entities }) {
      const groupIndex = this.getGroupIndex(groupId);
      if (groupIndex >= 0) this.repository.groups[groupIndex].entities = entities;
    },
    updateUngrouped({ entities }) {
      this.repository.other_group.entities = entities;
    },
    removeEntity({ entity, groupId }) {
      if (groupId != null) {
        const groupIndex = this.getGroupIndex(groupId);

        if (groupIndex < 0) return;

        const removeIndex = this.repository.groups[groupIndex].entities
          .findIndex(listEntity => listEntity.entity_id === entity.entity_id);

        if (removeIndex < 0) return;

        this.repository.groups[groupIndex].entities.splice(removeIndex, 1);
      } else {
        const removeIndex = this.repository.other_group.entities
          .findIndex(listEntity => listEntity.entity_id === entity.entity_id);
        if (removeIndex < 0) return;
        this.repository.other_group.entities.splice(removeIndex, 1);
      }
    },
    removeGroup(groupId) {
      const groupIndex = this.getGroupIndex(groupId);
      if (groupIndex < 0) return;
      this.repository.other_group.entities = this.repository.other_group.entities
        .concat(this.repository.groups[groupIndex].entities);
      this.repository.groups.splice(groupIndex, 1);
    },
    addedGroup(group) {
      this.repository.groups.push(group);
    },
    getGroupIndex(groupId) {
      return this.repository.groups
        .findIndex(group => group.group_id === groupId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';
@import 'github-markdown-css/github-markdown.css';

.repository-home {
  &__title {
    font-size: 1.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;

    div{
      margin: 0 0 0.2rem 0.2rem;
    }
  }

  &__header {
    display: flex;
    margin-bottom: 1rem;

    &__icon-badge {
      $size: 4rem;

      position: relative;
      display: block;
      width: $size;
      height: $size;
      overflow: hidden;
      background-color: $color-primary-dark;
      border-radius: 50%;

      &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        color: white;
        transform: translate(-50%, -50%);
      }
    }

  }

  &__description {
    padding: 1rem .5rem;

    &__text {
      ul li {
        list-style-type: disc;
      }
    }
  }

  &__intents-list {
    margin-top:2rem;
    padding: 1rem .5rem;
    &__header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
    }
  }
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

  h1, h2 {
    border-bottom: 1px solid $color-primary;
  }
}
</style>
