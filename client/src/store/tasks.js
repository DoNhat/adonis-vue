import Vue from 'vue';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    tasks: [],
    newTaskName: null,
    description: null,
  },
  getters: {
    
  },
  actions: {
    createTask({ commit, state, rootState }) {
      return HTTP().post(`project/${rootState.projects.currentProject.id}/tasks`, {
            description: state.newTaskName,
          })
        .then(({ data }) => {
          return HTTP().get(`project/${rootState.projects.currentProject.id}/tasks`)
            .then(({ data }) => {
              commit('fetchTasks', data);
            });
        });
    },
    getTasks({ commit, rootState }) {
      return HTTP().get(`project/${rootState.projects.currentProject.id}/tasks`)
        .then(({ data }) => {
          commit('fetchTasks', data);
        });
    },
    saveTask({ commit, rootState }, task) {
      return HTTP().patch(`task/${task.id}`, {
          description: task.description,
          completed: task.completed,
      })
        .then(() => {
            return HTTP().get(`project/${rootState.projects.currentProject.id}/tasks`)
              .then(({ data }) => {
                commit('fetchTasks', data);
                commit('unsetEditMode', task);
              });
        });
    },
    deleteTask({ commit, state }, task) {
      if(confirm("Are you sure to delete this Task???")) {
      return HTTP().delete(`task/${task.id}`)
        .then(({ rs }) => {
          if(rs !== null) {
            return HTTP().get(`project/${task.project_id}/tasks`)
              .then(({ data }) => {
                commit('fetchTasks', data);
              });
          }
        })
      }
      return null;
    }
  },
  mutations: {
    fetchTasks(state, data) {
      state.tasks = data;
    },
    setNewTaskName(state, task) {
      state.newTaskName = task;
    },
    setEditMode(state, task) {
      Vue.set(task, 'isEditMode', true);
    },
    unsetEditMode(state, task) {
      Vue.set(task, 'isEditMode', false);
    },
    setTaskTitle(state, { task, title }) {
      task.description = title;
    },
    setCompleted(state, task) {
      task.completed = !task.completed;
    },
  },
};
