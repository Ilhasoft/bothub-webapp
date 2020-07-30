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
        :active.sync="openNotification"
        :duration="4000"
        :closable="false"
        :auto-close="autoCloseNotification"
        :type="typeNotification"
        class="tutorial__notificationAlert"
        animation="fade"
        role="alert">
        <div class="tutorial__notificationAlert__container">
          <p>{{ notificationMessage }}</p>
          <b-icon
            v-if="typeNotification === 'is-warning'"
            class="loading"
            icon="sync" />
        </div>
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
            @click="startTutorial(item.label, item.route, item.previous)">
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
      width: 520,
      list: [
        { label: 'create_account', route: 'home', previous: '' },
        { label: 'create_intelligence', route: 'new', previous: 'create_account' },
        { label: 'training', route: 'training', previous: 'create_intelligence' },
        { label: 'quick_test', route: '', previous: 'training' },
        { label: 'evaluate', route: 'evaluate', previous: 'quick_test' },
        { label: 'inbox', route: 'log', previous: 'evaluate' },
        { label: 'translate', route: 'translate', previous: 'inbox' },
        { label: 'integrate', route: 'Integration', previous: 'translate' },
      ],
      repositoryTutorial: null,
      nickname: '',
      openNotification: false,
      error: null,
      finished: {},
      notificationMessage: '',
      finisheButton: false,
      repositoryStatus: {},
      typeNotification: '',
      autoCloseNotification: false,
      confettiConfig: {
        angle: 90,
        spread: 200,
        startVelocity: 45,
        elementCount: 80,
        dragFriction: 0.1,
        duration: 4000,
        stagger: 0,
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
      'getSelectedVersion',
      'getSelectedVersionRepository',
      'getRepositoryTraining',
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
        if (this.getRepositoryTraining) {
          this.setNotificationAlert('is-warning', false, this.$t('webapp.tutorial.training_wait'));
          this.checkWhichStatus();
        }
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
      'updateFinalizationMessage',
      'setTutorialInactive',
      'getRepositoryStatus',
      'setRepositoryTraining',
      'setFinalizationMessage',
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
        this.updateFinalizationMessage();
        this.finisheButton = true;
        return;
      }
      this.finisheButton = false;
    },
    closeTutorialMenu() {
      if (Object.keys(this.finished).length === 7) {
        this.setFinalModal(true);
        this.setFinalizationMessage();
      }
      this.openNotification = false;
      this.typeNotification = '';
      this.autoCloseNotification = false;
      this.notificationMessage = '';
      this.$emit('update:open', false);
      this.setTutorialMenuInactive();
    },
    async getTrainingStatus() {
      const { data } = await this.getRepositoryStatus({
        repositoryUUID: this.getSelectedVersionRepository,
        repositoryVersion: this.getSelectedVersion,
      });
      this.repositoryStatus = data;
      return this.repositoryStatus;
    },
    checkWhichStatus() {
      try {
        const refreshStatus = setInterval(async () => {
          if (this.repositoryStatus.count !== 0) {
            await this.getTrainingStatus();
            if (this.repositoryStatus.results[0].status === 2) {
              clearInterval(refreshStatus);
              await this.setRepositoryTraining(false);
              this.setNotificationAlert('is-success', true, this.$t('webapp.tutorial.training_success'));
              return;
            }
            if (this.repositoryStatus.results[0].status === 3) {
              clearInterval(refreshStatus);
              await this.setRepositoryTraining(false);
              this.setNotificationAlert('is-danger', true, this.$t('webapp.tutorial.training_error'));
            }
          }
        }, 100000);
      } catch (error) {
        this.error = error;
      }
    },
    setNotificationAlert(type, autoClose, title) {
      this.openNotification = true;
      this.autoCloseNotification = autoClose;
      this.typeNotification = type;
      this.notificationMessage = title;
    },
    goToTutorial(name, target) {
      this.setTutorialActive(name);
      this.$router.push(`/dashboard/${this.nickname}/${this.repositoryTutorial}/${target}`);
      this.openNotification = false;
      this.closeTutorialMenu();
    },
    async startTutorial(name, target, previous) {
      try {
        if (target === 'home' || target === 'new') {
          if (target === 'home') return;
          this.setTutorialActive(name);
          if (this.$router.currentRoute.name !== 'home') {
            this.setTutorialInactive();
            return;
          }
          this.closeTutorialMenu();
        } else if (Object.keys(this.finished).includes(previous)
        || (previous === 'create_intelligence' && this.repositoryTutorial !== null)) {
          if (target === 'training') {
            this.goToTutorial(name, target);
            return;
          }
          await this.getTrainingStatus();
          if (this.repositoryStatus.length !== 0 && this.repositoryStatus.results[0].status === 2) {
            this.goToTutorial(name, target);
            return;
          }
          if (this.repositoryStatus.length !== 0 && this.repositoryStatus.results[0].status === 3) {
            this.setNotificationAlert('is-danger', true, this.$t('webapp.tutorial.training_error'));
            return;
          }
        } else {
          if (this.getRepositoryTraining) {
            this.setNotificationAlert('is-warning', false, this.$t('webapp.tutorial.training_wait'));
            return;
          }
          this.setNotificationAlert('is-danger', true, this.$t('webapp.tutorial.alert_message'));
        }
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

.loading {
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
    from {transform:rotate(360deg);}
    to {transform:rotate(0deg);}
}
.tutorial {
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem 3rem;
    width: 32.5rem;

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
        margin: 1.5rem 0 1.5rem 1.5rem;
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
    &__notificationAlert{
      &__container{
      display:flex;
      justify-content: space-around;
      align-items: center;
        p{
          margin:0;
          text-align: center;
        }
      }
    }
    &__skip{
      p{
        cursor: pointer;
        margin: auto;
        display:inline-block;
        border-bottom: 2px solid rgba(117, 117, 117, 0.363);
        margin-left: 1.2rem;
        padding-bottom: 2px;
        &:hover{
          color : rgba(83, 83, 83, 0.884)
        }
      }
    }
}

</style>
