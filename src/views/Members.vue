<template>
  <keep-alive>
  <div class="members has-bg-img">
    <section class="hero section is-fullheight">
      <div class="hero-head">
        <div class="bg-img"></div>
        <div class="container is-fluid">
          <div class="columns">
            <button class="button" v-on:dblclick="GetUsers(token)">
              Обновить
            </button>
          </div>
          <div class="columns">
            <table v-if="token" class="table is-bordered is-narrow is-hoverable table is-fullwidth is-size-6 has-text-centered">
              <thead class="has-background-info has-text-white has-text-centered">
              <tr class="has-background-info has-text-white has-text-centered">
                <th class="has-text-white has-text-centered">№</th>
                <th class="has-text-white has-text-centered">Имя</th>
                <th class="has-text-white has-text-centered">Ник</th>
                <th class="has-text-white has-text-centered">Класс</th>
                <th class="has-text-white has-text-centered">Оружие</th>
                <th class="has-text-white has-text-centered">Триграммы</th>
                <th class="has-text-white has-text-centered">Ожерелье</th>
                <th class="has-text-white has-text-centered">Серьга</th>
                <th class="has-text-white has-text-centered">Кольцо</th>
                <th class="has-text-white has-text-centered">Пояс</th>
                <th class="has-text-white has-text-centered">Перчатки</th>
                <th class="has-text-white has-text-centered">Сфера</th>
                <th class="has-text-white has-text-centered"><abbr title="Дух Защитник">Дух</abbr></th>
                <th class="has-text-white has-text-centered">Символ</th>
                <th class="has-text-white has-text-centered">Душа</th>
                <th class="has-text-white has-text-centered">Подвеска</th>
                <th class="has-text-white has-text-centered"><abbr title="Урон в секунду">DPS</abbr></th>
                <th class="has-text-white has-text-centered">Стихия</th>
              </tr>
              </thead>
              <tfoot class="has-background-info has-text-white has-text-centered">
              <tr class="has-background-info has-text-white has-text-centered">
                <th class="has-text-white has-text-centered">№</th>
                <th class="has-text-white has-text-centered">Имя</th>
                <th class="has-text-white has-text-centered">Ник</th>
                <th class="has-text-white has-text-centered">Класс</th>
                <th class="has-text-white has-text-centered">Оружие</th>
                <th class="has-text-white has-text-centered">Триграммы</th>
                <th class="has-text-white has-text-centered">Ожерелье</th>
                <th class="has-text-white has-text-centered">Серьга</th>
                <th class="has-text-white has-text-centered">Кольцо</th>
                <th class="has-text-white has-text-centered">Пояс</th>
                <th class="has-text-white has-text-centered">Перчатки</th>
                <th class="has-text-white has-text-centered">Сфера</th>
                <th class="has-text-white has-text-centered"><abbr title="Дух Защитник">Дух</abbr></th>
                <th class="has-text-white has-text-centered">Символ</th>
                <th class="has-text-white has-text-centered">Душа</th>
                <th class="has-text-white has-text-centered">Подвеска</th>
                <th class="has-text-white has-text-centered"><abbr title="Урон в секунду">DPS</abbr></th>
                <th class="has-text-white has-text-centered">Стихия</th>
              </tr>
              </tfoot>
              <tbody class="has-text-centered">
              <tr v-for="(key, index) in users">
                <td class="has-text-centered">{{index}}</td>
                <td class="has-text-centered">{{key["first_name"]}}
                  <div v-if="key['trainee']">
                    <abbr title="Неофит"><i class="fas fa-crown has-text-success"></i></abbr></div>
                  <div v-else>
                    <div v-if="key['role'] === 'member'">
                      <abbr title="Ученик"><i class="fas fa-crown has-text-warning"></i></abbr>
                    </div>
                    <div v-else-if="key['role'] === 'staff'">
                      <abbr title="Ветеран"><i class="fas fa-crown staff-color"></i></abbr>
                    </div>
                    <div v-else><abbr title="Глава"><i class="fas fa-crown admin-color"></i></abbr></div>
                  </div>
                </td>
                <td class="has-text-centered">{{key["nickname"]}}</td>
                <td class="has-text-centered"><ImageClasses v-bind:class-number="key['class']"></ImageClasses></td>
                <td class="has-text-centered">{{key["equipment"]["weapon"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["soul_shields"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["necklace"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["earrings"]}}</td>
                <td class="has-text-centered is-vertical-center">{{key["equipment"]["ring"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["belt"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["gloves"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["sphere"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["spirit"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["badge"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["soul"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["pendant"]}}</td>
                <td class="has-text-centered">{{key["equipment"]["dps"]}}</td>
                <td class="has-text-centered"><ImageElements v-bind:element-number="key['equipment']['element']"></ImageElements></td>
              </tr>
              </tbody>
            </table>
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
import axios from "axios";
import store from "../store";

export default {
  name: "members",
  components: {Loader, NavbarLogo, ImageClasses, ImageElements},
  data: function () {
    return {
      activeLoading: false,
      // users: null
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
      set(value){
        store.commit("updateUsers", value)
      }
    }
  },
  methods: {
    GetUsers: function (token) {
      let mainThis = this;
      axios({
        method: "get",
        url: "http://192.168.1.100:8000/account/users",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        }
      }).then(function (response) {
        mainThis.users = response.data;
      })
    },
  },
  beforeMount: function () {
    this.GetUsers(this.token)
  }
}
</script>

<style lang="scss" scoped>
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
  color: #ff3300;
}
.has-bg-img { background: url('../assets/background.jpg')center center; background-size:cover; }
</style>