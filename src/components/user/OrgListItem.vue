<template>
  <div
    class="org-card"
    @click="goToOrg">
    <div class="org-card__append">
      <div class="org-card__align-items">
        <div class="org-card__details">
          <div class="org-card__title">
            <span class="text-color-fake-black">{{ name }}</span>
          </div>
          <div class="org-card__info-item">
            <span>{{ $t('webapp.layout.created_by') }}</span>
            <strong class="medium text-color-primary">{{ owner.nickname }}</strong>
          </div>
          <div class="org-card__attrs">
            <p class="org-card__attrs__line"> <b-icon
              size="is-medium"
              class="org-card__icon"
              icon="brain"/> {{ $tc('webapp.orgs.repositories', repository_count) }} </p>
            <p class="org-card__attrs__line"> <b-icon
              size="is-medium"
              class="org-card__icon"
              icon="account-multiple"/> {{ $tc('webapp.orgs.members', member_count) }} </p>
          </div>
          <div class="org-card__time">
            <p> {{ $t('webapp.orgs.created') }} {{ created_at | moment('from') }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OrgListItem',
  props: {
    name: {
      type: String,
      default: null,
    },
    owner: {
      type: Object,
      default: () => ({}),
    },
    member_count: {
      type: Number,
      default: 0,
    },
    repository_count: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: String,
      default: null,
    },
    nickname: {
      type: String,
      default: '',
    },
  },
  methods: {
    goToOrg() {
      this.$router.push({
        name: 'org',
        params: { org_nickname: this.nickname },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/colors.scss';


.org-card {
  $org-card-margin: 1rem;
  cursor: pointer;

  margin: $org-card-margin 0 $org-card-margin 2*$org-card-margin;
  padding: 1rem 0;
  width: calc(100% * 1/3 - 2rem);
  word-break: break-all;

  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  border: 1px solid $color-grey;
  border-radius: $radius-normal;
  border: 1px solid transparent;
  box-shadow: 0rem 0rem .5rem .2rem rgba(0, 0, 0, 0.1);
  flex-grow: 0;

  @media screen and (max-width: $mobile-width) {
    width: calc(100% * 1/2 - 1rem);
    margin: $org-card-margin 0 $org-card-margin 0.5*$org-card-margin;
  }

  @media screen and (max-width: $small-mobile-width) {
    width: calc(100% - 1rem);
    margin: 1rem auto;
  }

  &__append {
    flex-grow: 0;
  }

  &__align-items {
    align-items: center;
    display: flex;
    padding: 0.25rem;
    flex-direction: column;
  }

  &__details {
    text-align: center;
    padding: 0.5rem;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: $font-weight-bolder;
    margin-bottom: .5rem;
  }

  &__info-item {
    color: $color-grey-darker;
  }

  &__attrs {
    margin: 3.75rem 0;
    color: $color-grey-darker;
    text-align: left;

    &__line {
      display: flex;
      align-items: center;
      > * {
        margin-right: 0.5rem;
      }
    }
  }

  &__time {
    font-size: 0.875rem;
    color: $color-grey-darker;
  }

  &__icon {
    color: $color-primary-dark;
  }

  &__flags {
    display: flex;
    flex-wrap: wrap;
    margin: .5rem -.25rem;
    justify-content: center;
    align-items: center;

    &__flag {
      margin: .25rem;
      order: 0;

      &--main {
        order: -1;
      }
    }
  }
}
</style>
