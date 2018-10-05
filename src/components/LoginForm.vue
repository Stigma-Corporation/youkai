<template>
  <div class="box">
    <div class="field">
      <label class="label">Пользователь</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" maxlength="8" placeholder="Пользователь"
               v-model="username" v-on:input="ValidateForm" v-bind:class="{ 'is-danger': usernameErrors }">
        <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
      </span>
            <span class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
      </div>
      <p class="help is-danger" v-if="usernameErrors">{{usernameErrors}}</p>
      <p class="help is-danger" v-if="usernameBackErrors">Такого пользователя не существует!</p>
    </div>

    <div class="field">
      <label class="label">Пароль</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" maxlength="4" placeholder="Пароль"
               v-model="password" v-on:input="ValidateForm" v-bind:class="{ 'is-danger': passwordErrors }">
        <span class="icon is-small is-left">
    <i class="fas fa-key"></i>
      </span>
            <span class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
      </div>
      <p class="help is-danger" v-if="passwordErrors">{{passwordErrors}}</p>
      <p class="help is-danger" v-if="passwordBackErrors">Пароль не верный!</p>
    </div>

    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-success is-rounded" v-bind:disabled="notValid" v-on:click="GetToken(username, password)">
          Войти
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";

  export default {
    name: "LoginForm",
    data: function () {
      return {
        "username": "user-",
        "usernameErrors": "",
        "usernameBackErrors": "",
        "password": "",
        "passwordErrors": "",
        "passwordBackErrors": "",
        "notValid": true
      }
    },
    methods:{
      GetToken: function (username, password) {
        let mainThis = this;
        mainThis.usernameBackErrors = "";
        mainThis.passwordBackErrors = "";
        axios({
          method: "post",
          url: "http://192.168.1.100:8000/account/login",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            "username": username,
            "password": password
          }
        }).then(function (response) {
          console.log(response.data);
          if (response.data.token){
            mainThis.username = "user-";
            mainThis.password = "";
            store.commit("updateToken", response.data.token);
            store.commit("updateLoginModal")
          }
          else {
            // console.log(response.data.message);
            if (response.data.message === "user doesn't exists") {
              mainThis.usernameBackErrors = response.data.message;
            }
            else if (response.data.message === "invalid password") {
              mainThis.passwordBackErrors = response.data.message;
            }
          }
        })
      },
      ValidateForm: function () {
        let mainThis = this;
        mainThis.usernameBackErrors = "";
        mainThis.passwordBackErrors = "";
        if (mainThis.username.length < 6){
          mainThis.usernameErrors = "Имя пользователя должно быть не менее 6 символов!"
        }
        else {
          mainThis.usernameErrors = ""
        }
        if (mainThis.password.length === 4 ){
          mainThis.passwordErrors = ""
        }
        else {
          mainThis.passwordErrors = "Пароль должен состоять из 4 символов!"
        }
        mainThis.notValid = !(!mainThis.usernameErrors && !mainThis.passwordErrors);
      }
    }
  }
</script>

<style scoped>

</style>