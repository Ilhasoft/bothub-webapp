<template>
  <div class="token-item">
    <div class="token-item__info">
      <language-badge
        :language="language"
        class="token-item__badge" />
      <div class="token-item__version">{{ repository_version__name }}</div>
    </div>
    <b-field class="token-item__field">
      <b-input
        :value="url"
        expanded
        readonly />
      <b-button
        class="token-item__button"
        icon-right="content-copy"
        @click="copy()" />
      <b-button
        class="token-item__button"
        icon-right="close-thick"
        @click="deleteToken()" />
    </b-field>
  </div>
</template>

<script>
import LanguageBadge from '@/components/shared/LanguageBadge';

export default {
  name: 'TranslateTokenListItem',
  components: {
    LanguageBadge,
  },
  props: {
    uuid: {
      type: String,
      required: true,
    },
    urlGenerator: {
      type: Function,
      required: true,
    },
    repository_version__name: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  computed: {
    url() {
      return this.urlGenerator(this.uuid);
    },
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.url);
      this.$buefy.toast.open({
        message: this.$t('webapp.layout.copied'),
        type: 'is-success',
      });
    },
    deleteToken() {
      this.$emit('dispatchEvent', { event: 'deleted', value: this.uuid });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

    .token-item {
        padding: 0.5rem 0;
        display: grid;
        grid-template-columns: 1fr 2.5fr;

        &__info {
          display: flex;
          align-items: center;
          > * {
            margin-right: 1rem;
          }
        }

        &__version {
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 5rem;
        }

        &__button {
            color: $color-white;
            background-color: $color-grey;
            margin-left: 0.5rem;
        }
    }
</style>
