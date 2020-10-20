<template>
  <div>
    <b-button
      :disabled="!translateTo || loading"
      :loading="loading"
      :label="$t('webapp.translate.auto_translate')"
      type="is-primary"
      @click="onClick()" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { languageListToDict } from '@/utils';

export default {
  name: 'AutoTranslate',
  props: {
    translateTo: {
      type: String,
      default: null,
    },
    repositoryUuid: {
      type: String,
      default: null,
    },
    externalToken: {
      type: String,
      default: null,
    },
    version: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      progress: 0,
    };
  },
  computed: {
    verboseLanguage() {
      if (!this.translateTo) return '';
      return languageListToDict([this.translateTo])[this.translateTo];
    },
  },
  async mounted() {
    await this.checkProgress();
    if (this.progress > 0) {
      this.$emit('onTranslate');
    }
  },
  methods: {
    ...mapActions([
      'autoTranslate',
      'autoTranslateExternal',
      'getAutoTranslateProgress',
    ]),
    autoTranslateAction() {
      if (this.externalToken) return this.autoTranslateExternal({ token: this.externalToken });
      return this.autoTranslate({
        repositoryUUID: this.repositoryUuid,
        repositoryVersion: this.version,
        targetLanguage: this.translateTo,
      });
    },
    onClick() {
      this.$buefy.dialog.confirm({
        title: this.$t('webapp.translate.auto_translate'),
        message: this.$t('webapp.translate.auto_translate_confirm', { language: this.verboseLanguage }),
        confirmText: this.$t('webapp.layout.yes'),
        cancelText: this.$t('webapp.home.cancel'),
        onConfirm: async () => {
          await this.sendAutoTranslate();
        },
      });
    },
    async sendAutoTranslate() {
      this.loading = true;
      try {
        await this.autoTranslateAction();
      } catch (e) {
        this.$buefy.toast.open({
          message: this.$t(e.response.status === 500 ? 'webapp.translate.unsupported' : 'webapp.settings.default_error'),
          type: 'is-danger',
        });
        this.loading = false;
        return;
      }
      this.$emit('onTranslate');
      await this.checkProgress(true);
    },
    async checkProgress(inProgress = false) {
      const { data } = await this.getAutoTranslateProgress({
        repositoryUUID: this.repositoryUuid,
        repositoryVersion: this.version,
      });

      const [translateStatus] = data.results;

      if (!translateStatus) {
        this.loading = false;
        return;
      }

      if (translateStatus.status === 2) {
        if (inProgress) this.$emit('onTranslateComplete');
        this.loading = false;
      }
      setTimeout(() => {
        if (translateStatus.status === 0
          || translateStatus.status === 1) {
          this.loading = true;
          this.checkProgress(true);
        }
      }, 60000);
    },
  },
};
</script>
