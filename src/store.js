import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    LoginModal: false,
    // token: ""
    token: "PcSAersJxeoZqxQZtGbugA",
    users: [],
    currentUser: null,
    raids: []
  },
  mutations: {
    updateLoginModal(state) {
      state.LoginModal = !state.LoginModal
    },
    updateToken(state, value) {
      state.token = value
    },
    updateUsers(state, value){
      state.users = value
    },
    updateCurrentUser(state, value){
      state.currentUser = value
    },
    updateRaids(state, value){
      state.raids = value
    }
  },
  actions: {

  }
})
