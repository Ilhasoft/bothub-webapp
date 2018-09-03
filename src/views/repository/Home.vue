<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="repository-home">
      <div class="repository-home__permissions">
        <img
          src="@/assets/imgs/mascot.svg"
          alt="mascot"
          class="repository-home__permissions__mascot">
        <div class="repository-home__permissions__message">
          <p>You can’t contribute</p>
          <p>and you can’t write.</p>
        </div>
      </div>
      <div class="repository-home__info">
        <div class="repository-home__info__header">
          <span>
            <bh-icon value="flag-variant" />
            {{ repository.available_languages.length }} language
          </span>
          <span>
            <bh-icon value="botinho" />
            {{ repository.examples__count }} Examples, created a
            {{ repository.created_at | moment('from') }}
          </span>
        </div>
        <div class="repository-home__info__description">
          <p v-if="repository.description">{{ repository.description }}</p>
          <p v-else>There is no description for this repository</p>
        </div>
        <h1 class="bh-title-1">Can identify</h1>
        <div class="bh-grid">
          <div class="repository-home__info__attribute bh-grid__item">
            <h1 class="bh-title-2">Intenties</h1>
            <div class="repository-home__info__attribute__card">
              <bh-badge
                v-for="(intent, index) in repository.intents"
                :key="index"
                size="small"
                color="grey"
                class="repository-home__info__attribute__card__badge">
                <span v-if="intent">{{ intent.value }}</span>
              </bh-badge>
            </div>
          </div>
          <div class="repository-home__info__attribute bh-grid__item">
            <h1 class="bh-title-2">Categories</h1>
            <div class="repository-home__info__attribute__card">
              <bh-badge
                v-for="(category, index) in repository.categories_list"
                :key="index"
                size="small"
                color="grey"
                class="repository-home__info__attribute__card__badge">
                <span>{{ category }}</span>
              </bh-badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';


const components = {
  RepositoryViewBase,
};

export default {
  name: 'RepositoryHome',
  components,
  extends: RepositoryBase,
};
</script>

<style lang="scss">
@import '~bh/assets/scss/colors.scss';
@import '~bh/assets/scss/variables.scss';


.repository-home {
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.16);

  &__permissions {
    background-color: $color-lighter-grey;
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &__mascot {
      width: 4rem;
      height: 4rem;
    }

    &__message {
      margin-left: 1rem;
    }
  }

  &__info {
    padding: 3rem;

    &__header {
      margin-bottom: 4rem;
      color: $color-grey;

      > span {
        margin-right: 4rem;
      }
    }

    &__description {
      margin-bottom: 4rem;
      color: $color-grey;
    }

    &__attribute {
      flex-basis: 50%;

      &__card {
        background-color: $color-lighter-grey;
        border-radius: 6px;
        padding: .75rem;
        margin: -.25rem;

        &__badge {
          margin: .25rem;

          > span {
            color: $color-primary-inverted
          }
        }
      }
    }
  }
}

</style>
