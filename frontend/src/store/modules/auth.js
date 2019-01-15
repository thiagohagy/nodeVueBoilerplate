import ls from 'local-storage';
import app from './../../main';
import main from './../../main';

const state = {
  AUTH_TOKEN: ls('token'),
};

const mutations = {
  user_login(state, payload) {
    ls('token', payload.token);
    state.AUTH_TOKEN = payload.token;
    main.$router.push('/');
  },
  user_logout(state) {
    state.AUTH_TOKEN = false;
    ls('token', false);
    main.$router.push('/login');
  },
};

const getters = {
  isLogged: () => {
    const status = state.AUTH_TOKEN ? true : false;
    return status;
  },
  authToken: () => state.AUTH_TOKEN,
};

export default {
  state,
  getters,
  mutations,
};