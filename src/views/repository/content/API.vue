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
                BLIU
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
    }
  },

  computed: {
    authorization() {
      return this.repository?.authorization?.organizations?.[0]?.uuid;
    },
  },
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
