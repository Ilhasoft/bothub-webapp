<template>
  <div
    class="quick-test-text">
    <p
      v-if="!data"
      class="quick-test-text__text">{{ text }}</p>
    <highlighted-text
      v-else
      :text="data.text"
      :entities="entitiesList"
      :all-entities="allEntities"
      class="quick-test-text__text" />
    <div
      v-if="error"
      class="quick-test-text__subtext__container">
      <p class="quick-test-text__subtext">
        {{ $t('webapp.quick_test.error_quick_test') }} </p>
    </div>
    <loading v-else-if="loading" />
    <div
      v-else-if="data"
      class="quick-test-text__subtext__container">
      <p class="quick-test-text__subtext">
        <span class="quick-test-text__subtext__dot"/>
        <span> <strong>{{ $t('webapp.quick_test.intent') }}: </strong>
          {{ data.intent.name }} ({{ data.intent.confidence | percent }}) </span>
      </p>
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
import { mapActions, mapState } from 'vuex';
import RepositoryDebug from '@/components/repository/debug/Debug';
import Loading from '@/components/shared/Loading';
import RawInfo from '@/components/shared/RawInfo';
import HighlightedText from '@/components/shared/HighlightedText';
import { getWordIndex } from '@/utils';

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
    };
  },
  computed: {
    ...mapState({
      repositoryVersion: state => state.Repository.repositoryVersion,
    }),
    displayText() {
      if (this.data) return this.data.text;
      return this.text;
    },
    allEntities() {
      if (!this.data || !this.data.entities_list) return [];
      return this.data.entities_list.map((entity, index) => ({ id: index, value: entity }));
    },
    entitiesList() {
      return Object.entries(this.data.entities).flatMap((entry) => {
        const [label, entities] = entry;
        return entities.map((entity) => {
          const { start, end } = getWordIndex(entity.value, this.displayText);
          return {
            label,
            start,
            end,
            entity: entity.entity,
            value: entity.value,
          };
        });
      });
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
      this.data = this.test();
    //   this.loading = true;
    //   try {
    //     const response = await this.analyzeText({
    //       repositoryUUID: this.repositoryUuid,
    //       repositoryVersion: this.version,
    //       language: this.language,
    //       text: this.text,
    //     });
    //     this.data = response.data;
    //   } catch (e) {
    //     this.error = e;
    //   } finally {
    //     this.loading = false;
    //   }
    },
    showRawInfo() {
      this.$buefy.modal.open({
        props: { info: this.data },
        parent: this,
        component: RawInfo,
        hasModalCard: false,
        trapFocus: true,
      });
    },
    debug() {
      this.$buefy.modal.open({
        parent: this,
        component: RepositoryDebug,
        props: {
          repositoryUUID: this.repositoryUUID,
          version: this.version,
          language: this.language,
          text: this.text,
        },
        hasModalCard: false,
        trapFocus: true,
      });
    },
    test() {
      return {
        intent: {
          name: 'true',
          confidence: 0.9539737105369568,
        },
        intent_ranking: [
          {
            name: 'true',
            confidence: 0.9539737105369568,
          },
          {
            name: 'false',
            confidence: 0,
          },
        ],
        labels_list: [
          'other',
        ],
        entities_list: [
          'possum',
        ],
        entities: {
          other: [
            {
              value: 'possum',
              entity: 'possum',
              confidence: 0.952185173891061,
            },
          ],
        },
        text: 'possum is good',
        repository_version: 9893,
        language: 'en',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.quick-test-text {
    margin: 0 0 1.5rem 0;

    &__text {
        margin: 0 1.175rem 0 0;
        color: #707070;
        text-align: left;
        font-weight: bold;
        font-size: 18px;
    }

    &__button {
        margin: 0 1rem 0 0;
        color: #707070;
    }

    &__subtext {
        display: flex;
        vertical-align: middle;
        font-size: 0.75rem;
        color: #707070;
        margin: 0.6rem 0.6rem 0.6rem 1.75rem;

            &__dot {
              margin-right: 0.5rem;
              height: 1rem;
              width: 1rem;
              background-color: #2BBFAC;
              border-radius: 50%;
              display: inline-block;
            }
        }
    }
</style>
