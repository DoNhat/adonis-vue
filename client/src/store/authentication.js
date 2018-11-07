import router from '../router';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    registerEmail: '',
    registerPassword: '',
    registerError: null,
    loginError: null,
    token: '',
  },
  getters: {
    isLoggedIn(state) {
      if(state.token)
        router.push('/');
      return !!state.token;
    },
  },
  actions: {
    register({ commit, state }) {
      commit('setRegisterError', null);
      return HTTP().post('auth/register', {
        email: state.registerEmail,
        password: state.registerPassword,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          commit('setRegisterPassword', null);
          router.push('/');
        })
        .catch(() => {
          commit('setRegisterError', 'A error has occured trying to create your account');
        });
    },
    logout({ commit, state }) {
      commit('setToken', null);
    },
    login({ commit, state }) {
      commit('setLoginError', null);
      return HTTP().post('auth/login', {
        email: state.registerEmail,
        password: state.registerPassword,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          commit('setRegisterPassword', null);
          router.push('/');
        }).catch((err) => {
          commit('setLoginError', err.message);
        });
    },
  },
  mutations: {
    resetValue(state) {
      state.loginError = null;
    },
    setToken(state, token) {
      state.token = token;
      state.registerError = null;
      state.loginError = null;
      if(token === null)
        router.push('/login');
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
  },
};
