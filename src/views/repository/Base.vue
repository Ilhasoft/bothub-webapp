<script>
export default {
  name: 'RepositoryBase',
  data() {
    return {
      repository: null,
      loading: false,
      errorCode: null,
    };
  },
  watch: {
    $route() {
      this.updateRepository();
    },
  },
  async mounted() {
    this.updateRepository();
  },
  methods: {
    async updateRepository(silent = false) {
      const { ownerNickname, slug } = this.$route.params;

      if (!silent) {
        this.repository = null;
        this.loading = true;
        this.errorCode = null;
      }

      try {
        const response = await this.$api.repository.shortcut(ownerNickname, slug);
        this.repository = response.data;
      } catch (e) {
        this.errorCode = e.response.status;
      } finally {
        if (!silent) {
          this.loading = false;
        }
      }
    },
  },
};
</script>
