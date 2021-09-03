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
          <unnnic-tab
            initialTab="first"
            :tabs='[$t("webapp.home.bases.api_tabs")]'
          >
            <template slot="tab-head-first">
              <div>OI</div>
            </template>
            <template slot="tab-panel-first">
              <h2 class="title">First Content</h2>
              <p class="description">
                First description
              </p>
              <p><strong>URL:</strong></p>
              <Card
                type="default"
                title = exApiResponse
                description="This is the description"
                enabled
                infoPosition="right"
                hasInformationIcon
                scheme="aux-blue"
              />
              <highlighted-code code-class="">
              </highlighted-code>
              <p><strong>URL:</strong></p>
              <highlighted-code code-class=""
              >{
                "language":"{{ $t("webapp.home.bases.api_tabs_post_lang") }}"
                "text": "{{
                $t("webapp.home.bases.api_tabs_post_text")
              }}"
              }
            </highlighted-code>
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

    &__inputs{
    display: flex;
    }
    &__input{
      &:first-child{
      margin-right: 1rem;
      }
    }
    &__text{
      margin-bottom: 1rem;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
    }
  }
  &__tabs{
    margin-top: 24px;
  }
}
</style>
