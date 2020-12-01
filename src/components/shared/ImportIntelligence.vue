<template>
  <div class="import-intelligence">
    <h2
      v-if="isTrainingPage"
      class="import-intelligence__title">Importe sua inteligência</h2>
    <p v-else>Importe sua inteligência</p>
    <p
      v-if="!isTrainingPage"
      class="import-intelligence__description">
      Caso você já possua uma inteligência de outra plataforma
      que gostaria de usá-la aqui, basta selecionar o arquivo
      correspondente aos modelos do Rasa, Wit.AI ou Bothub,
      que automaticamente os dados serão reconhecidos
    </p>
    <p
      v-else
      class="import-intelligence__description-train">
      Para importar, basta selecionar o arquivo correspondente
      aos modelos Rasa, Wit.AI ou Bothub, e os dados serão automaticamente
      reconhecidos.
    </p>
    <div class="import-intelligence__content">
      <b-button
        v-if="intelligenceFile === null"
        type="is-primary"
        class="import-intelligence__content__import-button"
        @click="setVisibleImportModal()">
        Importar dados
      </b-button>
      <b-field
        v-else
        class="import-intelligence__content__input">
        <b-input
          :placeholder="intelligenceFile.name"
          icon="paperclip"
          icon-right="close"
          disabled
          icon-right-clickable
          @icon-right-click="clearImportedFile()"/>
      </b-field>
    </div>

    <import-data-modal
      :is-modal-visible="importModalVisible"
      @translationFileChanged="intelligenceFile = $event"
      @dispatchCloseModal="closeImportModal()"
      @dispatchImportFile="importSelectedFile()"/>
  </div>
</template>

<script>
import ImportDataModal from './ImportDataModal';

export default {
  name: 'ImportIntelligence',
  components: { ImportDataModal },
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
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.import-intelligence{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-top: -2rem;
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

        &__import-button{
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
