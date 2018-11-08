<template>
    <Panel title="Tasks">
        <CreateTask
        @onInput="setNewTaskName"
        :value="newTaskName"
        @create="createTask"
         />
        <div class="tasks mb-2" v-for="task in tasks" :key="task.id">
            <EditableTask
            :isEditMode="task.isEditMode"
            :title="task.description"
            @setEditMode="setEditMode(task)"
            @setTaskTitle="setTaskTitle({task, title: $event})"
            @unsetEditMode="unsetEditMode(task)"
            @saveTask="saveTask(task)"
            @setCompleted="setCompleted(task)"
            @deleteTask="deleteTask(task)">
            
            <v-icon @click="checkClicked(task)">
                {{task.completed?'check_box':'check_box_outline_blank'}}
            </v-icon>
            </EditableTask>
        </div>
    </Panel>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import EditableTask from '@/components/EditableTask.vue';
import CreateTask from '@/components/CreateTask.vue';


export default {
  components: {
    CreateTask,
    EditableTask,
  },
  mounted() {
  },
  computed: {
    ...mapState('tasks', ['tasks', 'newTaskName']),
  },
  methods: {
    ...mapActions('tasks', [
      'createTask',
      'getTasks',
      'saveTask',
      'deleteTask',
    ]),
    ...mapMutations('tasks', [
      'setNewTaskName',
      'setEditMode',
      'unsetEditMode',
      'setTaskTitle',
      'setCompleted',
    ]),
    checkClicked(task) {
      this.setCompleted(task);
      this.saveTask(task);
    }
  },
};
</script>

<style>
</style>
