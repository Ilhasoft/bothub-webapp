<template>
  <div class="unnnic-card-intelligence">
    <section class="unnnic-card-intelligence__header">
      <div class="unnnic-card-intelligence__header__detail">
        <div class="unnnic-card-intelligence__header__detail__title">
          {{ repositoryDetail.name }}
        </div>

        <div class="unnnic-card-intelligence__header__detail__subtitle">
          {{ $t("webapp.intelligences_lib.created_by") }}
          <strong>{{ repositoryDetail.owner__nickname }}</strong>
        </div>
      </div>

      <div class="unnnic-card-intelligence__header__buttons">
        <div>
          <unnnic-tag
            @click.native="repositoryDetailsRouterParams()"
            :text="$t('webapp.intelligences_lib.open')"
            scheme="aux-blue"
            class="unnnic-card-intelligence__header__buttons__tag"
            clickable
          />
        </div>

        <unnnic-dropdown position="bottom-left" :open.sync="dropdownOpen">
          <div slot="trigger">
            <unnnic-icon
              icon="navigation-menu-vertical-1"
              class="unnnic-card-intelligence__header__buttons__icon"
              size="sm"
              slot="trigger"
              clickable
            />
          </div>

          <unnnic-dropdown-item @click="showDetailModal(intentModal)">
            <div class="unnnic-card-intelligence__header__buttons__dropdown">
              <unnnic-icon size="sm" icon="graph-stats-1" />
              <div>
                {{
                  $tc("webapp.intelligences_lib.show_intents", this.repositoryDetail.intents.length)
                }}
              </div>
            </div>
          </unnnic-dropdown-item>

          <unnnic-dropdown-item @click="showDetailModal(laguagueModal)">
            <div class="unnnic-card-intelligence__header__buttons__dropdown">
              <unnnic-icon size="sm" icon="translate-1" />
              <div>
                {{
                  $tc(
                    "webapp.intelligences_lib.show_languages",
                    this.repositoryDetail.available_languages.length
                  )
                }}
              </div>
            </div>
          </unnnic-dropdown-item>

          <unnnic-dropdown-item @click="changeIntegrateModalState(true)">
            <div class="unnnic-card-intelligence__header__buttons__dropdown">
              <unnnic-icon size="sm" icon="add-1" />
              <div>
                {{ $t("webapp.home.integrate") }}
              </div>
            </div>
          </unnnic-dropdown-item>
        </unnnic-dropdown>
      </div>
    </section>

    <section class="unnnic-card-intelligence__description">
      {{ repositoryDetail.description }}
    </section>

    <section class="unnnic-card-intelligence__type">
      <div class="unnnic-card-intelligence__type__text">
        {{ $t("webapp.intelligences_lib.classification_intelligence") }}
      </div>
      <unnnic-tool-tip
        :text="$t('webapp.intelligences_lib.intelligence_tooltip')"
        enabled
        side="bottom"
        max-width="17rem"
      >
        <unnnic-icon
          icon="information-circle-4"
          class="unnnic-card-intelligence__type__icon"
          size="sm"
        />
      </unnnic-tool-tip>
    </section>

    <div class="unnnic-card-intelligence__divider" />

    <section class="unnnic-card-intelligence__detail">
      <div class="unnnic-card-intelligence__detail__content">
        <div class="unnnic-card-intelligence__detail__content__data">
          {{ $tc("webapp.intelligences_lib.intent", this.repositoryDetail.intents.length) }}
        </div>
        <div class="unnnic-card-intelligence__detail__content__data__info">
          <unnnic-icon
            icon="typing-1"
            class="unnnic-card-intelligence__detail__content__data__info__icon"
            size="sm"
            scheme="aux-pink"
            hasBackground
          />

          <div class="unnnic-card-intelligence__detail__content__data__info__number">
            {{ repositoryDetail.intents.length }}
          </div>
        </div>
      </div>

      <div class="unnnic-card-intelligence__detail__content">
        <div class="unnnic-card-intelligence__detail__content__data">
          {{
            $tc(
              "webapp.intelligences_lib.language",
              this.repositoryDetail.available_languages.length
            )
          }}
        </div>
        <div class="unnnic-card-intelligence__detail__content__data__info">
          <unnnic-icon
            icon="translate-1"
            class="unnnic-card-intelligence__detail__content__data__info__icon"
            size="sm"
            scheme="aux-purple"
            hasBackground
          />

          <div class="unnnic-card-intelligence__detail__content__data__info__number">
            {{ repositoryDetail.available_languages.length }}
          </div>
        </div>
      </div>
    </section>
    <unnnic-modal
        :showModal="integrateModal"
        :text="$t('webapp.home.integrate_modal_title', {
          intelligence: repositoryDetail.name,
          project: 'projectName'
          })"
        scheme="feedback-yellow"
        modal-icon="alert-circle-1"
        @close="changeIntegrateModalState(false)"
      >
        <span slot="message" v-html="$t('webapp.home.integrate_modal_subtitle')" />
        <unnnic-button slot="options" type="terciary" @click="changeIntegrateModalState(false)">
          {{ $t("webapp.home.cancel") }}
        </unnnic-button>
        <unnnic-button
          slot="options"
          class="create-repository__container__button"
          type="terciary"
          @click="changeIntegrateModalState(false)"
        >
          {{ $t("webapp.home.confirm_integrate") }}
        </unnnic-button>
      </unnnic-modal>
  </div>
