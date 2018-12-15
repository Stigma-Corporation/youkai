<template>
    <div class="raid has-bg-img">
      <section class="hero section is-fullheight">
        <div class="container is-fluid">
          <div class="columns" v-if="token && currentRaid && users">
            <div class="column is-one-third">
              <div class="box">
                <div class="is-size-3 has-text-centered has-text-black">
                  {{currentRaid['title']}}
                </div>
                <div class="is-seze-5 has-text-centered has-text-black">
                  {{currentRaid['description']}}
                </div>
                <div class="box has-background-danger has-text-white">
                  <div class="is-size-4">
                    День: {{currentRaid['day']}}
                  </div>
                  <div class="is-size-4">
                    Время: {{currentRaid['time']}}
                  </div>
                </div>
                <div class="is-size-4 has-text-centered has-text-black">
                  Состав
                </div>
                <div class="box">
                  <div class="is-size-5 has-text-centered" v-for="username in currentRaid['users']">
                    <div v-for="user in users">
                      <div v-if="user['username'] === username">
                        <table class="table is-hoverable is-fullwidth">
                          <tbody>
                            <tr>
                              <td style="width: 32px">
                                <figure class="image is-32x32 has-text-centered">
                                  <ImageClasses v-bind:class-number="user['class']"></ImageClasses>
                                </figure>
                              </td>
                              <td class="has-text-left">{{user['nickname']}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <!--<div>Рейд № {{$route.params.id}}</div>-->
                <!--<div>Рейд № {{raidId}}</div>-->
                <!--<div>{{currentRaid}}</div>-->
              </div>

              <div class="box" v-if="adminStatus === 'admin access granted'">
                <div class="is-size-4 has-text-centered has-text-black">
                  Изменение состава
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="select">
                      <select v-model="selectedUser">
                        <option value="">Выбрать человека</option>
                        <template v-for="user in users">
                          <option v-bind:value="user['username']">{{user['nickname']}}</option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="column">
                    <div class="buttons">
                      <div class="button is-success" v-bind:disabled="!selectedUser"
                           v-on:click="AddUserToRaid">
                        Добавить
                      </div>
                      <div class="button is-danger" v-bind:disabled="!selectedUser"
                           v-on:click="DeleteUserFromRaid">
                        Убрать
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="box" v-if="adminStatus === 'admin access granted'">
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Название вещи</label>
                      <div class="control">
                        <input class="input" type="text" v-model="itemName">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Описание</label>
                      <div class="control">
                        <textarea class="textarea" v-model="itemDescription"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <label class="label">Тип</label>
                    <div class="field is-grouped">
                      <div class="control">
                        <div class="select">
                          <select v-model="selectedItemType">
                            <option value="" selected disabled></option>
                            <option value="equipment">Основное</option>
                            <option value="accessories">Прочее</option>
                          </select>
                        </div>
                      </div>
                      <div class="control">
                        <button class="button is-success"
                                v-bind:disabled="!itemName || !itemDescription || !selectedItemType"
                                v-on:click="AddItemToRaid">
                          Добавить в рейд
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--<div class="box" v-else-if="adminStatus === 'staff access granted'">-->
                <!--<div class="columns">-->
                  <!--<div class="column">-->
                    <!--value-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <div class="box" v-if="adminStatus === 'admin access granted'">
                <div class="columns">
                  <div class="column">
                    <div class="is-size-4 has-text-centered has-text-black">
                      Удаление рейда
                    </div>
                    <input class="input" type="text" placeholder="ADMIN TOKEN"
                           v-model="reallyDelete">
                    <button class="button is-danger"
                            v-if="reallyDelete === applyToken"
                            v-on:click="DeleteRaid">Удалить!</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="box">
                <!--<div>Рейд № {{$route.params.id}}</div>-->
                <!--<div>Рейд № {{raidId}}</div>-->
                <div class="is-size-3 has-text-centered has-text-black">
                  Основное
                </div>

                <div v-for="(equip, eqindex) in currentRaid['equipment']">
                  <div style="margin-bottom: 0" class="box has-background-info">
                    <div class="columns">
                      <div class="column is-half">
                        <div class="box is-marginless is-paddingless" v-if="adminStatus === 'admin access granted'">
                          <input class="input" type="text" placeholder="ADMIN TOKEN"
                                 v-model="reallyDeleteEquipment[eqindex]">
                          <button class="button is-danger"
                                  v-if="reallyDeleteEquipment[eqindex] === applyToken"
                                  v-on:click="DeleteItemFromRaid('equipment', eqindex)">Удалить!</button>
                        </div>
                        <div style="margin: 0 0 10px 0" class="box tooltip is-tooltip-bottom is-tooltip-multiline" v-bind:data-tooltip="equip['description']">
                          {{equip['title']}}
                        </div>
                        <!--<div class="box">-->
                          <!--{{equip['description']}}-->
                        <!--</div>-->
                        <div class="buttons">
                          <button class="button is-success" v-on:click="AddUserToQueue(token, eqindex, 'equipment')">
                            Записаться
                          </button>
                          <button class="button is-danger"
                                  v-bind:disabled="!checked[eqindex]"
                                  v-on:click="DeleteUserFromQueue(token, eqindex, 'equipment')">
                            Отписаться
                          </button>
                          <label class="checkbox">
                            <input type="checkbox" v-bind:value="eqindex" v-model="checked[eqindex]">
                            Точно?
                          </label>
                        </div>
                      </div>
                      <div class="column is-half">
                        <div class="box" v-if="equip['queue'].length > 0">
                          <table class="table is-hoverable is-fullwidth has-text-centered">
                            <tbody v-for="userinqueue in equip['queue']">
                              <template v-for="(status, username) in userinqueue">
                                <template v-for="user in users">
                                  <template v-if="user['username'] === username">
                                    <tr class="is-fullwidth">
                                      <td>{{user['nickname']}}</td>
                                      <td class="has-text-right" v-if="status === 'granted'">
                                        <span class="tag is-success">Выдано</span>
                                      </td>
                                      <td class="has-text-right" v-else-if="status === 'skips'">
                                        <span class="tag is-danger">Пропускает</span>
                                      </td>
                                      <td class="has-text-right" v-else><span class="tag is-info">В очереди</span></td>
                                    </tr>
                                  </template>
                                </template>
                              </template>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br>
                </div>
              </div>
              <div class="box">
                <div class="is-size-3 has-text-centered has-text-black">
                  Прочее
                </div>

                <div v-for="(equip, eqindex) in currentRaid['accessories']">
                  <div style="margin-bottom: 0" class="box has-background-info">
                    <div class="columns">
                      <div class="column is-half">
                        <div class="box is-marginless is-paddingless" v-if="adminStatus === 'admin access granted'">
                          <input class="input" type="text" placeholder="ADMIN TOKEN"
                                 v-model="reallyDeleteAccessories[eqindex]">
                          <button class="button is-danger"
                                  v-if="reallyDeleteAccessories[eqindex] === applyToken"
                                  v-on:click="DeleteItemFromRaid('accessories', eqindex)">Удалить!</button>
                        </div>
                        <div style="margin: 0 0 10px 0" class="box tooltip is-tooltip-bottom is-tooltip-multiline" v-bind:data-tooltip="equip['description']">
                          {{equip['title']}}
                        </div>
                        <!--<div class="box">-->
                          <!--{{equip['description']}}-->
                        <!--</div>-->
                        <div class="buttons">
                          <button class="button is-success" v-on:click="AddUserToQueue(token, eqindex, 'accessories')">
                            Записаться
                          </button>
                          <button class="button is-danger"
                                  v-bind:disabled="!checked2[eqindex]"
                                  v-on:click="DeleteUserFromQueue(token, eqindex, 'accessories')">
                            Отписаться
                          </button>
                          <label class="checkbox">
                            <input type="checkbox" v-bind:value="eqindex" v-model="checked2[eqindex]">
                            Точно?
                          </label>
                        </div>
                      </div>
                      <div class="column is-half">
                        <div class="box" v-if="equip['queue'].length > 0">
                          <table class="table is-hoverable is-fullwidth has-text-centered">
                            <tbody v-for="userinqueue in equip['queue']">
                              <template v-for="(status, username) in userinqueue">
                                <template v-for="user in users">
                                  <template v-if="user['username'] === username">
                                    <tr class="is-fullwidth">
                                      <td>{{user['nickname']}}</td>
                                      <td class="has-text-right" v-if="status === 'granted'">
                                        <span class="tag is-success">Выдано</span>
                                      </td>
                                      <td class="has-text-right" v-else-if="status === 'skips'">
                                        <span class="tag is-danger">Пропускает</span>
                                      </td>
                                      <td class="has-text-right" v-else><span class="tag is-info">В очереди</span></td>
                                    </tr>
                                  </template>
                                </template>
                              </template>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import router from "../router";
import ImageClasses from "./ImageClasses";

export default {
  name: "OneRaid",
  props: ['raidId'],
  components: {ImageClasses},
  data: function () {
    return {
      checked: [],
      checked2: [],
      reallyDeleteEquipment: [],
      reallyDeleteAccessories: [],
      reallyDelete: "",
      applyToken: process.env.VUE_APP_ADMIN_TOKEN,
      selectedUser: "",
      itemName: "",
      itemDescription: "",
      selectedItemType: "",

    }
  },
  computed: {
    token: {
      get() {
        return store.state.token;
      },
      set(value) {
        store.commit("updateToken", value)
      }
    },
    adminStatus: {
      get() {
        return store.state.adminStatus;
      },
    },
    currentRaidId: {
      get() {
        return store.state.raidId;
      },
      set(value){
        store.commit("updateCurrentRaidId", value)
      }
    },
    currentRaid: {
      get() {
        return store.state.raids[this.raidId]
      }
    },
    currentUser:{
      get(){
        return store.state.currentUser;
      },
    },
    users: {
      get(){
        return store.state.users;
      },
    },
  },
  methods: {
    AddUserToQueue: function (token, itemNumber, queueType) {
      let mainThis = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_API_ROOT + "raid/users/queue/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        data: {
          "id": mainThis.currentRaid["id"],
          "username": mainThis.currentUser["username"],
          "item_number": itemNumber,
          "status": "queue",
          "queue_type": queueType,
          "position": mainThis.currentRaid[queueType][itemNumber]["queue"].length
        }
      }).then(function (response) {
        store.dispatch("GetAllRaids");
        store.dispatch("GetCurrentRaid");
      })
    },
    DeleteUserFromQueue: function (token, itemNumber, queueType) {
      let mainThis = this;
      axios({
        method: "delete",
        url: process.env.VUE_APP_API_ROOT + "raid/users/queue/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        data: {
          "id": mainThis.currentRaid["id"],
          "username": mainThis.currentUser["username"],
          "item_number": itemNumber,
          "queue_type": queueType
        }
      }).then(function (response) {
        store.dispatch("GetAllRaids");
        store.dispatch("GetCurrentRaid");
      })
    },
    AddUserToRaid: function () {
      let mainThis = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_API_ROOT + "raid/users/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + mainThis.token
        },
        data: {
          "id": mainThis.currentRaid["id"],
          "username": mainThis.selectedUser,
        }
      }).then(function (response) {
        store.dispatch("GetAllRaids");
        store.dispatch("GetCurrentRaid");
      })
    },
    DeleteUserFromRaid: function () {
      let mainThis = this;
      axios({
        method: "delete",
        url: process.env.VUE_APP_API_ROOT + "raid/users/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + mainThis.token
        },
        data: {
          "id": mainThis.currentRaid["id"],
          "username": mainThis.selectedUser,
        }
      }).then(function (response) {
        store.dispatch("GetAllRaids");
        store.dispatch("GetCurrentRaid");
      })
    },
    AddItemToRaid: function () {
      let mainThis = this;
      axios({
        method: "put",
        url: process.env.VUE_APP_API_ROOT + "raid/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + mainThis.token
        },
        data: {
          "id": mainThis.currentRaid["id"],
          "type": mainThis.selectedItemType,
          "title": mainThis.itemName,
          "description": mainThis.itemDescription,
          "queue": []
        }
      }).then(function (response) {
        mainThis.selectedItemType = "";
        mainThis.itemName = "";
        mainThis.itemDescription = "";
        store.dispatch("GetAllRaids");
        store.dispatch("GetCurrentRaid");
      })
    },
    DeleteItemFromRaid: function (item_type, item_number) {
      let mainThis = this;
      axios({
        method: "patch",
        url: process.env.VUE_APP_API_ROOT + "raid/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + mainThis.token
        },
        data: {
          "id": mainThis.currentRaid["id"],
          "type": item_type,
          "item_number": item_number.toString()
        }
      }).then(function (response) {
        mainThis.reallyDeleteEquipment = [];
        mainThis.reallyDeleteAccessories = [];
        store.dispatch("GetAllRaids");
        store.dispatch("GetCurrentRaid");
      })
    },
    DeleteRaid: function () {
      let mainThis = this;
      axios({
        method: "delete",
        url: process.env.VUE_APP_API_ROOT + "raid/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + mainThis.token
        },
        data: {
          "id": mainThis.currentRaid["id"]
        }
      }).then(function (response) {
        mainThis.reallyDelete = "";
        store.dispatch("GetAllRaids");
        store.dispatch("GetCurrentRaid");
      })
    },
  },
  beforeUpdate: function (){
    this.currentRaidId = this.raidId;
  },
  created: function () {
    this.currentRaidId = this.raidId;
    store.dispatch("GetAllRaids");
    store.dispatch("GetCurrentRaid");
    store.dispatch("GetUsers");
    store.dispatch("GetCurrentUserByToken");
  }
}
</script>

<style scoped>

</style>