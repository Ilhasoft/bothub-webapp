<template>
  <div class="export-intelligence">
    <h2>Exporte sua inteligência</h2>
    <div class="export-intelligence__content">
      <b-button
        type="is-primary"
        class="export-intelligence__content__export-button"
        @click="setVisibleExportModal()">
        Exportar Dataset
      </b-button>
    </div>

    <export-data-modal
      :is-modal-visible="exportModalVisible"
      @selectedFileChanged="intelligenceFile = $event"
      @dispatchCloseModal="closeExportModal()"
      @dispatchExportFile="ExportSelectedFile()"/>
  </div>
</template>

<script>
import ExportDataModal from './ExportDataModal';

export default {
  name: 'ExportIntelligence',
  components: { ExportDataModal },
  data() {
    return {
      exportModalVisible: false,
    };
  },
  methods: {
    ExportSelectedFile() {
      this.exportModalVisible = false;
    },
    setVisibleExportModal() {
      this.exportModalVisible = true;
    },
    closeExportModal() {
      this.exportModalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.export-intelligence{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;

    &__title{
        margin-top: 2.2rem;
    }

    &__description {
        text-align: justify;
        font-size: 12px;
        @media (max-width: $mobile-width) {
            max-width: 80%;
        }
    }

    &__description-train {
        text-align: justify;
        max-width: 80%;
    }

    &__content {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 1rem;

        &__export-button{
            width: 11.188rem;
            height: 2.5rem;
            color: $color-white;
            font-family: $font-family;
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 6px;

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
