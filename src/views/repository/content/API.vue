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
        <p
          class="repository-api__header__subtitle"
          v-html="$t('webapp.home.bases.api_subtitle')"
        ></p>
        <hr />
      </section>
      <section class="repository-api__select">
        <p class="repository-api__select__text">
          {{ $t("webapp.home.bases.api_select") }}
        </p>
        <div class="repository-api__select__inputs">
          <div class="repository-api__select__input">
            <unnnicSelect v-if="bases.length" size="sm" placeholder="" v-model="baseIdLang">
              <option
                v-for="base in bases"
                :value="[base.knowledge_base, base.language]"
                :key="base.knowledge_base"
                size="sm"
              >
                {{ base.title }}
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
                <div class="repository-api__box__content">
                  <p class="repository-api__box__text">URL</p>
                  <div class="repository-api__info">
                    <div
                      class="repository-api__info__text"
                      ref="copyTextURL"
                      contenteditable="true"
                    >
                      {{ `${repository.nlp_server}v2/question-answering/` }}
                    </div>
                    <unnnic-tool-tip
                      @mouseout.native="copyLabel = 'Copiar'"
                      :text="copyLabel"
                      enabled
                      side="top"
                      maxWidth="15rem"
                    >
                      <unnnic-button
                        size="large"
                        type="secondary"
                        iconLeft="copy-paste-1"
                        @click.native="copyURL('copyTextURL')"
                      />
                    </unnnic-tool-tip>
                  </div>
                  <div class="repository-api__box__text">
                    Access Token
                  </div>
                  <div class="repository-api__info">
                    <p class="repository-api__info__text" ref="copyTextAuth" contenteditable="true">
                      Bearer {{ authorization }}
                    </p>
                    <unnnic-tool-tip
                      @mouseout.native="copyLabel = 'Copiar'"
                      :text="copyLabel"
                      enabled
                      side="top"
                      maxWidth="15rem"
                    >
                      <unnnic-button
                        size="large"
                        type="secondary"
                        iconLeft="copy-paste-1"
                        @click.native="copyURL('copyTextAuth')"
                      />
                    </unnnic-tool-tip>
                  </div>
                  <p class="repository-api__box__text">
                    {{ $t("webapp.home.bases.api_tabs_intelligence_id") }}
                  </p>
                  <p class="description">
                    {{ $t("webapp.home.bases.api_guide") }}
                  </p>
                </div>
                <div class="repository-api__box__content">
                  <p class="repository-api__box__text">
                    POST {{ $t("webapp.home.bases.api_body") }}
                  </p>
                  <div class="repository-api__info__json">
                    <pre ref="copyTextPost" contenteditable="true">{{
                      JSON.stringify(
                        {
                          language: idLang[1],
                          question: $t("webapp.home.bases.api_tabs_post_text"),
                          knowledge_base_id: idLang[0]
                        },
                        null,
                        "\t"
                      )
                    }}</pre>
                    <unnnic-tool-tip
                      @mouseout.native="copyLabel = 'Copiar'"
                      :text="copyLabel"
                      enabled
                      side="top"
                      maxWidth="15rem"
                    >
                      <unnnic-button
                        size="large"
                        text=""
                        type="secondary"
                        iconLeft="copy-paste-1"
                        @click.native="copyURL('copyTextPost')"
                      />
                    </unnnic-tool-tip>
                  </div>
                </div>
              </div>
              <div class="repository-api__box__two">
                <div class="repository-api__box__content">
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
                        :disabled="disabledPrevious"
                      >
                      </unnnic-button>
                      <unnnic-button
                        @click.prevent="next()"
                        size="large"
                        text=""
                        type="terciary"
                        iconLeft="arrow-right-1-1"
                        :disabled="disabledNext"
                      >
                      </unnnic-button>
                    </div>
                    <form v-if="myProfile.language === 'pt-br'">
                      <div v-if="step === 1" class="repository-api__form__step">
                        <div>
                          <p class="repository-api__form__step__title">
                            {{ $t("webapp.home.bases.api_integrate_step_one") }}
                          </p>
                          <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_one_text") }}
                          </p>
                        </div>
                        <img src="@/assets/imgs/step-one.png" alt="" />
                      </div>
                      <!--passo 1 -->
                      <div v-else-if="step === 2" class="repository-api__form__step">
                        <div>
                          <p class="repository-api__form__step__title">
                            {{ $t("webapp.home.bases.api_integrate_step_two") }}
                          </p>
                          <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_two_text") }}
                          </p>
                        </div>
                        <img src="@/assets/imgs/step-two.png" alt="" />
                      </div>
                      <!--passo 2 -->
                      <div v-else-if="step === 3" class="repository-api__form__step">
                        <div>
                          <p class="repository-api__form__step__title">
                            {{ $t("webapp.home.bases.api_integrate_step_three") }}
                          </p>
                          <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_three_text") }}
                          </p>
                        </div>
                        <img src="@/assets/imgs/step-three.png" alt="" />
                      </div>
                      <!--passo 3 -->
                      <div v-else-if="step === 4" class="repository-api__form__step">
                        <div>
                          <p class="repository-api__form__step__title">
                            {{ $t("webapp.home.bases.api_integrate_step_four") }}
                          </p>
                          <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_four_text") }}
                          </p>
                        </div>
                        <img src="@/assets/imgs/step-four.png" alt="" />
                      </div>
                      <!--passo 4 -->
                      <div v-else class="repository-api__form__step">
                        <div>
                          <p class="repository-api__form__step__title">
                            {{ $t("webapp.home.bases.api_integrate_step_final") }}
                          </p>
                          <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_final_text") }}
                          </p>
                        </div>
                        <unnnicButton
                          size="large"
                          :text="$t('webapp.home.bases.api_integrate_step_final_text_button')"
                          type="secondary"
                          iconLeft="paginate-filter-text-1"
                          :disabled="false"
                        />
                      </div>
                      <!--passo 5 -->
                    </form>
                    <form v-else>
                      <div v-if="step === 1" class="repository-api__form__step">
                        <div>
                          <p class="repository-api__form__step__title">
                            {{ $t("webapp.home.bases.api_integrate_step_one") }}
                          </p>
                          <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_one_text") }}
                          </p>
                        </div>
                        <img src="@/assets/imgs/step-one-en.png" alt="" />
                      </div>
                      <!--passo 1 -->
                      <div v-else-if="step === 2" class="repository-api__form__step">
                        <div>
                          <p class="repository-api__form__step__title">
                            {{ $t("webapp.home.bases.api_integrate_step_two") }}
                          </p>
                          <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_two_text") }}
                          </p>
                        </div>
                        <img src="@/assets/imgs/step-two-en.png" alt="" />
                      </div>
                      <!--passo 2 -->
                      <div v-else-if="step === 3" class="repository-api__form__step">
                        <div>
                          <p class="repository-api__form__step__title">
                            {{ $t("webapp.home.bases.api_integrate_step_three") }}
                          </p>
                          <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_three_text") }}
                          </p>
                        </div>
                        <img src="@/assets/imgs/step-three-en.png" alt="" />
                      </div>
                      <!--passo 3 -->
                      <div v-else-if="step === 4" class="repository-api__form__step">
                        <div>
                          <p class="repository-api__form__step__title">
                            {{ $t("webapp.home.bases.api_integrate_step_four") }}
                          </p>
                          <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_four_text") }}
                          </p>
                        </div>
                        <img src="@/assets/imgs/step-four-en.png" alt="" />
                      </div>
                      <!--passo 4 -->
                      <div v-else class="repository-api__form__step">
                        <div>
                          <p class="repository-api__form__step__title">
                            {{ $t("webapp.home.bases.api_integrate_step_final") }}
                          </p>
                          <p class="repository-api__form__step__text">
                            {{ $t("webapp.home.bases.api_integrate_step_final_text") }}
                          </p>
                        </div>
                        <unnnicButton
                          size="large"
                          :text="$t('webapp.home.bases.api_integrate_step_final_text_button')"
                          type="secondary"
                          iconLeft="paginate-filter-text-1"
                          :disabled="false"
                        />
                      </div>
                      <!--passo 5 -->
                    </form>
                  </section>
                </div>
                <div class="repository-api__box__content">
                  <p class="repository-api__box__text">
                    {{ $t("webapp.home.bases.api_response") }}
                  </p>
                  <div class="repository-api__info__json lg">
                    <pre>{{ JSON.stringify(json, null, "\t") }}</pre>
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
import RepositoryBase from '../Base';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RepositoryContentAPI',
  components: {
    RepositoryViewBase
  },
  extends: RepositoryBase,
  data() {
    return {
      step: 1,
      bases: [],
      repositoryUUID: null,
      selectedBase: null,
      json: {
        answers: [
          {
            text: 'kind',
            confidence: '0.47146460'
          },
          {
            text: 'not pompous',
            confidence: '0.27500286'
          },
          {
            text: 'kind. It is not jealous, love is not pompous',
            confidence: '0.22532927'
          }
        ],
        id: '0'
      },
      copyLabel: 'Copiar',
      baseIdLang: ''
    };
  },
  watch: {
    // eslint-disable-next-line
    "repository.uuid"() {
      if (!this.repository.uuid || this.repository.uuid === 'null') {
        return false;
      }

      this.repositoryUUID = this.repository.uuid;
    },

    async repositoryUUID() {
      const response = await this.getQATexts({
        repositoryUUID: this.repositoryUUID,
        knowledgeBaseId: this.$route.params.id,
        page: 0
      });

      this.baseIdLang = `${String(response.data.results?.[0]?.knowledge_base)},${String(
        response.data.results?.[0]?.language
      )}`;

      response.data.results.forEach(({ knowledge_base, title, language }) => {
        this.bases.push({
          knowledge_base,
          title,
          language
        });
      });
    }
  },
  computed: {
    ...mapGetters(['myProfile', 'authToken']),

    authorization() {
      return this.repository?.authorization?.uuid;
    },

    disabledPrevious() {
      return this.step === 1;
    },

    disabledNext() {
      return this.step === 5;
    },
    idLang() {
      const infos = this.baseIdLang;
      return infos.split(',');
    }
  },
  methods: {
    ...mapActions(['getQATexts']),
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    copyURL(refButton) {
      const range = document.createRange();
      range.selectNode(this.$refs[refButton]);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();

      this.copyLabel = 'Copiado!';
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.repository-api {
  &__header {
    &__title {
      font-size: $unnnic-font-size-body-lg;
      font-weight: $unnnic-font-weight-regular;
      font-family: $unnnic-font-family-primary;
      color: $unnnic-color-neutral-darkest;
    }
    &__subtitle {
      margin-top: $unnnic-inset-nano;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
      color: $unnnic-color-neutral-dark;
    }
  }
  &__select {
    display: flex;
    align-items: center;

    &__text {
      margin-right: $unnnic-inset-sm;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
    }
  }
  &__tabs {
    margin-top: $unnnic-inset-md;
  }
  &__box {
    &__content {
      width: 48%;
      display: flex;
      flex-direction: column;
    }
    &__text {
      font-family: $unnnic-font-family-secondary;
      color: $unnnic-color-neutral-darkest;
      font-size: $unnnic-font-size-body-gt;
      margin-bottom: $unnnic-inset-nano;
    }
    &__one {
      display: flex;
      justify-content: space-between;
    }

    &__two {
      display: flex;
      justify-content: space-between;
      margin-bottom: $unnnic-inset-md;
    }
  }

  &__info {
    border: 1px solid #e2e6ed;
    border-radius: $unnnic-border-radius-sm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $unnnic-inset-sm;
    margin-bottom: $unnnic-inset-md;
    height: 68px;
    outline: none;

    &__text {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-gt;
      color: $unnnic-color-neutral-dark;
      &:focus {
        outline: none;
        border: none;
      }
    }

    &__json {
      border: 1px solid #e2e6ed;
      border-radius: $unnnic-border-radius-sm;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: $unnnic-inset-sm;
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-gt;
      color: $unnnic-color-neutral-dark;
      flex: 0.622;

      pre {
        &:focus {
          outline: none;
          border: none;
        }
      }
    }
  }
  &__form {
    border-radius: $unnnic-border-radius-sm;
    border: 1px solid #e2e6ed;
    padding: 28px 30px 40px 24px;
    width: 100%;

    &__buttons {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }
    &__step {
      &__title {
        font-size: $unnnic-font-size-title-sm;
        color: $unnnic-color-neutral-darkest;
        margin-bottom: $unnnic-inline-nano;
        font-weight: $unnnic-font-weight-bold;
        font-family: $unnnic-font-family-primary;
      }
      &__text {
        font-family: $unnnic-font-family-secondary;
        color: $unnnic-color-neutral-dark;
        margin-bottom: $unnnic-inset-md;
      }
    }
  }
}

.description {
  font-family: $unnnic-font-family-secondary;
  font-size: $unnnic-font-size-body-gt;
  color: $unnnic-color-neutral-dark;
  margin-bottom: $unnnic-inset-md;

  &--darkest {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    color: $unnnic-color-neutral-darkest;
    margin-bottom: $unnnic-inset-nano;
  }
}

.lg {
  flex: 1;
}

pre {
  background-color: white;
  padding: 0;
  font-family: $unnnic-font-family-secondary;
  color: $unnnic-color-neutral-darkest;
  font-size: $unnnic-font-size-body-gt;
}

::v-deep {
  .repository-api__header__subtitle--link {
    color: $unnnic-color-neutral-dark !important ;
    text-decoration: underline;
  }
}
</style>
