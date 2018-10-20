<template>
  <keep-alive>
  <div class="members has-bg-img">
    <section class="hero section is-fullheight">
      <div class="hero-head">
        <div class="bg-img"></div>
        <div class="container is-fluid">
          <div class="columns">
            <div class="box horizontal-scroll">
              <table v-if="token" class="table is-bordered is-narrow is-hoverable is-fullwidth is-size-6 has-text-centered">
              <thead class="has-background-info has-text-white has-text-centered">
                <tr class="has-background-info has-text-white has-text-centered">
                  <template v-for="field in tableFields">
                    <template v-if="field === 'Дух'">
                      <th class="has-text-white has-text-centered"><abbr title="Дух Защитник">{{field}}</abbr></th>
                    </template>
                    <template v-else-if="field === 'DPS'">
                      <th class="has-text-white has-text-centered"><abbr title="Урон в секунду">{{field}}</abbr></th>
                    </template>
                    <template v-else>
                      <th class="has-text-white has-text-centered">{{field}}</th>
                    </template>
                  </template>
                </tr>
              </thead>
              <tfoot class="has-background-info has-text-white has-text-centered">
                <tr class="has-background-info has-text-white has-text-centered">
                  <template v-for="field in tableFields">
                    <template v-if="field === 'Дух'">
                      <th class="has-text-white has-text-centered"><abbr title="Дух Защитник">{{field}}</abbr></th>
                    </template>
                    <template v-else-if="field === 'DPS'">
                      <th class="has-text-white has-text-centered"><abbr title="Урон в секунду">{{field}}</abbr></th>
                    </template>
                    <template v-else>
                      <th class="has-text-white has-text-centered">{{field}}</th>
                    </template>
                  </template>
                </tr>
              </tfoot>
              <tbody class="has-text-centered">
                <tr v-for="(key, index) in users">
                  <td class="has-text-centered">{{index+1}}</td>
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
                      <div v-else-if="key['role'] === 'admin'">
                        <abbr title="Admin"><i class="fas fa-crown admin-color"></i></abbr>
                      </div>
                    </div>
                  </td>
                  <td class="has-text-centered">{{key["nickname"]}}</td>
                  <td class="has-text-centered">
                    <div class="box is-centered">
                      <figure class="image is-32x32">
                        <ImageClasses v-bind:class-number="key['class']"></ImageClasses>
                      </figure>
                    </div>
                  </td>
                  <td class="has-text-centered">{{key["equipment"]["weapon"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["soul_shields"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["necklace"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["earrings"]}}</td>
                  <td class="has-text-centered is-vertical-center">{{key["equipment"]["ring"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["belt"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["gloves"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["bracelet"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["sphere"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["spirit"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["badge"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["soul"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["pendant"]}}</td>
                  <td class="has-text-centered">{{key["equipment"]["dps"]}}</td>
                  <td class="has-text-centered">
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

export default {
  name: "members",
  components: {Loader, NavbarLogo, ImageClasses, ImageElements},
  data: function () {
    return {
      tableFields: [
        "№", "Имя", "Ник", "Класс", "Оружие", "Триграммы", "Ожерелье", "Серьга", "Кольцо", "Пояс",
        "Перчатки", "Браслет", "Сфера", "Дух", "Символ", "Душа", "Подвеска", "DPS", "Стихия"
      ]
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
  },
  created: function () {
    store.dispatch("GetUsers");
  }
}
</script>

<style lang="scss" scoped>
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
.has-bg-img { background: url('../assets/background.jpg')center center; background-size:cover; }
</style>
