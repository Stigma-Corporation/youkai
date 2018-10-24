<template>
  <div class="editcalendar has-bg-img">
    <section class="hero section is-fullheight">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column">
            <div class="box" v-if="currentUser">
              <div class="columns">
                <div class="column is-3">
                  <div class="box">
                    <div class="field">
                      <label class="label">День</label>
                      <div class="control">
                        <div class="select">
                          <select v-model="createEventForm['day']" v-on:change="CheckForm">
                            <template v-for="(value, key, index) in dayMap">
                              <option v-bind:value="key">{{value}}</option>
                            </template>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Начало</label>
                      <div class="control">
                        <div class="select">
                          <select v-model="createEventForm['start']" v-on:change="CheckForm">
                            <template v-for="(value, key, index) in timeMap">
                              <option v-bind:value="value">{{key}}</option>
                            </template>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Название</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="..." maxlength="8"
                               v-model="createEventForm['brief']" v-on:input="CheckForm">
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Описание</label>
                      <div class="control">
                        <textarea class="textarea" rows="2" placeholder="..."
                                  v-model="createEventForm['description']" v-on:input="CheckForm"></textarea>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Важность</label>
                      <div class="control">
                        <div class="select">
                          <select v-model="createEventForm['tag']" v-on:change="CheckForm">
                            <template v-for="(value, key, index) in tagMap">
                              <option v-bind:value="value">{{key}}</option>
                            </template>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="field is-grouped is-grouped-centered">
                      <p class="control">
                        <a class="button is-success" v-bind:disabled="formInvalid" v-on:click="CreateEvent">
                          Создать
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns">
                <template v-for="(item, day_index) in calendar">
                  <div class="column">
                    <div class="box is-paddingless">
                      <h5 class="title is-5 has-text-centered">{{dayMap[item["day"]]}}</h5>
                      <template v-for="(event, event_index) in item['events']">
                        <div class="box">
                          <div class="field">
                            <label class="label">Начало</label>
                            <div class="control">
                              <div class="select">
                                <select v-model="event['start']">
                                  <template v-for="(value, key, index) in timeMap">
                                    <option v-bind:value="value">{{key}}</option>
                                  </template>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="field">
                            <label class="label">Название</label>
                            <div class="control">
                              <input class="input" type="text" placeholder="..." v-model="event['brief']">
                            </div>
                          </div>
                          <div class="field">
                            <label class="label">Описание</label>
                            <div class="control">
                              <textarea class="textarea" placeholder="..." rows="3" v-model="event['description']"></textarea>
                            </div>
                          </div>
                          <div class="field">
                            <label class="label">Важность</label>
                            <div class="control">
                              <div class="select">
                                <select v-model="event['tag']">
                                  <template v-for="(value, key, index) in tagMap">
                                    <option v-bind:value="value">{{key}}</option>
                                  </template>
                                </select>
                              </div>
                            </div>
                          </div>
                          <br>
                          <div class="field">
                            <div class="control">
                              <label class="checkbox">
                                <input type="checkbox" v-bind:value="event_index" v-model="checkedEvent[day_index][event_index]">
                                Точно?
                              </label>
                            </div>
                          </div>
                          <div class="field is-grouped is-grouped-centered">
                            <p class="control">
                              <button class="button is-warning"
                                      v-bind:disabled="!checkedEvent[day_index][event_index]"
                                      v-on:click="UpdateEvent(day_index, event_index)">
                                Изменить
                              </button>
                            </p>
                            <p class="control">
                              <button class="button is-danger"
                                      v-bind:disabled="!checkedEvent[day_index][event_index]"
                                      v-on:click="DeleteEvent(day_index, event_index)">
                                <span class="icon is-small">
                                  <i class="fas fa-times"></i>
                                </span>
                              </button>
                            </p>
                          </div>
                          <br>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";

export default {
  name: "EditCalendar",
  data: function() {
    return {
      formInvalid: true,
      createEventForm: {
        "day": "",
        "start": "",
        "tag": "",
        "brief": "",
        "description": "",
      },
      checkedEvent: [{}, {}, {}, {}, {}, {}, {}],
      dayMap: {"1": "Пн", "2": "Вт", "3": "Ср", "4": "Чт", "5": "Пт", "6": "Сб", "7": "Вс"},
      timeMap: {
        "00:00": "0", "01:00": "1", "02:00": "2", "03:00": "3", "04:00": "4", "05:00": "5", "06:00": "6", "07:00": "7",
        "08:00": "8", "09:00": "9", "10:00": "10", "11:00": "11", "12:00": "12", "13:00": "13", "14:00": "14",
        "15:00": "15", "16:00": "16", "17:00": "17", "18:00": "18", "19:00": "19", "20:00": "20", "21:00": "21",
        "22:00": "22", "23:00": "23", "24:00": "24",
      },
      tagMap: {
        "1 ур.": "1", "2 ур.": "2", "3 ур.": "3"
      },
    }
  },
  computed: {
    token: {
      get() {
        return store.state.token;
      },
    },
    currentUser: {
      get(){
        return store.state.currentUser;
      },
    },
    calendar: {
      get(){
        return store.state.calendar;
      },
    }
  },
  methods: {
    CheckForm: function () {
      let mainThis = this;
      if (mainThis.createEventForm['day'] && mainThis.createEventForm['start'] && mainThis.createEventForm['tag']
        && mainThis.createEventForm['brief'] && mainThis.createEventForm['description']){
        mainThis.formInvalid = false;
      }
      else {
        mainThis.formInvalid = true;
      }
    },
    CreateEvent: function () {
      let mainThis = this;
      let currentDay = mainThis.createEventForm['day'];
      axios({
        method: "post",
        url: process.env.VUE_APP_API_ROOT + "calendar/day/" + currentDay,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          "start": mainThis.createEventForm["start"],
          "tag": mainThis.createEventForm["tag"],
          "brief": mainThis.createEventForm["brief"],
          "description": mainThis.createEventForm["description"],
        }
      }).then(function (response) {
        mainThis.createEventForm = {"day": "", "start": "", "tag": "", "brief": "", "description": "", };
        store.dispatch("GetCalendar");
      })
    },
    UpdateEvent: function (day, event_index) {
      let mainThis = this;
      let currentDay = day+1;
      axios({
        method: "patch",
        url: process.env.VUE_APP_API_ROOT + "calendar/day/" + currentDay + "/event/" + event_index,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          "start": mainThis.calendar[day]["events"][event_index]["start"],
          "tag": mainThis.calendar[day]["events"][event_index]["tag"],
          "brief": mainThis.calendar[day]["events"][event_index]["brief"],
          "description": mainThis.calendar[day]["events"][event_index]["description"],
        }
      }).then(function (response) {
        mainThis.checkedEvent = [{}, {}, {}, {}, {}, {}, {}];
        store.dispatch("GetCalendar");
      })
    },
    DeleteEvent: function (day, event_index) {
      let mainThis = this;
      let currentDay = day+1;
      axios({
        method: "delete",
        url: process.env.VUE_APP_API_ROOT + "calendar/day/" + currentDay + "/event/" + event_index,
      }).then(function (response) {
        mainThis.checkedEvent = [{}, {}, {}, {}, {}, {}, {}];
        store.dispatch("GetCalendar");
      })
    }
  }
}
</script>

<style scoped>
.has-bg-img { background: url('../assets/background7.jpg')center center; background-size:cover; }
</style>