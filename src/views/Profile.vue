<template>
  <keep-alive>
    <div class="profile has-bg-img">
      <section class="hero section is-fullheight">
        <div class="container is-fluid">
          <div class="columns">
            <div class="column">
              <div class="box" v-if="currentUser">
                <div class="columns">
                  <div class="column">
                    <div class="box">
                      <div class="is-size-4 has-text-centered has-text-black">
                        Общая информация
                      </div>
                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Имя</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['first_name']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Никнейм</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['nickname']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="column">
                          <div class="columns">
                            <div class="column is-four-fifths">
                              <div class="field">
                                <label class="label">Класс</label>
                                <div class="select is-fullwidth">
                                  <select v-model="currentUser['class']">
                                    <option v-for="classname in classes" :value="classname[1]">
                                      {{classname[0]}}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div class="column">
                              <div class="box is-centered">
                                <figure class="image is-32x32">
                                  <ImageClasses v-bind:class-number="currentUser['class']"></ImageClasses>
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="column">
                          <div class="columns">
                            <div class="column is-four-fifths">
                              <div class="field">
                                <label class="label">Стихия</label>
                                <div class="select is-fullwidth">
                                  <select v-model="currentUser['equipment']['element']">
                                    <option v-for="element in elements" :value="element[1]">
                                      {{element[0]}}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div class="column">
                              <div class="box is-centered">
                                <figure class="image is-32x32">
                                  <ImageElements v-bind:element-number="currentUser['equipment']['element']"></ImageElements>
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div class="box">
                      <div class="is-size-4 has-text-centered has-text-black">
                        Бижутерия
                      </div>
                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Ожерелье</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['necklace']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Серьга</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['earrings']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Кольцо</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['ring']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Пояс</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['belt']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Перчатки</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['gloves']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Браслет</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['bracelet']">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div class="column">
                    <div class="box">
                      <div class="is-size-4 has-text-centered has-text-black">
                        Основное
                      </div>
                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Оружие</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['weapon']">
                          </div>
                        </div>
                      </div>
                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Триграммы</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['soul_shields']">
                          </div>
                        </div>
                      </div>
                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">DPS</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['dps']">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="box">
                      <div class="is-size-4 has-text-centered has-text-black">
                        Прочее
                      </div>
                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Сфера</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['sphere']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Дух защитник</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['spirit']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Символ</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['badge']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Душа</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['soul']">
                          </div>
                        </div>
                      </div>

                      <div class="column is-three-quarters">
                        <div class="field">
                          <label class="label">Подвеска</label>
                          <div class="control">
                            <input class="input" type="text" v-model="currentUser['equipment']['pendant']">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="box">
                      <div class="column">
                        <div class="field is-grouped is-grouped">
                          <p class="control">
                            <button class="button is-success" v-on:click="UpdateUserByToken(token)">Сохранить</button>
                          </p>
                          <p class="title" v-if="userUpdatedMessage['message'] === 'User\'s information updated'">
                            Информация обновлена
                          </p>
                          <p class="title" v-else-if="userUpdatedMessage['message'] === 'User already updated'">
                            Информация идентичная
                          </p>
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
import ImageClasses from "@/components/ImageClasses.vue"
import ImageElements from "@/components/ImageElements.vue"

import axios from "axios";
import store from "../store";

export default {
  name: "Profile",
  components: {ImageClasses, ImageElements},
  data: function () {
    return {
      classes: [
        ["Мастер тени", "1"], ["Мастер клинка", "2"], ["Мастер призыва", "3"], ["Мастер клинка линов", "4"],
        ["Мастер кунг-фу", "5"], ["Мастер стихий", "6"], ["Мастер духов", "7"], ["Мастер ци", "8"],
        ["Мастер секиры", "9"], ["Мастер стрельбы", "10"], ["Мастер гнева", "11"]
      ],
      elements: [
        ["Молния", "1"], ["Тьма", "2"], ["Холод", "3"], ["Земля", "4"], ["Воздух", "5"], ["Огонь", "6"]
      ],
      userUpdatedMessage: ""
    }
  },
  computed:{
    token: {
      get() {
        return store.state.token;
      },
    },
    currentUser:{
      get(){
        return store.state.currentUser;
      },
      set(value){
        store.commit("updateCurrentUser", value)
      }
    },
  },
  methods:{
    UpdateUserByToken: function (token) {
      let mainThis = this;
      axios({
        method: "put",
        url: process.env.VUE_APP_API_ROOT + "account/user/",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        data: {
          "nickname": mainThis.currentUser["nickname"],
          "first_name": mainThis.currentUser["first_name"],
          "equipment": mainThis.currentUser["equipment"],
          "class": mainThis.currentUser["class"]
        }
      }).then(function (response) {
        mainThis.userUpdatedMessage = response.data;
        // console.log(response.data);
      })
    }
  },
  created: function () {
    store.dispatch("GetCurrentUserByToken")
  }
}
</script>

<style lang="scss" scoped>
.has-bg-img { background: url('../assets/background3.jpg')center center; background-size:cover; }
</style>