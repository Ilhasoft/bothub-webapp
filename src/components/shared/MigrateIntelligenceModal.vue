<template>
  <div class="migrate-intelligence-modal">
    <b-modal
      :active.sync="isModalVisible"
      :destroy-on-hide="false"
      :can-cancel="false"
      has-modal-card
      aria-role="dialog"
      class="migrate-intelligence-modal__card"
      aria-modal>
      <div
        class="modal-card migrate-intelligence-modal__modal-style">
        <header class="modal-card-head migrate-intelligence-modal__modal-style__header">
          <p>{{ $t('webapp.migrate_intelligence.title') }}</p>
        </header>
        <section class="modal-card-body">
          <div
            class="migrate-intelligence-modal__fields">
            <b-field class="migrate-intelligence-modal__fields__inputs">
              <b-input
                v-model="authToken"
                :placeholder="$t('webapp.migrate_intelligence.token_input')"
                expanded/>
            </b-field>
            <b-field class="migrate-intelligence-modal__fields__inputs">
              <b-select
                v-model="languageSelect"
                :placeholder="$t('webapp.migrate_intelligence.language')"
                expanded>
                <option
                  v-for="[language, label] in languages"
                  :value="language"
                  :key="language">{{ label }}</option>
              </b-select>
            </b-field>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="migrate-intelligence-modal__modal-style__style-button">
            <b-button
              class="modal-button"
              type="is-white"
              @click="dispatchCloseMigrateModal()">
              {{ $t('webapp.migrate_intelligence.cancel') }}
            </b-button>
            <b-button
              :loading="isButtonLoading"
              :disabled="checkInputs"
              class="modal-button"
              type="is-primary"
              @click="dispatchMigrate()">
              {{ $t('webapp.migrate_intelligence.migrate') }}
            </b-button>
          </div>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { LANGUAGES } from '@/utils';

export default {
  name: 'ImportDataModal',
  props: {
    isModalVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      authToken: '',
      languageSelect: null,
      isButtonLoading: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'getSelectedVersion',
    ]),
    checkInputs() {
      if (this.authToken === '' || this.languageSelect === null) { return true; }

      return false;
    },
    languages() {
      return Object.keys(LANGUAGES)
        .map(lang => ([lang, LANGUAGES[lang]]));
    },
  },
  methods: {
    ...mapActions([
      'setMigrateIntelligence',
    ]),
    async dispatchMigrate() {
      try {
        this.isButtonLoading = true;
        await this.setMigrateIntelligence({
          repositoryVersion: this.getSelectedVersion,
          AuthToken: this.authToken,
          Language: this.languageSelect,
          Classifier: 'wit',
        });
        this.$emit('dispatchMigrateNotification', { type: 'is-success', message: this.$t('webapp.migrate_intelligence.migrate_success') });
        this.dispatchCloseMigrateModal();
      } catch (error) {
        const errorMessage = error.response && error.response.data;
        const filterMessage = `${Object.keys(errorMessage)} - ${Object.values(errorMessage)}`;
        this.$emit('dispatchMigrateNotification', { type: 'is-danger', message: filterMessage });
      } finally {
        this.isButtonLoading = false;
      }
    },
    dispatchCloseMigrateModal() {
      this.authToken = '';
      this.languageSelect = null;
      this.$emit('dispatchCloseModal');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.migrate-intelligence-modal {

  &__modal-style{
      width: 26.5rem;
      @media (max-width: $mobile-width) {
        padding-left: 5rem
      }
    &__header{
      p{
        font-size: 1.5rem;
      }
    }

    &__style-button{
      width:100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .modal-button {
        cursor: pointer;
        border: 1px solid #dbdbdb;
        text-align: center;
        border-radius: 4px;
        font-family: $font-family;
        box-shadow: none;

        &:hover{
          border: 1px solid #c2c2c2;
        }
      }
    }
  }
    &__fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__inputs{
      width: 90%;
      margin-top: 1rem;
    }
  }
}

</style>
