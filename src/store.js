import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    LoginModal: false,
    token: "",
    // token: "PcSAersJxeoZqxQZtGbugA",
    users: [],
    currentUser: null,
    raids: [],
    currentRaid: null,
    currentRaidId: null,
    adminStatus: ""
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
  },
  actions: {
    GetCurrentUserByToken({commit, state}) {
      axios({
        method: "get",
        url: "http://192.168.1.100:8000/account/user/",
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
        url: "http://192.168.1.100:8000/raid/",
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
        url: "http://192.168.1.100:8000/account/users/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + state.token
        }
      }).then(function (response) {
        commit("updateUsers", response.data)
      })
    },
    CheckAdminStatus({commit, state}){
      axios({
        method: "get",
        url: "http://192.168.1.100:8000/admin/check/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + state.token
        }
      }).then(function (response) {
        commit("updateAdminStatus", response.data.message)
      })
    }
  }
})
