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
      <b-notification
        :active.sync="createIntelligenceAlert"
        :duration="4000"
        class="tutorial__createIntelligenceAlert"
        type="is-danger"
        auto-close
        animation="fade"
        aria-close-label="Close notification"
        role="alert">
        <p>You need to create an intelligence first</p>
      </b-notification>
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
      <a @click="closeTutorialMenu()"> {{ $t('webapp.tutorial.skip') }} </a>
    </div>

  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueConfetti from 'vue-confetti';

export default {
  name: 'TutorialModal',
  components: {
    VueConfetti,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      width: 493,
      list: [
        { label: 'create_account', route: 'home' },
        { label: 'create_intelligence', route: 'new' },
        { label: 'training', route: 'training' },
        { label: 'quick_test', route: '' },
        { label: 'evaluate', route: 'evaluate' },
        { label: 'inbox', route: 'log' },
        { label: 'translate', route: 'translate' },
        { label: 'integrate', route: 'Integration' },
      ],
      repositoryTutorial: null,
      nickname: '',
      createIntelligenceAlert: false,
      error: null,
      finished: {},
    };
  },
  computed: {
    ...mapGetters([
      'finishedTutorials',
      'activeTutorial',
      'checkFinishid',
      'myProfile',
    ]),
    computedList() {
      return this.list.map(item => ({
        ...item,
        active: item.label === 'create_account'
        || (item.label === 'create_intelligence' && this.hasIntelligence)
          ? true : this.finished[item.label] === 'finished',
      }));
    },
    hasIntelligence() {
      if (this.repositoryTutorial !== null) {
        return true;
      }
      return false;
    },
  },
  watch: {
    open() {
      if (this.open === true) {
        // this.start();
        this.updateMyRepositories();
        this.updateTutorialsDone();
        this.finished = { ...this.finishedTutorials };
        this.nickname = this.myProfile.nickname;
      }
    },
  },
  methods: {
    ...mapActions([
      'setTutorialActive',
      'getUserRepositories',
      'setTutorialMenuInactive',
      'updateTutorialsDone',
    ]),
    async updateMyRepositories() {
      try {
        const { data } = await this.getUserRepositories({
          limit: 1,
          offset: 0,
        });
        if (data.results.length === 0) {
          return;
        }
        this.repositoryTutorial = data.results[0].slug;
      } catch (error) {
        this.error = error;
      }
    },
    closeTutorialMenu() {
      this.$emit('update:open', false);
      this.setTutorialMenuInactive();
      this.stop();
    },
    start() {
      this.$confetti.start({
        particles: [
          {
            type: 'rect',
            size: 13,
          },
        ],
      });
    },
    stop() {
      this.$confetti.stop();
    },
    startTutorial(name, target) {
      this.setTutorialActive(name);
      if (target === 'home' || target === 'new') {
        if (target === 'home') return '';
        this.closeTutorialMenu();
      } else {
        if (!this.hasIntelligence) {
          this.createIntelligenceAlert = true;
          return '';
        }
        this.$router.push(`/dashboard/${this.nickname}/${this.repositoryTutorial}/${target}`);
        this.createIntelligenceAlert = false;
        this.closeTutorialMenu();
      }
      return '';
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
    &__createIntelligenceAlert{
      p{
        margin:0;
        text-align: center;
      }
    }
}

</style>
