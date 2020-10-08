<template>
  <div class="token-item">
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
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;

        &__field {
            min-width: 75%;
        }

        &__button {
            color: $color-white;
            background-color: $color-grey;
            margin-left: 0.5rem;
        }

        &__badge {
            margin-right: 0.1rem;
        }
    }
</style>