</template>

<script>
export default {
  name: 'HomeRepositoryCard',
  data() {
    return {
      dropdownOpen: false,
      integrateModal: false
    };
  },
  props: {
    repositoryDetail: {
      type: [Object, Array],
      default: null
    }
  },
  computed: {
    intentModal() {
      return {
        title: this.$tc('webapp.intelligences_lib.intent_modal_title', 1, {
          nick: this.repositoryDetail.name
        }),
        subtitle: this.$tc('webapp.intelligences_lib.intent_modal_subtitle', 10),
        type: 0,
        intents: this.repositoryDetail.intents,
        ownerNickname: this.repositoryDetail.owner__nickname,
        slug: this.repositoryDetail.slug
      };
    },
    laguagueModal() {
      return {
        title: this.$tc('webapp.intelligences_lib.language_modal_title', 1, {
          nick: this.repositoryDetail.name
        }),
        subtitle: this.$t('webapp.intelligences_lib.language_modal_subtitle', 10),
        type: 1,
        languages: this.repositoryDetail.available_languages
      };
    }
  },
  methods: {
    showDetailModal(value) {
      this.$emit('dispatchShowModal', value);
    },
    changeIntegrateModalState(value){
      this.integrateModal = value
    },
    repositoryDetailsRouterParams() {
      this.$router.push({
        name: 'repository-summary',
        params: {
          ownerNickname: this.repositoryDetail.owner__nickname,
          slug: this.repositoryDetail.slug
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.unnnic-card-intelligence {
  display: flex;
  flex-direction: column;
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-inset-md;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  margin-bottom: $unnnic-inline-sm;

  &__clickable {
    cursor: pointer;
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;

    &__detail {
      &__title {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-bold;
        font-size: $unnnic-font-size-body-lg;
        line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
        color: $unnnic-color-neutral-darkest;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        max-width: 13rem;
      }

      &__subtitle {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-md;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
        color: $unnnic-color-neutral-cloudy;

        strong {
          color: $unnnic-color-brand-weni;
        }
      }
    }

    &__buttons {
      display: flex;
      align-items: center;

      &__tag {
        margin-left: $unnnic-inline-xs;
        margin-right: $unnnic-inline-nano;
      }

      &__icon {
        color: $unnnic-color-neutral-cleanest;
      }

      &__dropdown {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        div {
          display: flex;
          flex-wrap: nowrap;
          padding-left: $unnnic-inset-xs;
          min-width: 7.6rem;
        }
      }
    }
  }

  &__description {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    color: $unnnic-color-neutral-cloudy;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
    margin: $unnnic-spacing-stack-sm 0;
    min-height: 3.125rem;
    padding-top: $unnnic-inline-xs;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__type {
    display: flex;
    align-items: center;
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-bold;
    font-size: $unnnic-font-size-body-md;
    color: $unnnic-color-neutral-cloudy;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;

    &__text {
      margin-right: $unnnic-inline-xs;
    }

    &__icon {
      color: $unnnic-color-neutral-soft;
    }
  }

  &__divider {
    border-bottom: $unnnic-border-width-thinner solid $unnnic-color-neutral-lightest;
    margin: $unnnic-spacing-stack-xs 0;
  }

  &__detail {
    display: flex;
    align-items: center;

    &__content {
      width: 50%;

      &__data {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-gt;
        color: $unnnic-color-neutral-dark;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
        padding-right: $unnnic-inline-xs;
        padding-bottom: $unnnic-spacing-stack-nano;

        &__info {
          display: flex;
          align-items: center;

          &__icon {
            margin-right: $unnnic-inline-xs;
          }

          &__number {
            font-family: $unnnic-font-family-secondary;
            font-weight: $unnnic-font-weight-black;
            font-size: $unnnic-font-size-body-gt;
            line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
            color: $unnnic-color-neutral-darkest;
            padding-right: $unnnic-inline-xs;
          }
        }
      }
    }
  }
}
</style>
