<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Repository from '@/models/repository';


export default {
  name: 'RepositoryBase',
  data() {
    return {
      repository: null,
      errorCode: null,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'getUpdateRepositoryState',
    ]),
    ...mapState({
      repositoryVersion: state => state.Repository.repositoryVersion,
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
    repositoryVersion() {
      this.updateRepository(true);
    },
  },
  async mounted() {
    await this.updateRepository();  
    if (!this.repositoryVersion) {      
      this.updateRepositoryVersion(
        this.repository.version_default
      )
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
      'setRepositoryVersion'
    ]),
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
       version
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
