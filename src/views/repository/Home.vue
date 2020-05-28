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
          <div class="repository-home__header__wrapper">
            <span
              v-for="language in repository.available_languages"
              :key="language"
              class="repository-home__header__wrapper__badge"
            >
              <bh-badge
                :transparent="language !== repository.language"
                size="small"
                color="primary"
              >
                {{ language }}
              </bh-badge>
            </span>
          </div>
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

      <div
        v-if="hasIntents"
        class="repository-home__intents-list"
      >
        <div class="repository-home__title">
          {{ $t('webapp.home.intents_list') }}
        </div>
        <badges-card
          :list="repository.intents_list"
          :title="formattedEntityTitle()"
        />
      </div>

      <entity-edit
        :groups="repository.groups || []"
        :can-edit="repository.authorization.can_contribute"
        :ungrouped="unlabeled"
        :repository-uuid="repository.uuid"/>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BadgesCard from '@/components/repository/BadgesCard';
import VueMarkdown from 'vue-markdown';
import RepositoryBase from './Base';
import EntityEdit from '@/components/repository/EntityEdit';


export default {
  name: 'RepositoryHome',
  components: {
    RepositoryViewBase,
    BadgesCard,
    VueMarkdown,
    EntityEdit,
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
      if (!this.repository || !this.repository.attributes.other_group) return [];
      return this.repository.attributes.other_group.entities;
    },
    hasIntents() {
      return this.repository.intents_list.length > 0;
    },
    repositoryIcon() {
      return (this.repository.categories[0] && this.repository.categories[0].icon) || 'botinho';
    },
    labeledEntitiesCount() {
      return this.repository.labels.reduce((acc, label) => acc + label.entities.length, 0);
    },
  },
  watch: {
    edit() {
      if (!this.edit) this.creating = false;
    },
  },
  methods: {
    formattedEntityTitle() {
      return this.$t('webapp.home.bot_has_x_intents', { intents: this.repository.intents_list.length });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';
@import 'github-markdown-css/github-markdown.css';

.repository-home {
  &__title {
    font-size: 1.75rem;
    font-weight: 700;
  }

  &__header {
    display: flex;
    margin-top: 1rem;
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

    &__wrapper {

      &__badge {
        height: 1.5rem;
        margin: .4rem .5rem 0 0;
        font-weight: bold;
        line-height: calc(1.5rem - 4px);
        border-width: 1px;
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
