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
            >
              <bh-badge
                :transparent="language !== repository.language"
                size="small"
                color="primary"
                class="repository-home__header__wrapper__badge"
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

      <div
        v-if="hasLabels"
        class="repository-home__entities-list"
      >
        <div class="repository-home__title">
          {{ $t('webapp.home.entities_list') }}
        </div>
        <badges-card
          v-if="repository.other_label.entities.length > 0"
          :list="repository.other_label.entities"
          :title="formattedLabel(repository.other_label)"
          :examples-count="repository.other_label.examples__count"
          @onRemove="removeFromLabel2"
          @onAdd="addToLabel2"
        />
        <div v-if="repository.labels.length > 0">
          <div class="repository-home__entities-list__labeled-count">
            {{ labeledEntitiesCount }} {{ $t('webapp.home.entities_label') }}
          </div>
          <badges-card
            v-for="(label, i) in repository.labels"
            :key="i"
            :list="label.entities"
            :title="formattedLabel(label)"
            :examples-count="label.examples__count"
            @onRemove="removeFromLabel($event, i)"
            @onAdd="addToLabel($event, i)"
          />
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BadgesCard from '@/components/repository/BadgesCard';
import VueMarkdown from 'vue-markdown';
import RepositoryBase from './Base';


export default {
  name: 'RepositoryHome',
  components: {
    RepositoryViewBase,
    BadgesCard,
    VueMarkdown,
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
    };
  },
  computed: {
    hasIntents() {
      return this.repository.intents_list.length > 0;
    },
    repositoryIcon() {
      return (this.repository.categories[0] && this.repository.categories[0].icon) || 'botinho';
    },
    labeledEntitiesCount() {
      return this.repository.labels.reduce((acc, label) => acc + label.entities.length, 0);
    },
    hasLabels() {
      if (
        !this.repository.labels
        || !this.repository.other_label
        || !this.repository.other_label.entities
      ) {
        return false;
      }

      return this.repository.labels.length > 0 || this.repository.other_label.entities.length > 0;
    },
  },
  methods: {
    removeFromLabel(event, i) {
      console.log(event, i);
      this.repository.labels[i].entities.splice(event, 1);
    },
    removeFromLabel2(i) {
      this.repository.other_label.entities.splice(i, 1);
    },
    addToLabel(event, i) {
      // console.log({ event, i });
      this.repository.labels[i].entities.push(event);
    },
    addToLabel2(event) {
      this.repository.other_label.entities.push(event);
    },
    formattedLabel(label) {
      if (label === undefined || label.entities === undefined) {
        return '';
      }

      const entity = label.entities.length > 1 ? 'entities' : 'entity';

      if (label.value === 'other') {
        return this.$t('webapp.home.unlabeled', { entities_length: label.entities.length, _entity: entity });
      }

      return this.$t('webapp.home.labeled',
        {
          entities_length: label.entities.length,
          _entity: entity,
          label_value: label.value,
        });
    },
    formattedEntityTitle() {
      return this.$t('webapp.home.bot_has_x_intents', { intents: this.repository.intents_list.length });
    },
  },
};
</script>

<style lang="scss">
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

  &__intents-list,
  &__entities-list {
    padding: 1rem .5rem;
  }

  &__entities-list {
    &__labeled-count {
      margin: 1.5rem 0 1rem;
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
