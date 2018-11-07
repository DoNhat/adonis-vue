<template>
    <Panel title="Projets">
        <v-layout row wrap>
            <v-flex xs8>
                <v-text-field
                    placeholder="Project name..." :value="newProjectName" @input="setNewProjectName" @keyup.enter="create">            
                </v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-btn color="green" class="mt-2" dark @click="create">
                    <v-icon class="mr-2">add_circle</v-icon>
                    Create
                </v-btn>
            </v-flex>
        </v-layout>
            <div class="projects mb-2" v-for="project in projects" :key="project.id">
                <v-layout row wrap>
                    <v-flex xs9 class="text-xs-left">
                        <span v-if="!project.isEditMode">{{project.title}}</span>
                        <v-text-field v-if="project.isEditMode" 
                            :value="project.title"
                            autofocus
                            @keyup.enter="saveProject(project)"
                            @input="setProjectTitle({project,title: $event})">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-icon v-if="!project.isEditMode" @click="setEditMode(project)">edit</v-icon>
                        <v-icon v-if="project.isEditMode" @click="saveProject(project)">check</v-icon>
                        <v-icon v-if="project.isEditMode" @click="unsetEditMode(project)">close</v-icon>
                        <v-icon v-if="!project.isEditMode" @click="deleteProject(project)">delete</v-icon>
                    </v-flex>
                </v-layout>
            </div>
    </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  mounted() {
    this.getList();
  },
  computed: {
    ...mapState('projects', ['newProjectName', 'projects']),
  },
  methods: {
    ...mapMutations('projects', ['setNewProjectName', 'setEditMode', 'unsetEditMode', 'setProjectTitle']),
    ...mapActions('projects', ['create', 'getList' , 'saveProject', 'deleteProject']),
  },
};
</script>

<style>
</style>
