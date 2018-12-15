<template>
  <keep-alive>
    <div class="members has-bg-img">
      <section class="hero section is-fullheight">
        <div class="hero-head">
          <div class="container is-fluid">
            <div class="columns">
              <div class="column is-4">
                <div class="box" v-if="adminStatus === 'admin access granted'">
                  <div class="title has-text-centered">
                    Добавить рейд
                  </div>
                  <div class="field">
                    <label class="label">Название рейда</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Супер-пупер рейд"
                             v-model="title" v-on:input="IsValidForm">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Описание рейда</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Святилище сумерек - 1"
                             v-model="description" v-on:input="IsValidForm">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">День недели</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Понедельник"
                             v-model="day" v-on:input="IsValidForm">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Время</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="00:00 по МСК"
                             v-model="time" v-on:input="IsValidForm">
                    </div>
                  </div>
                  <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                      <button class="button is-success" v-bind:disabled="!isValid" v-on:click="CreateRaid">
                        Создать
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <div class="column is-4">
                <div class="box" v-if="adminStatus === 'admin access granted'">
                  <div class="title has-text-centered">
                    Изменить рейд
                  </div>
                  <div class="field">
                    <label class="label">
                      Выберите рейд
                    </label>
                    <div class="control">
                      <div class="select">
                        <select v-model="chosenRaid" v-on:change="IsValidEditForm">
                          <template v-for="raid in raids">
                            <option v-bind:value="raid['id']">{{raid['title']}}</option>
                          </template>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Новое название рейда</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Супер-пупер рейд"
                             v-model="titleEdit" v-on:input="IsValidEditForm">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Новое описание рейда</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Святилище сумерек - 1"
                             v-model="descriptionEdit" v-on:input="IsValidEditForm">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Изменить день</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Понедельник"
                             v-model="dayEdit" v-on:input="IsValidEditForm">
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Изменить время</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="00:00 по МСК"
                             v-model="timeEdit" v-on:input="IsValidEditForm">
                    </div>
                  </div>
                  <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                      <button class="button is-warning" v-bind:disabled="!isValidEdit" v-on:click="UpdateRaid">
                        Изменить
                      </button>
                    </p>
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

export default {
  name: "CreateRaid",
  data: function () {
    return {
      title: "",
      description: "",
      day: "",
      time: "",
      isValid: false,
      chosenRaid: "",
      titleEdit: "",
      descriptionEdit: "",
      dayEdit: "",
      timeEdit: "",
      isValidEdit: false
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
    raids: {
      get() {
        return store.state.raids;
      },
    },
  },
  methods: {
    IsValidForm: function () {
      if (!this.title || !this.description || !this.day || !this.time) {
        return this.isValid = false;
      }
      else {
        return this.isValid = true;
      }
    },
    IsValidEditForm: function () {
      if (!this.chosenRaid || !this.titleEdit || !this.descriptionEdit || !this.dayEdit || !this.timeEdit) {
        return this.isValidEdit = false;
      }
      else {
        return this.isValidEdit = true;
      }
    },
    CreateRaid: function () {
      let mainThis = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_API_ROOT + "raid/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + mainThis.token
        },
        data: {
          "title": mainThis.title,
          "description": mainThis.description,
          "day": mainThis.day,
          "time": mainThis.time,
          "users": [],
          "equipment": [],
          "accessories": []
        }
      }).then(function (response) {
        mainThis.title = "";
        mainThis.description = "";
        mainThis.day = "";
        mainThis.time = "";
        store.dispatch("GetAllRaids");
      })
    },
    UpdateRaid: function () {
      let mainThis = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_API_ROOT + "admin/raid/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + mainThis.token
        },
        data: {
          "id": mainThis.chosenRaid,
          "title": mainThis.titleEdit,
          "description": mainThis.descriptionEdit,
          "day": mainThis.dayEdit,
          "time": mainThis.timeEdit
        }
      }).then(function (response) {
        mainThis.titleEdit = "";
        mainThis.descriptionEdit = "";
        mainThis.dayEdit = "";
        mainThis.timeEdit = "";
        store.dispatch("GetAllRaids");
      })
    }
  }
}
</script>

<style scoped>
.has-bg-img { background: url('../assets/background5.jpg') no-repeat center center fixed; background-size:cover; }
</style>