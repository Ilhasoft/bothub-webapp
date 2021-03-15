<template>
  <div class="unnnic-card-intelligence">
    <section class="unnnic-card-intelligence__header">
      <div class="unnnic-card-intelligence__header__detail">
        <div class="unnnic-card-intelligence__header__detail__title">
          {{repositoryDetail.name}}
        </div>
        <div class="unnnic-card-intelligence__header__detail__subtitle">
          Criada por <strong>{{repositoryDetail.owner__nickname}}</strong>
        </div>
      </div>

      <div class="unnnic-card-intelligence__header__buttons">
        <div>
            <unnnic-tag
            @click.native="repositoryDetailsRouterParams()"
              text="Abrir"
              scheme="aux-blue"
              clickable/>
        </div>

        <unnnic-icon
          icon="navigation-menu-vertical-1"
          class="unnnic-card-intelligence__header__buttons__icon"
          size="sm"/>
      </div>
    </section>

    <section class="unnnic-card-intelligence__description">
      Inteligência criada especialmente para utilização
      em chats de suporte ao cliente.
    </section>

    <section class="unnnic-card-intelligence__type">
      <div class="unnnic-card-intelligence__type__text">
          inteligência de Classificação
      </div>
      <unnnic-icon icon="information-circle-4"
        class="unnnic-card-intelligence__type__icon"
        size="sm"/>
    </section>

    <div class="unnnic-card-intelligence__divider"/>

    <section class="unnnic-card-intelligence__detail">
      <div class="unnnic-card-intelligence__detail__content">
        <div class="unnnic-card-intelligence__detail__content__data">
            Intenção
        </div>
        <div class="unnnic-card-intelligence__detail__content__data__info">
          <unnnic-icon
            icon="graph-stats-1"
            class="unnnic-card-intelligence__detail__content__data__info__icon"
            size="sm"
            scheme="aux-purple"
            hasBackground/>

          <div class="unnnic-card-intelligence__detail__content__data__info__number">
            12
          </div>
        </div>
      </div>

      <div class="unnnic-card-intelligence__detail__content">
        <div class="unnnic-card-intelligence__detail__content__data">
            Entidade
        </div>
        <div class="unnnic-card-intelligence__detail__content__data__info">
                                    <unnnic-icon              icon="translate-1"
              class="unnnic-card-intelligence__detail__content__data__info__icon"
              size="sm"
              scheme="aux-purple"
              hasBackground/>

            <div class="unnnic-card-intelligence__detail__content__data__info__number">
              10
            </div>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
export default {
  name: 'HomeRepositoryCard',
  props: {
    repositoryDetail: {
      type: [Object, Array],
      default: null,
    },
  },
  methods: {
    repositoryDetailsRouterParams() {
      this.$router.push({
        name: 'repository-summary',
        params: {
          ownerNickname: this.repositoryDetail.owner__nickname,
          slug: this.repositoryDetail.slug,
        },
      });
    },
  }
};
</script>

<style lang="scss">
@import '~unnic-system-beta/dist/unnnic.css';
@import '~unnic-system-beta/src/assets/scss/unnnic.scss';

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
        margin-right: $unnnic-inline-nano
      }

      &__icon {
        color: $unnnic-color-neutral-cleanest;
      }
    }
  }

  &__description {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    color: $unnnic-color-neutral-cloudy;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
    padding: $unnnic-spacing-stack-sm 0;
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
