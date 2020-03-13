<template>
  <div
    class="version_dropdown">
    <span
      class="version_dropdown__number">
      {{ $store.state.Repository.repositoryVersionName }}
    </span>
    <b-dropdown
      aria-role="list">
      <Loading v-if="authenticated && isLoading" />
      <b-icon
        v-else-if="authenticated"
        :slot="authenticated ? 'trigger' : ''"
        class="version_dropdown__icon"
        icon="chevron-down"/>
      <b-dropdown-item
        v-for="(version, index) in allVersions"
        :key="index"
        aria-role="listitem"
        @click="handleVersion(version.id, version.name)">
        {{ version.name }}
      </b-dropdown-item>
      <b-dropdown-item
        aria-role="listitem"
        @click="routerHandle('repository-versions')">See all versions</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Loading from '@/components/shared/Loading';

export default {
  name: 'VersionDropdown',
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      allVersions: [],
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
      'authenticated',
    ]),
    repositoryUUID() {
      if (!this.getCurrentRepository) return null;
      return this.getCurrentRepository.uuid;
    },
  },
  watch: {
    repositoryUUID() {
      if (this.authenticated) {
        this.getAllVersions();
      }
    },
    authenticated() {
      if (this.authenticated) {
        this.getAllVersions();
      }
    },
  },
  mounted() {
    this.getAllVersions();
  },
  methods: {
    ...mapActions([
      'getFirstFiveVersions',
      'setRepositoryVersion',
    ]),
    async getAllVersions() {
      if (!this.repositoryUUID) return;
      this.isLoading = true;
      try {
        const response = await this.getFirstFiveVersions(this.repositoryUUID);
        this.allVersions = response.data.results;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    routerHandle(path) {
      this.$router.push({
        name: `${path}`,
      });
    },
    handleVersion(id, name) {
      const version = {
        id,
        name,
      };
      this.setRepositoryVersion({
        version,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
    .version_dropdown {
        margin: 0 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

            &__icon {
                color: #FFFFFF;
                margin-top: .2rem;
                cursor: pointer;
            }

            &__number {
                color: #12a391;
                font-size: 1.1rem;
                font-weight: bold;
            }
    }
</style>
