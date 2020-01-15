<script>
import { mapGetters, mapActions } from 'vuex';
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
  },
  mounted() {
    this.updateRepository();
  },
  provide() {
    return {
      updateRepository: this.updateRepository,
    };
  },
  methods: {
    ...mapActions([
      'setUpdateRepository',
    ]),
    async updateRepository(silent = false) {
      const { ownerNickname, slug, version } = this.$route.params;

      if (!ownerNickname || !slug) {
        this.repository = null;
        return this.repository;
      }

      if (!this.repository
          || this.repository.ownerNickname !== ownerNickname
          || this.repository.slug !== slug
          || (version && this.respository.repository_version !== version)
          || !silent) {
        this.repository = new Repository({ owner__nickname: ownerNickname, slug, version });
      }

      this.repository.on('cache', this.onReady);
      this.repository.on('fetch', this.onReady);

      await this.repository.fetch();
      this.setUpdateRepository(false);
      return this.repository;
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
