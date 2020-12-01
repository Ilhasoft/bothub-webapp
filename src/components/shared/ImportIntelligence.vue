<template>
  <div class="import-intelligence">
    <p>Importe sua inteligência</p>
    <p class="import-intelligence__description">
      Caso você já possua uma inteligência de outra plataforma
      que gostaria de usá-la aqui, basta selecionar o arquivo
      correspondente aos modelos do Rasa, Wit.AI ou Bothub,
      que automaticamente os dados serão reconhecidos
    </p>
    <div class="import-intelligence__content">
      <b-button
        type="is-primary"
        class="import-intelligence__content__import-button">
        Importar dados
      </b-button>
      <b-field class="import-intelligence__content__input">
        <b-input
          v-model="email"
          :placeholder="fileUploaded"
          icon="paperclip"
          icon-right="close"
          disabled
          icon-right-clickable
          @icon-right-click="clearIconClick"/>
      </b-field>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ImportIntelligence',
  props: {
    fileUploaded: {
      type: String,
      default: 'Wit.AI',
    },
  },
  data() {
    return {

    };
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
    margin-top: -1rem;
    width: 100%;

    &__description {
        text-align: justify;
        font-size: 0.75rem;
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
                width: 12rem;
                border: 1px solid $color-grey;
                margin-left: 2rem;
                border-radius: 4px;
        }
    }
    @media (max-width: $mobile-width) {
        width: 25rem;
    }
}
</style>
