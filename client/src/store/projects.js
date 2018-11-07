import router from '../router';
import HTTP from '../http';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
      projects: [],
      newProjectName: null,
      page: 0
  },
  getters: {
  },
  actions: {
    create({ commit, state }) {
      return HTTP().post('/project/', {
          title: state.newProjectName
      })
      .then(({ data }) => {
        commit('appendProject', data);
        commit('setNewProjectName', null);
      });
    },
    getList({ commit , state }) {
      return HTTP().get('/projects/' + state.page)
      .then(({data}) => {
        commit('fetchProjects', data);
      });
    },
    saveProject({ commit }, project) {
      return HTTP().patch(`/project/${project.id}`, project)
      .then(() => {
        commit('unsetEditMode', project);
      });
    },
    deleteProject({commit, state}, project) {
      if(confirm('Are you sure to delete this Project?')){
      return HTTP().delete(`/project/${project.id}`)
      .then(() => {
        //commit('fetchProjects', data);
        return HTTP().get('/projects/'+ state.page)
        .then(({data}) => {
          commit('fetchProjects', data);
        });
      });}
    },
  },
  mutations: {
    fetchProjects(state, data) {
      state.projects = data;
    },
    setNewProjectName(state, name) {
        state.newProjectName = name;
    },
    appendProject(state, data) {
        state.projects.push(data);
    },
    deleteProject(state, project) {
      state.projects.splice(state.projects.indexOf(project), 1)
    },
    setEditMode(state, project) {
      Vue.set(project, 'isEditMode', true);
    },
    unsetEditMode(state, project) {
      Vue.set(project, 'isEditMode', false);
    },
    setProjectTitle(state, {project, title }) {
      project.title = title;
    },
  },
};
