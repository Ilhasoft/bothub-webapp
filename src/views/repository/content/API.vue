<template>
  <repository-view-base :repository="repository" :error-code="errorCode">
      <section class="repository-api">
        <section class="repository-api__header">
          <unnnic-card
            type="title"
            :title="$t('webapp.home.bases.api')"
            enabled
            icon="charger-1"
            infoPosition="right"
            :hasInformationIcon="false"
            scheme="feedback-green"
            class="repository-api__header__title"
          />
          <p class="repository-api__header__subtitle">
            {{$t('webapp.home.bases.api_subtitle')}}
          </p>
          <hr />
        </section>
        <section  class="repository-api__select">
          <p class="repository-api__select__text">
            {{$t('webapp.home.bases.api_select')}}
          </p>
          <div class="repository-api__select__inputs">
            <div class="repository-api__select__input">
              <unnnicSelect
                size="md"
                type="normal"
                placeholder=""
              >
                <div slot="header">{{}}</div>
                <option>None</option>
                <option>option1</option>
                <option>option2</option>
                <option>option3</option>
                <option>option4</option>
                <option>option5</option>
              </unnnicSelect>
            </div>
          </div>
        </section>
        <section class="repository-api__tabs">
          <unnnic-tab initialTab="integrate" :tabs="['integrate']">
            <template slot="tab-head-integrate">
              {{ $t("webapp.home.bases.api_tabs") }}
            </template>

            <template slot="tab-panel-integrate">
              <p class="description">
                Insira os seguintes dados onde for solicitado na plataforma:
              </p>
              <div class="repository-api__box">
                <div class="repository-api__box--first">
                  <p class="repository-api__box--first__text">URL:</p>
                  <unnnic-card
                    type="default"
                    :description="`${repository.nlp_server}v2/parse/`"
                    enabled
                    infoPosition="right"
                    hasInformationIcon
                    scheme="aux-blue"
                    class="repository-api__box--first__card"
                  />
                  <p class="repository-api__box--first__text">Access Token</p>
                  <unnnic-card
                    type="default"
                    :description="authorization"
                    enabled
                    infoPosition="right"
                    hasInformationIcon
                    scheme="aux-blue"
                    class="repository-api__box--first__card"
                  />

                  <p class="repository-api__box--first__text">Código da inteligência</p>
                  <unnnic-card
                    type="default"
                    :description="repository.repository_version_id"
                    enabled
                    infoPosition="right"
                    hasInformationIcon
                    scheme="aux-blue"
                    class="repository-api__box--first__card"
                  />
                  <p class="description"> Confira abaixo um guia para integração
                    e o exemplo do que a API retornará.</p>
                  <p class="description--darkest"> Como integrar ao Weni Fluxos ou Rapidpro.</p>
                </div>
                <div class="repository-api__box--second">
                    <p><strong>POST corpo:</strong></p>
                    <highlighted-code code-class=""
                    >{
                      "language":"{{ $t("webapp.home.bases.api_tabs_post_lang") }}"
                      "text": "{{
                      $t("webapp.home.bases.api_tabs_post_text")
                    }}"
                    }
                    </highlighted-code>
                    <p><strong>Exemplo de responsta da API</strong></p>
                    <highlighted-code code-class=""
                    >{
                      {
                        "intent": {
                          "name": "love",
                          "confidence": 0.6943462393863934
                        },
                        "intent_ranking": [
                          {
                            "name": "love",
                            "confidence": 0.6943462393863934
                          },
                          {
                            "name": "hate",
                            "confidence": 0.30565376061360666
                          }
                        ],
                    }
                    </highlighted-code>
                </div>
              </div>
              <section class="repository-api__form">
                <div class="repository-api__form__buttons">
                  <unnnic-button
                    @click.prevent="prev()"
                    size="large"
                    text=""
                    type="terciary"
                    iconLeft="arrow-left-1-1"
                  >
                  </unnnic-button>
                  <unnnic-button
                    @click.prevent="next()"
                    size="large"
                    text=""
                    type="terciary"
                    iconLeft="arrow-right-1-1"
                  >
                  </unnnic-button>
                </div>
                <form>
                  <div v-if="step === 1" class="repository-api__form__step">
                    <div>
                      <p class="repository-api__form__step__title">
                        Passo 1
                      </p>
                      <p class="repository-api__form__step__text">
                        No Weni Fluxos, abra o fluxo desejado ou crie um novo fluxo.
                      </p>
                    </div>
                  <img src="@/assets/imgs/step-one.png" alt="">
                  </div> <!--passo 1 -->
                  <div v-else-if="step===2" class="repository-api__form__step">
                    <div>
                      <p class="repository-api__form__step__title">
                        Passo 2
                      </p>
                      <p class="repository-api__form__step__text">
                        Insira uma nova caixa de fluxo e selecione a opção
                        “Chamar um webhook”
                      </p>
                      </div>
                    <img src="@/assets/imgs/step-two.png" alt="">
                  </div> <!--passo 2 -->
                  <div v-else-if="step===3" class="repository-api__form__step">
                    <div>
                      <p class="repository-api__form__step__title">
                        Passo 3
                      </p>
                      <p class="repository-api__form__step__text">
                        Selecione Post e insira a URL disponível acima
                      </p>
                      </div>
                    <img src="@/assets/imgs/step-three.png" alt="">
                  </div> <!--passo 2 -->
                  <div v-else class="repository-api__form__step">
                    <div>
                      <p class="repository-api__form__step__title">
                        Passo 4
                      </p>
                      <p class="repository-api__form__step__text">
                        Clique em Post Corpo e insira o código acima correspondente ao POST Corpo.
                        Você pode substituir os valores entre aspas por variáveis.
                      </p>
                      </div>
                    <img src="@/assets/imgs/step-four.png" alt="">
                  </div> <!--passo 2 -->
                </form>
              </section>
            </template>
          </unnnic-tab>
        </section>
      </section>
  </repository-view-base>
</template>
<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import HighlightedCode from '@/components/shared/HighlightedCode';
import RepositoryBase from '../Base';


export default {
  name: 'RepositoryContentAPI',
  components: {
    RepositoryViewBase,
    HighlightedCode,
  },
  extends: RepositoryBase,
  data(){
    return {
      exApiResponse: {
        intent: {
          name: 'love',
          confidence: 0.6943462393863934
        },
        intent_ranking: [
          {
            name: 'love',
            confidence: 0.6943462393863934
          },
          {
            name: 'hate',
            confidence: 0.30565376061360666
          }
        ],
      },
      step: 1
    }
  },

  computed: {
    authorization() {
      return this.repository?.authorization?.organizations?.[0]?.uuid;
    },
  },
  methods: {
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.repository-api {

  &__header{
    &__title {
        font-size: $unnnic-font-size-body-lg;
        font-weight: $unnnic-font-weight-regular;
        font-family: $unnnic-font-family-primary;
        color: $unnnic-color-neutral-darkest;
      }
      &__subtitle{
        margin-top: 8px;
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-gt;
        color: $unnnic-color-neutral-dark;
      }
  }
  &__select{
    display: flex;
    align-items: center;

    &__text{
      margin-right: 1rem;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
    }
  }
  &__tabs{
    margin-top: 24px;
  }
  &__box{
    display: flex;
    justify-content: space-between;

    &--first{
      width: 48%;
      &__text{
         font-family: $unnnic-font-family-secondary;
         color: $unnnic-color-neutral-darkest;
         font-size: $unnnic-font-size-body-gt;
         margin-bottom: 8px;
      }
      &__card{
        margin-bottom: 24px;
      }
    }

    &--second{
      width: 48%;
    }
  }
  &__form{
    border-radius: 4px;
    border: 1px solid #E2E6ED;
    padding: 28px 30px 40px 24px;
    width: 507px;

    &__buttons{
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }
    &__step{
      &__title{
        font-size: $unnnic-font-size-title-sm;
        color: $unnnic-color-neutral-darkest;
        margin-bottom: 4px;
        font-weight: $unnnic-font-weight-bold;
        font-family: $unnnic-font-family-primary;
      }
      &__text{
        font-family: $unnnic-font-family-secondary;
        color: $unnnic-color-neutral-dark;
        margin-bottom: 25px;
      }
    }
  }
}

.description{
  font-family: $unnnic-font-family-secondary;
  font-size: $unnnic-font-size-body-gt;
  color: $unnnic-color-neutral-dark;
  margin-bottom: 24px;

  &--darkest{
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    color: $unnnic-color-neutral-darkest;
    margin-bottom: 8px;
  }
}
</style>
