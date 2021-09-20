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
                <div slot="header"
                v-for="base in bases"
                :key="base.id"
                ></div>
                <option>
                {{ bases.title }}
                </option>
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
                {{ $t("webapp.home.bases.api_tabs_subtitle") }}
              </p>
              <div class="repository-api__box">
                <div class="repository-api__box__one">
                  <div  class="repository-api__box__one--first">
                    <p class="repository-api__box__one__text">URL</p>
                    <div class="repository-api__info">
                      <p class="repository-api__info__text" ref="copyText">
                        {{ `${repository.nlp_server}v2/parse/` }}
                      </p>
                        <unnnic-tool-tip text="Copiar" enabled side="top" maxWidth="15rem">
                          <unnnic-button
                            size="large"
                            text=""
                            type="secondary"
                            iconLeft="copy-paste-1"
                            @click.native="copyURL"
                          />
                        </unnnic-tool-tip>
                    </div>
                    <p class="repository-api__box__one__text">Access Token</p>
                    <div class="repository-api__info">
                      <p class="repository-api__info__text">
                        {{ authorization }}
                      </p>
                      <unnnic-button
                        size="large"
                        text=""
                        type="secondary"
                        iconLeft="copy-paste-1"
                      />
                    </div>
                    <p class="repository-api__box__one__text">
                      {{ $t("webapp.home.bases.api_tabs_intelligence_id") }}
                    </p>
                    <div class="repository-api__info">
                      <p class="repository-api__info__text">
                        {{ repository.repository_version_id }}
                      </p>
                      <unnnic-button
                        size="large"
                        text=""
                        type="secondary"
                        iconLeft="copy-paste-1"
                      />
                    </div>
                    <p class="description">
                    {{ $t("webapp.home.bases.api_guide") }}
                    </p>
                  </div>
                  <div class="repository-api__box__one--first">
                    <p class="repository-api__box__one__text">
                      POST {{ $t("webapp.home.bases.api_body") }}
                    </p>
                    <div class="repository-api__info">
                      {
                      <br><br>
                      "language":"{{ $t("webapp.home.bases.api_tabs_post_lang") }}"
                      <br><br>
                        "text": "{{
                        $t("webapp.home.bases.api_tabs_post_text")}}"
                      <br><br>
                      }
                    </div>
                  </div>
                </div>
                <div class="repository-api__box__two">
                  <div lass="repository-api__box__one--first">
                    <p class="description--darkest">
                      {{ $t("webapp.home.bases.api_integrate") }}
                    </p>
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
                              {{ $t("webapp.home.bases.api_integrate_step_one") }}
                            </p>
                            <p class="repository-api__form__step__text">
                              {{ $t("webapp.home.bases.api_integrate_step_one_text") }}
                            </p>
                          </div>
                        <img src="@/assets/imgs/step-one.png" alt="">
                        </div> <!--passo 1 -->
                        <div v-else-if="step===2" class="repository-api__form__step">
                          <div>
                            <p class="repository-api__form__step__title">
                              {{ $t("webapp.home.bases.api_integrate_step_two") }}
                            </p>
                            <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_two_text") }}
                            </p>
                            </div>
                          <img src="@/assets/imgs/step-two.png" alt="">
                        </div> <!--passo 2 -->
                        <div v-else-if="step===3" class="repository-api__form__step">
                          <div>
                            <p class="repository-api__form__step__title">
                              {{ $t("webapp.home.bases.api_integrate_step_three") }}
                            </p>
                            <p class="repository-api__form__step__text">
                              {{ $t("webapp.home.bases.api_integrate_step_three_text") }}
                            </p>
                            </div>
                          <img src="@/assets/imgs/step-three.png" alt="">
                        </div> <!--passo 3 -->
                        <div v-else-if="step===4" class="repository-api__form__step">
                          <div>
                            <p class="repository-api__form__step__title">
                              {{ $t("webapp.home.bases.api_integrate_step_four") }}
                            </p>
                            <p class="repository-api__form__step__text">
                              {{ $t("webapp.home.bases.api_integrate_step_four_text") }}
                            </p>
                            </div>
                          <img src="@/assets/imgs/step-four.png" alt="">
                        </div> <!--passo 4 -->
                        <div v-else class="repository-api__form__step">
                          <div>
                            <p class="repository-api__form__step__title">
                              {{ $t("webapp.home.bases.api_integrate_step_final") }}
                            </p>
                            <p class="repository-api__form__step__text">
                              {{ $t("webapp.home.bases.api_integrate_step_final_text") }}
                            </p>
                            </div>
                          <img src="@/assets/imgs/step-four.png" alt="">
                        </div> <!--passo 5 -->
                      </form>
                    </section>
                  </div>
                  <div class="repository-api__box__one--first">
                    <p class="repository-api__box__one__text">
                      {{ $t("webapp.home.bases.api_response") }}
                    </p>
                    <div class="repository-api__info">
                      {
                        <br><br>
                          {
                            <br><br>
                            "intent": {<br>
                              "name": "love",<br>
                              "confidence": 0.6943462393863934<br>
                            },
                            <br><br>
                            "intent_ranking": [<br>
                              {<br>
                                "name": "love",<br>
                                "confidence": 0.6943462393863934<br>
                              },<br>
                              {<br>
                                "name": "hate",<br>
                                "confidence": 0.30565376061360666<br>
                              }<br>
                            ],<br>
                        }
                    </div>
                  </div>
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
import { mapActions } from 'vuex';


export default {
  name: 'RepositoryContentAPI',
  components: {
    RepositoryViewBase,
    HighlightedCode,
  },
  extends: RepositoryBase,
  data(){
    return {
      step: 1,
      bases: [],
    }
  },
  watch: {
    // eslint-disable-next-line
    'repository.uuid'() {
      if (!this.repository.uuid || this.repository.uuid === 'null') {
        return false;
      }

      this.repositoryUUID = this.repository.uuid;
    },

    async repositoryUUID() {
      const response = await this.getQAKnowledgeBases({
        repositoryUUID: this.repositoryUUID,
        page: 0,
      });

      response.data.results.forEach(({ id, title }) => {
        this.bases.push({
          id,
          name: title,
        });
      });
    },
  },
  computed: {
    authorization() {
      return this.repository?.authorization?.organizations?.[0]?.uuid;
    },
  },
  methods: {
    ...mapActions([
      'getQAKnowledgeBases'
    ]),
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    copyURL() {
      const url = this.$refs.copyText;
      url.innerHTML = window.location.href;
      url.select();
      document.execCommand('copy');
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

    &__one{
      display: flex;
      justify-content: space-between;
      &--first{
        width: 48%;
      }
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

    &__two{
      display: flex;
      justify-content: space-between;
    }
  }
  &__info{
    border: 1px solid #E2E6ED;
    border-radius: $unnnic-border-radius-sm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1.5rem;

    &__text{
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-gt;
      color: $unnnic-color-neutral-dark;
    }
  }
  &__form{
    border-radius: 4px;
    border: 1px solid #E2E6ED;
    padding: 28px 30px 40px 24px;
    width: 100%;

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
