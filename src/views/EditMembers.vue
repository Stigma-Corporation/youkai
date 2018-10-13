<template>
  <keep-alive>
    <div class="profile has-bg-img">
      <section class="hero section is-fullheight">
        <div class="container is-fluid">
          <div class="columns">
            <div class="column">
              <div class="box" v-if="adminStatus === 'admin access granted'">
                <div class="columns">
                  <div class="column is-6">
                    <div class="box is-centered">
                      <div class="columns">
                        <div class="column is-6">
                          <div class="title is-size-5">
                            Генерация пользователей
                          </div>
                          <div class="control">
                            <div class="field">
                              <label class="label">
                                Ранг
                              </label>
                              <div class="select">
                                <select v-model="userType">
                                  <option value="member" selected>Новичок</option>
                                  <option value="staff">Ветеран</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <br>
                          <div class="control">
                            <div class="field">
                              <label class="checkbox">
                                <input type="checkbox" v-model="createCheckbox">
                                Точно?
                              </label>
                            </div>
                            <div class="field is-grouped">
                              <div class="control">
                                <button class="button is-warning" v-bind:disabled="!createCheckbox"
                                        v-on:click="CreateUser(token)">
                                  Создать пользователя
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="column is-6">
                          <div class="title is-size-5">
                            username:
                          </div>
                          <div class="box">
                            <div class="title is-size-6">
                              {{createdUsername}}
                            </div>
                          </div>
                          <div class="title is-size-5">
                            password:
                          </div>
                          <div class="box">
                            <div class="title is-size-6">
                              {{createdPassword}}
                            </div>
                          </div>
                          <div class="box">
                            <input type="hidden" id="testing-copy" :value="loginData">
                            <button class="button is-success"
                                    v-bind:disabled="createdUsername === '' || createdPassword === ''"
                                    v-on:click="CopyData">
                              Копировать
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box" v-if="adminStatus === 'admin access granted'">
                <div class="columns" v-for="(user, index) in allUsers">
                  <div class="column">
                    <div class="box is-centered">
                      <div class="columns">
                        <div class="column">
                          <figure class="image is-24x24">
                            <ImageClasses v-bind:class-number="user['class']"></ImageClasses>
                          </figure>
                        </div>
                        <div class="column">
                          <figure class="image is-24x24">
                            <ImageElements v-bind:element-number="user['equipment']['element']"></ImageElements>
                          </figure>
                        </div>
                        <div class="column is-full">
                          <div class="columns">
                            <div class="column is-2">
                              {{user['first_name']}}
                            </div>
                            <div class="column is-2">
                              {{user['nickname']}}
                            </div>
                            <div class="column is-2">
                              <template v-if="user['role'] === 'admin'">
                                <span class="tag is-black">
                                  {{user['role']}} - Админ
                                </span>
                              </template>
                              <template v-else-if="user['role'] === 'staff'">
                                <span class="tag is-warning">
                                  {{user['role']}} - Ветеран
                                </span>
                              </template>
                              <template v-else-if="user['role'] === 'member'">
                                <template v-if="user['trainee']">
                                  <span class="tag is-success">
                                    {{user['role']}} - Неофит
                                  </span>
                                </template>
                                <template v-else>
                                  <span class="tag is-info">
                                    {{user['role']}} - Ученик
                                  </span>
                                </template>
                              </template>
                              <template v-else>
                                <span class="tag is-info">
                                  {{user['role']}}
                                </span>
                              </template>
                            </div>
                            <div class="column">
                              <template v-if="user['status'] === 'inactive'">
                                <span class="tag is-danger">
                                  Не активен
                                </span>
                                <button class="button is-success" v-on:click="ActivateUser(token, user['username'])">
                                  В списки
                                </button>
                              </template>
                              <template v-else>
                                <span class="tag is-success">
                                  Активен
                                </span>
                                <template v-if="user['role'] !== 'admin'">
                                  <button class="button is-danger" v-on:click="DeactivateUser(token, user['username'])">
                                    Из списков
                                  </button>
                                </template>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </keep-alive>
</template>

<script>
import axios from "axios";
import store from "../store";
import ImageClasses from "@/components/ImageClasses.vue"
import ImageElements from "@/components/ImageElements.vue"

export default {
  name: "editmemebers",
  components: {ImageClasses, ImageElements},
  data: function() {
    return {
      memberStatus: [],
      createCheckbox: false,
      createdUsername: "",
      createdPassword: "",
      userType: "member",
      loginData: "",
    }
  },
  computed: {
    adminStatus: {
      get() {
        return store.state.adminStatus;
      },
    },
    token: {
      get() {
        return store.state.token;
      },
    },
    allUsers: {
      get() {
        return store.state.allUsers;
      }
    },
  },
  methods: {
    CopyData: function () {
      this.loginData = "Твой логин: " + this.createdUsername + " " + "Твой пароль: " + this.createdPassword;
      let testingCodeToCopy = document.querySelector('#testing-copy');
      testingCodeToCopy.setAttribute('type', 'text');
      testingCodeToCopy.select();
      let successful = document.execCommand('copy');
      testingCodeToCopy.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
      // console.log(this.loginData);
      // this.loginData.select();
      // document.execCommand("copy");
    },
    CreateUser: function (token) {
      let mainThis = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_API_ROOT + "account/users/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        data: {
          "first_name": "",
          "nickname": "",
          "class": "1",
          "role": this.userType,
          "equipment": {
            "weapon": "",
            "soul_shields": "",
            "ring": "",
            "earrings": "",
            "necklace": "",
            "belt": "",
            "gloves": "",
            "sphere": "",
            "spirit": "",
            "badge": "",
            "bracelet": "",
            "soul": "",
            "dps": "",
            "element": "1",
            "pendant": ""
          }
        }
      }).then(function (response) {
        mainThis.createdUsername = response.data.username;
        mainThis.createdPassword = response.data.password;
        store.dispatch("GetAllUsers");
      })
    },
    DeactivateUser: function (token, username) {
      axios({
        method: "delete",
        url: process.env.VUE_APP_API_ROOT + "account/user/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        data: {
          "username": username
        }
      }).then(function (response) {
        store.dispatch("GetAllUsers");
      })
    },
    ActivateUser: function (token, username) {
      axios({
        method: "delete",
        url: process.env.VUE_APP_API_ROOT + "account/user/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        data: {
          "username": username,
          "activate": true
        }
      }).then(function (response) {
        store.dispatch("GetAllUsers");
      })
    },
  },
  created: function () {
    store.dispatch("GetAllUsers");
  }
}
</script>

<style scoped>
.has-bg-img { background: url('../assets/background7.jpg')center center; background-size:cover; }
</style>