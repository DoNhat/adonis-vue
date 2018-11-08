/* eslint-disable */
import Vue from 'vue';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    projects: [],
    newProjectName: null,
    page: 0,
    currentProject: null,
  },
  getters: {
  },
  actions: {
    create({ commit, state }) {
      return HTTP().post('/project/', {
        title: state.newProjectName,
      })
        .then(({ data }) => {
          commit('appendProject', data);
          commit('setNewProjectName', null);
        });
    },
    getList({ commit, state, rootState }) {
      return HTTP().get(`/projects/${state.page}`)
        .then(({ data }) => {
          commit('fetchProjects', data);
        });
    },
    getCurrentProject({ commit, state }) {
      return commit('setCurrentProject', null);
    },
    saveProject({ commit }, project) {
      return HTTP().patch(`/project/${project.id}`, project)
        .then(() => {
          commit('unsetEditMode', project);
        });
    },
    deleteProject({ commit, state }, project) {
      if (confirm('Are you sure to delete this Project?')) {
        return HTTP().delete(`/project/${project.id}`)
          .then(() => {
            // commit('fetchProjects', data);
            return HTTP().get(`/projects/${state.page}`)
              .then(({ data }) => {
                commit('fetchProjects', data);
                commit('setCurrentProject', null);
              });
          });
      }
      return null;
    },
  },
  mutations: {
    setCurrentProject(state, project) {
      state.currentProject = state.projects[0];
      if(project!==null)
        {state.currentProject = project;
        console.log('fetchProject ' + state.currentProject.id);
      }
    },
    fetchProjects(state, data) {
      state.currentProject = data[0];
      state.projects = data;
      console.log('fetchProject ' + state.currentProject.id);
    },
    setNewProjectName(state, name) {
      state.newProjectName = name;
    },
    appendProject(state, data) {
      state.projects.push(data);
    },
    deleteProject(state, project) {
      state.projects.splice(state.projects.indexOf(project), 1);
    },
    setEditMode(state, project) {
      Vue.set(project, 'isEditMode', true);
    },
    unsetEditMode(state, project) {
      Vue.set(project, 'isEditMode', false);
    },
    setProjectTitle(state, { project, title }) {
      project.title = title;
    },
  },
};
