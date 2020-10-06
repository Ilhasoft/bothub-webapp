<template>
  <div>
    <b-button
      v-show="progress === 0"
      :disabled="!translateTo || loading"
      :loading="loading"
      :label="$t('webapp.translate.auto_translate')"
      type="is-primary"
      @click="onClick()" />
    <progress-bar
      v-show="progress > 0"
      :progress="progress"
      type="is-primary"/>
    <p v-show="progress > 0">
      {{ $t('webapp.translate.auto_percentage', { progress }) }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ProgressBar from '@/components/shared/ProgressBar';
import { languageListToDict } from '@/utils';

export default {
  name: 'AutoTranslate',
  components: { ProgressBar },
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
      this.loading = false;
    },
    async checkProgress(inProgress = false) {
      const { data } = await this.getAutoTranslateProgress({
        repositoryUUID: this.repositoryUuid,
        repositoryVersion: this.version,
      });

      const [translateStatus] = data.results;

      if (!translateStatus) {
        this.resetProgress();
        return;
      }

      if (translateStatus.status === 0) {
        this.progress = 26;
      }
      if (translateStatus.status === 1) {
        this.progress = 68;
      }
      if (translateStatus.status === 2) {
        this.progress = 0;
        if (inProgress) this.$emit('onTranslateComplete');
      }
      setTimeout(() => {
        if (translateStatus.status === 0
          || translateStatus.status === 1) {
          this.checkProgress(true);
        }
      }, 60000);
    },
  },
};
</script>
