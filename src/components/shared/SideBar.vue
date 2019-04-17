<template>
  <div>
    <button @click="openNav()">activeeeeeee</button>
    <div
      id="mySidenav"
      class="sidenav">
      <div class="sidenav__repository-info">
        <div class="sidenav__repository-info__big-badge">
          <bh-icon-button
            :value="repositoryInfoIcon"
            size="small"
            class="sidenav__repository-info__big-badge__icon" />
        </div>
        <div>
          <p>{{ repository.name }}</p>
          <p>{{ repository.name }}</p>
        </div>
      </div>
      <a
        href="javascript:void(0)"
        class="sidenav__closebtn"
        @click="closeNav()">&times;</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
  </div>
</template>
<script>
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import { mapGetters } from 'vuex';


export default {
  name: 'VsSidebar',
  components: {
    RepositoryInfo,
  },
  props: {
    repository: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters([
      'getProfile',
    ]),

    repositoryInfoIcon() {
      return (this.repository.categories[0] && this.repository.categories[0].icon) || 'botinho';
    },
  },
  methods: {
    openNav() {
      document.getElementById('mySidenav').style.width = '250px';
    },
    closeNav() {
      document.getElementById('mySidenav').style.width = '0';
    },
  },
};
</script>
<style lang="scss">
@import '~bh/src/assets/scss/colors.scss';


.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: $color-fake-white;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 5rem;

  &__repository-info {
    display: flex;
    align-items: center;

    &__big-badge {
      margin: 1rem;
      $size: 3rem;
      position: relative;
      display: block;
      width: $size;
      height: $size;
      border-radius: 50%;
      background-color: #009688;
      overflow: hidden;

      &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
      }
    }
  }

  a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    border-bottom: 1px solid $color-grey;
    color: #818181;
    display: block;
    transition: 0.3s;

    &:first-child {
      border-bottom: 0px;
    }

    &:hover {
      color: #f1f1f1;
    }
  }

  &__closebtn {
      position: absolute;
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 50px;
    }
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
