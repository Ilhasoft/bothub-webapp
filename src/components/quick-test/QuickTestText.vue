<template>
  <div
    class="quick-test-text">
    <p
      v-if="!data || entitiesList.length === 0"
      class="quick-test-text__text quick-test-text__text--before">{{ displayText }}</p>
    <highlighted-text
      v-else
      :text="displayText"
      :highlighted="highlighted"
      :entities="entitiesList"
      size="medium"
      class="quick-test-text__text" />
    <div
      v-if="error"
      class="quick-test-text__subtext__container">
      <p class="quick-test-text__subtext"> {{ checkQuickError }} </p>
    </div>
    <loading v-else-if="loading" />
    <div
      v-else-if="data"
      class="quick-test-text__subtext__container">
      <div class="quick-test-text__content">
        <p class="quick-test-text__subtext">
          <span> <strong>{{ $t('webapp.quick_test.intent') }}: </strong>
            {{ data.intent.name }} ({{ data.intent.confidence | percent }}) </span>
        </p>
        <div
          v-if="entitiesList.length > 0"
          class = "quick-test-text__entities">
          <span class="quick-test-text__subtext">
            <strong>
              {{ $t('webapp.quick_test.entities') }}:
            </strong>
          </span>
          <div>
            <p
              v-for="entity in entitiesNames"
              :key="entity"
              :class="['quick-test-text__subtext',
                       'quick-test-text__entity-item',
                       entity === highlighted ? 'quick-test-text__selected' : '']"
              @mouseenter.stop="highlighted = entity"
              @mouseleave.stop="highlighted = null">
              <span :class="['quick-test-text__subtext__dot', colorClasses[entity]]"/>
              {{ entity }}
            </p>
          </div>
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <b-button
          class="quick-test-text__button"
          icon-left="chart-pie"
          @click="debug()"> {{ $t('webapp.quick_test.debug') }} </b-button>

        <b-button
          class="quick-test-text__button"
          icon-left="file-document-outline"
          @click="showRawInfo()"> {{ $t('webapp.quick_test.raw') }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RepositoryDebug from '@/components/repository/debug/Debug';
import Loading from '@/components/shared/Loading';
import RawInfo from '@/components/shared/RawInfo';
import HighlightedText from '@/components/shared/HighlightedText';
import { getEntityColor } from '@/utils/entitiesColors';

export default {
  name: 'QuickTestText',
  components: {
    Loading,
    HighlightedText,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    repositoryUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      data: null,
      error: null,
      highlighted: null,
      repositoryStatus: {},
    };
  },
  computed: {
    ...mapGetters([
      'getSelectedVersionRepository',
      'getSelectedVersion',
      'getCurrentRepository',
    ]),
    entitiesNames() {
      if (!this.data || !this.data.entities_list) return [];
      return this.data.entities_list;
    },
    displayText() {
      if (this.data) return this.data.text;
      return this.text;
    },
    entitiesList() {
      return Object.entries(this.data.entities).flatMap((entry) => {
        const [label, entities] = entry;
        return entities.map(entity => ({
          label,
          ...entity,
        }));
      });
    },
    colorClasses() {
      return this.entitiesList.reduce((list, entity) => {
        const color = getEntityColor(
          entity.entity,
        );
        // eslint-disable-next-line no-param-reassign
        list[entity.entity] = `entity-${color}`;
        return list;
      }, {});
    },
    checkQuickError() {
      const online = navigator.onLine;
      if (!online) return this.$t('webapp.quick_test.internet_off_quick_test');

      if (!this.getCurrentRepository.ready_for_parse) {
        return this.$t('webapp.quick_test.without_train_quick_test');
      }

      return this.$t('webapp.quick_test.default_error');
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions([
      'analyzeText',
    ]),
    async load() {
      this.loading = true;
      try {
        const response = await this.analyzeText({
          repositoryUUID: this.repositoryUuid,
          repositoryVersion: this.version,
          language: this.language,
          text: this.text,
        });
        this.data = response.data;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    showRawInfo() {
      this.$buefy.modal.open({
        props: { info: this.data },
        parent: this,
        width: 562,
        canCancel: false,
        component: RawInfo,
        hasModalCard: false,
        trapFocus: true,
      });
    },
    debug() {
      this.$buefy.modal.open({
        parent: this,
        canCancel: false,
        component: RepositoryDebug,
        props: {
          repositoryUUID: this.repositoryUuid,
          version: this.version,
          language: this.language,
          text: this.text,
        },
        hasModalCard: false,
        trapFocus: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.quick-test-text {
    margin: 0 0 1.5rem 0;
    &__selected {
      text-decoration: underline;
      text-decoration-color: red;
    }

    &__text {
        margin: 0 1.175rem 0 0;
        color: #707070;
        text-align: left;
        font-weight: bold;

        &--before {
          font-size: 1.125rem;
        }
    }

    &__button {
        margin: 0 0.3rem 0 0;
        color: #707070;
    }

    &__entity-item {
      margin: 0 0 0.3rem;
      display: flex;
    }

    &__content {
      margin: 0.6rem 0.6rem 0.6rem 1.75rem;
    }

    &__subtext {
        margin: 0.3rem 0;
        vertical-align: middle;
        font-size: 0.75rem;
        color: #707070;

            &__dot {
              margin-right: 0.5rem;
              height: 1rem;
              width: 1rem;
              border-radius: 50%;
              display: inline-block;
            }
        }
    }
</style>
