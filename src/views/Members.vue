<template>
  <div class="members">
    <section class="section">
      <div class="container is-fluid">
        <div class="columns">
          <table class="table is-bordered is-narrow is-hoverable table is-fullwidth is-size-6 has-text-centered">
            <thead class="has-text-white-bis has-text-centered">
            <tr class="has-text-centered">
              <th class="has-text-centered">№</th>
              <th class="has-text-centered">Имя</th>
              <th class="has-text-centered">Никнейм</th>
              <th class="has-text-centered">Класс</th>
              <th class="has-text-centered">Оружие</th>
              <th class="has-text-centered">Триграммы</th>
              <th class="has-text-centered">Ожерелье</th>
              <th class="has-text-centered">Серьга</th>
              <th class="has-text-centered">Кольцо</th>
              <th class="has-text-centered">Пояс</th>
              <th class="has-text-centered">Перчатки</th>
              <th class="has-text-centered">Сфера</th>
              <th class="has-text-centered"><abbr title="Дух Защитник">Дух</abbr></th>
              <th class="has-text-centered">Символ</th>
              <th class="has-text-centered">Душа</th>
              <th class="has-text-centered">Подвеска</th>
              <th class="has-text-centered"><abbr title="Урон в секунду">DPS</abbr></th>
              <th class="has-text-centered">Стихия</th>
            </tr>
            </thead>
            <tfoot class="has-text-centered">
            <tr class="has-text-centered">
              <th class="has-text-centered">№</th>
              <th class="has-text-centered">Имя</th>
              <th class="has-text-centered">Никнейм</th>
              <th class="has-text-centered">Класс</th>
              <th class="has-text-centered">Оружие</th>
              <th class="has-text-centered">Триграммы</th>
              <th class="has-text-centered">Ожерелье</th>
              <th class="has-text-centered">Серьга</th>
              <th class="has-text-centered">Кольцо</th>
              <th class="has-text-centered">Пояс</th>
              <th class="has-text-centered">Перчатки</th>
              <th class="has-text-centered">Сфера</th>
              <th class="has-text-centered"><abbr title="Дух Защитник">Дух</abbr></th>
              <th class="has-text-centered">Символ</th>
              <th class="has-text-centered">Душа</th>
              <th class="has-text-centered">Подвеска</th>
              <th class="has-text-centered"><abbr title="Урон в секунду">DPS</abbr></th>
              <th class="has-text-centered">Стихия</th>
            </tr>
            </tfoot>
            <tbody class="has-text-centered">
            <tr v-for="(key, index) in users">
              <td class="has-text-centered">{{index}}</td>
              <td class="has-text-centered">{{key["first_name"]}}<div v-if="key['trainee']">
                <abbr title="Новичок"><i class="fas fa-crown has-text-success"></i></abbr></div>
                <div v-else><abbr title="Ветеран"><i class="fas fa-crown has-text-warning"></i></abbr></div>
              </td>
              <td class="has-text-centered">{{key["nickname"]}}</td>
              <td class="has-text-centered">{{key["class"]}}</td>
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
              <td class="has-text-centered">{{key["equipment"]["element"]}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Loader from "@/components/Loader.vue"
import NavbarLogo from "@/components/NavbarLogo.vue"
import axios from "axios";

export default {
  name: "members",
  components: {Loader, NavbarLogo},
  data: function () {
    return {
      users: []
    }
  },
  methods: {
    GetUsers: function () {
      let mainThis = this;
      axios({
        method: "get",
        url: "http://192.168.1.100:8000/account/users",
        headers: {
          "Authorization": "Token PcSAersJxeoZqxQZtGbugA"
        }
      }).then(function (response) {
        console.log(response);
        mainThis.users = response.data;
      })
    },
  },
  beforeMount: function () {
    this.GetUsers()
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
    justify-content: end;
    align-content: end;

    align-items: end;
    justify-items: end;

    justify-self: end;
    align-self: end;
  }
</style>