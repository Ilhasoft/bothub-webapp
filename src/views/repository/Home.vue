<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div class="main-wrapper">
      <div class="main-wrapper__access-denied">
        <div class="main-wrapper__access-denied">
          <img
            src="@/assets/imgs/mascot.svg"
            alt=""
            class="main-wrapper__access-denied__mascot-size">
          <div class="main-wrapper__access-denied__message">
            <p>You can’t contribute</p>
            <p>and you can’t write.</p>
          </div>
        </div>
      </div>
      <div class="main-wrapper__info">
        <div class="main-wrapper__info__header">
          <span><bh-icon value="flag-variant" /> 3 languuage</span>
          <span><bh-icon value="botinho" /> 6 examples, created a day ago</span>
        </div>
        <div class="main-wrapper__info__description">
          <p>
            Sed ut perspiciatis unde omnis iste natus error
            sit voluptatem accusantium dolorelaudantium,
            totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae
            vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
            quia voluptas sit aspernatur
            aut odit aut fugit
          </p>
        </div>
        <h1 class="title is-3">Can identify</h1>
        <div class="main-wrapper__info__i-and-c-wrapper bh-grid">
          <div class="main-wrapper__info__i-and-c-wrapper bh-grid__item bh-grid__item--grow-5">
            <h1 class="title is-4">Intenties</h1>
            <div class="main-wrapper__info__i-and-c-wrapper__intenties">
              <bh-badge
                size="small"
                color="grey">
                <span>Comprar</span>
              </bh-badge>
            </div>
          </div>
          <div class="main-wrapper__info__i-and-c-wrapper bh-grid__item bh-grid__item--grow-5">
            <h1 class="title is-4">Categories</h1>
            <div class="main-wrapper__info__i-and-c-wrapper__categories">
              <bh-badge
                size="small"
                color="grey">
                <span>Vender</span>
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
@import '~bh/assets/scss/grid.scss';
@import '~bh/assets/scss/colors.scss';
@import '~bh/assets/scss/variables.scss';


.main-wrapper {
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.16);

  &__access-denied {
    background-color: $color-lighter-grey;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

     &__mascot-size {
        width: 70px;
        height: 70px;
      }

      &__message {
        margin-left: 1rem;
      }
  }

  &__info {
    padding: 3rem;
    color: $color-grey;

    &__header {
      margin-bottom: 4rem;

      > span {
        margin-right: 4rem;
      }
    }

    &__description {
      margin-bottom: 4rem;
    }

    &__i-and-c-wrapper {
      justify-content: space-between;
      margin-top: 1rem;
      color: $color-lighter-grey;

      &__intenties {
        background-color: $color-lighter-grey;
        border-radius: 6px;
        padding: 1rem;
      }

      &__categories {
        background-color: $color-lighter-grey;
        border-radius: 6px;
        padding: 1rem;
      }
    }
  }
}

</style>
