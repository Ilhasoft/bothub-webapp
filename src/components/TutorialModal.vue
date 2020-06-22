<template>
  <b-modal
    :active="open"
    :width="width"
    :can-cancel="false"
    @close="$emit('update:open', false)">
    <div class="tutorial">
      <div class="tutorial__title">
        <h1> {{ $t('webapp.tutorial.title') }} </h1>
        <p v-html="$t('webapp.tutorial.description')" />
      </div>
      <div class="tutorial__steps">
        <div
          v-for="(item, index) in computedList"
          :key="index"
          class="tutorial__item__wrapper">

          <span
            :class="{'tutorial__item__marker': true,
                     'tutorial__item__marker--active': item.active}">
            <b-icon
              v-show="item.active"
              size="is-small"
              icon="check" />
          </span>
          <span
            :class="{'tutorial__item': true,
                     'tutorial__item--finished': item.active}"
            @click="startTutorial(item.label, item.route)">
            {{ $t(`webapp.tutorial.items.${item.label}`) }}
          </span>
        </div>
      </div>

      <a @click="$emit('update:open', false)"> {{ $t('webapp.tutorial.skip') }} </a>
    </div>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TutorialModal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      width: 443,
      list: [
        { label: 'create_account', route: 'home' },
        { label: 'create_intelligence', route: 'home' },
        { label: 'training', route: 'tutorial/training' },
        { label: 'quick_test', route: 'home' },
        { label: 'test', route: 'home' },
        { label: 'inbox', route: 'home' },
        { label: 'translate', route: 'home' },
        { label: 'integrate', route: 'home' },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'finishedTutorials',
      'activeTutorial',
    ]),
    computedList() {
      const finished = this.finishedTutorials;
      return this.list.map(item => ({ ...item, active: finished[item.label] === 'finished' }));
    },
  },
  methods: {
    ...mapActions([
      'setTutorialActive',
    ]),
    startTutorial(name, target) {
      this.setTutorialActive(name);
      this.$router.push(target);
      // TODO: push target route (which repo?)
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

a {
    color: inherit;
    text-decoration: underline;
}
.tutorial {
    background-color: white;
    border-radius: 10px;
    padding: 2.5rem 3rem;

    &__title {
        text-align: center;
        h1 {
            color: $color-primary;
            font-size: 2.6rem;
        }
    }

    &__steps {
        margin: 2rem 0 2.5rem 0;
    }

    &__item {
        cursor: pointer;
        &:hover {
            font-weight: bold;
        }

        &--finished {
            text-decoration: line-through;
        }

        &__wrapper {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
        }

        &__marker {
            color: white;
            text-align: center;
            border-radius: 50%;
            border: 1px $color-grey-darker solid;
            width: 1.5rem;
            height: 1.5rem;
            display: inline-block;
            margin-right: 1rem;
            &--active {
                background-color: $color-success;
                border: 1px $color-success solid;
            }
        }
    }
}

</style>
