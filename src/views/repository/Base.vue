<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Repository from '@/models/repository';

// eslint-disable-next-line prefer-const
let repository = null;
export default {
  name: 'RepositoryBase',
  data() {
    return {
      repository,
      errorCode: null,
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'authenticated',
      getUpdateRepositoryState: 'getUpdateRepositoryState',
      repositoryVersion: 'getSelectedVersion',
    }),
    ...mapState({
      repositoryUuid: state => state.Repository.selectedRepository.uuid,
      repositoryVersionObject: state => state.Repository.repositoryVersion,
    }),
  },
  watch: {
    $route() {
      this.updateRepository();
    },
    authenticated() {
      this.updateRepository();
    },
    getUpdateRepositoryState(force) {
      if (force) {
        this.updateRepository(true);
      }
    },
    repositoryVersionObject(newVersion, oldVersion) {
      if (!oldVersion
      || !oldVersion.id
      || oldVersion.repositoryUUID !== newVersion.repositoryUUID
      || oldVersion.id === newVersion.id) return;
      this.updateRepository(true);
    },
    repositoryUuid() {
      this.updateRepositoryVersion(
        this.repository.version_default,
      );
    },
  },
  async mounted() {
    await this.updateRepository();
    this.repositoryRequirements();
    if (!this.repositoryVersion) {
      this.updateRepositoryVersion(
        this.repository.version_default,
      );
    }
  },
  provide() {
    return {
      updateRepository: this.updateRepository,
    };
  },
  methods: {
    ...mapActions([
      'setUpdateRepository',
      'setRepositoryVersion',
      'getRepositoryRequirements',
      'setRequirements',
    ]),
    async repositoryRequirements() {
      try {
        const { data } = await this.getRepositoryRequirements({
          repositoryUuid: this.repository.uuid,
          version: this.repository.repository_version_id,
        });
        this.setRequirements(data);
      } catch (error) {
        this.error = error;
      }
    },
    async updateRepository(silent = false) {
      const { ownerNickname, slug } = this.$route.params;

      if (!ownerNickname || !slug) {
        this.repository = null;
        return this.repository;
      }

      if (!this.repository
          || this.repository.ownerNickname !== ownerNickname
          || this.repository.slug !== slug
          || !silent) {
        this.repository = new Repository({ owner__nickname: ownerNickname, slug });
      }

      this.repository.on('cache', this.onReady);
      this.repository.on('fetch', this.onReady);

      await this.repository.fetch();
      this.setUpdateRepository(false);
      return this.repository;
    },
    updateRepositoryVersion(version) {
      this.setRepositoryVersion({
        version,
        repositoryUUID: this.repository.uuid,
      });
    },
    onReady({ error }) {
      if (error) {
        const { response: { response } } = error;
        if (response) {
          const { status } = response;
          this.errorCode = status;
        }
      }
    },
  },
};
</script>
