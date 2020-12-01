<template>
  <div class="export-data-modal">
    <b-modal
      :active.sync="isModalVisible"
      :destroy-on-hide="false"
      :can-cancel="false"
      has-modal-card
      aria-role="dialog"
      class="export-data-modal__card"
      aria-modal>
      <div
        class="modal-card export-data-modal__modal-style">
        <header class="modal-card-head export-data-modal__modal-style__header">
          <p>Exportar Dataset</p>
        </header>
        <section class="modal-card-body export-data-modal__modal-style__selects">
          <b-select
            expanded
            placeholder="Complete Intelligence"
            class="export-data-modal__modal-style__selects__inputs"
          >
            <option value="flint">Complete Intelligence</option>
            <option value="silver">Only Phrase</option>
            <option value="vane">Only Entities</option>
            <option value="billy">Only Translations</option>
          </b-select>
          <b-select
            expanded
            placeholder="Select which platform"
            class="export-data-modal__modal-style__selects__inputs"
          >
            <option value="flint">Bothub</option>
            <option value="silver">Rasa</option>
            <option value="vane">Wit.AI</option>
          </b-select>
        </section>
        <footer class="modal-card-foot">
          <div class="export-data-modal__modal-style__style-button">
            <b-button
              class="modal-button"
              type="is-white"
              @click="dispatchCloseExportModal()">
              Cancel
            </b-button>
            <b-button
              :loading="isButtonLoading"
              :disabled="isExportButtonVisible"
              class="modal-button"
              type="is-primary"
              @click="dispatchExport()">
              Exportar
            </b-button>
          </div>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ExportDataModal',
  props: {
    isModalVisible: {
      type: Boolean,
      default: false,
    },
    isExportButtonVisible: {
      type: Boolean,
      default: false,
    },
    isButtonLoading: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedFile: null,
    };
  },
  watch: {
    selectedFile() {
      if (this.selectedFile !== null) {
        this.$emit('selectedFileChanged', this.selectedFile);
      }
    },
  },
  methods: {
    removeSelectedFile() {
      this.selectedFile = null;
    },
    dispatchExport() {
      this.selectedFile = null;
      this.$emit('dispatchExportFile');
    },
    dispatchCloseExportModal() {
      this.selectedFile = null;
      this.$emit('dispatchCloseModal');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.export-data-modal {

  &__modal-style{
      width: 22.5rem;
      @media (max-width: $mobile-width) {
        width: 26.5rem;
        padding-left: 3rem;
      }
    &__header{
      p{
        font-size: 1.5rem;
      }
    }

    &__selects{
        padding: 2rem;
        height: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        &__inputs{
            min-width: 18rem;
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
    &__custom-file-upload {
    display: flex;
    flex-direction: column;

    &__input{
    display: flex;
    width: 100%;

    &__button{
      background-color: #9E9E9E;
      padding: 0 2rem;
    }

    &__file{
      border: 1px solid #D5D5D5;
      color: #BABABA;
      font-size: $font-size;
      font-family: $font-family;
      display: flex;
      width: 100%;
      justify-content:center;
      align-items:center;
      border-top-right-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;

      span{
        font-size: 1rem;
      }
    }
    &__icon{
      cursor: pointer;
      color:#D5D5D5;
      display:flex;
      align-items: center;
      &:hover{
        color: $color-grey-dark;
      }
    }
    }
  }
}

</style>
