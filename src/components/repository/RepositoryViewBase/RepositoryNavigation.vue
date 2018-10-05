<template>
  <div class="repository-nav">
    <div class="repository-nav__desktop">
      <router-link
        v-for="([name, label], i) in links"
        :key="i"
        :to="toFactory(name)">{{ label }}</router-link>
    </div>
    <div class="repository-nav__mobile">
      <bh-dropdown position="left">
        <bh-icon
          slot="trigger"
          value="dots-vertical"
          class="clickable text-color-primary"
          size="normal" />
        <bh-dropdown-item
          v-for="([name, label], i) in links"
          :key="i"
          @click="goTo(name)">{{ label }}</bh-dropdown-item>
      </bh-dropdown>
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
        ['repository-home', 'Status'],
        ['repository-trainings', 'Trainings'],
        ['repository-translate', 'Translate'],
        ['repository-translations', 'Translated Sentences'],
        ['repository-analyze-text', 'Analyze Text'],
        ['repository-settings', 'Settings'],
      ],
    };
  },
  methods: {
    toFactory(name) {
      return {
        name,
        params: {
          ownerNickname: this.repository.owner__nickname,
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
  &__desktop {
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid $color-primary;

    a {
      position: relative;
      display: inline-flex;
      padding: 0 1.5rem 1.25rem;
      color: $color-grey;
      font-weight: $font-weight-medium;
      text-align: center;

      &:hover,
      &.router-link-exact-active {
        color: $color-bolder-grey;

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

  &__mobile {
    display: none;

    @media screen and (max-width: $mobile-width) {
      display: block;
    }
  }
}
</style>
