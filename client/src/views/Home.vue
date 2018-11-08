<template>
  <v-container>
    <v-layout>
      <v-flex xs4>
        <Projects></Projects>
      </v-flex>
      <v-flex xs8 class="pl-4">
        <Tasks></Tasks>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import router from '../router';
import Projects from '@/components/Projects.vue';
import Tasks from '../components/Tasks.vue';
export default {
  components: {
    Projects,
    Tasks,
  },
  mounted() {
    if(!this.isLoggedIn){
      return router.push('/login');
    }
    this.getList();
  },
  computed: {
    ...mapState('authentication', ['token']),
    ...mapGetters('authentication',['isLoggedIn'])
  },
  methods: {
    ...mapActions('projects', ['getList']),
  }
};
</script>
