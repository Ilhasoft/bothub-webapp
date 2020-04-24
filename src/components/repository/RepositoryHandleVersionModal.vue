<template>
  <div class="repository-new-version-modal">
    <div class="repository-new-version-modal__container">
      <form @submit.prevent="onSubmit">
        <div class="field">
          <label class="label">{{ $t('webapp.versions.title') }}</label>
          <div class="control">
            <b-input
              v-model="name"
              :maxlength="maxLength"
              :has-counter="false"
            />
          </div>
        </div>
        <div class="field">
          <div class="control has-text-centered" />
          <div class="control">
            <label class="label">{{ $t('webapp.versions.version') }}</label>
            <input
              :placeholder="version.name"
              class="input"
              type="text"
              disabled >
            <div class="field repository-new-version-modal__button-container">
              <b-button
                type="is-light"
                @click="onClose()">{{ $t('webapp.versions.cancel') }}</b-button>
              <b-button
                :loading="loading"
                :disabled="!canSubmit"
                type="is-primary"
                native-type="submit"
              >{{ $t('webapp.versions.add_new') }}</b-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'RepositoryHandleVersionModal',
  props: {
    repository: {
      default: null,
      type: Object,
    },
    version: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      maxLength: 40,
      submitting: false,
      name: null,
      loading: false,
    };
  },
  computed: {
    canSubmit() {
      return !(!this.name || /^\s*$/.test(this.name));
    },
  },
  methods: {
    ...mapActions(['addNewVersion']),
    onClose() {
      this.$emit('close');
    },
    async onSubmit() {
      this.loading = true;
      await this.addNewVersion({
        repositoryUUID: this.repository.uuid,
        versionUUID: this.version.id,
        name: this.name,
      })
        .then(() => {
          this.loading = false;
          this.$emit('addedVersion');
        })
        .catch((error) => {
          this.$emit('error', error);
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/utilities.scss";

.repository-new-version-modal {
  &__container {
    margin: 0 auto;
    max-width: $max-repository-card-width;
    min-width: 200px;
    padding: 1.75rem;
    border-radius: 8px;
    background-color: white;
  }

  &__button-container {
    margin: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
