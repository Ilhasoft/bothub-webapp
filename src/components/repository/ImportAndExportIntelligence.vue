<template>
  <div class="import-and-export-intelligence">
    <h2
      class="import-and-export-intelligence__title">
      {{ $t('webapp.import_and_export_intelligence.title') }}
    </h2>
    <p>
      {{ $t('webapp.import_and_export_intelligence.subtitle') }}
    </p>
    <div class="import-and-export-intelligence__buttons">
      <b-button
        v-if="intelligenceFile === null"
        type="is-primary"
        class="import-and-export-intelligence__buttons__import-button"
        @click="setVisibleImportModal()">
        {{ $t('webapp.import_and_export_intelligence.import_rasa') }}
      </b-button>
      <b-button
        v-if="intelligenceFile === null"
        type="is-primary"
        class="import-and-export-intelligence__buttons__import-button"
        @click="setVisibleMigrateModal()">
        {{ $t('webapp.import_and_export_intelligence.migrate_wit') }}
      </b-button>
    </div>

    <import-data-modal
      :is-modal-visible="importModalVisible"
      :is-import-button-visible="intelligenceFile === null"
      @selectedFileChanged="intelligenceFile = $event"
      @dispatchCloseModal="closeImportModal()"
      @dispatchImportNotification="dispatchNotification($event)"/>

    <migrate-intelligence-modal
      :is-modal-visible="migrateModalVisible"
      @selectedFileChanged="intelligenceFile = $event"
      @dispatchCloseModal="closeMigrateModal()"
      @dispatchMigrateNotification="dispatchNotification($event)"/>
  </div>
</template>

<script>
import ImportDataModal from '@/components/shared/ImportDataModal';
import MigrateIntelligenceModal from '@/components/shared/MigrateIntelligenceModal';

export default {
  name: 'ImportIntelligence',
  components: { ImportDataModal, MigrateIntelligenceModal },
  props: {
    fileUploaded: {
      type: String,
      default: 'Wit.AI',
    },
    isTrainingPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      intelligenceFile: null,
      importModalVisible: false,
      migrateModalVisible: false,
    };
  },
  methods: {
    importSelectedFile() {
      this.importModalVisible = false;
    },
    setVisibleImportModal() {
      this.importModalVisible = true;
    },
    closeImportModal() {
      this.importModalVisible = false;
      this.intelligenceFile = null;
    },
    clearImportedFile() {
      this.$nextTick(() => {
        this.intelligenceFile = null;
      });
    },
    setVisibleMigrateModal() {
      this.migrateModalVisible = true;
    },
    closeMigrateModal() {
      this.migrateModalVisible = false;
    },
    dispatchNotification(value) {
      this.$buefy.toast.open({
        message: value.message,
        type: `${value.type}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.import-and-export-intelligence{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-top: -2rem;
    padding-bottom: 1rem;
    width: 100%;

    &__title{
        margin-top: 2.2rem;
        margin-bottom: $between-title-subtitle;
    }

    &__description {
        text-align: justify;
        font-size: 12px;
        margin-bottom: $between-subtitle-content;
        @media (max-width: $mobile-width) {
            max-width: 80%;
        }
    }

    &__description-train {
        text-align: justify;
        max-width: 80%;
    }

    &__buttons {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 1rem;

        &__import-button{
            width: 11.188rem;
            height: 2.5rem;
            color: $color-white;
            font-family: $font-family;
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 6px;
            margin-right: 2rem;

        }

        &__input {
            width: 14rem;
            border: 1px solid $color-grey;
            border-radius: 4px;
        }
    }
    @media (max-width: $mobile-width) {
        width: 25rem;
    }
}
</style>
