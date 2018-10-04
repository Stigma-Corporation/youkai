<template>
  <div id="app">
    <div class="container is-fluid">
      <div class="modal" v-bind:class="{ 'is-active': LoginModal }">
        <div class="modal-background"></div>
        <div class="modal-content">
          <!-- Any other Bulma elements you want -->
        </div>
        <button class="modal-close is-large" aria-label="close" v-on:click="LoginModal = !LoginModal"></button>
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
              <div class="buttons">
                <a class="button is-success" v-on:click="LoginModal = !LoginModal">
                  Войти
                </a>
              </div>
            </div>
            <router-link to="/" class="navbar-item">Главная</router-link>
            <router-link to="/members" class="navbar-item">Состав</router-link>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Рейды
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  Raven 1
                </a>
                <a class="navbar-item">
                  Raven 2
                </a>
                <a class="navbar-item">
                  Julia 1
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item">
                  Battleground
                </a>
              </div>
            </div>
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

export default {
  components: {Loader, NavbarLogo},
  data: function () {
    return {
      LoginModal: false
    }
  }
}

</script>

<style lang="scss" scoped>
@import "assets/normalize.css";
</style>
