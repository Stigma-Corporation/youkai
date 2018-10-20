import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage})],
  state: {
    LoginModal: false,
    token: "",
    // token: "PcSAersJxeoZqxQZtGbugA",
    users: [],
    allUsers: [],
    currentUser: {},
    raids: [],
    currentRaid: {},
    currentRaidId: null,
    adminStatus: "",
    news: [],
    Loader: false
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
    updateAllUsers(state, value){
      state.allUsers = value
    },
    updateCurrentUser(state, value){
      state.currentUser = value
    },
    updateRaids(state, value){
      state.raids = value
    },
    updateCurrentRaid(state, value){
      state.currentRaid = value
    },
    updateCurrentRaidId(state, value){
      state.currentRaidId = value
    },
    updateAdminStatus(state, value){
      state.adminStatus = value
    },
    updateNews(state, value){
      state.news = value
    },
    updateLoader(state, value){
      state.Loader = value
    }
  },
  actions: {
    PingAPI({commit, state}) {
      axios({
        method: "get",
        url: process.env.VUE_APP_API_ROOT + "ping/",
      }).then(function (response) {
        if (response.data === true) {
          commit("updateLoader", response.data)
        } else {
          commit("updateLoader", false)
        }

      })
    },
    GetCurrentUserByToken({commit, state}) {
      axios({
        method: "get",
        url: process.env.VUE_APP_API_ROOT + "account/user/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + state.token
        }
      }).then(function (response) {
        commit("updateCurrentUser", response.data)
      })
    },
    GetAllRaids({commit, state}) {
      axios({
        method: "get",
        url: process.env.VUE_APP_API_ROOT + "raid/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + state.token
        }
      }).then(function (response) {
        commit("updateRaids", response.data)
      })
    },
    GetCurrentRaid({commit, state}) {
      commit("updateCurrentRaid", state.raids[state.currentRaidId]);
    },
    GetUsers({commit, state}) {
      axios({
        method: "get",
        url: process.env.VUE_APP_API_ROOT + "account/users/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + state.token
        }
      }).then(function (response) {
        commit("updateUsers", response.data)
      })
    },
    GetAllUsers({commit, state}) {
      axios({
        method: "put",
        url: process.env.VUE_APP_API_ROOT + "account/users/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + state.token
        }
      }).then(function (response) {
        commit("updateAllUsers", response.data)
      })
    },
    CheckAdminStatus({commit, state}){
      axios({
        method: "get",
        url: process.env.VUE_APP_API_ROOT + "admin/check/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + state.token
        }
      }).then(function (response) {
        commit("updateAdminStatus", response.data.message)
      })
    },
    GetNews({commit, state}){
      axios({
        method: "get",
        url: process.env.VUE_APP_API_ROOT + "news/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + state.token
        }
      }).then(function (response) {
        commit("updateNews", response.data)
      })
    },
  }
})
