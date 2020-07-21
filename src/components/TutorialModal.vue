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
        :closable="false"
        class="tutorial__createIntelligenceAlert"
        type="is-danger"
        auto-close
        animation="fade"
        role="alert">
        <p>{{ notificationMessage }}</p>
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
            @click="startTutorial(item.label, item.route, item.previus)">
            {{ $t(`webapp.tutorial.items.${item.label}`) }}
          </span>
        </div>
      </div>
      <div class="tutorial__skip">
        <p
          v-if="finisheButton"
          @click="closeTutorialMenu()">
          {{ $t('webapp.tutorial.finish_tutorial') }}
        </p>
        <p
          v-else
          @click="closeTutorialMenu()">
          {{ $t('webapp.tutorial.skip') }}
        </p>
      </div>
    </div>

    <confetti-effect
      v-if="finisheButton && getFinalMessage !== 'true'"
      :config="confettiConfig"/>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ConfettiEffect from './ConfettiEffect';

export default {
  name: 'TutorialModal',
  components: {
    ConfettiEffect,
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
        { label: 'create_account', route: 'home', previus: '' },
        { label: 'create_intelligence', route: 'new', previus: 'create_account' },
        { label: 'training', route: 'training', previus: 'create_intelligence' },
        { label: 'quick_test', route: '', previus: 'training' },
        { label: 'evaluate', route: 'evaluate', previus: 'quick_test' },
        { label: 'inbox', route: 'log', previus: 'evaluate' },
        { label: 'translate', route: 'translate', previus: 'inbox' },
        { label: 'integrate', route: 'Integration', previus: 'translate' },
      ],
      repositoryTutorial: null,
      nickname: '',
      createIntelligenceAlert: false,
      error: null,
      finished: {},
      notificationMessage: '',
      finisheButton: false,
      confettiConfig: {
        angle: 90,
        spread: 150,
        startVelocity: 50,
        elementCount: 110,
        dragFriction: 0.1,
        duration: 8000,
        stagger: 26,
        width: '15px',
        height: '30px',
        colors: ['#A182BA', '#00ACEA', '#8AC13E', '#E81B26', '#FFEE00'],
        random: Math.random,
      },
    };
  },
  computed: {
    ...mapGetters([
      'finishedTutorials',
      'activeTutorial',
      'checkFinishid',
      'myProfile',
      'getFinalModal',
      'getFinalMessage',
    ]),
    computedList() {
      return this.list.map(item => ({
        ...item,
        active: item.label === 'create_account'
        || (item.label === 'create_intelligence' && this.repositoryTutorial !== null)
          ? true : this.finished[item.label] === 'finished',
      }));
    },
  },
  watch: {
    open() {
      if (this.open === true) {
        this.updateMyRepositories();
        this.updateTutorialsDone();
        this.finished = { ...this.finishedTutorials };
        this.nickname = this.myProfile.nickname;
        this.checkIfDoneTutorial();
      }
    },
  },
  methods: {
    ...mapActions([
      'setTutorialActive',
      'getUserRepositories',
      'setTutorialMenuInactive',
      'updateTutorialsDone',
      'setCreateIntelligence',
      'setFinalModal',
      'setFinalizationMessage',
      'setTutorialInactive',
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
        this.hasIntelligence();
      } catch (error) {
        this.error = error;
      }
    },
    hasIntelligence() {
      if (this.repositoryTutorial !== null) {
        if (!Object.keys(this.finished).includes('create_intelligence')) {
          this.setCreateIntelligence('create_intelligence');
        }
      }
      return false;
    },
    checkIfDoneTutorial() {
      if (Object.keys(this.finished).length === 7) {
        this.setFinalizationMessage();
        this.finisheButton = true;
        return '';
      }
      this.finisheButton = false;
      return '';
    },
    closeTutorialMenu() {
      this.$emit('update:open', false);
      this.setTutorialMenuInactive();
      if (Object.keys(this.finished).length === 7) {
        this.setFinalModal(true);
      }
    },
    startTutorial(name, target, previus) {
      this.setTutorialActive(name);
      if (target === 'home' || target === 'new') {
        if (target === 'home') return '';
        if (this.$router.currentRoute.name !== 'home') {
          this.setTutorialInactive();
          return '';
        }
        this.closeTutorialMenu();
      } else {
        if (Object.keys(this.finished).includes(previus)
        || (previus === 'create_intelligence' && this.repositoryTutorial !== null)) {
          this.$router.push(`/dashboard/${this.nickname}/${this.repositoryTutorial}/${target}`);
          this.createIntelligenceAlert = false;
          this.closeTutorialMenu();
          return '';
        }
        this.createIntelligenceAlert = true;
        this.notificationMessage = this.$t('webapp.tutorial.alert_message');
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
.tutorial {
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem 3rem;
    width: 30.813rem;

    &__title {
        text-align: center;
        h1 {
            color: $color-primary;
            font-size: 2.4rem;
        }
        p{
          font-size:0.940rem;
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
    &__skip{
      p{
        cursor: pointer;
        margin: auto;
        display:inline-block;
        border-bottom:2px solid rgba(117, 117, 117, 0.363);
        padding-bottom:2px;
        &:hover{
          color : rgba(83, 83, 83, 0.884)
        }
      }
    }
}

</style>
