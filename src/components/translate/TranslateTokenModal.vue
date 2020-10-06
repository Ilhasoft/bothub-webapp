<template>
  <b-modal
    :active="open"
    :can-cancel="false"
    width="700px"
    @close="onClose()">
    <div class="token-modal">
      <h2 class="token-modal__header has-text-centered">
        {{ $t('webapp.translate.share_title') }}
      </h2>
      <div class="token-modal__content">
        <p class="token-modal__subtitle has-text-centered">
          {{ $t('webapp.translate.share_subtitle') }}
        </p>
        <div class="token-modal__create">
          <b-button
            :disabled="!language || loading"
            :loading="loading"
            :label="$t('webapp.translate.create_new_token')"
            class="token-modal__create"
            type="is-primary"
            @click="createToken()"/>
        </div>
        <paginated-list
          :url-generator="urlGenerator"
          :item-component="itemComponent"
          :list="list"
          :per-page="4"
          @deleted="onDelete"
        />
      </div>
      <div class="token-modal__footer">
        <b-button
          :label="$t('webapp.translate.ok')"
          type="is-primary"
          @click="onClose()" />
      </div>
    </div>
  </b-modal>
</template>

<script>
import PaginatedList from '@/components/shared/PaginatedList';
import TranslateTokenListItem from '@/components/translate/TranslateTokenListItem';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TokenModal',
  components: {
    PaginatedList,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    repositoryUuid: {
      type: String,
      required: true,
    },
    urlGenerator: {
      type: Function,
      default: token => token,
    },
    language: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      list: null,
      itemComponent: TranslateTokenListItem,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['getSelectedVersion']),
  },
  watch: {
    open() {
      if (!this.list && this.open) this.loadTokens();
    },
  },
  methods: {
    ...mapActions([
      'getExternalTokens',
      'createExternalToken',
      'deleteExternalToken',
    ]),
    onClose() {
      this.$emit('update:open', false);
    },
    async onDelete(uuid) {
      await this.deleteExternalToken({ uuid });
      this.loadTokens();
    },
    async loadTokens() {
      this.list = await this.getExternalTokens({
        repositoryUuid: this.repositoryUuid,
        limit: 4,
      });
    },
    async createToken() {
      this.loading = true;
      try {
        await this.createExternalToken({
          repositoryVersion: this.getSelectedVersion,
          language: this.language,
        });
        this.loadTokens();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

    .token-modal {
        overflow: hidden;
        background-color: white;
        border-radius: 4px;

        &__content {
          padding: 1rem 2rem;
        }

        &__subtitle {
          font-size: 1.25rem;
        }

        &__header, &__footer {
          display: flex;
          justify-content: center;
          background-color: $color-grey-light;
          padding: 2rem;
          border: 1px solid $color-grey;
        }

        &__create {
          display: flex;
          justify-content: center;
          margin: 0.5rem 0;
        }
    }
</style>
