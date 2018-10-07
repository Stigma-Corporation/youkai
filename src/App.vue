<template>
  <div id="app">
    <div class="container is-fluid">
      <div class="modal" v-bind:class="{ 'is-active': LoginModal }">
        <div class="modal-background"></div>
        <div class="modal-content">
          <LoginForm></LoginForm>
        </div>
        <button class="modal-close is-large" aria-label="close" v-on:click="LoginModal=!LoginModal"></button>
      </div>

      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <NavbarLogo></NavbarLogo>
          </router-link>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item">
              <div class="buttons" v-on:click="Logout">
                <router-link to="/" class="button is-success is-rounded" v-if="token">Выйти</router-link>
                <a class="button is-success is-rounded" v-on:click="LoginModal=!LoginModal" v-else>
                  Войти
                </a>
              </div>
            </div>
            <router-link to="/" class="navbar-item">Главная</router-link>
            <div class="navbar-item has-dropdown is-hoverable" v-if="token">
              <a class="navbar-link">
                Профиль
              </a>

              <div class="navbar-dropdown">
                <router-link to="/profile/equipment" class="navbar-item"
                             v-on:click.native="UpdateUserData" v-if="token">Профиль</router-link>
                <router-link to="/profile/settings" class="navbar-item"
                             v-on:click.native="UpdateRaidData" v-if="token">Настройки</router-link>
              </div>
            </div>

            <router-link to="/members" class="navbar-item" v-on:click.native="UpdateMemberData" v-if="token">
              Состав
            </router-link>
            <div class="navbar-item has-dropdown is-hoverable" v-if="token">
              <a class="navbar-link">
                Рейды
              </a>

              <div class="navbar-dropdown">
                <div v-for="(raid, index) in raids">
                  <router-link v-on:click.native="UpdateRaidData" v-bind:to="{name: 'raid', params: {id: index}}" class="navbar-item">
                    {{raid["title"]}}
                  </router-link>
                  <hr class="navbar-divider">
                </div>
              </div>
            </div>

            <router-link to="/editmembers" class="navbar-item" v-on:click.native="UpdateMemberData"
                         v-if="adminStatus === 'admin access granted'">
              Ред. состав
            </router-link>
          </div>
        </div>
      </nav>
      <!--<router-link to="/">Home</router-link>-->
      <!--<router-link to="/members">Members</router-link>-->
    </div>
    <router-view/>
  </div>
</template>

<script>
import store from "./store";
import axios from "axios";

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

import Loader from "./components/Loader";
import NavbarLogo from "./components/NavbarLogo"
import LoginForm from "./components/LoginForm"

export default {
  components: {Loader, NavbarLogo, LoginForm},
  data: function () {
    return {
      // LoginModal: this.$store.state.LoginModal
    }
  },
  computed: {
    LoginModal: {
      get() {
        return store.state.LoginModal;
      },
      set() {
        store.commit('updateLoginModal')
      }
    },
    token: {
      get() {
        return store.state.token;
      },
      set(value) {
        store.commit("updateToken", value)
      }
    },
    raids: {
      get() {
        return store.state.raids;
      },
    },
    adminStatus: {
      get() {
        return store.state.adminStatus;
      },
      set(value) {
        store.commit("updateAdminStatus", value)
      }
    },
  },
  methods : {
    UpdateRaidData: function () {
      store.dispatch("GetAllRaids");
      store.dispatch("GetCurrentRaid");
    },
    UpdateMemberData: function () {
      store.dispatch("GetUsers");
    },
    UpdateUserData: function () {
      store.dispatch("GetCurrentUserByToken");
    },
    Logout: function () {
      this.token = '';
      this.adminStatus = '';
    }
  },
}

</script>

<style lang="scss" scoped>
@import "assets/normalize.css";
</style>
