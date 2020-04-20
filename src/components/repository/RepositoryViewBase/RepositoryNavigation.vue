<template>
  <div class="repository-nav">
    <div class="repository-nav__desktop">
      <router-link
        v-for="([name, label], i) in links"
        :key="i"
        :to="toFactory(name)">{{ label }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepositoryNavigation',
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      links: [
        ['repository-summary', this.$t('webapp.menu.summary')],
        ['repository-training', this.$t('webapp.menu.training')],
        ['repository-test', this.$t('webapp.menu.test')],
        ['repository-translate', this.$t('webapp.menu.translate')],
        ['repository-translations-status', this.$t('webapp.menu.translation_status')],
        ['repository-integration', this.$t('webapp.menu.integration')],
        ['repository-settings', this.$t('webapp.menu.settings')],
      ],
    };
  },
  methods: {
    toFactory(name) {
      return {
        name,
        params: {
          ownerNickname: this.repository.owner.nickname,
          slug: this.repository.slug,
        },
      };
    },
    goTo(name) {
      this.$router.push(this.toFactory(name));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';


.repository-nav {
  $navigation-height: 2.3rem;

  &__desktop {
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-bottom: 2px solid $color-primary;

    a {
      position: relative;
      display: inline-flex;
      padding: 1rem 1.5rem 1.5rem;
      color: $color-grey-dark;
      font-weight: $font-weight-medium;
      text-align: center;

      &:hover,
      &.router-link-exact-active {
        color: $color-fake-black;

        &::before {
          $size: 10rem;

          position: absolute;
          content: "";
          width: $size;
          height: $size;
          left: 50%;
          bottom: -($size - .75rem);
          transform: translateX(-50%);
          background-color: $color-primary;
          border-radius: 50%;
          animation: nav-bubble-animation .25s ease;

          @keyframes nav-bubble-animation {
            from {
              bottom: -($size);
            }
            to {
              bottom: -($size - .75rem);
            }
          }
        }
      }
    }
    @media screen and (max-width: $mobile-width) {
      display: none;
    }
  }
}
</style>
