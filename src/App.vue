<template>
  <div id="app">
    <Loader></Loader>
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
          <router-link to="/" class="navbar-item" v-on:click.native="UpdateNewsRaidData">
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
            <router-link to="/" class="navbar-item" v-on:click.native="UpdateNewsRaidData">
              Главная
            </router-link>
            <div class="navbar-item has-dropdown is-hoverable" v-if="token">
              <a class="navbar-link">
                Профиль
              </a>

              <div class="navbar-dropdown">
                <router-link to="/profile/equipment" class="navbar-item"
                             v-on:click.native="UpdateUserData" v-if="token">Профиль</router-link>
                <router-link to="/profile/settings" class="navbar-item"
                             v-on:click.native="UpdateNewsRaidData" v-if="token">Настройки</router-link>
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
                  <template v-if="adminStatus === 'admin access granted'">
                    <router-link v-on:click.native="UpdateNewsRaidData" v-bind:to="{name: 'raid', params: {id: index}}" class="navbar-item">
                      {{raid["title"]}}
                    </router-link>
                    <hr class="navbar-divider">
                  </template>
                    <template v-if="raid['users'].includes(currentUser['username'])">
                      <router-link v-on:click.native="UpdateNewsRaidData" v-bind:to="{name: 'raid', params: {id: index}}" class="navbar-item">
                        {{raid["title"]}}
                      </router-link>
                      <hr class="navbar-divider">
                    </template>
                  <template v-else></template>
                </div>
                <router-link to="/createraid" class="navbar-item" v-if="adminStatus === 'admin access granted'">
                  Добавить | Изменить
                </router-link>
              </div>
            </div>

            <router-link to="/editmembers" class="navbar-item" v-on:click.native="UpdateMemberData"
                         v-if="adminStatus === 'admin access granted'">
              Ред. состав
            </router-link>
            <template v-if="adminStatus === 'admin access granted' || adminStatus === 'staff access granted'">
              <router-link to="/createnews" class="navbar-item">
                Создать новость
              </router-link>
            </template>
            <template v-else></template>
          </div>
        </div>
      </nav>
      <!--<router-link to="/">Home</router-link>-->
      <!--<router-link to="/members">Members</router-link>-->
    </div>
    <transition name="test" mode="out-in">
      <router-view/>
    </transition>
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
    LoaderBool: {
      get() {
        return store.state.Loader;
      },
      set() {
        store.commit('updateLoader');
      }
    },
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
    currentUser: {
      get() {
        return store.state.currentUser;
      }
    }
  },
  methods : {
    UpdateNewsRaidData: function () {
      store.dispatch("GetAllRaids");
      store.dispatch("GetCurrentRaid");
      store.dispatch("GetNews");
      store.dispatch("GetCurrentUserByToken");
    },
    UpdateMemberData: function () {
      store.dispatch("GetUsers");
    },
    UpdateUserData: function () {
      store.dispatch("GetCurrentUserByToken");
    },
    UpdateLoaderData: function() {
      store.dispatch("PingAPI");
    },
    Logout: function () {
      this.token = '';
      this.adminStatus = '';
    },
    toggleBodyClass: function () {
      let mainThis = this;
      const el = document.body;
      if (mainThis.LoaderBool) {
        mainThis.UpdateNewsRaidData();
        el.classList.add("loaded");
      } else {
        el.classList.remove("loaded");
      }

    }
  },
  // created: function () {
  // },
  // mounted: function () {
  //   this.$nextTick(function () {
  //     window.setInterval(() => {
  //       this.toggleBodyClass();
  //     },3000);
  //   })
  // },
  mounted: function () {
    let mainThis = this;
    let callCount = 1;
    let repeater = setInterval(function () {
      if (callCount < 3) {
        mainThis.UpdateLoaderData();
        mainThis.toggleBodyClass();
        callCount += 1;
      } else {
        clearInterval(repeater);
      }
    }, 3000);
  }
}

</script>

<style lang="scss">
@import "assets/normalize.css";
.test-enter-active,
.test-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.test-enter,
.test-leave-active {
  opacity: 0
}

</style>
