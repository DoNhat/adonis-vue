<template>
    <Panel title="Projets">
        <CreateProject
            @onInput="setNewProjectName"
            @create="create"
            @click="create"
            :value="newProjectName"
        />
            <div class="projects mb-2" v-for="project in projects" :key="project.id">
                <EditableProject
                :isEditMode="project.isEditMode"
                :title="project.title"
                :project="project"
                @saveProject="saveProject(project)"
                @setProjectTitle="setProjectTitle({project, title: $event})"
                @setEditMode="setEditMode(project)"
                @unsetEditMode="unsetEditMode(project)"
                @deleteProject="deleteProject(project)"
                @onClick="projectClicked(project)"
                />
            </div>
    </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import CreateProject from '@/components/CreateProject.vue';
import EditableProject from '@/components/EditableProject.vue';

export default {
  components: {
    CreateProject,
    EditableProject,
  },
  mounted() {
    this.getCurrentProject();
    if(this.getList())
      this.getTasks();
  },
  computed: {
    ...mapState('projects', ['newProjectName', 'projects', 'currentProject']),
  },
  methods: {
    projectClicked(project) {
      this.setCurrentProject(project);
      this.getTasks();
    },
    ...mapMutations('projects', [
      'setNewProjectName',
      'setEditMode',
      'unsetEditMode',
      'setProjectTitle',
      'setCurrentProject',
    ]),
    ...mapActions('tasks', [
      'getTasks',
    ]),
    ...mapActions('projects', [
      'create',
      'getList',
      'saveProject', 'deleteProject', 'getCurrentProject',
    ]),
  },
};
</script>

<style>
</style>
