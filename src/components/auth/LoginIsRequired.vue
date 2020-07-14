<script>
import { mapGetters } from 'vuex';


export default {
  computed: mapGetters(['authenticated']),
  watch: {
    authenticated() {
      /* istanbul ignore next */
      if (!this.authenticated) {
        /* istanbul ignore next */
        this.$router.push({
          name: 'signIn',
        });
      }
    },
  },
};
</script>
