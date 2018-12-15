<template>
  <keep-alive>
  <div class="members has-bg-img">
    <section class="hero section is-fullheight">
      <div class="hero-head">
        <div class="bg-img"></div>
        <div class="container is-fluid">
          <div class="columns">
            <div class="column">
              <div class="box">
                <transition name="fade">
                  <section class="accordions">
                    <article class="accordion" v-bind:class="{'is-active': settingsAccordion}">
                      <div class="accordion-header toggle has-background-info" v-on:click="changeAccordeon()">
                        <p>Настройки таблицы</p>
                      </div>
                      <div class="accordion-body">
                        <div class="accordion-content has-background-white">
                          <div class="title is-size-5">
                            Отображать поля:
                          </div>
                          <div class="columns" v-for="(fields, index) in hideFields">
                            <template v-for="(field, fieldName, itemIndex) in fields">
                              <div class="column is-2 is-marginless is-paddingless">
                                <div class="field is-fullwidth" style="margin: 5px 0 5px 0">
                                  <!--<input class="is-checkradio is-danger is-circle is-fullwidth" type="checkbox"-->
                                         <!--v-bind:id="'field-' + fieldName" v-on:input="toggleColumn(fieldName)">-->
                                  <input class="is-checkradio is-danger is-circle is-fullwidth" type="checkbox"
                                         v-bind:id="'field-' + fieldName" v-model="fieldsDataController[fieldName]">
                                  <label v-bind:for="'field-' + fieldName">{{fieldName}}</label>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </article>
                  </section>
                </transition>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="box horizontal-scroll">
              <table v-if="token" class="table is-bordered is-narrow is-hoverable is-fullwidth is-size-6 has-text-centered">
              <thead class="has-background-info has-text-white has-text-centered">
                <tr class="has-background-info has-text-white has-text-centered">
                  <template v-for="(field, fieldIndex) in tableFields">
                    <template v-if="field === '№'">
                      <th class="has-text-white has-text-centered"
                          v-show="fieldsDataController[field]">{{field}}</th>
                    </template>
                    <template v-else-if="field === 'Дух'">
                      <th class="has-text-white has-text-centered"
                          v-show="fieldsDataController[field]"><abbr title="Дух Защитник">{{field}}</abbr></th>
                    </template>
                    <template v-else-if="field === 'DPS'">
                      <th class="has-text-white has-text-centered"
                          v-show="fieldsDataController[field]"><abbr title="Урон в секунду">{{field}}</abbr></th>
                    </template>
                    <template v-else>
                      <th class="has-text-white has-text-centered"
                          v-show="fieldsDataController[field]">{{field}}</th>
                    </template>
                  </template>
                </tr>
              </thead>
              <tfoot class="has-background-info has-text-white has-text-centered">
                <tr class="has-background-info has-text-white has-text-centered">
                  <template v-for="(field, fieldIndex) in tableFields">
                    <template v-if="field === '№'">
                      <th class="has-text-white has-text-centered"
                          v-show="fieldsDataController[field]">{{field}}</th>
                    </template>
                    <template v-else-if="field === 'Дух'">
                      <th class="has-text-white has-text-centered"
                          v-show="fieldsDataController[field]"><abbr title="Дух Защитник">{{field}}</abbr></th>
                    </template>
                    <template v-else-if="field === 'DPS'">
                      <th class="has-text-white has-text-centered"
                          v-show="fieldsDataController[field]"><abbr title="Урон в секунду">{{field}}</abbr></th>
                    </template>
                    <template v-else>
                      <th class="has-text-white has-text-centered"
                          v-show="fieldsDataController[field]">{{field}}</th>
                    </template>
                  </template>
                </tr>
              </tfoot>
              <tbody class="has-text-centered">
                <tr v-for="(key, index) in users">
                  <td class="has-text-centered" v-show="fieldsDataController['№']">{{index+1}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Имя']">{{key["first_name"]}}
                    <div v-if="key['trainee']">
                      <abbr title="Неофит"><i class="fas fa-crown has-text-success"></i></abbr></div>
                    <div v-else>
                      <div v-if="key['role'] === 'member'">
                        <abbr title="Ученик"><i class="fas fa-crown has-text-warning"></i></abbr>
                      </div>
                      <div v-else-if="key['role'] === 'staff'">
                        <abbr title="Ветеран"><i class="fas fa-crown staff-color"></i></abbr>
                      </div>
                      <div v-else-if="key['role'] === 'admin'">
                        <abbr title="Admin"><i class="fas fa-crown admin-color"></i></abbr>
                      </div>
                    </div>
                  </td>
                  <td class="has-text-centered" v-show="fieldsDataController['Ник']">{{key["nickname"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Класс']">
                    <div class="box is-centered">
                      <figure class="image is-32x32">
                        <ImageClasses v-bind:class-number="key['class']"></ImageClasses>
                      </figure>
                    </div>
                  </td>
                  <td class="has-text-centered" v-show="fieldsDataController['Оружие']">{{key["equipment"]["weapon"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Триграммы']">{{key["equipment"]["soul_shields"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Ожерелье']">{{key["equipment"]["necklace"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Серьга']">{{key["equipment"]["earrings"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Кольцо']">{{key["equipment"]["ring"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Пояс']">{{key["equipment"]["belt"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Перчатки']">{{key["equipment"]["gloves"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Браслет']">{{key["equipment"]["bracelet"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Сфера']">{{key["equipment"]["sphere"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Дух']">{{key["equipment"]["spirit"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Символ']">{{key["equipment"]["badge"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Душа']">{{key["equipment"]["soul"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Подвеска']">{{key["equipment"]["pendant"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['DPS']">{{key["equipment"]["dps"]}}</td>
                  <td class="has-text-centered" v-show="fieldsDataController['Стихия']">
                    <div class="box is-centered">
                      <figure class="image is-32x32">
                        <ImageElements v-bind:element-number="key['equipment']['element']"></ImageElements>
                      </figure>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  </keep-alive>
</template>

<script>
// @ is an alias to /src
import Loader from "@/components/Loader.vue"
import NavbarLogo from "@/components/NavbarLogo.vue"
import ImageClasses from "@/components/ImageClasses.vue"
import ImageElements from "@/components/ImageElements.vue"
import store from "../store";
import bulmaAccordion from "bulma-extensions/bulma-accordion/dist/js/bulma-accordion.min"

export default {
  name: "members",
  components: {Loader, NavbarLogo, ImageClasses, ImageElements},
  data: function () {
    return {
      tableFields: [
        "№", "Имя", "Ник", "Класс", "Оружие", "Триграммы", "Ожерелье", "Серьга", "Кольцо", "Пояс",
        "Перчатки", "Браслет", "Сфера", "Дух", "Символ", "Душа", "Подвеска", "DPS", "Стихия"
      ],
      hideFields: [
        {"№": false, "Имя": false, "Ник": false, "Класс": false, "Оружие": false},
        {"Триграммы": false, "Ожерелье": true, "Серьга": true, "Кольцо": true, "Пояс": true},
        {"Перчатки": true, "Браслет": true, "Сфера": false, "Дух": false, "Символ": false},
        {"Душа": false, "Подвеска": false, "DPS": false, "Стихия": false}
      ],
      fieldsDataController: {
        "№": true, "Имя": true, "Ник": true, "Класс": true, "Оружие": true,
        "Триграммы": true, "Ожерелье": false, "Серьга": false, "Кольцо": false, "Пояс": false,
        "Перчатки": false, "Браслет": false, "Сфера": true, "Дух": true, "Символ": false,
        "Душа": true, "Подвеска": false, "DPS": true, "Стихия": true
      },
      settingsAccordion: false,
    }
  },
  computed: {
    token: {
      get() {
        return store.state.token;
      },
    },
    users: {
      get(){
        return store.state.users;
      },
    }
  },
  methods: {
    changeAccordeon: function () {
      this.settingsAccordion = !this.settingsAccordion;
    },
    toggleColumn: function (fieldname) {
      this.fieldsDataController[fieldname] = !this.fieldsDataController[fieldname]
    }
  },
  created: function () {
    store.dispatch("GetUsers");
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma-extensions/bulma-checkradio/dist/css/bulma-checkradio.min.css";
@import "~bulma-extensions/bulma-tooltip/dist/css/bulma-tooltip.min.css";
@import "~bulma-extensions/bulma-accordion/dist/css/bulma-accordion.min.css";

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.horizontal-scroll {
  overflow-x: scroll !important;
  overflow-y: hidden !important;
}
table,
td,
th {
  border-collapse: collapse;
}
table td{
  vertical-align: middle !important;
}
table th{
  vertical-align: middle !important;
}
.is-vertical-center{
  text-align: center;
  justify-content: start;
  align-content: start;

  align-items: start;
  justify-items: start;

  justify-self: start;
  align-self: start;
}
.staff-color{
  color: #ff9933;
}
.admin-color{
  color: black;
}
.has-bg-img { background: url('../assets/background.jpg') no-repeat center center fixed; background-size:cover; }
</style>
